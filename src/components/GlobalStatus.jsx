import React from 'react';
import { Badge } from './ui/badge';
import { Globe, MapPin, Languages, Wifi, WifiOff } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLanguage } from '../hooks/useLanguage';

export function GlobalStatus() {
  const { location, loading: locationLoading, error: locationError } = useGeolocation();
  const { currentLanguage, isAutoDetected, detectedLanguage } = useLanguage(location);

  if (locationLoading) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="secondary" className="flex items-center space-x-2 p-3">
          <Globe className="h-4 w-4 animate-spin" />
          <span>Detecting your location...</span>
        </Badge>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="destructive" className="flex items-center space-x-2 p-3">
          <WifiOff className="h-4 w-4" />
          <span>Location detection failed</span>
        </Badge>
      </div>
    );
  }

  if (location && isAutoDetected) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Badge variant="secondary" className="flex items-center space-x-2 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{location.city}, {location.country}</span>
          </div>
          <div className="w-px h-4 bg-green-300"></div>
          <div className="flex items-center space-x-1">
            <Languages className="h-4 w-4" />
            <span>{currentLanguage?.flag} {currentLanguage?.name}</span>
          </div>
          <Wifi className="h-4 w-4 text-green-600" />
        </Badge>
      </div>
    );
  }

  return null;
}

