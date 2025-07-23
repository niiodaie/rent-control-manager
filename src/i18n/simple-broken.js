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
    'pricing.free.title': 'Free',
    'pricing.free.price': '$0/month',
    'pricing.free.desc': 'Perfect for getting started with basic property management',
    'pricing.professional.title': 'Professional',
    'pricing.professional.price': '$49.99/month',
    'pricing.professional.desc': 'Ideal for growing property management businesses',
    'pricing.professional.popular': 'Most Popular',
    'pricing.enterprise.title': 'Enterprise',
    'pricing.enterprise.price': '$99.99/month',
    'pricing.enterprise.desc': 'For large-scale property management companies',
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
    'pricing.free.title': 'Gratis',
    'pricing.free.price': '$0/mes',
    'pricing.free.desc': 'Perfecto para comenzar con gestión básica de propiedades',
    'pricing.professional.title': 'Profesional',
    'pricing.professional.price': '$49.99/mes',
    'pricing.professional.desc': 'Ideal para empresas de gestión de propiedades en crecimiento',
    'pricing.professional.popular': 'Más Popular',
    'pricing.enterprise.title': 'Empresarial',
    'pricing.enterprise.price': '$99.99/mes',
    'pricing.enterprise.desc': 'Para empresas de gestión de propiedades a gran escala',
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


    // About page
    'about.title': 'About Us',
    'about.subtitle': 'Learn more about our mission to revolutionize global property management.',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'We believe property management should be simple, efficient, and accessible to everyone, everywhere.',
    'about.mission.global': 'Global reach with local expertise',
    'about.mission.secure': 'Bank-level security and compliance',
    'about.mission.simple': 'Simple, intuitive user experience',
    'about.stats.title': 'Our Impact',
    'about.stats.properties': 'Properties Managed',
    'about.stats.countries': 'Countries Served',
    'about.stats.users': 'Happy Users',
    'about.stats.uptime': 'Platform Uptime',
    'about.values.title': 'Our Values',
    'about.values.subtitle': 'The principles that guide everything we do.',
    'about.values.global.title': 'Global Perspective',
    'about.values.global.description': 'We think globally while acting locally, understanding diverse markets and regulations.',
    'about.values.security.title': 'Security First',
    'about.values.security.description': 'Your data and your tenants\' information are protected with enterprise-grade security.',
    'about.values.community.title': 'Community Focused',
    'about.values.community.description': 'We build tools that strengthen the relationship between property managers and tenants.',
    'about.team.title': 'Our Team',
    'about.team.description': 'A diverse group of professionals passionate about transforming property management.',
    'about.team.commitment.title': 'Our Commitment',
    'about.team.commitment.description': 'We are committed to continuous innovation and exceptional customer service.',
    'about.contact.title': 'Ready to Get Started?',
    'about.contact.description': 'Join thousands of property managers who trust us with their business.',
    'about.contact.button': 'Contact Us',
    'about.contact.trial': 'Start Free Trial',

    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team. We\'re here to help you succeed.',
    'contact.info.title': 'Get in Touch',
    'contact.info.email.title': 'Email Support',
    'contact.info.email.description': 'We typically respond within 24 hours',
    'contact.info.phone.title': 'Phone Support',
    'contact.info.phone.description': 'Monday to Friday, 9 AM to 6 PM CST',
    'contact.info.address.title': 'Our Location',
    'contact.info.hours.title': 'Business Hours',
    'contact.info.hours.weekdays': 'Monday - Friday: 9:00 AM - 6:00 PM CST',
    'contact.info.hours.weekend': 'Saturday - Sunday: Closed',
    'contact.support.title': 'Quick Support Options',
    'contact.support.help': 'Browse Help Center',
    'contact.support.faq': 'Frequently Asked Questions',
    'contact.support.email': 'Email Support Team',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'Select a topic',
    'contact.form.subject.general': 'General Inquiry',
    'contact.form.subject.support': 'Technical Support',
    'contact.form.subject.billing': 'Billing Question',
    'contact.form.subject.feature': 'Feature Request',
    'contact.form.subject.partnership': 'Partnership Opportunity',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us how we can help you...',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success.title': 'Message Sent!',
    'contact.form.success.message': 'Thank you for contacting us. We\'ll get back to you soon.',

    // FAQ page
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about Rent Control Manager.',
    'faq.search.placeholder': 'Search questions...',
    'faq.search.no_results': 'No questions found matching your search.',
    'faq.search.clear': 'Clear search',
    'faq.contact.title': 'Still have questions?',
    'faq.contact.description': 'Can\'t find what you\'re looking for? Our support team is here to help.',
    'faq.contact.button': 'Contact Support',
    'faq.contact.email': 'Email Us',

    // Blog page
    'blog.title': 'Help Center & Guides',
    'blog.subtitle': 'Everything you need to know about managing properties and using Rent Control Manager effectively.',
    'blog.search.placeholder': 'Search articles...',
    'blog.categories.all': 'All',
    'blog.categories.getting_started': 'Getting Started',
    'blog.categories.tenant_guide': 'Tenant Guide',
    'blog.categories.property_management': 'Property Management',
    'blog.categories.pricing': 'Pricing',
    'blog.categories.security': 'Security',
    'blog.categories.mobile': 'Mobile',
    'blog.featured': 'Featured Articles',
    'blog.all_articles': 'All Articles',
    'blog.read_more': 'Read More',
    'blog.quick_access': 'Quick Access',
    'blog.help_needed': 'Still need help?',
    'blog.help_description': 'Can\'t find what you\'re looking for? Our support team is here to help.',
    'blog.location_detecting': 'Detecting your location...'
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
    'features.multilang.title': 'Portal Multiidioma para Inquilinos',
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
    'pricing.subtitle': 'Elige el plan perfecto para tus necesidades de gestión de propiedades. Todos los planes incluyen una prueba gratuita de 14 días sin tarjeta de crédito requerida.',
    'pricing.free.title': 'Gratuito',
    'pricing.free.price': '$0/mes',
    'pricing.free.desc': 'Perfecto para comenzar con gestión básica de propiedades',
    'pricing.professional.title': 'Profesional',
    'pricing.professional.price': '$49.99/mes',
    'pricing.professional.desc': 'Ideal para empresas de gestión de propiedades en crecimiento',
    'pricing.professional.popular': 'Más Popular',
    'pricing.enterprise.title': 'Empresarial',
    'pricing.enterprise.price': 'Personalizado',
    'pricing.enterprise.desc': 'Para empresas de gestión de propiedades a gran escala',
    'pricing.cta.trial': 'Comenzar Prueba Gratuita',
    'pricing.cta.contact': 'Contactar Ventas',
    
    // Dashboard
    'dashboard.title': 'Panel de Propiedades',
    'dashboard.status': 'Todos los Sistemas Activos',
    'dashboard.properties': 'Propiedades',
    'dashboard.tenants': 'Inquilinos',
    'dashboard.occupancy': 'Ocupación',
    'dashboard.revenue': 'Ingresos Mensuales',
    'dashboard.live': 'Demo en Vivo',
    
    // About page (Spanish)
    'about.title': 'Acerca de Nosotros',
    'about.subtitle': 'Conoce más sobre nuestra misión de revolucionar la gestión global de propiedades.',
    'about.mission.title': 'Nuestra Misión',
    'about.mission.description': 'Creemos que la gestión de propiedades debe ser simple, eficiente y accesible para todos, en todas partes.',
    'about.mission.global': 'Alcance global con experiencia local',
    'about.mission.secure': 'Seguridad y cumplimiento de nivel bancario',
    'about.mission.simple': 'Experiencia de usuario simple e intuitiva',
    'about.stats.title': 'Nuestro Impacto',
    'about.stats.properties': 'Propiedades Gestionadas',
    'about.stats.countries': 'Países Atendidos',
    'about.stats.users': 'Usuarios Satisfechos',
    'about.stats.uptime': 'Tiempo de Actividad de la Plataforma',
    'about.values.title': 'Nuestros Valores',
    'about.values.subtitle': 'Los principios que guían todo lo que hacemos.',
    'about.values.global.title': 'Perspectiva Global',
    'about.values.global.description': 'Pensamos globalmente mientras actuamos localmente, entendiendo diversos mercados y regulaciones.',
    'about.values.security.title': 'Seguridad Primero',
    'about.values.security.description': 'Tus datos y la información de tus inquilinos están protegidos con seguridad de nivel empresarial.',
    'about.values.community.title': 'Enfocados en la Comunidad',
    'about.values.community.description': 'Construimos herramientas que fortalecen la relación entre administradores de propiedades e inquilinos.',
    'about.team.title': 'Nuestro Equipo',
    'about.team.description': 'Un grupo diverso de profesionales apasionados por transformar la gestión de propiedades.',
    'about.team.commitment.title': 'Nuestro Compromiso',
    'about.team.commitment.description': 'Estamos comprometidos con la innovación continua y el servicio al cliente excepcional.',
    'about.contact.title': '¿Listo para Comenzar?',
    'about.contact.description': 'Únete a miles de administradores de propiedades que confían en nosotros con su negocio.',
    'about.contact.button': 'Contáctanos',
    'about.contact.trial': 'Comenzar Prueba Gratuita',

    // Contact page (Spanish)
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Ponte en contacto con nuestro equipo. Estamos aquí para ayudarte a tener éxito.',
    'contact.info.title': 'Ponte en Contacto',
    'contact.info.email.title': 'Soporte por Email',
    'contact.info.email.description': 'Típicamente respondemos dentro de 24 horas',
    'contact.info.phone.title': 'Soporte Telefónico',
    'contact.info.phone.description': 'Lunes a Viernes, 9 AM a 6 PM CST',
    'contact.info.address.title': 'Nuestra Ubicación',
    'contact.info.hours.title': 'Horario de Atención',
    'contact.info.hours.weekdays': 'Lunes - Viernes: 9:00 AM - 6:00 PM CST',
    'contact.info.hours.weekend': 'Sábado - Domingo: Cerrado',
    'contact.support.title': 'Opciones de Soporte Rápido',
    'contact.support.help': 'Explorar Centro de Ayuda',
    'contact.support.faq': 'Preguntas Frecuentes',
    'contact.support.email': 'Equipo de Soporte por Email',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.name': 'Nombre Completo',
    'contact.form.email': 'Dirección de Email',
    'contact.form.subject': 'Asunto',
    'contact.form.subject.placeholder': 'Selecciona un tema',
    'contact.form.subject.general': 'Consulta General',
    'contact.form.subject.support': 'Soporte Técnico',
    'contact.form.subject.billing': 'Pregunta de Facturación',
    'contact.form.subject.feature': 'Solicitud de Función',
    'contact.form.subject.partnership': 'Oportunidad de Asociación',
    'contact.form.message': 'Mensaje',
    'contact.form.message.placeholder': 'Cuéntanos cómo podemos ayudarte...',
    'contact.form.send': 'Enviar Mensaje',
    'contact.form.sending': 'Enviando...',
    'contact.form.success.title': '¡Mensaje Enviado!',
    'contact.form.success.message': 'Gracias por contactarnos. Te responderemos pronto.',

    // FAQ page (Spanish)
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Encuentra respuestas a preguntas comunes sobre Rent Control Manager.',
    'faq.search.placeholder': 'Buscar preguntas...',
    'faq.search.no_results': 'No se encontraron preguntas que coincidan con tu búsqueda.',
    'faq.search.clear': 'Limpiar búsqueda',
    'faq.contact.title': '¿Aún tienes preguntas?',
    'faq.contact.description': '¿No encuentras lo que buscas? Nuestro equipo de soporte está aquí para ayudar.',
    'faq.contact.button': 'Contactar Soporte',
    'faq.contact.email': 'Envíanos un Email',

    // Blog page (Spanish)
    'blog.title': 'Centro de Ayuda y Guías',
    'blog.subtitle': 'Todo lo que necesitas saber sobre gestión de propiedades y uso efectivo de Rent Control Manager.',
    'blog.search.placeholder': 'Buscar artículos...',
    'blog.categories.all': 'Todos',
    'blog.categories.getting_started': 'Comenzando',
    'blog.categories.tenant_guide': 'Guía del Inquilino',
    'blog.categories.property_management': 'Gestión de Propiedades',
    'blog.categories.pricing': 'Precios',
    'blog.categories.security': 'Seguridad',
    'blog.categories.mobile': 'Móvil',
    'blog.featured': 'Artículos Destacados',
    'blog.all_articles': 'Todos los Artículos',
    'blog.read_more': 'Leer Más',
    'blog.quick_access': 'Acceso Rápido',
    'blog.help_needed': '¿Aún necesitas ayuda?',
    'blog.help_description': '¿No encuentras lo que buscas? Nuestro equipo de soporte está aquí para ayudar.',
    'blog.location_detecting': 'Detectando tu ubicación...',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Algo salió mal',
    'common.tryagain': 'Intentar de Nuevo',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.close': 'Cerrar'
  }
};

// Get current language from localStorage or default to 'en'
export function getCurrentLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferred-language') || 'en';
  }
  return 'en';
}

// Set language and save to localStorage
export function setLanguage(lang) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'preferred-language',
      newValue: lang
    }));
  }
}

// Get translation for a key
export function t(key, lang = null) {
  const currentLang = lang || getCurrentLanguage();
  const translation = translations[currentLang]?.[key] || translations['en']?.[key] || key;
  return translation;
}

// Get all available languages
export function getAvailableLanguages() {
  return Object.keys(translations);
}

export default {
  getCurrentLanguage,
  setLanguage,
  t,
  getAvailableLanguages
};

