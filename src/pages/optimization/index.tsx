import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import HeroSection from '@/components/optimization/HeroSection';
import RulesSection from '@/components/optimization/RulesSection';
import RuleGenerator from '@/components/optimization/RuleGenerator';

export default function OptimizationGuide() {
  return (
    <>
      <Head>
        <title>Tối Ưu Hóa IDE - Lappy Lab</title>
        <meta name="description" content="Hướng dẫn tối ưu hóa IDE với .cursorrules và .windsurfrules" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <RuleGenerator />
          <HeroSection />
          <RulesSection />
        </main>
        <Footer />
      </div>
    </>
  );
} 