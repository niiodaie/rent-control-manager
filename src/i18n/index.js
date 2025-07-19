import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files with error handling
let en, es, fr, de, it, pt, zh, ja, ko, ar;

try {
  en = require('./locales/en.json');
  es = require('./locales/es.json');
  fr = require('./locales/fr.json');
  de = require('./locales/de.json');
  it = require('./locales/it.json');
  pt = require('./locales/pt.json');
  zh = require('./locales/zh.json');
  ja = require('./locales/ja.json');
  ko = require('./locales/ko.json');
  ar = require('./locales/ar.json');
} catch (error) {
  console.warn('Error loading translation files:', error);
  // Fallback to minimal English translations
  en = {
    "hero": {
      "title": {
        "part1": "Global Property",
        "part2": "Management",
        "part3": "Made Simple"
      },
      "subtitle": "Streamline your rental business worldwide with our comprehensive platform. Manage properties, tenants, and payments across multiple countries and currencies.",
      "cta": {
        "primary": "Start Free Trial",
        "secondary": "Watch Demo"
      }
    }
  };
  es = fr = de = it = pt = zh = ja = ko = ar = en; // Use English as fallback
}

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar }
};

// Enhanced error handling for i18n initialization
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',
        
        detection: {
          order: ['localStorage', 'navigator', 'htmlTag'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
          checkWhitelist: true
        },

        interpolation: {
          escapeValue: false,
        },

        // Enhanced error handling
        saveMissing: true,
        missingKeyHandler: (lng, ns, key, fallbackValue) => {
          console.warn(`Missing translation key: ${key} for language: ${lng}`);
          return fallbackValue || key;
        },

        // Prevent crashes on missing translations
        returnEmptyString: false,
        returnNull: false,
        returnObjects: false,

        // Language whitelist to prevent invalid language codes
        supportedLngs: ['en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar'],
        nonExplicitSupportedLngs: true,

        // React specific options
        react: {
          useSuspense: false, // Prevent suspense-related crashes
          bindI18n: 'languageChanged loaded',
          bindI18nStore: 'added removed',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
        }
      });
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Fallback initialization with minimal config
    await i18n.init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: { translation: en }
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    });
  }
};

// Initialize i18n
initI18n();

// Add global error handler for language changes
i18n.on('failedLoading', (lng, ns, msg) => {
  console.warn(`Failed loading language ${lng}:`, msg);
});

i18n.on('missingKey', (lng, namespace, key, res) => {
  console.warn(`Missing key "${key}" for language "${lng}"`);
});

export default i18n;

