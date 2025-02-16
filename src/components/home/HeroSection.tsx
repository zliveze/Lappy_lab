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

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-black text-white h-[86vh] sm:h-[76vh] md:h-[47vh] lg:h-[62vh]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(to right, #1a1a1a 1px, transparent 1px)',
               backgroundSize: '24px 24px'
             }} />
        <div className="absolute top-1/4 left-1/4 w-75 h-75 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="relative h-full">
        <div className="container mx-auto h-full flex flex-col lg:flex-row">
          {/* Mobile Version */}
          <div className="lg:hidden w-full flex flex-col justify-between h-full py-4 animate-fadeInUp">
            <div className="relative w-full px-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 w-fit mb-3 mx-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-green-300">Version 2.0</span>
              </div>
              
              <div className="space-y-3 mb-4 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    CURSOR ID GENERATOR
                  </span>
                  <span className="block mt-1 text-lg sm:text-xl font-medium text-white/90">
                    NEXT GENERATION
                  </span>
                </h1>
                
                <p className="text-sm text-gray-400 leading-relaxed mx-auto">
                  Được xây dựng để giúp bạn thay đổi ID cho Cursor IDE và hơn thế nữa, để bạn có thể tận dụng được các IDE AI khác và tận dụng chúng triệt để cho sáng tạo không giới hạn của bạn.
                  <br/><br/>
                  <span className="font-medium text-white/80">Hỗ trợ cho: Cursor IDE, Windsurf AI, Google Play Game Beta, AIDE...</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <a href="https://drive.google.com/file/d/1UqgE3LlK1_pPkahKs4XSNWgG2GHUR3qj/view?usp=sharing" 
                   className="w-full group relative overflow-hidden px-3 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-all duration-300">
                  <div className="relative flex items-center justify-center gap-2">
                    <div className="p-1 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faWindows} className="text-sm text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white">TẢI VỀ</span>
                  </div>
                </a>
                
                <a href="https://www.cursor.com/" 
                   className="w-full group relative overflow-hidden px-3 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-all duration-300">
                  <div className="relative flex items-center justify-center gap-2">
                    <div className="p-1 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faWindows} className="text-sm text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white">BẢN MỚI</span>
                  </div>
                </a>
              </div>

              <Link href="/tool" 
                    className="mt-2 w-full px-3 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-xs font-semibold text-white/90 hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-2">
                <FontAwesomeIcon icon={faInfoCircle} />
                TÌM HIỂU THÊM
              </Link>
            </div>

            <div className="w-full px-3">
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-base font-bold text-white">Version 0.42.5</div>
                  <div className="text-[10px] text-gray-500">Downloads</div>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="text-center">
                  <div className="text-base font-bold text-white">Ổn Định</div>
                  <div className="text-[10px] text-gray-500">Đánh giá</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Version */}
          <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-center py-6 lg:py-0 lg:pr-12 animate-fadeInUp text-left">
            <div className="relative">
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 w-fit mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-medium text-green-300">Version 2.0</span>
              </div>
              
              <div className="space-y-3 mb-6">
                <h1 className="text-4xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    CURSOR ID GENERATOR
                  </span>
                  <span className="block mt-2 text-2xl font-medium text-white/90">
                    NEXT GENERATION
                  </span>
                </h1>
                
                <p className="text-gray-400 max-w-md leading-relaxed">
                  Được xây dựng để giúp bạn thay đổi ID cho Cursor IDE và hơn thế nữa, để bạn có thể tận dụng được các IDE AI khác và tận dụng chúng triệt để cho sáng tạo không giới hạn của bạn.
                  <br/><br/>
                  <span className="font-medium text-white/80">Hỗ trợ cho: Cursor IDE, Windsurf AI, Google Play Game Beta, AIDE...</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a href="https://drive.google.com/file/d/1UqgE3LlK1_pPkahKs4XSNWgG2GHUR3qj/view?usp=sharing" 
                   className="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent skew-x-[45deg] group-hover:-translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-2">
                    <div className="p-1 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faWindows} className="text-base text-white" />
                    </div>
                    <span className="inline-flex flex-col overflow-hidden text-sm font-semibold text-white h-[20px]">
                      <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300">
                        TẢI VỀ WINDOWS 0.42.5
                      </span>
                      <span className="absolute opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                        DOWNLOAD NOW
                      </span>
                    </span>
                  </div>
                </a>

                <a href="https://www.cursor.com/" 
                   className="group relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent skew-x-[45deg] group-hover:-translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-2">
                    <div className="p-1 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                      <FontAwesomeIcon icon={faWindows} className="text-base text-white" />
                    </div>
                    <span className="inline-flex flex-col overflow-hidden text-sm font-semibold text-white h-[20px]">
                      <span className="translate-y-0 group-hover:-translate-y-full transition-transform duration-300">
                        TẢI BẢN MỚI NHẤT
                      </span>
                      <span className="absolute opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                        DOWNLOAD NOW
                      </span>
                    </span>
                  </div>
                </a>

                <Link href="/tool" 
                      className="px-5 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-sm font-semibold text-white/90 hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  TÌM HIỂU THÊM
                </Link>
              </div>

              <div className="hidden lg:flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                <div>
                  <div className="text-lg font-bold text-white">Version 0.42.5</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div>
                  <div className="text-lg font-bold text-white">Ổn Định</div>
                  <div className="text-xs text-gray-500">Đánh giá</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="absolute right-0 w-full lg:w-[45%] h-[23vh] lg:h-full top-auto bottom-0 lg:top-0 group cursor-pointer">
            <div className="absolute inset-0">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-black/50 to-transparent 
                              group-hover:from-black/90 group-hover:via-black/80 transition-all duration-300"></div>
              
              {/* Image */}
              <div className="absolute inset-0">
                <Image 
                  src="/lappy.jpg"
                  alt="Cursor IDE Preview"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Hover Information Overlay */}
              <div className="absolute -left-6 inset-y-0 right-0 bg-black/90 hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Info Content */}
                <div className="h-full p-8 flex flex-col overflow-y-auto">
                  {/* Project Info */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Về Dự Án</h3>
                    <p className="text-base text-gray-300">
                      Công cụ Chỉnh sửa ID cho Cursor IDE được thiết kế nhằm hỗ trợ người dùng quản lý và sửa lỗi liên quan đến định danh (ID) trong ứng dụng Cursor IDE. Đây là một giải pháp đơn giản nhưng hiệu quả, giúp tối ưu hóa trải nghiệm người dùng, đặc biệt khi các tài khoản Cursor gặp vấn đề về định danh hoặc khi cần cập nhật các ID không hợp lệ.
                      <br />
                      <br />
                      <span className="font-medium text-white/80">
                        Đặt biệt là lỗi: You've reached your trial request limit<br />
                        Too many trail account on this machine
                      </span>
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Công Nghệ Sử Dụng</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faHtml5} className="text-orange-500" />
                        HTML5
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500" />
                        CSS3
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2">
                        <FontAwesomeIcon icon={faJs} className="text-yellow-500" />
                        JavaScript
                      </span>
                      <span className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                        </svg>
                        TailwindCSS
                      </span>
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/50">
                        <Image 
                          src="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg"
                          alt="Author"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Developed by</h3>
                        <p className="text-purple-300">@Nguyenky</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <a href="https://github.com/Letandat071" 
                         className="text-white/50 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faGithub} className="text-xl" />
                      </a>
                      <a href="https://www.facebook.com/nyaamv" 
                         className="text-white/50 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                      </a>
                      <a href="https://discord.gg/ERdN89wQEC" 
                         className="text-white/50 hover:text-white transition-colors">
                        <FontAwesomeIcon icon={faDiscord} className="text-xl" />
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
  );
} 