import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faCode, faRobot } from '@fortawesome/free-solid-svg-icons';
import { faWindows, faPython, faGithub, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export default function LappyHacking() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-xl p-8 mt-12 mx-auto 
                    shadow-2xl max-w-7xl w-[95%] animate-fadeInUp relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
               backgroundSize: '25px 25px'
             }} />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 via-purple-500/5 to-transparent" />
      
      <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
        {/* Author Info - Left Column */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-500/20 
                         shadow-lg shadow-purple-500/10 relative group">
            <Image 
              src="https://i.pinimg.com/736x/ed/fc/2f/edfc2f43906239efe89ce407415a1856.jpg"
              alt="Author"
              width={96}
              height={96}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent opacity-0 
                           group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Lappy Hacking</h3>
            <p className="text-gray-400 mb-4">Phát triển bởi @Nguyenky</p>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              <span className="px-3 py-1 bg-blue-500/10 rounded-full text-sm flex items-center gap-2 text-blue-400 
                              border border-blue-500/20">
                <FontAwesomeIcon icon={faPython} className="text-blue-400" />
                Python
              </span>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com/Letandat071" 
                 className="text-gray-500 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </a>
              <a href="https://www.facebook.com/nyaamv" 
                 className="text-gray-500 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              </a>
              <a href="https://discord.gg/ERdN89wQEC" 
                 className="text-gray-500 hover:text-white transition-colors">
                <FontAwesomeIcon icon={faDiscord} className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* App Info - Right Columns */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 
                           shadow-lg flex items-center justify-center p-4 rotate-3 hover:rotate-6 transition-transform">
              <FontAwesomeIcon icon={faKey} className="text-2xl text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-xl font-bold text-white">Lappy Lab v3.1</h4>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                  Latest
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Công cụ chuyên nghiệp giúp quản lý ID cho Cursor 0.45
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faCode} className="text-purple-400 mt-1" />
                  <div>
                    <h5 className="text-white text-sm font-medium">Quản lý ID</h5>
                    <p className="text-gray-500 text-sm">Cho phép người dùng quản lý ID của các IDE</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faKey} className="text-blue-400 mt-1" />
                  <div>
                    <h5 className="text-white text-sm font-medium">Reset Dữ Liệu</h5>
                    <p className="text-gray-500 text-sm">Reset dữ liệu của IDE không còn lỗi dùng nhiều account</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faRobot} className="text-pink-400 mt-1" />
                  <div>
                    <h5 className="text-white text-sm font-medium">New Model Support</h5>
                    <p className="text-gray-500 text-sm">Bổ sung Cursor 0.45 hỗ trợ model tiên tiến hơn</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FontAwesomeIcon icon={faDownload} className="text-pink-400 mt-1" />
                  <div>
                    <h5 className="text-white text-sm font-medium">Block Update</h5>
                    <p className="text-gray-500 text-sm">Chặn Cursor tự động Update</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/zliveze/Lappy_Hacking/releases/download/v3.1.0/Lappy_Lab_3.1-winx64.exe" 
                   className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 
                            text-white px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-purple-500/20 
                            transition-all duration-300 hover:-translate-y-0.5">
                  <FontAwesomeIcon icon={faWindows} />
                  <span>Tải xuống Lappy Lab</span>
                </a>
                <a href="https://drive.google.com/file/d/1WUXglDhYrhc0bgTc8wTH0h_pM2SvtpIV/view?usp=sharing" 
                   className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-2.5 rounded-lg 
                            hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <FontAwesomeIcon icon={faWindows} />
                  <span>Cursor 0.44.11</span>
                  <span>Ổn định nhất</span>
                </a>
                </a>
                <a href="https://drive.google.com/file/d/14-LYMPnozH-kkbh0rDFwMZDzJlDaUyeD/view?usp=sharing" 
                   className="inline-flex items-center gap-2 bg-white/5 text-white px-6 py-2.5 rounded-lg 
                            hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <FontAwesomeIcon icon={faWindows} />
                  <span>Cursor 0.45.15</span>
                  <span>Tôt nhất</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
