import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalStatus } from './components/GlobalStatus';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import './App.css';

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function AppContent() {
  const { ready } = useTranslation();

  // Show loading spinner while i18n is initializing
  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          {/* Auth pages without header/footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Main pages with header/footer */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                </Routes>
              </main>
              <Footer />
              <GlobalStatus />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <AppContent />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

