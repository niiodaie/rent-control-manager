import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe, MapPin, CheckCircle } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLanguage } from '../hooks/useLanguage';

export function LanguageSelector() {
  const { location, loading: locationLoading } = useGeolocation();
  const { 
    selectedLanguage, 
    currentLanguage, 
    availableLanguages, 
    changeLanguage, 
    isAutoDetected,
    detectedLanguage
  } = useLanguage(location);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-auto min-w-[120px] borderless">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{currentLanguage?.flag}</span>
              <span className="hidden sm:inline">{currentLanguage?.name}</span>
              <span className="sm:hidden">{currentLanguage?.code.toUpperCase()}</span>
              {isAutoDetected && (
                <CheckCircle className="h-3 w-3 text-green-500" />
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {detectedLanguage?.code === lang.code && (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {location && !locationLoading && (
        <div className="hidden lg:flex items-center space-x-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{location.city}, {location.country}</span>
        </div>
      )}
      
      {isAutoDetected && (
        <div className="hidden sm:flex items-center space-x-1 text-xs text-green-600">
          <Globe className="h-3 w-3" />
          <span>Auto-detected</span>
        </div>
      )}
      
      {locationLoading && (
        <div className="hidden sm:flex items-center space-x-1 text-xs text-muted-foreground">
          <Globe className="h-3 w-3 animate-spin" />
          <span>Detecting...</span>
        </div>
      )}
    </div>
  );
}

