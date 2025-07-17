import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';

const PropertyForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    description: initialData?.description || '',
    units: initialData?.units || 1,
    rentAmount: initialData?.rentAmount || '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (formData.units < 1) newErrors.units = 'Must have at least 1 unit';
    if (!formData.rentAmount || formData.rentAmount <= 0) {
      newErrors.rentAmount = 'Rent amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Property Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1"
            placeholder="e.g., Sunset Apartments"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Street Address *
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="mt-1"
            placeholder="123 Main Street"
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <Input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <Input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code *
          </label>
          <Input
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
        </div>

        <div>
          <label htmlFor="units" className="block text-sm font-medium text-gray-700">
            Number of Units *
          </label>
          <Input
            id="units"
            name="units"
            type="number"
            min="1"
            value={formData.units}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.units && <p className="mt-1 text-sm text-red-600">{errors.units}</p>}
        </div>

        <div>
          <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
            Monthly Rent Amount *
          </label>
          <Input
            id="rentAmount"
            name="rentAmount"
            type="number"
            min="0"
            step="0.01"
            value={formData.rentAmount}
            onChange={handleChange}
            className="mt-1"
            placeholder="1200.00"
          />
          {errors.rentAmount && <p className="mt-1 text-sm text-red-600">{errors.rentAmount}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Optional description of the property..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Saving...' : initialData ? 'Update Property' : 'Create Property'}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;

