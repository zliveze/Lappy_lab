import Footer from '@/components/home/Footer';
import HeroSection from '@/components/optimization/HeroSection';
import RulesSection from '@/components/optimization/RulesSection';
import MainLayout from '@/components/layout/MainLayout';
import SEO from '@/components/layout/SEO';

export default function Optimization() {
  return (
    <MainLayout>
      <SEO 
        title="Tối Ưu Hóa - Optimization Tools"
        description="Công cụ tối ưu hóa và tạo rules cho Cursor IDE. Tăng hiệu suất làm việc với các template và quy tắc được cá nhân hóa."
        keywords="optimization tools, tối ưu hóa, cursor ide rules, template generator, productivity tools, development optimization"
      />
      <HeroSection />
      <RulesSection />
      <Footer />
    </MainLayout>
  );
} 