import MainLayout from '@/components/layout/MainLayout';
import SEO from '@/components/layout/SEO';
import HeroSection from '@/components/home/HeroSection';
import LappyHacking from '@/components/home/LappyHacking';
import IDGeneration from '@/components/home/IDGeneration';
import TutoringSection from '@/components/home/TutoringSection';
import EmailGen from '@/components/home/emailgen';

export default function Home() {
  return (
    <MainLayout>
      <SEO />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <LappyHacking />
      
      <div className="mt-12 mb-12 mx-auto max-w-7xl w-[95%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EmailGen />
          <IDGeneration />
        </div>
      </div>
      
      <TutoringSection />
    </MainLayout>
  );
}