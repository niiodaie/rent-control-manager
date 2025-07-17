import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';

export function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
}


export default HomePage;
