import type { Metadata } from 'next';
import HeroSlider from './components/sections/HeroSlider';
import TrustBanner from './components/sections/TrustBanner';
import AboutPreview from './components/sections/AboutPreview';
import ServicesSection from './components/sections/ServicesSection';
import ProjectsShowcase from './components/sections/ProjectsShowcase';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CTASection from './components/sections/CTASection';
import AreasSection from './components/sections/AreasSection';

export const metadata: Metadata = {
  title: 'Norm Painting | Professional Painters Geelong & Melbourne',
  description:
    'Norm Painting delivers premium interior, exterior, and commercial painting services across Geelong and Melbourne. Free quotes, 7-year warranty.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <TrustBanner />
      <AboutPreview />
      <ServicesSection />
      <ProjectsShowcase />
      <TestimonialsSection />
      <CTASection />
      <AreasSection />
    </main>
  );
}
