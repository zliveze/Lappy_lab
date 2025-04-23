import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20 sm:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
               backgroundSize: '30px 30px'
             }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Cursor ID Generator</span>
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tối ưu hóa trải nghiệm
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Công cụ chuyên nghiệp giúp quản lý và tối ưu hóa ID cho Cursor IDE. 
            Hỗ trợ đầy đủ các tính năng như tạo ID mới, reset dữ liệu và chặn cập nhật.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#features"
               className="px-8 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 
                        text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 
                        hover:-translate-y-0.5">
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Khám phá ngay
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
