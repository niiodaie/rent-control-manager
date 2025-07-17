// API service configuration for Rent Control platform
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.rent-control.net';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Payment endpoints
  async createSubscriptionSession(planData) {
    return this.request('/api/payments/create-subscription-session', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  async getSubscriptionStatus(subscriptionId) {
    return this.request(`/api/payments/subscription/${subscriptionId}`);
  }

  async cancelSubscription(subscriptionId) {
    return this.request(`/api/payments/subscription/${subscriptionId}/cancel`, {
      method: 'POST',
    });
  }

  // User authentication endpoints
  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Property management endpoints
  async getProperties() {
    return this.request('/api/properties');
  }

  async createProperty(propertyData) {
    return this.request('/api/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(propertyId, propertyData) {
    return this.request(`/api/properties/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(propertyId) {
    return this.request(`/api/properties/${propertyId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService;

