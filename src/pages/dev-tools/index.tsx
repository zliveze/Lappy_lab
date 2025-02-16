import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import HeroSection from '@/components/dev-tools/HeroSection';
import ToolCard from '@/components/dev-tools/ToolCard';
import ExtensionCard from '@/components/dev-tools/ExtensionCard';
import { tools } from '@/components/dev-tools/ToolsData';
import { extensions } from '@/components/dev-tools/ExtensionsData';

export default function DevTools() {
  return (
    <>
      <Head>
        <title>Công Cụ Lập Trình - Lappy Lab</title>
        <meta name="description" content="Các công cụ lập trình tốt nhất được hỗ trợ bởi AI" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />
          
          {/* Tools Section */}
          <section className="py-10 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-4">
                AI-Powered IDEs
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
                Discover powerful standalone IDEs with integrated AI capabilities
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          </section>

          {/* Separator */}
          <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-900">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                             transform -rotate-3 origin-top-left scale-110 opacity-10" />
            </div>
            {/* VS Code Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                           w-16 h-16 bg-[#007ACC] rounded-xl shadow-lg
                           flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75.7 50L75.7 50.1L25.3 75.7L12 69.3V30.7L25.3 24.3L75.7 49.9L88 56.3L75.7 62.7L25.3 88.3L12 81.9V43.3L25.3 36.9L75.7 62.5L88 68.9L75.7 75.3L25.3 100.9L12 94.5V55.9L25.3 49.5L75.7 75.1L88 81.5L75.7 87.9L25.3 113.5L12 107.1V68.5L25.3 62.1L75.7 87.7" 
                      fill="#fff"/>
              </svg>
            </div>
          </div>

          {/* Extensions Section */}
          <section className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-white mb-4">
                VS Code Extensions
              </h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
                Enhance your VS Code with powerful AI-powered extensions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {extensions.map((extension) => (
                  <ExtensionCard key={extension.name} extension={extension} />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
} 