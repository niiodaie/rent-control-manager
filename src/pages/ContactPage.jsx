import React, { useState } from 'react';
import { t, getCurrentLanguage } from '../i18n/simple';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    const updateLanguage = () => {
      setCurrentLang(getCurrentLanguage());
    };
    
    updateLanguage();
    
    const handleStorageChange = (e) => {
      if (e.key === 'preferred-language') {
        updateLanguage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('contact.title', currentLang)}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('contact.subtitle', currentLang)}
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                {t('contact.info.title', currentLang)}
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t('contact.info.email.title', currentLang)}
                    </h3>
                    <p className="text-muted-foreground">support@rentcontrol.net</p>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.info.email.description', currentLang)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t('contact.info.phone.title', currentLang)}
                    </h3>
                    <p className="text-muted-foreground">+1 (920) 123-4567</p>
                    <p className="text-sm text-muted-foreground">
                      {t('contact.info.phone.description', currentLang)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t('contact.info.address.title', currentLang)}
                    </h3>
                    <p className="text-muted-foreground">
                      Appleton, WI<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">
                      {t('contact.info.hours.title', currentLang)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.info.hours.weekdays', currentLang)}<br />
                      {t('contact.info.hours.weekend', currentLang)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Support Options */}
              <div className="mt-12 p-6 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-4">
                  {t('contact.support.title', currentLang)}
                </h3>
                <div className="space-y-3">
                  <a 
                    href="/blog" 
                    className="block text-primary hover:underline"
                  >
                    📚 {t('contact.support.help', currentLang)}
                  </a>
                  <a 
                    href="/faq" 
                    className="block text-primary hover:underline"
                  >
                    ❓ {t('contact.support.faq', currentLang)}
                  </a>
                  <a 
                    href="mailto:support@rentcontrol.net" 
                    className="block text-primary hover:underline"
                  >
                    💬 {t('contact.support.email', currentLang)}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">
                  {t('contact.form.title', currentLang)}
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {t('contact.form.success.title', currentLang)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.form.success.message', currentLang)}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('contact.form.name', currentLang)}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('contact.form.email', currentLang)}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.form.subject', currentLang)}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        disabled={isSubmitting}
                      >
                        <option value="">
                          {t('contact.form.subject.placeholder', currentLang)}
                        </option>
                        <option value="general">
                          {t('contact.form.subject.general', currentLang)}
                        </option>
                        <option value="support">
                          {t('contact.form.subject.support', currentLang)}
                        </option>
                        <option value="billing">
                          {t('contact.form.subject.billing', currentLang)}
                        </option>
                        <option value="feature">
                          {t('contact.form.subject.feature', currentLang)}
                        </option>
                        <option value="partnership">
                          {t('contact.form.subject.partnership', currentLang)}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.form.message', currentLang)}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder={t('contact.form.message.placeholder', currentLang)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>{t('contact.form.sending', currentLang)}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>{t('contact.form.send', currentLang)}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;

