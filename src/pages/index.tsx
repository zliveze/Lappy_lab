import MainLayout from '@/components/layout/MainLayout';
import SEO from '@/components/layout/SEO';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LappyHacking from '@/components/home/LappyHacking';
import IDGeneration from '@/components/home/IDGeneration';
import TutoringSection from '@/components/home/TutoringSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <MainLayout>
      <SEO />
      <HeroSection />
      <FeaturesSection />
      <LappyHacking />
      <IDGeneration />
      <TutoringSection />
      <Footer />
    </MainLayout>
  );
}