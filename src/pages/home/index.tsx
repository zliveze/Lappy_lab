import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import LappyHacking from '@/components/home/LappyHacking';
import IDGeneration from '@/components/home/IDGeneration';
import TutoringSection from '@/components/home/TutoringSection';

export default function Home() {
  useEffect(() => {
    // Initialize any client-side scripts here
    const initializeApp = () => {
      // Add any initialization code here
    };

    initializeApp();
  }, []);

  return (
    <>
      <Head>
        <title>Lappy Lab</title>
        <link rel="icon" type="image/jpg" href="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg" />
        <link rel="apple-touch-icon" href="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />

        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <LappyHacking />
          <IDGeneration />
          <TutoringSection />
          
          {/* Instructions Section */}
          <div className="bg-white rounded-xl p-6 mt-8 mb-12 mx-auto shadow-lg max-w-7xl w-[95%] animate-fadeInUp">
            {/* Add Instructions content */}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
