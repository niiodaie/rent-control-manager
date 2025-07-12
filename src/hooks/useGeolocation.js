import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple IP geolocation services for reliability
      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://ipinfo.io/json'
      ];

      let locationData = null;

      for (const service of services) {
        try {
          const response = await fetch(service);
          const data = await response.json();
          
          // Normalize data from different services
          if (service.includes('ipapi.co')) {
            locationData = {
              country: data.country_name,
              countryCode: data.country_code,
              city: data.city,
              region: data.region,
              timezone: data.timezone,
              currency: data.currency,
              latitude: data.latitude,
              longitude: data.longitude,
              ip: data.ip
            };
          } else if (service.includes('ip-api.com')) {
            locationData = {
              country: data.country,
              countryCode: data.countryCode,
              city: data.city,
              region: data.regionName,
              timezone: data.timezone,
              currency: data.currency,
              latitude: data.lat,
              longitude: data.lon,
              ip: data.query
            };
          } else if (service.includes('ipinfo.io')) {
            const [lat, lon] = (data.loc || '0,0').split(',');
            locationData = {
              country: data.country,
              countryCode: data.country,
              city: data.city,
              region: data.region,
              timezone: data.timezone,
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
              ip: data.ip
            };
          }

          if (locationData && locationData.country) {
            break; // Successfully got location data
          }
        } catch (serviceError) {
          console.log(`Failed to get location from ${service}:`, serviceError);
          continue; // Try next service
        }
      }

      if (locationData) {
        setLocation(locationData);
      } else {
        throw new Error('All geolocation services failed');
      }
    } catch (err) {
      console.error('Geolocation detection failed:', err);
      setError(err.message);
      
      // Fallback to browser language detection
      try {
        const browserLang = navigator.language || navigator.languages[0];
        const langCode = browserLang.split('-')[0];
        const regionCode = browserLang.split('-')[1];
        
        setLocation({
          country: 'Unknown',
          countryCode: regionCode || 'US',
          city: 'Unknown',
          region: 'Unknown',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: langCode,
          ip: 'Unknown'
        });
      } catch (fallbackError) {
        console.error('Fallback detection failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshLocation = () => {
    detectLocation();
  };

  return {
    location,
    loading,
    error,
    refreshLocation
  };
}

