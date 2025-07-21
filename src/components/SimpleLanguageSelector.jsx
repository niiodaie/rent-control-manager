import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

// Simple, bulletproof language selector with no external dependencies
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
];

// Create Language Context
export const LanguageContext = React.createContext({
  currentLang: 'en',
  setCurrentLang: () => {}
});

// Language Provider Component
export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = React.useState('en');

  // Initialize language from localStorage
  React.useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('preferred-language');
        if (stored && languages.find(lang => lang.code === stored)) {
          setCurrentLang(stored);
        }
      }
    } catch (error) {
      console.warn('Could not load language preference:', error);
    }
  }, []);

  const value = {
    currentLang,
    setCurrentLang
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function SimpleLanguageSelector() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentLang, setCurrentLang } = React.useContext(LanguageContext);

  // Simple language change handler with no external dependencies
  const handleLanguageChange = (langCode) => {
    try {
      setCurrentLang(langCode);
      setIsOpen(false);
      
      // Store preference in localStorage (safe fallback)
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('preferred-language', langCode);
      }
      
      // Trigger storage event for other components
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'preferred-language',
        newValue: langCode
      }));
      
    } catch (error) {
      console.warn('Language change failed, but continuing safely:', error);
      setIsOpen(false);
    }
  };

  // Get current language safely
  const getCurrentLanguage = () => {
    try {
      return languages.find(lang => lang.code === currentLang) || languages[0];
    } catch (error) {
      return languages[0]; // Always fallback to English
    }
  };

  const current = getCurrentLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-md transition-colors"
        type="button"
      >
        <span className="text-lg">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
          <div className="p-2 border-b">
            <div className="text-xs text-muted-foreground">
              Select Language
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm hover:bg-muted transition-colors ${
                  currentLang === language.code ? 'bg-muted text-primary' : ''
                }`}
                type="button"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                <span className="text-xs text-muted-foreground">{language.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleLanguageSelector;

