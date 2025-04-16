import MainLayout from '@/components/layout/MainLayout';
import SEO from '@/components/layout/SEO';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import HeroSection from '@/components/home/HeroSection';
import LappyHacking from '@/components/home/LappyHacking';
import EmailGenerator from '@/components/home/EmailGenerator';
import IDGeneration from '@/components/home/IDGeneration';
import TutoringSection from '@/components/home/TutoringSection';

export default function Home() {
  return (
    <MainLayout>
      <SEO />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <ErrorBoundary fallbackMessage="Không thể tải phần giới thiệu Lappy Hacking.">
        <LappyHacking />
      </ErrorBoundary>
      
      <div className="mt-12 mb-12 mx-auto max-w-7xl w-[95%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ErrorBoundary fallbackMessage="Công cụ tạo Email biến thể gặp lỗi.">
            <EmailGenerator />
          </ErrorBoundary>
          <ErrorBoundary fallbackMessage="Công cụ tạo ID gặp lỗi.">
            <IDGeneration />
          </ErrorBoundary>
        </div>
      </div>
      
      <ErrorBoundary fallbackMessage="Không thể tải phần hướng dẫn.">
        <TutoringSection />
      </ErrorBoundary>
    </MainLayout>
  );
}