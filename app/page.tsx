import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSlider from './components/sections/HeroSlider';
import TrustBanner from './components/sections/TrustBanner';
import AboutPreview from './components/sections/AboutPreview';
import CTASection from './components/sections/CTASection';
import AreasSection from './components/sections/AreasSection';

// Split heavy animated sections into separate JS chunks loaded after first paint
const ServicesSection    = dynamic(() => import('./components/sections/ServicesSection'));
const ProjectsShowcase   = dynamic(() => import('./components/sections/ProjectsShowcase'));
// ssr:false — defers API fetch + framer-motion carousel until after hydration
const TestimonialsSection = dynamic(() => import('./components/sections/TestimonialsSection'), { ssr: false });

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
