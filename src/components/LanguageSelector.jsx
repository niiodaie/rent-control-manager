import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLanguage } from '../hooks/useLanguage';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const { location } = useGeolocation();
  const { detectedLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isChanging, setIsChanging] = React.useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = async (languageCode) => {
    try {
      setIsChanging(true);
      setIsOpen(false);
      
      // Add a small delay to prevent UI flash
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Change language with error handling
      await i18n.changeLanguage(languageCode);
      
      // Store the language preference
      localStorage.setItem('i18nextLng', languageCode);
      
    } catch (error) {
      console.error('Language change failed:', error);
      // Fallback to English if language change fails
      try {
        await i18n.changeLanguage('en');
      } catch (fallbackError) {
        console.error('Fallback to English failed:', fallbackError);
        // Force page reload as last resort
        window.location.reload();
      }
    } finally {
      setIsChanging(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative language-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors disabled:opacity-50"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border rounded-md shadow-lg z-50">
          <div className="p-3 border-b">
            <div className="text-xs text-muted-foreground mb-1">
              Language auto-detected based on your location
            </div>
            {location && (
              <div className="text-xs text-primary">
                📍 {location.city}, {location.country}
              </div>
            )}
            {detectedLanguage && (
              <div className="text-xs text-muted-foreground">
                Detected: {languages.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
              </div>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isChanging}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-colors disabled:opacity-50 ${
                  i18n.language === language.code ? 'bg-muted text-primary' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
                {isChanging && i18n.language === language.code && (
                  <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

