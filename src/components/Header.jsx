import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import rcLogo from '../assets/RC-Logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={rcLogo} 
              alt="Rent Control Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-xl font-bold">Rent Control</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t('nav.signIn')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                {t('nav.getStarted')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                {t('nav.pricing')}
              </button>
              <Link to="/about" className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/blog" className="block px-3 py-2 text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
              <div className="flex items-center space-x-2 px-3 py-2">
                <LanguageSelector />
              </div>
              <div className="px-3 py-2 space-y-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="w-full">
                    {t('nav.signIn')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="w-full">
                    {t('nav.getStarted')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

