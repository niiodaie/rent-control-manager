import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';

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

// Initialize i18n with error handling
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
        },

        interpolation: {
          escapeValue: false,
        },

        // Simplified React configuration
        react: {
          useSuspense: false,
        },

        // Prevent crashes on missing translations
        returnEmptyString: false,
        returnNull: false,
        returnObjects: false,
        
        // Add missing key handler
        saveMissing: false,
        missingKeyHandler: (lng, ns, key) => {
          console.warn(`Missing translation: ${key} for ${lng}`);
          return key;
        },
      });
  } catch (error) {
    console.error('i18n initialization failed:', error);
    // Force fallback to English
    i18n.changeLanguage('en');
  }
};

// Initialize i18n
initI18n();

// Add error handlers
i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed loading language ${lng}:`, msg);
  if (lng !== 'en') {
    i18n.changeLanguage('en');
  }
});

i18n.on('missingKey', (lng, namespace, key, res) => {
  console.warn(`Missing key "${key}" for language "${lng}"`);
});

export default i18n;

