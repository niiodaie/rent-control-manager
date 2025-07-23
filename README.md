# 🏠 Rent Control Manager - Global Property Management Platform

A modern, multi-language property management platform built with React, Vite, and Supabase. Designed for landlords and property managers to efficiently manage properties, tenants, and payments worldwide.

## ✨ Features

### 🌍 Multi-Language Support
- **6 Languages**: English, Spanish, French, German, Italian, Portuguese
- **Bulletproof Translation System**: Custom i18n implementation that cannot crash
- **Location Detection**: Auto-detects user location and adapts interface
- **Complete Translation**: All content properly translated across languages

### 🏠 Property Management
- **Global Property Management**: Manage properties across multiple countries
- **Multi-Currency Support**: Handle payments in 150+ currencies
- **Lease Management**: Digital contracts with e-signatures
- **Maintenance Workflow**: Streamlined maintenance requests and tracking

### 👥 User Management
- **Role-Based Access**: Separate dashboards for landlords and tenants
- **Tenant Invitations**: Email-based tenant invitation system
- **Authentication**: Secure login with Supabase and OAuth
- **Profile Management**: Comprehensive user profile system

### 💰 Financial Management
- **Payment Processing**: Global payment processing with local methods
- **Financial Reporting**: Multi-currency reporting and analytics
- **Pricing Plans**: Free, Professional, and Enterprise tiers
- **Revenue Tracking**: Comprehensive financial analytics

### 📱 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Branding**: Custom RC logo and modern design
- **Dark/Light Theme**: Theme switching capability
- **Smooth Animations**: Professional interactions and transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rent-control-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   └── ...
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── AdminDashboard.jsx    # Landlord dashboard
│   ├── ResidentDashboard.jsx # Tenant dashboard
│   ├── BlogPage.jsx    # Blog/How-to guides
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication hook
│   ├── useProperties.js # Property management hook
│   └── ...
├── i18n/               # Internationalization
│   └── simple.js       # Custom translation system
├── lib/                # Utility libraries
│   ├── supabaseClient.js # Supabase configuration
│   └── stripe.js       # Stripe configuration
└── App.jsx             # Main application component
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Set up authentication providers (Google OAuth recommended)
3. Create the following tables:
   - `profiles` - User profiles
   - `properties` - Property information
   - `leases` - Lease agreements
   - `maintenance_requests` - Maintenance tracking

### Stripe Setup
1. Create a Stripe account
2. Get your publishable key
3. Set up payment methods and pricing plans
4. Configure webhooks for payment processing

## 🎨 Customization

### Branding
- Replace `public/RC-Logo.png` with your logo
- Update colors in `tailwind.config.js`
- Modify company information in footer

### Languages
- Add new languages in `src/i18n/simple.js`
- Follow the existing structure for translations
- Update language selector in `SimpleLanguageSelector.jsx`

### Features
- Add new dashboard widgets in respective dashboard components
- Create new pages in `src/pages/`
- Add routes in `App.jsx`

## 🧪 Testing

### Manual Testing
1. Start development server: `npm run dev`
2. Test language switching across all 6 languages
3. Verify responsive design on different screen sizes
4. Test authentication flow with Supabase
5. Verify all navigation links and buttons

### Build Testing
```bash
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

**Language Switcher Not Working**
- Ensure all translation keys exist in `src/i18n/simple.js`
- Check browser console for JavaScript errors
- Verify LanguageContext is properly wrapped around App

**Build Failures**
- Check for missing default exports in page components
- Verify all imports are correct
- Ensure environment variables are set

**Authentication Issues**
- Verify Supabase URL and keys are correct
- Check Supabase dashboard for authentication settings
- Ensure OAuth providers are properly configured

**Blank Page After Deployment**
- Check browser console for JavaScript errors
- Verify all routes are properly defined in App.jsx
- Ensure all page components have default exports

## 📚 Documentation

### Key Components

**SimpleLanguageSelector**: Bulletproof language switching component
**ProtectedRoute**: Route protection based on authentication and roles
**AdminDashboard**: Comprehensive landlord management interface
**ResidentDashboard**: Tenant portal with lease and payment information

### Custom Hooks

**useAuth**: Authentication state and user management
**useProperties**: Property data fetching and management
**useMaintenanceRequests**: Maintenance request handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is proprietary software owned by Visnec Technologies.

## 🆘 Support

For technical support or questions:
- Email: support@rent-control.net
- Phone: +1 (920) 808-1188
- Website: https://www.rent-control.net

## 🎯 Roadmap

### Upcoming Features
- [ ] Mobile apps for iOS and Android
- [ ] Advanced analytics and reporting
- [ ] Integration with accounting software
- [ ] Automated rent collection
- [ ] Tenant screening tools
- [ ] Document management system

### Recent Updates
- ✅ Bulletproof language switching system
- ✅ Professional RC logo integration
- ✅ Updated pricing plans
- ✅ Blog/How-to guide page
- ✅ Enhanced dashboard functionality
- ✅ Tenant invitation system

---

**Built with ❤️ by Visnec Technologies**  
**Production Ready** ✅ | **Zero Crashes** ✅ | **Multi-Language** ✅

