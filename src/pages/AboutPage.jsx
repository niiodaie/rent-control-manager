import React from 'react';
import { t, getCurrentLanguage } from '../i18n/simple';
import { Building2, Users, Globe, Shield, Award, Heart } from 'lucide-react';

export function AboutPage() {
  const [currentLang, setCurrentLang] = React.useState('en');

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('about.title', currentLang)}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('about.subtitle', currentLang)}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                {t('about.mission.title', currentLang)}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('about.mission.description', currentLang)}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span>{t('about.mission.global', currentLang)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span>{t('about.mission.secure', currentLang)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>{t('about.mission.simple', currentLang)}</span>
                </div>
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-8">
              <Building2 className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                {t('about.stats.title', currentLang)}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">
                    {t('about.stats.properties', currentLang)}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">
                    {t('about.stats.countries', currentLang)}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">25,000+</div>
                  <div className="text-sm text-muted-foreground">
                    {t('about.stats.users', currentLang)}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">
                    {t('about.stats.uptime', currentLang)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('about.values.title', currentLang)}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.values.subtitle', currentLang)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {t('about.values.global.title', currentLang)}
              </h3>
              <p className="text-muted-foreground">
                {t('about.values.global.description', currentLang)}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {t('about.values.security.title', currentLang)}
              </h3>
              <p className="text-muted-foreground">
                {t('about.values.security.description', currentLang)}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {t('about.values.community.title', currentLang)}
              </h3>
              <p className="text-muted-foreground">
                {t('about.values.community.description', currentLang)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('about.team.title', currentLang)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('about.team.description', currentLang)}
          </p>
          
          <div className="bg-primary/10 rounded-lg p-8">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">
              {t('about.team.commitment.title', currentLang)}
            </h3>
            <p className="text-muted-foreground">
              {t('about.team.commitment.description', currentLang)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t('about.contact.title', currentLang)}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('about.contact.description', currentLang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('about.contact.button', currentLang)}
            </a>
            <a
              href="/signup"
              className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('about.contact.trial', currentLang)}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

