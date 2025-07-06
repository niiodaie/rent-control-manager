import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { getLanguageConfig, getSupportedLanguages } from '../i18n';

const LanguageSelector = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const supportedLanguages = getSupportedLanguages();
  const currentLang = i18n.language;
  const currentConfig = getLanguageConfig(currentLang);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('rent-control-language', langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-background border border-input hover:bg-accent transition-colors"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {currentConfig.flag} {currentConfig.name}
        </span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-md shadow-lg z-20">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                Select Language
              </div>
              {supportedLanguages.map((langCode) => {
                const config = getLanguageConfig(langCode);
                const isActive = langCode === currentLang;
                
                return (
                  <button
                    key={langCode}
                    onClick={() => handleLanguageChange(langCode)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent text-foreground'
                    }`}
                  >
                    <span className="text-lg">{config.flag}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{config.name}</div>
                      <div className={`text-xs ${
                        isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {config.countries.slice(0, 3).join(', ')}
                        {config.countries.length > 3 && ` +${config.countries.length - 3}`}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border p-2">
              <div className="text-xs text-muted-foreground px-2">
                Language auto-detected based on your location
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;

