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
    
    // Features
    'features.title': 'Everything You Need to Manage Properties Globally',
    'features.subtitle': 'Our comprehensive platform provides all the tools you need to efficiently manage rental properties worldwide and create exceptional experiences for your tenants.',
    
    // Pricing
    'pricing.title': 'Simple, Transparent Global Pricing',
    'pricing.subtitle': 'Choose the perfect plan for your property management needs. All plans include a 14-day free trial with no credit card required.',
    
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
    
    // Features
    'features.title': 'Todo lo que Necesitas para Gestionar Propiedades Globalmente',
    'features.subtitle': 'Nuestra plataforma integral proporciona todas las herramientas que necesitas para gestionar eficientemente propiedades de alquiler en todo el mundo.',
    
    // Pricing
    'pricing.title': 'Precios Globales Simples y Transparentes',
    'pricing.subtitle': 'Elige el plan perfecto para tus necesidades de gestión de propiedades. Todos los planes incluyen una prueba gratuita de 14 días sin tarjeta de crédito.',
    
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

