import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  canonical 
}) => {
  const location = useLocation();
  const baseUrl = 'https://rentcontrol.net';
  
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }
    
    // Update meta description
    if (description) {
      updateMetaTag('name', 'description', description);
      updateMetaTag('property', 'og:description', description);
      updateMetaTag('property', 'twitter:description', description);
    }
    
    // Update keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }
    
    // Update Open Graph title
    if (title) {
      updateMetaTag('property', 'og:title', title);
      updateMetaTag('property', 'twitter:title', title);
    }
    
    // Update Open Graph image
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('property', 'twitter:image', ogImage);
    }
    
    // Update Open Graph type
    updateMetaTag('property', 'og:type', ogType);
    
    // Update Open Graph URL
    const currentUrl = `${baseUrl}${location.pathname}`;
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'twitter:url', currentUrl);
    
    // Update canonical URL
    updateCanonicalLink(canonical || currentUrl);
    
  }, [title, description, keywords, ogImage, ogType, canonical, location.pathname]);

  const updateMetaTag = (attribute, value, content) => {
    let element = document.querySelector(`meta[${attribute}="${value}"]`);
    
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    }
  };

  const updateCanonicalLink = (url) => {
    let element = document.querySelector('link[rel="canonical"]');
    
    if (element) {
      element.setAttribute('href', url);
    } else {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', url);
      document.head.appendChild(element);
    }
  };

  return null; // This component doesn't render anything
};

export default SEOHead;

