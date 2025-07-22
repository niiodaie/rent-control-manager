// Simple, bulletproof i18n system with no external dependencies

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.signin': 'Sign In',
    'nav.getstarted': 'Get Started',
    
    // Hero section
    'hero.title': 'Global Property Management Made Simple',
    'hero.subtitle': 'Streamline your rental business worldwide with our comprehensive platform. Manage properties, tenants, and payments across multiple countries and currencies.',
    'hero.cta.trial': 'Start Free Trial',
    'hero.cta.demo': 'Watch Demo',
    'hero.trust': 'Trusted by 10,000+ Property Managers Globally',
    'hero.benefits.setup': 'No setup fees',
    'hero.benefits.cancel': 'Cancel anytime',
    'hero.benefits.support': '24/7 global support',
    
    // Features
    'features.title': 'Everything You Need to Manage Properties Globally',
    'features.subtitle': 'Our comprehensive platform provides all the tools you need to efficiently manage rental properties worldwide and create exceptional experiences for your tenants.',
    'features.global.title': 'Global Property Management',
    'features.global.desc': 'Manage properties across multiple countries with local compliance and currency support.',
    'features.multilang.title': 'Multi-Language Tenant Portal',
    'features.multilang.desc': 'Tenants can access their portal in their preferred language with automatic translation.',
    'features.payments.title': 'Global Payment Processing',
    'features.payments.desc': 'Accept payments in 150+ currencies with automatic conversion and local payment methods.',
    'features.lease.title': 'Smart Lease Management',
    'features.lease.desc': 'Digital contracts with e-signatures, automatic renewals, and local legal compliance.',
    'features.maintenance.title': 'Maintenance Workflow',
    'features.maintenance.desc': 'Streamlined maintenance requests with vendor management and progress tracking.',
    'features.analytics.title': 'Advanced Analytics',
    'features.analytics.desc': 'Comprehensive insights with multi-currency reporting and performance metrics.',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Global Pricing',
    'pricing.subtitle': 'Choose the perfect plan for your property management needs. All plans include a 14-day free trial with no credit card required.',
    'pricing.starter.title': 'Starter',
    'pricing.starter.price': '$29/month',
    'pricing.starter.desc': 'Perfect for individual property owners',
    'pricing.professional.title': 'Professional',
    'pricing.professional.price': '$79/month',
    'pricing.professional.desc': 'Ideal for growing property management businesses',
    'pricing.professional.popular': 'Most Popular',
    'pricing.enterprise.title': 'Enterprise',
    'pricing.enterprise.price': 'Custom',
    'pricing.enterprise.desc': 'For large-scale property management companies',
    'pricing.cta.trial': 'Start Free Trial',
    'pricing.cta.contact': 'Contact Sales',
    
    // Dashboard
    'dashboard.title': 'Property Dashboard',
    'dashboard.status': 'All Systems Active',
    'dashboard.properties': 'Properties',
    'dashboard.tenants': 'Tenants',
    'dashboard.occupancy': 'Occupancy',
    'dashboard.revenue': 'Monthly Revenue',
    'dashboard.live': 'Live Demo',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.tryagain': 'Try Again',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.close': 'Close'
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.features': 'Características',
    'nav.pricing': 'Precios',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.faq': 'FAQ',
    'nav.signin': 'Iniciar Sesión',
    'nav.getstarted': 'Comenzar',
    
    // Hero section
    'hero.title': 'Gestión Global de Propiedades Simplificada',
    'hero.subtitle': 'Optimiza tu negocio de alquiler a nivel mundial con nuestra plataforma integral. Gestiona propiedades, inquilinos y pagos en múltiples países y monedas.',
    'hero.cta.trial': 'Prueba Gratuita',
    'hero.cta.demo': 'Ver Demo',
    'hero.trust': 'Confiado por más de 10,000 Administradores de Propiedades Globalmente',
    'hero.benefits.setup': 'Sin tarifas de configuración',
    'hero.benefits.cancel': 'Cancela en cualquier momento',
    'hero.benefits.support': 'Soporte global 24/7',
    
    // Features
    'features.title': 'Todo lo que Necesitas para Gestionar Propiedades Globalmente',
    'features.subtitle': 'Nuestra plataforma integral proporciona todas las herramientas que necesitas para gestionar eficientemente propiedades de alquiler en todo el mundo.',
    'features.global.title': 'Gestión Global de Propiedades',
    'features.global.desc': 'Gestiona propiedades en múltiples países con cumplimiento local y soporte de monedas.',
    'features.multilang.title': 'Portal de Inquilinos Multiidioma',
    'features.multilang.desc': 'Los inquilinos pueden acceder a su portal en su idioma preferido con traducción automática.',
    'features.payments.title': 'Procesamiento Global de Pagos',
    'features.payments.desc': 'Acepta pagos en más de 150 monedas con conversión automática y métodos de pago locales.',
    'features.lease.title': 'Gestión Inteligente de Contratos',
    'features.lease.desc': 'Contratos digitales con firmas electrónicas, renovaciones automáticas y cumplimiento legal local.',
    'features.maintenance.title': 'Flujo de Trabajo de Mantenimiento',
    'features.maintenance.desc': 'Solicitudes de mantenimiento optimizadas con gestión de proveedores y seguimiento de progreso.',
    'features.analytics.title': 'Análisis Avanzados',
    'features.analytics.desc': 'Información integral con informes multimoneda y métricas de rendimiento.',
    
    // Pricing
    'pricing.title': 'Precios Globales Simples y Transparentes',
    'pricing.subtitle': 'Elige el plan perfecto para tus necesidades de gestión de propiedades. Todos los planes incluyen una prueba gratuita de 14 días sin tarjeta de crédito.',
    'pricing.starter.title': 'Inicial',
    'pricing.starter.price': '$29/mes',
    'pricing.starter.desc': 'Perfecto para propietarios individuales',
    'pricing.professional.title': 'Profesional',
    'pricing.professional.price': '$79/mes',
    'pricing.professional.desc': 'Ideal para empresas de gestión de propiedades en crecimiento',
    'pricing.professional.popular': 'Más Popular',
    'pricing.enterprise.title': 'Empresarial',
    'pricing.enterprise.price': 'Personalizado',
    'pricing.enterprise.desc': 'Para empresas de gestión de propiedades a gran escala',
    'pricing.cta.trial': 'Prueba Gratuita',
    'pricing.cta.contact': 'Contactar Ventas',
    
    // Dashboard
    'dashboard.title': 'Panel de Propiedades',
    'dashboard.status': 'Todos los Sistemas Activos',
    'dashboard.properties': 'Propiedades',
    'dashboard.tenants': 'Inquilinos',
    'dashboard.occupancy': 'Ocupación',
    'dashboard.revenue': 'Ingresos Mensuales',
    'dashboard.live': 'Demo en Vivo',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Algo salió mal',
    'common.tryagain': 'Intentar de Nuevo',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.close': 'Cerrar'
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',
    'nav.signin': 'Se connecter',
    'nav.getstarted': 'Commencer',
    
    // Hero section
    'hero.title': 'Gestion Immobilière Mondiale Simplifiée',
    'hero.subtitle': 'Rationalisez votre activité locative dans le monde entier avec notre plateforme complète. Gérez les propriétés, les locataires et les paiements dans plusieurs pays et devises.',
    'hero.cta.trial': 'Essai Gratuit',
    'hero.cta.demo': 'Voir la Démo',
    
    // Features
    'features.title': 'Tout ce dont Vous Avez Besoin pour Gérer des Propriétés Globalement',
    'features.subtitle': 'Notre plateforme complète fournit tous les outils dont vous avez besoin pour gérer efficacement les propriétés locatives dans le monde entier.',
    
    // Pricing
    'pricing.title': 'Tarification Mondiale Simple et Transparente',
    'pricing.subtitle': 'Choisissez le plan parfait pour vos besoins de gestion immobilière. Tous les plans incluent un essai gratuit de 14 jours sans carte de crédit.',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Quelque chose s\'est mal passé',
    'common.tryagain': 'Réessayer',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.close': 'Fermer'
  }
};

// Simple translation function that never crashes
export function t(key, lang = 'en') {
  try {
    const translation = translations[lang] && translations[lang][key];
    return translation || translations.en[key] || key;
  } catch (error) {
    console.warn('Translation failed for key:', key, 'using fallback');
    return key; // Always return something, even if it's just the key
  }
}

// Get available languages
export function getLanguages() {
  return Object.keys(translations);
}

// Check if language is supported
export function isLanguageSupported(lang) {
  return translations.hasOwnProperty(lang);
}

// Get current language from localStorage or default to English
export function getCurrentLanguage() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('preferred-language');
      return isLanguageSupported(stored) ? stored : 'en';
    }
  } catch (error) {
    console.warn('Could not access localStorage, using default language');
  }
  return 'en';
}

export default { t, getLanguages, isLanguageSupported, getCurrentLanguage };

