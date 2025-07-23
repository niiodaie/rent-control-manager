import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How do I get started with Rent Control?",
    answer: "Getting started is easy! Simply sign up for a free account, add your first property, and start managing your rentals. Our onboarding process will guide you through the setup."
  },
  {
    question: "Is there a free plan available?",
    answer: "Yes! We offer a free Starter plan that allows you to manage up to 1 property with basic features including tenant management, rent collection, and email support."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, bank transfers, and support over 150 currencies worldwide. Payment processing is secure and PCI-compliant."
  },
  {
    question: "Can I manage properties in different countries?",
    answer: "Absolutely! Rent Control is designed for global property management. We support multiple currencies, languages, and local compliance requirements."
  },
  {
    question: "How secure is my data?",
    answer: "We use enterprise-grade security with 256-bit SSL encryption, regular security audits, and GDPR compliance. Your data is stored securely and backed up regularly."
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide 24/7 global support via email and phone. Premium plans include priority support and dedicated account managers."
  },
  {
    question: "Can tenants access the platform?",
    answer: "Yes! Tenants get their own portal where they can view lease information, pay rent online, submit maintenance requests, and access community features."
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits and help you upgrade to a suitable plan. There are no surprise charges or service interruptions."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your data remains accessible during the billing period."
  },
  {
    question: "Do you offer integrations with other software?",
    answer: "Yes! We integrate with over 500 third-party services including accounting software, payment processors, and property listing platforms via our API."
  }
];

export function FAQPage() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Rent Control
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg shadow-sm">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-medium pr-4">{faq.question}</h3>
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                {openItems.has(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@rentcontrol.net" 
                className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default FAQPage
