import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCode, faRobot, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPython, faGithub, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

/**
 * LappyHacking component giới thiệu về công cụ Lappy Lab,
 * bao gồm thông tin tác giả, tính năng và liên kết tải xuống.
 */
export default function LappyHacking() {
  return (
    <section aria-labelledby="lappyhacking-title" className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mt-12 mx-auto 
                    shadow-xl max-w-7xl w-[95%] animate-fadeInUp relative overflow-hidden border border-white/10">
      {/* Background Effects - Điều chỉnh màu lưới */} 
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)',
               backgroundSize: '30px 30px'
             }} />
      </div>
      {/* Sử dụng màu gradient từ cursorrules */} 
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-600/5 via-purple-600/5 to-transparent opacity-50 z-0" />
      
      {/* Sử dụng gap-6 cho mobile, gap-8 cho desktop */} 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center relative z-10">
        {/* Author Info - Căn giữa trên mobile */} 
        <div className="flex flex-col items-center md:items-start md:flex-row md:items-center gap-4 md:gap-6">
          {/* Ảnh tác giả */} 
          <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-purple-400/30 
                         shadow-lg shadow-purple-500/10 relative group">
            <Image 
              src="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg"
              alt="Ảnh đại diện Nguyên Kỷ, nhà phát triển Lappy Hacking"
              width={96}
              height={96}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 767px) 80px, 96px"
            />
            {/* Hiệu ứng hover */} 
            <div className="absolute inset-0 bg-gradient-to-t from-purple-800/70 via-purple-800/30 to-transparent opacity-0 
                           group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Thông tin tác giả - Căn giữa text trên mobile */} 
          <div className="text-center md:text-left">
            <h3 id="lappyhacking-title" className="text-xl lg:text-2xl font-bold text-white mb-1">Lappy Hacking</h3>
            <p className="text-sm text-gray-400 mb-3">Phát triển bởi @Nguyenky</p>
            {/* Tag công nghệ - Căn giữa trên mobile */} 
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-400/10 rounded-full text-xs font-medium flex items-center gap-1.5 text-blue-300 
                              border border-blue-400/20">
                <FontAwesomeIcon icon={faPython} className="text-blue-300" />
                Python
              </span>
            </div>
            {/* Liên kết mạng xã hội - Căn giữa trên mobile */} 
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://github.com/Letandat071" 
                 target="_blank" rel="noopener noreferrer"
                 aria-label="Github của Nguyên Kỷ"
                 className="text-gray-500 hover:text-purple-400 transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
              </a>
              <a href="https://www.facebook.com/nyaamv" 
                 target="_blank" rel="noopener noreferrer"
                 aria-label="Facebook của Nguyên Kỷ"
                 className="text-gray-500 hover:text-blue-400 transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="text-lg" />
              </a>
              <a href="https://discord.gg/ERdN89wQEC" 
                 target="_blank" rel="noopener noreferrer"
                 aria-label="Discord cộng đồng"
                 className="text-gray-500 hover:text-indigo-400 transition-colors">
                <FontAwesomeIcon icon={faDiscord} className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* App Info - Right Columns - Đảm bảo hiển thị tốt trên mobile */} 
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-inner">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            {/* Icon ứng dụng */} 
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                           shadow-lg shadow-purple-500/15 flex items-center justify-center p-3 sm:p-4 rotate-[-3deg] hover:rotate-3 transition-transform duration-300">
              <FontAwesomeIcon icon={faKey} className="text-xl sm:text-2xl text-white" />
            </div>
            {/* Thông tin ứng dụng */} 
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                <h4 className="text-lg font-bold text-white">Lappy Lab v4.0.1</h4>
                <span className="px-2 py-0.5 bg-green-400/10 text-green-300 text-xs font-medium rounded-full border border-green-400/20">
                  Latest
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-5">
                Công cụ chuyên nghiệp giúp quản lý ID cho Cursor IDE (phiên bản 0.45+).
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCode} className="text-purple-400 mt-1 w-4 h-4 flex-shrink-0" />
                  <div>
                    <h5 className="text-gray-200 text-sm font-medium">Quản lý ID</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Cho phép người dùng xem và quản lý ID của các IDE được hỗ trợ.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faKey} className="text-blue-400 mt-1 w-4 h-4 flex-shrink-0" />
                  <div>
                    <h5 className="text-gray-200 text-sm font-medium">Reset Dữ Liệu</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Xóa sạch dữ liệu định danh của IDE, khắc phục lỗi giới hạn tài khoản.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faRobot} className="text-pink-400 mt-1 w-4 h-4 flex-shrink-0" />
                  <div>
                    <h5 className="text-gray-200 text-sm font-medium">Hỗ trợ Model Mới</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Tương thích với Cursor 0.45+ để sử dụng các model AI tiên tiến.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faRobot} className="text-green-400 mt-1 w-4 h-4 flex-shrink-0" /> 
                  <div>
                    <h5 className="text-gray-200 text-sm font-medium">Chặn Cập Nhật</h5>
                    <p className="text-gray-500 text-xs leading-relaxed">Ngăn Cursor tự động cập nhật lên phiên bản không mong muốn.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/zliveze/Lappy_Hacking/releases/tag/v4.0.1" 
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center justify-center text-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                            text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 
                            transition-all duration-300 hover:-translate-y-0.5 text-sm font-medium w-full sm:w-auto">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Tải xuống Lappy Lab v4.0.1</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
