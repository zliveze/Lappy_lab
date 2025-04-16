import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { 
  faWindows, 
  faGithub, 
  faFacebook, 
  faDiscord,
  faJs,
  faHtml5,
  faCss3Alt 
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

/**
 * HeroSection component là phần giới thiệu chính của trang,
 * hiển thị tiêu đề, mô tả, các nút CTA và hình ảnh/thông tin bổ sung.
 * Có bố cục đáp ứng riêng cho mobile và desktop.
 */
export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-black text-gray-100 min-h-[85vh] sm:min-h-[80vh] lg:min-h-[65vh] flex items-center pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-0 lg:pb-0">
      {/* Background Effects - Giữ nguyên hiệu ứng nền */} 
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#2a2a2a 1px, transparent 1px), linear-gradient(to right, #2a2a2a 1px, transparent 1px)', // Màu lưới tối hơn
               backgroundSize: '24px 24px'
             }} />
        {/* Sử dụng màu từ cursorrules */}  
        <div className="absolute top-1/4 left-1/4 w-75 h-75 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse" /> 
      </div>

      {/* Đặt nội dung lên trên với z-10 */} 
      <div className="relative w-full z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8">
          {/* === Mobile & Tablet Layout === */} 
          <div className="lg:hidden w-full flex flex-col items-center text-center animate-fadeInUp">
            {/* Version Tag */} 
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 w-fit mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium text-green-300">Version 2.0</span>
            </div>
            
            {/* Text Content - Điều chỉnh size chữ mobile */} 
            <div className="space-y-2 mb-6 max-w-xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CURSOR ID GENERATOR
                </span>
                <span className="block mt-1 text-xl sm:text-2xl font-medium text-gray-200">
                  NEXT GENERATION
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Công cụ giúp bạn thay đổi ID cho Cursor IDE và các ứng dụng khác, vượt qua giới hạn dùng thử và khai thác tối đa tiềm năng sáng tạo.
                <span className="block mt-2 text-xs sm:text-sm font-medium text-gray-300">
                  Hỗ trợ: Cursor IDE, Windsurf AI, Google Play Game Beta, AIDE...
                </span>
              </p>
            </div>

            {/* CTA Buttons - Điều chỉnh size/padding mobile */} 
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-md mb-6">
              <a href="https://downloads.cursor.com/production/ae378be9dc2f5f1a6a1a220c6e25f9f03c8d4e19/win32/x64/user-setup/CursorUserSetup-x64-0.46.11.exe" 
                 target="_blank" rel="noopener noreferrer"
                 className="w-full group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-purple-500/30 text-sm font-semibold">
                <div className="relative flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faWindows} className="text-sm text-white" />
                  <span className="text-white uppercase">Tải 0.46.11</span>
                </div>
              </a>
              <a href="https://www.cursor.com/" 
                 target="_blank" rel="noopener noreferrer"
                 className="w-full group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-blue-500/30 text-sm font-semibold">
                <div className="relative flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faWindows} className="text-sm text-white" />
                  <span className="text-white uppercase">Bản Mới Nhất</span>
                </div>
              </a>
            </div>

            {/* Learn More Button */} 
            <Link href="/tool" 
                  className="w-full max-w-sm sm:max-w-md mb-8 px-4 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400"/>
              TÌM HIỂU THÊM
            </Link>

            {/* Bottom Stats - Mobile */} 
            <div className="w-full max-w-sm sm:max-w-md">
              <div className="flex items-center justify-around gap-4 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-white">v0.46.11</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Downloads</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-white">Ổn Định</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Chất Lượng</div>
                </div>
              </div>
            </div>
          </div>

          {/* === Desktop Layout === */} 
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center py-10 lg:pr-16 animate-fadeInUp text-left">
            {/* Version Tag */} 
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 w-fit mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium text-green-300">Version 2.0</span>
            </div>
            
            {/* Text Content */} 
            <div className="space-y-4 mb-8">
              <h1 className="text-3xl xl:text-4xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  CURSOR ID GENERATOR
                </span>
                <span className="block mt-2 text-xl xl:text-2xl font-medium text-gray-200">
                  NEXT GENERATION
                </span>
              </h1>
              <p className="text-sm text-gray-400 max-w-lg leading-relaxed">
                Công cụ mạnh mẽ giúp bạn thay đổi ID cho Cursor IDE và nhiều ứng dụng khác, vượt qua giới hạn dùng thử và khai thác tối đa tiềm năng sáng tạo không giới hạn của bạn.
                <br/><br/>
                <span className="font-medium text-gray-300">
                  Hỗ trợ cho: Cursor IDE, Windsurf AI, Google Play Game Beta, AIDE...
                </span>
              </p>
            </div>

            {/* CTA Buttons */} 
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="https://downloads.cursor.com/production/ae378be9dc2f5f1a6a1a220c6e25f9f03c8d4e19/win32/x64/user-setup/CursorUserSetup-x64-0.46.11.exe" 
                 target="_blank" rel="noopener noreferrer"
                 className="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-purple-500/30">
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent skew-x-[30deg] group-hover:-translate-x-full transition-transform duration-700 opacity-50 group-hover:opacity-100"></div>
                <div className="relative flex items-center gap-2">
                  <div className="p-1 bg-white/10 rounded-md group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faWindows} className="text-base text-white" />
                  </div>
                  <span className="inline-flex flex-col overflow-hidden text-sm font-semibold text-white h-[20px]">
                    <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300 whitespace-nowrap">
                      TẢI VỀ WINDOWS 0.46.11
                    </span>
                    <span className="absolute opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
                      DOWNLOAD NOW
                    </span>
                  </span>
                </div>
              </a>
              <a href="https://www.cursor.com/" 
                 target="_blank" rel="noopener noreferrer"
                 className="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:scale-[1.03] transition-transform duration-300 shadow-lg hover:shadow-blue-500/30">
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent skew-x-[30deg] group-hover:-translate-x-full transition-transform duration-700 opacity-50 group-hover:opacity-100"></div>
                <div className="relative flex items-center gap-2">
                  <div className="p-1 bg-white/10 rounded-md group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={faWindows} className="text-base text-white" />
                  </div>
                  <span className="inline-flex flex-col overflow-hidden text-sm font-semibold text-white h-[20px]">
                    <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300 whitespace-nowrap">
                      TẢI BẢN MỚI NHẤT
                    </span>
                    <span className="absolute opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap">
                      DOWNLOAD LATEST
                    </span>
                  </span>
                </div>
              </a>
              <Link href="/tool" 
                    className="px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2">
                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400"/>
                TÌM HIỂU THÊM
              </Link>
            </div>

            {/* Bottom Stats - Desktop */} 
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
              <div>
                <div className="text-lg font-bold text-white">Version 0.46.11</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Downloads</div>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div>
                <div className="text-lg font-bold text-white">Ổn Định</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Chất Lượng</div>
              </div>
            </div>
          </div>

          {/* Right Image Section - Giữ nguyên bố cục Desktop */} 
          <div className="hidden lg:block absolute right-0 lg:relative w-full lg:w-[42%] h-[200px] lg:h-auto lg:min-h-[500px] top-auto bottom-0 lg:inset-y-0 group cursor-pointer lg:self-stretch">
            <div className="absolute inset-0">
              {/* Gradient Overlay - Giữ nguyên */} 
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black via-black/60 to-transparent z-10 group-hover:from-black/95 group-hover:via-black/80 transition-all duration-500"></div>
              
              {/* Image */} 
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/lappy.jpg"
                  alt="Giao diện Cursor IDE với code và AI"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                  sizes="(max-width: 1023px) 100vw, 42vw" 
                />
              </div>

              {/* Hover Information Overlay */} 
              <div className="absolute -left-6 inset-y-0 right-0 bg-gray-950/95 backdrop-blur-sm hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 overflow-hidden">
                {/* Info Content */} 
                <div className="h-full p-6 xl:p-8 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {/* Project Info */} 
                  <div className="mb-6">
                    <h3 className="text-xl xl:text-2xl font-bold mb-3 text-white">Về Dự Án</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Công cụ Chỉnh sửa ID cho Cursor IDE được thiết kế nhằm hỗ trợ người dùng quản lý và sửa lỗi liên quan đến định danh (ID) trong ứng dụng Cursor IDE. Đây là một giải pháp đơn giản nhưng hiệu quả, giúp tối ưu hóa trải nghiệm người dùng, đặc biệt khi các tài khoản Cursor gặp vấn đề về định danh hoặc khi cần cập nhật các ID không hợp lệ.
                      <br />
                      <br />
                      <span className="font-medium text-gray-200">
                        Đặc biệt giải quyết lỗi: <code className="text-xs bg-white/10 px-1 py-0.5 rounded">You've reached your trial request limit</code> hoặc <code className="text-xs bg-white/10 px-1 py-0.5 rounded">Too many trial accounts on this machine</code>.
                      </span>
                    </p>
                  </div>

                  {/* Tech Stack */} 
                  <div className="mb-6">
                    <h3 className="text-lg xl:text-xl font-bold mb-3 text-white">Công Nghệ Sử Dụng</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faHtml5} className="text-orange-400" />
                        HTML5
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faCss3Alt} className="text-blue-400" />
                        CSS3
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <FontAwesomeIcon icon={faJs} className="text-yellow-400" />
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium flex items-center gap-1.5">
                        <svg className="w-4 h-4 fill-current text-sky-400" viewBox="0 0 24 24">
                          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                        </svg>
                        TailwindCSS
                      </span>
                    </div>
                  </div>

                  {/* Author Info */} 
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/50 flex-shrink-0">
                        <Image 
                          src="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg"
                          alt="Ảnh đại diện của Nguyên Kỷ"
                          width={40} 
                          height={40}
                          className="object-cover"
                          sizes="40px" 
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Nguyên Kỷ</div>
                        <div className="text-xs text-gray-400">Nhà phát triển</div>
                      </div>
                      <div className="ml-auto flex gap-2">
                         <a href="https://github.com/Letandat071" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                           <FontAwesomeIcon icon={faGithub} />
                         </a>
                         <a href="https://www.facebook.com/nyaamv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                           <FontAwesomeIcon icon={faFacebook} />
                         </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 