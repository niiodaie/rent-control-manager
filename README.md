# Rent Control - Property Management SaaS Frontend

A modern, multi-tenant property management platform built with React, Vite, and Tailwind CSS. This frontend application provides landlords and property managers with comprehensive tools to manage properties, tenants, rent collection, and maintenance requests.

## 🌟 Features

### 🏢 Multi-Tenant Property Management
- Custom dashboards for each property with branding
- Unit-based tenant management and assignments
- Property-specific settings and customization

### 💳 Integrated Payment Processing
- Stripe Connect integration for rent collection
- 2% platform processing fee on transactions
- Automated payment scheduling and tracking
- Support for multiple payment methods

### 🌐 Multi-Language Support
- 7 languages with geo-detection: English, Spanish, French, German, Nigerian Pidgin, Portuguese (Brazil), Chinese (Simplified)
- Automatic currency localization based on region
- Smart language detection with manual override

### 📱 Mobile-First Design
- Responsive design optimized for all devices
- Touch-friendly interface with intuitive navigation
- Progressive Web App (PWA) capabilities

### 🎨 Modern UI/UX
- Tailwind CSS with custom design system
- Dark/light mode support
- Professional animations and micro-interactions
- Accessible design following WCAG guidelines

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/rent-control-frontend.git
   cd rent-control-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.template .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Build & Deployment

### Local Build
```bash
npm run build
npm run preview
```

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Configure Environment Variables**
   Set the following in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - See `.env.template` for complete list

3. **Custom Domain Setup**
   - Add `rent-control.net` in Vercel domains
   - Configure DNS: `CNAME @ vercel-dns.com`
   - SSL automatically provisioned

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LandingPage.jsx  # Main landing page
│   ├── LoginPage.jsx    # Authentication pages
│   ├── Dashboard.jsx    # Property dashboard
│   ├── PropertyDashboard.jsx
│   ├── UnitManagement.jsx
│   ├── RentPayment.jsx
│   ├── PricingPlans.jsx
│   ├── LanguageSelector.jsx
│   └── ...
├── locales/            # Translation files
│   ├── en/translation.json
│   ├── es/translation.json
│   ├── fr/translation.json
│   ├── de/translation.json
│   ├── ngp/translation.json
│   ├── pt-BR/translation.json
│   └── zh-CN/translation.json
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── i18n.js            # Internationalization config
├── App.jsx            # Main app component
└── main.jsx           # App entry point
```

## 🌐 Internationalization

### Supported Languages
- 🇺🇸 English (en) - Default
- 🇪🇸 Español (es)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇳🇬 Naija Pidgin (ngp)
- 🇧🇷 Português Brasil (pt-BR)
- 🇨🇳 简体中文 (zh-CN)

### Adding New Languages
1. Create translation file in `src/locales/{lang}/translation.json`
2. Add language config in `src/i18n.js`
3. Update language selector component

## 💰 Pricing Tiers

### Free Plan ($0/month)
- 1 Property
- Up to 5 Residents
- Basic Dashboard
- Ads displayed

### Premium Plan ($49.99/month)
- Up to 5 Properties
- Up to 100 Residents
- Custom Branding
- No Ads

### Enterprise Plan ($499.99/month)
- Unlimited Properties
- Unlimited Residents
- White Label
- API Access

## 🔧 Configuration

### Environment Variables
See `.env.template` for all available configuration options.

### Stripe Integration
1. Create Stripe account and get API keys
2. Set up Stripe Connect for multi-tenant payments
3. Configure webhooks for payment processing

### Supabase Setup
1. Create Supabase project
2. Set up authentication and database
3. Configure Row Level Security (RLS)

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📱 PWA Features

- Offline functionality
- Push notifications
- App-like experience on mobile
- Automatic updates

## 🔒 Security

- Content Security Policy (CSP)
- XSS protection
- CSRF protection
- Secure authentication with Supabase
- Input validation and sanitization

## 🎨 Customization

### Theming
- Tailwind CSS configuration in `tailwind.config.js`
- Custom CSS variables in `src/index.css`
- Dark/light mode toggle

### Branding
- Logo replacement in `public/` directory
- Color scheme customization
- Custom fonts via Google Fonts

## 📊 Analytics

- Google Analytics 4 integration
- Hotjar for user behavior tracking
- Custom event tracking for conversions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.rent-control.net](https://docs.rent-control.net)
- **Email**: support@rent-control.net
- **Discord**: [Join our community](https://discord.gg/rentcontrol)

## 🚀 Deployment Status

- **Production**: https://rent-control.net
- **Staging**: https://staging.rent-control.net
- **Development**: https://dev.rent-control.net

## 🔗 Related Repositories

- [Backend API](https://github.com/your-org/rent-control-backend)
- [Mobile App](https://github.com/your-org/rent-control-mobile)
- [Documentation](https://github.com/your-org/rent-control-docs)

---

**Powered by Visnec** | Built with ❤️ for property managers worldwide

