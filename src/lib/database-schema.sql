-- Database schema for Rent Control platform

-- Subscriptions table for managing user plans and limits
create table if not exists subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_key text check (plan_key in ('free','starter','pro')) not null,
  plan_status text default 'active',
  stripe_customer_id text,
  stripe_subscription_id text,
  limits jsonb,
  updated_at timestamptz default now()
);

-- Profiles table for user roles and metadata
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  role text check (role in ('landlord','tenant')) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Properties table for landlord properties
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references auth.users(id) on delete cascade,
  name text not null,
  address text not null,
  city text not null,
  state text,
  country text not null,
  postal_code text,
  property_type text,
  units_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Units table for individual rental units
create table if not exists units (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  unit_number text not null,
  bedrooms integer,
  bathrooms numeric,
  square_feet integer,
  rent_amount numeric,
  currency text default 'USD',
  status text check (status in ('vacant','occupied','maintenance')) default 'vacant',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tenant units relationship table
create table if not exists tenant_units (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references auth.users(id) on delete cascade,
  unit_id uuid references units(id) on delete cascade,
  lease_start_date date,
  lease_end_date date,
  rent_amount numeric,
  status text check (status in ('active','pending','terminated')) default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Maintenance requests table
create table if not exists maintenance_requests (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid references units(id) on delete cascade,
  tenant_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  priority text check (priority in ('low','medium','high','urgent')) default 'medium',
  status text check (status in ('open','in_progress','completed','cancelled')) default 'open',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tenant invites table
create table if not exists tenant_invites (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid references auth.users(id) on delete cascade,
  unit_id uuid references units(id) on delete cascade,
  email text not null,
  token text unique not null,
  status text check (status in ('pending','accepted','expired')) default 'pending',
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- Indexes for better performance
create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_customer on subscriptions(stripe_customer_id);
create index if not exists idx_subscriptions_stripe_subscription on subscriptions(stripe_subscription_id);
create index if not exists idx_profiles_email on profiles(email);
create index if not exists idx_properties_landlord on properties(landlord_id);
create index if not exists idx_units_property on units(property_id);
create index if not exists idx_tenant_units_tenant on tenant_units(tenant_id);
create index if not exists idx_tenant_units_unit on tenant_units(unit_id);
create index if not exists idx_maintenance_requests_unit on maintenance_requests(unit_id);
create index if not exists idx_maintenance_requests_tenant on maintenance_requests(tenant_id);
create index if not exists idx_tenant_invites_token on tenant_invites(token);
create index if not exists idx_tenant_invites_email on tenant_invites(email);

-- Row Level Security (RLS) policies
alter table subscriptions enable row level security;
alter table profiles enable row level security;
alter table properties enable row level security;
alter table units enable row level security;
alter table tenant_units enable row level security;
alter table maintenance_requests enable row level security;
alter table tenant_invites enable row level security;

-- Subscriptions policies
create policy "Users can view their own subscription" on subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can update their own subscription" on subscriptions
  for update using (auth.uid() = user_id);

-- Profiles policies
create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert their own profile" on profiles
  for insert with check (auth.uid() = id);

-- Properties policies
create policy "Landlords can view their own properties" on properties
  for select using (auth.uid() = landlord_id);

create policy "Landlords can insert their own properties" on properties
  for insert with check (auth.uid() = landlord_id);

create policy "Landlords can update their own properties" on properties
  for update using (auth.uid() = landlord_id);

create policy "Landlords can delete their own properties" on properties
  for delete using (auth.uid() = landlord_id);

-- Units policies
create policy "Landlords can view units in their properties" on units
  for select using (
    exists (
      select 1 from properties 
      where properties.id = units.property_id 
      and properties.landlord_id = auth.uid()
    )
  );

create policy "Tenants can view their assigned units" on units
  for select using (
    exists (
      select 1 from tenant_units 
      where tenant_units.unit_id = units.id 
      and tenant_units.tenant_id = auth.uid()
    )
  );

-- Functions for automatic timestamp updates
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for automatic timestamp updates
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_properties_updated_at before update on properties
  for each row execute function update_updated_at_column();

create trigger update_units_updated_at before update on units
  for each row execute function update_updated_at_column();

create trigger update_tenant_units_updated_at before update on tenant_units
  for each row execute function update_updated_at_column();

create trigger update_maintenance_requests_updated_at before update on maintenance_requests
  for each row execute function update_updated_at_column();

