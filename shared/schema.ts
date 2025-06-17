import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Landlords table for multi-tenant support
export const landlords = pgTable("landlords", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  plan: text("plan").notNull().default("free"), // free, basic, premium
  createdAt: text("created_at").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  // Custom branding fields
  brandName: text("brand_name"),
  brandLogo: text("brand_logo"),
  primaryColor: text("primary_color").default("#2563eb"),
  secondaryColor: text("secondary_color").default("#64748b"),
  accentColor: text("accent_color").default("#10b981"),
  customDomain: text("custom_domain"),
  welcomeMessage: text("welcome_message"),
});

// Properties owned by landlords
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  landlordId: integer("landlord_id").notNull(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  units: integer("units").notNull(),
  type: text("type").notNull(), // apartment, house, condo
  inviteCode: text("invite_code").notNull().unique(),
  createdAt: text("created_at").notNull(),
});

// Residents/tenants table
export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash"),
  phone: text("phone").notNull(),
  unit: text("unit").notNull(),
  rent: integer("rent").notNull(),
  status: text("status").notNull().default("active"), // active, late, notice
  leaseExpiry: text("lease_expiry").notNull(),
  lastPayment: text("last_payment"),
  invitedAt: text("invited_at"),
  joinedAt: text("joined_at"),
});

// Rent applications
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  desiredUnit: text("desired_unit").notNull(),
  monthlyIncome: integer("monthly_income").notNull(),
  references: text("references").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: text("submitted_at").notNull(),
});

// Document storage
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  filePath: text("file_path").notNull(),
  uploadedBy: text("uploaded_by").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
  category: text("category").notNull(), // id, income_proof, lease, notice, etc.
  relatedId: integer("related_id"), // resident_id or application_id
});

// Marketplace listings
export const marketplaceListings = pgTable("marketplace_listings", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  residentId: integer("resident_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  condition: text("condition").notNull(), // new, like-new, good, fair
  status: text("status").notNull().default("active"), // active, sold, removed
  imageUrls: text("image_urls").array(),
  createdAt: text("created_at").notNull(),
  soldAt: text("sold_at"),
});

// Payment transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  payerId: integer("payer_id").notNull(),
  recipientId: integer("recipient_id"),
  type: text("type").notNull(), // rent, marketplace, fee
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  fee: decimal("fee", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  description: text("description").notNull(),
  createdAt: text("created_at").notNull(),
  completedAt: text("completed_at"),
});

// Maintenance requests
export const maintenanceRequests = pgTable("maintenance_requests", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  residentId: integer("resident_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  status: text("status").notNull().default("open"), // open, in_progress, completed, closed
  category: text("category").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// Unit configuration and invitation system
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull(),
  unitNumber: text("unit_number").notNull(),
  rent: decimal("rent", { precision: 10, scale: 2 }),
  leaseStartDate: text("lease_start_date"),
  leaseDocument: text("lease_document"),
  documentsUploaded: boolean("documents_uploaded").default(false),
  isConfigured: boolean("is_configured").default(false),
  residentId: integer("resident_id"),
  createdAt: text("created_at").notNull(),
});

// Tenant invitations table
export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  propertyId: integer("property_id").notNull(),
  unitId: integer("unit_id").notNull(),
  landlordId: integer("landlord_id").notNull(),
  email: text("email").notNull(),
  name: text("name"),
  phone: text("phone"),
  status: text("status").notNull().default("pending"), // pending, accepted, expired
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
  acceptedAt: text("accepted_at"),
});

// Schema definitions for inserts and types
export const insertLandlordSchema = createInsertSchema(landlords).omit({
  id: true,
  createdAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  inviteCode: true,
});

export const insertResidentSchema = createInsertSchema(residents).omit({
  id: true,
  invitedAt: true,
  joinedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  status: true,
  submittedAt: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
}).extend({
  relatedId: z.number().nullable().optional(),
});

export const insertMarketplaceListingSchema = createInsertSchema(marketplaceListings).omit({
  id: true,
  createdAt: true,
  soldAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
  createdAt: true,
});

export const insertInvitationSchema = createInsertSchema(invitations).omit({
  id: true,
  createdAt: true,
  acceptedAt: true,
});

// Type exports
export type InsertLandlord = z.infer<typeof insertLandlordSchema>;
export type Landlord = typeof landlords.$inferSelect;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

export type InsertResident = z.infer<typeof insertResidentSchema>;
export type Resident = typeof residents.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Unit = typeof units.$inferSelect;

export type InsertInvitation = z.infer<typeof insertInvitationSchema>;
export type Invitation = typeof invitations.$inferSelect;

export type InsertMarketplaceListing = z.infer<typeof insertMarketplaceListingSchema>;
export type MarketplaceListing = typeof marketplaceListings.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertMaintenanceRequest = z.infer<typeof insertMaintenanceRequestSchema>;
export type MaintenanceRequest = typeof maintenanceRequests.$inferSelect;
