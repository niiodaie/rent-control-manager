import React, { useState } from 'react';
import { X, Mail, User, Home, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

export function InviteTenantModal({ isOpen, onClose, properties = [] }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    propertyId: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just show success
      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError('Failed to send invitation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSuccess(false);
    setError('');
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      propertyId: '',
      message: ''
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {step === 1 && 'Invite New Tenant'}
            {step === 2 && 'Review Invitation'}
            {step === 3 && 'Invitation Sent!'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium mb-1">
                  Assign to Property
                </label>
                <select
                  id="propertyId"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a property</option>
                  <option value="1">Sunset Apartments - Unit 101</option>
                  <option value="2">Downtown Loft - Unit 5B</option>
                  <option value="3">Garden View Complex - Unit 12A</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Personal Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Welcome to your new home! I'm excited to have you as a tenant..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Review Invitation
                </Button>
              </div>
            </form>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span>{formData.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-gray-600" />
                  <span>
                    {formData.propertyId === '1' && 'Sunset Apartments - Unit 101'}
                    {formData.propertyId === '2' && 'Downtown Loft - Unit 5B'}
                    {formData.propertyId === '3' && 'Garden View Complex - Unit 12A'}
                  </span>
                </div>
              </div>

              {formData.message && (
                <div>
                  <h4 className="font-medium mb-2">Personal Message:</h4>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-sm">
                    {formData.message}
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Tenant will receive an email invitation</li>
                  <li>• They can create their account and access their portal</li>
                  <li>• You'll be notified when they accept the invitation</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Invitation
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && success && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Invitation Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  {formData.firstName} {formData.lastName} will receive an email invitation at{' '}
                  <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-green-800 mb-2">Next Steps:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• The tenant will receive the invitation within a few minutes</li>
                  <li>• They can sign up and access their tenant portal</li>
                  <li>• You'll see them in your tenant list once they accept</li>
                  <li>• You can resend the invitation if needed</li>
                </ul>
              </div>

              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InviteTenantModal;

