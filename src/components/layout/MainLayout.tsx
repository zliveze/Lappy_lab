import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
} 