import { useState, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'IE'] },
  { code: 'es', name: 'Español', flag: '🇪🇸', countries: ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'GT', 'CU'] },
  { code: 'fr', name: 'Français', flag: '🇫🇷', countries: ['FR', 'BE', 'CH', 'CA', 'LU', 'MC'] },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', countries: ['DE', 'AT', 'CH', 'LI'] },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', countries: ['IT', 'CH', 'SM', 'VA'] },
  { code: 'pt', name: 'Português', flag: '🇵🇹', countries: ['PT', 'BR', 'AO', 'MZ'] },
  { code: 'zh', name: '中文', flag: '🇨🇳', countries: ['CN', 'TW', 'HK', 'SG'] },
  { code: 'ja', name: '日本語', flag: '🇯🇵', countries: ['JP'] },
  { code: 'ko', name: '한국어', flag: '🇰🇷', countries: ['KR'] },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', countries: ['SA', 'AE', 'EG', 'JO', 'LB', 'SY', 'IQ', 'KW', 'QA', 'BH', 'OM', 'YE'] },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', countries: ['RU', 'BY', 'KZ', 'KG', 'TJ'] },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', countries: ['IN'] },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱', countries: ['NL', 'BE', 'SR'] },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪', countries: ['SE', 'FI'] },
  { code: 'no', name: 'Norsk', flag: '🇳🇴', countries: ['NO'] },
  { code: 'da', name: 'Dansk', flag: '🇩🇰', countries: ['DK'] },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮', countries: ['FI'] },
  { code: 'pl', name: 'Polski', flag: '🇵🇱', countries: ['PL'] },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', countries: ['TR'] },
  { code: 'th', name: 'ไทย', flag: '🇹🇭', countries: ['TH'] }
];

export function useLanguage(userLocation = null) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [isAutoDetected, setIsAutoDetected] = useState(false);

  useEffect(() => {
    detectLanguage();
  }, [userLocation]);

  const detectLanguage = () => {
    try {
      let detectedLang = 'en'; // Default fallback
      let detectionMethod = 'default';

      // 1. Try to detect from user location (country)
      if (userLocation && userLocation.countryCode) {
        const countryCode = userLocation.countryCode.toUpperCase();
        const languageFromCountry = languages.find(lang => 
          lang.countries.includes(countryCode)
        );
        
        if (languageFromCountry) {
          detectedLang = languageFromCountry.code;
          detectionMethod = 'location';
        }
      }

      // 2. Fallback to browser language if location detection failed
      if (detectionMethod === 'default') {
        const browserLang = navigator.language || navigator.languages[0];
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        if (languages.find(lang => lang.code === langCode)) {
          detectedLang = langCode;
          detectionMethod = 'browser';
        }
      }

      // 3. Check for saved preference
      const savedLang = localStorage.getItem('preferred-language');
      if (savedLang && languages.find(lang => lang.code === savedLang)) {
        detectedLang = savedLang;
        detectionMethod = 'saved';
      }

      setDetectedLanguage({
        code: detectedLang,
        method: detectionMethod,
        timestamp: new Date().toISOString()
      });

      // Only auto-set if not manually changed before
      if (!localStorage.getItem('language-manually-changed')) {
        setSelectedLanguage(detectedLang);
        setIsAutoDetected(detectionMethod !== 'saved');
      }

    } catch (error) {
      console.error('Language detection failed:', error);
      setDetectedLanguage({
        code: 'en',
        method: 'error',
        error: error.message
      });
    }
  };

  const changeLanguage = (langCode) => {
    if (languages.find(lang => lang.code === langCode)) {
      setSelectedLanguage(langCode);
      localStorage.setItem('preferred-language', langCode);
      localStorage.setItem('language-manually-changed', 'true');
      setIsAutoDetected(false);
      
      // Here you would typically trigger i18n language change
      console.log('Language changed to:', langCode);
      
      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: langCode } 
      }));
    }
  };

  const resetToAutoDetect = () => {
    localStorage.removeItem('language-manually-changed');
    localStorage.removeItem('preferred-language');
    detectLanguage();
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  const getAvailableLanguages = () => {
    return languages;
  };

  const getLanguageByCountry = (countryCode) => {
    return languages.find(lang => 
      lang.countries.includes(countryCode.toUpperCase())
    );
  };

  return {
    selectedLanguage,
    detectedLanguage,
    isAutoDetected,
    currentLanguage: getCurrentLanguage(),
    availableLanguages: getAvailableLanguages(),
    changeLanguage,
    resetToAutoDetect,
    getLanguageByCountry,
    detectLanguage
  };
}

