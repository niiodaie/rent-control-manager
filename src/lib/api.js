// API helper functions for Rent Control platform

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.rentcontrol.visnec.ai';

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Check if a subdomain is available
export const checkSubdomainAvailability = async (subdomain) => {
  try {
    // Validate subdomain format
    if (!subdomain || subdomain.length < 3) {
      return false;
    }
    
    // Check for invalid characters
    const validSubdomain = /^[a-z0-9-]+$/.test(subdomain.toLowerCase());
    if (!validSubdomain) {
      return false;
    }
    
    // Reserved subdomains
    const reservedSubdomains = [
      'www', 'api', 'admin', 'app', 'mail', 'ftp', 'blog', 'shop', 'store',
      'support', 'help', 'docs', 'dev', 'test', 'staging', 'demo', 'beta',
      'alpha', 'cdn', 'static', 'assets', 'media', 'images', 'files',
      'dashboard', 'portal', 'login', 'signup', 'register', 'auth',
      'secure', 'ssl', 'vpn', 'proxy', 'gateway', 'router', 'switch',
      'server', 'host', 'domain', 'subdomain', 'dns', 'mx', 'ns',
      'cname', 'txt', 'srv', 'ptr', 'soa', 'aaaa', 'a', 'root'
    ];
    
    if (reservedSubdomains.includes(subdomain.toLowerCase())) {
      return false;
    }
    
    // Make API request to check availability
    const data = await apiRequest(`/api/check-subdomain?subdomain=${encodeURIComponent(subdomain)}`);
    return data.available;
  } catch (error) {
    console.error('Error checking subdomain availability:', error);
    // Return false on error to be safe
    return false;
  }
};

// Save onboarding data
export const saveOnboardingData = async (onboardingData) => {
  try {
    const data = await apiRequest('/api/onboarding', {
      method: 'POST',
      body: JSON.stringify(onboardingData),
    });
    return data;
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

// Upload branding assets
export const uploadBrandingAsset = async (file, type = 'logo') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const data = await apiRequest('/api/upload-branding', {
      method: 'POST',
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    });
    return data;
  } catch (error) {
    console.error('Error uploading branding asset:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const data = await apiRequest('/api/user/profile');
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const data = await apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Create property
export const createProperty = async (propertyData) => {
  try {
    const data = await apiRequest('/api/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
    return data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

// Get properties
export const getProperties = async () => {
  try {
    const data = await apiRequest('/api/properties');
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// Mock function for development (when backend is not available)
export const mockCheckSubdomainAvailability = async (subdomain) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock some taken subdomains
  const takenSubdomains = ['test', 'demo', 'admin', 'api', 'www', 'app', 'mail'];
  return !takenSubdomains.includes(subdomain.toLowerCase());
};

// Use mock function in development
export const checkSubdomainAvailabilityDev = process.env.NODE_ENV === 'development' 
  ? mockCheckSubdomainAvailability 
  : checkSubdomainAvailability;

