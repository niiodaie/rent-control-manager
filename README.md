# 🏠 Rent Control Manager - Global Property Management Platform

A modern, comprehensive property management platform built with React, Vite, and Tailwind CSS. Manage properties, tenants, and payments across multiple countries and currencies.

## ✨ Features

- **Global Property Management**: Multi-country and multi-currency support
- **Tenant Portal**: Multi-language tenant access with automatic translation
- **Payment Processing**: Global payment processing with Stripe integration
- **Smart Analytics**: Comprehensive insights and reporting
- **Mobile-First Design**: Responsive design optimized for all devices
- **Enterprise Security**: Bank-level security with GDPR compliance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm (not pnpm - this project is configured for npm only)

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

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts and dependencies
- `npm run fresh-install` - Clean install from scratch

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

The project includes a `vercel.json` configuration file for optimal deployment.

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons
- **Routing**: React Router DOM
- **Forms**: React Hook Form, Zod validation
- **Payments**: Stripe
- **Database**: Supabase
- **Internationalization**: i18next
- **Charts**: Recharts

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── contexts/           # React contexts
├── i18n/               # Internationalization
├── services/           # API services
└── App.jsx             # Main application component
```

## 🔧 Configuration

### Vite Configuration

The project uses Vite with optimized build settings:
- Code splitting for optimal loading
- Terser minification for production
- PostCSS for Tailwind CSS processing

### Tailwind CSS

Configured with:
- Custom design system
- Dark mode support
- Responsive utilities
- Animation utilities

## 🐛 Troubleshooting

### Common Issues

#### Dependency Conflicts
```bash
# Clean install if you encounter dependency issues
npm run clean
npm install
```

#### Build Failures
```bash
# Ensure all dev dependencies are installed
npm install --save-dev terser
npm run build
```

#### Styling Issues
- Ensure `App.css` is imported in `main.jsx`
- Check that PostCSS configuration is correct
- Verify Tailwind CSS classes are being processed

### Known Issues Fixed

- ✅ **react-day-picker & date-fns compatibility**: Resolved by upgrading date-fns to v3.6.0
- ✅ **ESLint plugin compatibility**: Fixed by using ESLint v8.57.0
- ✅ **Tailwind CSS v4 issues**: Switched to stable v3.4.10
- ✅ **pnpm conflicts**: Completely removed pnpm, using npm only

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section above
- Review the deployment documentation

---

**Built with ❤️ for property managers worldwide**

