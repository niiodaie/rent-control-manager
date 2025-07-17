
// src/i18n/index.js

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

// Normalize language helper
const normalizeLang = (lng) => {
  const short = lng?.split('-')?.[0];
  return Object.keys(resources).includes(short) ? short : 'en';
};

// Optional: Pre-configure detector before init()
i18n.services?.languageDetector?.init({
  lookupLocalStorage: 'i18nextLng',
  checkWhitelist: true,
});

// Event handler for user switching
i18n.on('languageChanged', (lng) => {
  const normalized = normalizeLang(lng);
  if (lng !== normalized) i18n.changeLanguage(normalized);
});

// Initialize i18n with safety and fallback handling
const initI18n = async () => {
  try {
    await i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: Object.keys(resources),
        load: 'languageOnly',
        debug: false,
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
        },
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
        returnEmptyString: false,
        returnNull: false,
        returnObjects: false,
        saveMissing: false,
        missingKeyHandler: (lng, ns, key) => {
          console.warn(`Missing translation: ${key} for ${lng}`);
          return key;
        },
      });
  } catch (error) {
    console.error('i18n initialization failed:', error);
    i18n.changeLanguage('en');
  }
};

initI18n();

// Additional handlers
i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed loading language ${lng}:`, msg);
  if (lng !== 'en') i18n.changeLanguage('en');
});

i18n.on('missingKey', (lng, namespace, key, res) => {
  console.warn(`Missing key "${key}" for language "${lng}"`);
});

export default i18n;
