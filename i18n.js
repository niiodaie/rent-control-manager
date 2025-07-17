import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationNGP from './locales/ngp/translation.json';
import translationPTBR from './locales/pt-BR/translation.json';
import translationZH from './locales/zh-CN/translation.json';

// Language configuration with country mappings
const languageConfig = {
  en: { 
    name: 'English', 
    flag: '🇺🇸',
    countries: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA'],
    currency: 'USD'
  },
  es: { 
    name: 'Español', 
    flag: '🇪🇸',
    countries: ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL'],
    currency: 'EUR'
  },
  fr: { 
    name: 'Français', 
    flag: '🇫🇷',
    countries: ['FR', 'BE', 'CH', 'CA'],
    currency: 'EUR'
  },
  de: { 
    name: 'Deutsch', 
    flag: '🇩🇪',
    countries: ['DE', 'AT', 'CH'],
    currency: 'EUR'
  },
  ngp: { 
    name: 'Naija Pidgin', 
    flag: '🇳🇬',
    countries: ['NG'],
    currency: 'NGN'
  },
  'pt-BR': { 
    name: 'Português (Brasil)', 
    flag: '🇧🇷',
    countries: ['BR'],
    currency: 'BRL'
  },
  'zh-CN': { 
    name: '简体中文', 
    flag: '🇨🇳',
    countries: ['CN'],
    currency: 'CNY'
  }
};

// Geo-location based language detection
const detectLanguageByLocation = async () => {
  try {
    // Try to get user's country from IP
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const userCountry = data.country_code;
    
    // Find matching language based on country
    for (const [langCode, config] of Object.entries(languageConfig)) {
      if (config.countries.includes(userCountry)) {
        return langCode;
      }
    }
  } catch (error) {
    console.log('Geo-detection failed, using browser language');
  }
  
  // Fallback to browser language
  const browserLang = navigator.language || navigator.languages[0];
  const langCode = browserLang.split('-')[0];
  
  // Check if we support this language
  if (languageConfig[langCode]) {
    return langCode;
  }
  
  // Check for exact match (e.g., pt-BR)
  if (languageConfig[browserLang]) {
    return browserLang;
  }
  
  // Default fallback
  return 'en';
};

// Custom language detector
const customDetector = {
  name: 'customDetector',
  lookup: async () => {
    // Check if user has manually selected a language
    const savedLang = localStorage.getItem('rent-control-language');
    if (savedLang && languageConfig[savedLang]) {
      return savedLang;
    }
    
    // Use geo-detection for first-time visitors
    return await detectLanguageByLocation();
  },
  cacheUserLanguage: (lng) => {
    localStorage.setItem('rent-control-language', lng);
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
      fr: { translation: translationFR },
      de: { translation: translationDE },
      ngp: { translation: translationNGP },
      'pt-BR': { translation: translationPTBR },
      'zh-CN': { translation: translationZH }
    },
    
    // Language detection configuration
    detection: {
      order: ['customDetector', 'localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'rent-control-language',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode']
    },
    
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false // React already escapes values
    },
    
    // React specific options
    react: {
      useSuspense: false
    }
  });

// Add custom detector
i18n.services.languageDetector.addDetector(customDetector);

// Helper functions
export const getLanguageConfig = (langCode) => languageConfig[langCode] || languageConfig.en;
export const getSupportedLanguages = () => Object.keys(languageConfig);
export const getCurrentLanguageConfig = () => getLanguageConfig(i18n.language);

// Currency formatting based on language
export const formatCurrency = (amount, langCode = i18n.language) => {
  const config = getLanguageConfig(langCode);
  const currencyMap = {
    USD: { symbol: '$', locale: 'en-US' },
    EUR: { symbol: '€', locale: 'de-DE' },
    NGN: { symbol: '₦', locale: 'en-NG' },
    BRL: { symbol: 'R$', locale: 'pt-BR' },
    CNY: { symbol: '¥', locale: 'zh-CN' }
  };
  
  const currency = currencyMap[config.currency] || currencyMap.USD;
  
  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: config.currency
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount}`;
  }
};

// Auto-detect and set language on app start
export const initializeLanguage = async () => {
  try {
    const detectedLang = await detectLanguageByLocation();
    const savedLang = localStorage.getItem('rent-control-language');
    
    if (!savedLang) {
      i18n.changeLanguage(detectedLang);
      localStorage.setItem('rent-control-language', detectedLang);
    }
  } catch (error) {
    console.log('Language initialization failed:', error);
  }
};

export default i18n;

