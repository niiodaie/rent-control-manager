import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SimpleLanguageSelector from './SimpleLanguageSelector';
import { t, getCurrentLanguage } from '../i18n/simple';

export function Header() {
  const [isDark, setIsDark] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [currentLang, setCurrentLang] = React.useState('en');

  // Update language when it changes
  React.useEffect(() => {
    const updateLanguage = () => {
      setCurrentLang(getCurrentLanguage());
    };
    
    updateLanguage();
    
    // Listen for language changes
    const handleStorageChange = (e) => {
      if (e.key === 'preferred-language') {
        updateLanguage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">RC</span>
          </div>
          <span className="font-bold text-xl">Rent Control</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {t('nav.home', currentLang)}
          </Link>
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t('nav.features', currentLang)}
          </button>
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            {t('nav.pricing', currentLang)}
          </button>
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/about') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {t('nav.about', currentLang)}
          </Link>
          <Link
            to="/contact"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/contact') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {t('nav.contact', currentLang)}
          </Link>
          <Link
            to="/faq"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/faq') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {t('nav.faq', currentLang)}
          </Link>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Language Selector - Simple and bulletproof */}
          <SimpleLanguageSelector />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Auth Buttons */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t('nav.signin', currentLang)}
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {t('nav.getstarted', currentLang)}
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <Link
              to="/"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home', currentLang)}
            </Link>
            <button className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-left">
              {t('nav.features', currentLang)}
            </button>
            <button className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors text-left">
              {t('nav.pricing', currentLang)}
            </button>
            <Link
              to="/about"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about', currentLang)}
            </Link>
            <Link
              to="/contact"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact', currentLang)}
            </Link>
            <Link
              to="/faq"
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.faq', currentLang)}
            </Link>
            
            {!user && (
              <div className="pt-4 border-t space-y-2">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.signin', currentLang)}
                </Link>
                <Link
                  to="/signup"
                  className="block bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.getstarted', currentLang)}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

