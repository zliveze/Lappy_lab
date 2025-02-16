export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            <span className="block">Tối Ưu Hóa IDE</span>
            <span className="block text-blue-500 mt-2">Với Rule Files</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Tăng hiệu suất phát triển với các file cấu hình tối ưu cho Cursor và Windsurf IDE
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#generator"
              className="px-8 py-3 text-lg font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Tạo Rule File
            </a>
            <a
              href="#examples"
              className="px-8 py-3 text-lg font-medium rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
            >
              Xem Ví Dụ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 