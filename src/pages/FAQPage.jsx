import React, { useState } from 'react';
import { t, getCurrentLanguage } from '../i18n/simple';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export function FAQPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

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

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I get started with Rent Control Manager?',
          answer: 'Getting started is easy! Simply sign up for a free account, add your first property, and invite your tenants. Our setup wizard will guide you through each step.'
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required to start.'
        },
        {
          question: 'How long does it take to set up my properties?',
          answer: 'Most property managers can add their first property in under 5 minutes. Our intuitive interface makes it quick and easy.'
        }
      ]
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          question: 'What are your pricing plans?',
          answer: 'We offer four plans: Free (with ads, 1 unit max), Starter ($49.99/month for up to 5 units), Professional ($129.99/month for up to 15 units), and Enterprise (custom pricing for unlimited units).'
        },
        {
          question: 'Can I change my plan anytime?',
          answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
        },
        {
          question: 'Are there any setup fees?',
          answer: 'No setup fees, ever. You only pay for your monthly subscription, and you can cancel anytime.'
        }
      ]
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          question: 'Can I manage properties in multiple countries?',
          answer: 'Yes! Rent Control Manager supports global property management with multi-currency support, local compliance features, and region-specific payment methods.'
        },
        {
          question: 'How does the tenant portal work?',
          answer: 'Tenants receive an invitation email to create their account. They can then pay rent, submit maintenance requests, view lease documents, and communicate with you through their portal.'
        },
        {
          question: 'Is there a mobile app?',
          answer: 'Yes! We have mobile-optimized web apps for both iOS and Android. You can manage your properties on the go with full functionality.'
        },
        {
          question: 'How secure is my data?',
          answer: 'We use bank-level security with 256-bit SSL encryption, regular security audits, and GDPR compliance. Your data is backed up daily and stored securely.'
        }
      ]
    },
    {
      category: 'Payment & Billing',
      questions: [
        {
          question: 'How do tenants pay rent?',
          answer: 'Tenants can pay rent online through their portal using bank transfers, credit cards, or local payment methods. Payments are processed securely and you receive instant notifications.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, bank transfers, and local payment methods in 150+ countries. Payment processing fees vary by region.'
        },
        {
          question: 'When do I get paid?',
          answer: 'Rent payments are typically deposited into your account within 1-3 business days, depending on your location and payment method.'
        }
      ]
    },
    {
      category: 'Support & Help',
      questions: [
        {
          question: 'What support options are available?',
          answer: 'We offer email support for all plans, priority support for Professional plans, and 24/7 phone support for Enterprise customers. We also have a comprehensive help center.'
        },
        {
          question: 'How can I contact support?',
          answer: 'You can reach us at support@rentcontrol.net, call +1 (920) 123-4567, or use the chat widget in your dashboard. Our team is here to help!'
        },
        {
          question: 'Do you offer training or onboarding?',
          answer: 'Yes! We provide free onboarding for all new customers, video tutorials, and custom training sessions for Enterprise clients.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('faq.title', currentLang)}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('faq.subtitle', currentLang)}
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('faq.search.placeholder', currentLang)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                {t('faq.search.no_results', currentLang)}
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-primary hover:underline"
              >
                {t('faq.search.clear', currentLang)}
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold mb-6 text-primary">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex; // Unique index
                      const isOpen = openItems.has(globalIndex);
                      
                      return (
                        <div
                          key={globalIndex}
                          className="border border-border rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-medium pr-4">
                              {item.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-muted-foreground leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('faq.contact.title', currentLang)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('faq.contact.description', currentLang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('faq.contact.button', currentLang)}
            </a>
            <a
              href="mailto:support@rentcontrol.net"
              className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('faq.contact.email', currentLang)}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;

