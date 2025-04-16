import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faDiscord, faGithub, faWindows } from '@fortawesome/free-brands-svg-icons';

/**
 * Footer component hiển thị thông tin bản quyền, liên kết nhanh, liên hệ và tải xuống.
 */
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 mt-12 relative overflow-hidden">
      {/* Background Effects - Giữ lại hiệu ứng lưới nhưng điều chỉnh màu */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" 
             style={{
               // Màu lưới tối hơn một chút
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
               backgroundSize: '30px 30px' // Tăng kích thước lưới một chút
             }} />
        {/* Gradient overlay nhẹ nhàng hơn */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" /> 
      </div>

      {/* Đặt nội dung lên trên background effects với z-10 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl lg:text-2xl font-bold flex items-center gap-2 text-white">
              {/* Sử dụng màu nhấn từ cursorrules */}
              <FontAwesomeIcon icon={faCode} className="text-blue-400" /> 
              Cursor ID Generator
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Công cụ chuyên nghiệp giúp bạn tạo và quản lý ID cho Cursor IDE. 
              Được phát triển bởi Nguyên Kỷ.
            </p>
            <div className="pt-4 flex items-center gap-3 flex-wrap">
              {/* Điều chỉnh kiểu dáng tag */}
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium">Version 2.0</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium">Stable Release</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            {/* Sử dụng màu nhấn từ cursorrules cho gạch chân */}
            <h3 className="text-lg lg:text-xl font-bold pb-2 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/', text: 'Trang Chủ' },
                { href: '/doc', text: 'Tài Liệu' },
                { href: '/tool', text: 'Công Cụ' },
                { href: '/temp-email', text: 'Tạo Email' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} 
                        className="text-gray-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 text-sm">
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs text-blue-400" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            {/* Sử dụng màu nhấn từ cursorrules cho gạch chân */}
            <h3 className="text-lg lg:text-xl font-bold pb-2 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Liên Hệ
            </h3>
            <div className="space-y-3">
              {[
                { href: 'https://www.facebook.com/nyaamv', icon: faFacebookF, platform: 'Facebook', username: '@nyaamv', color: 'text-blue-400', hoverBg: 'hover:bg-blue-400/20' },
                { href: 'https://discord.gg/ERdN89wQEC', icon: faDiscord, platform: 'Discord', username: 'Tham gia cộng đồng', color: 'text-purple-400', hoverBg: 'hover:bg-purple-400/20' },
                { href: 'https://github.com/Letandat071', icon: faGithub, platform: 'Github', username: '@Letandat071', color: 'text-gray-300', hoverBg: 'hover:bg-gray-300/20' },
              ].map((contact) => (
                <a key={contact.href} 
                   href={contact.href} 
                   target="_blank" // Mở link trong tab mới
                   rel="noopener noreferrer" // Bảo mật
                   className="flex items-center gap-3 text-gray-400 hover:text-white group">
                  {/* Sử dụng màu hover động */}
                  <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${contact.hoverBg} transition-colors`}>
                    <FontAwesomeIcon icon={contact.icon} className={`${contact.color} group-hover:text-white transition-colors`} />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-white">{contact.platform}</div>
                    <div className="text-xs text-gray-400">{contact.username}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            {/* Sử dụng màu nhấn từ cursorrules cho gạch chân */}
            <h3 className="text-lg lg:text-xl font-bold pb-2 text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r after:from-blue-400 after:to-purple-400">
              Tải Xuống
            </h3>
            <div className="space-y-3">
              {[
                {
                  href: 'https://drive.google.com/file/d/1UqgE3LlK1_pPkahKs4XSNWgG2GHUR3qj/view?usp=sharing',
                  version: 'Windows 0.42.5',
                  description: 'Tải về phiên bản ổn định'
                },
                {
                  href: 'https://www.cursor.com/',
                  version: 'Windows Latest',
                  description: 'Tải về phiên bản mới nhất'
                }
              ].map((download) => (
                <a key={download.href}
                   href={download.href}
                   target="_blank" // Mở link trong tab mới
                   rel="noopener noreferrer" // Bảo mật
                   className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center">
                    <FontAwesomeIcon icon={faWindows} className="text-xl text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-white">{download.version}</div>
                    <div className="text-xs text-gray-400">{download.description}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Cursor ID Generator. All rights reserved.
            </div>
            <div className="flex items-center gap-4 md:gap-6 text-gray-400">
              <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-sm hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 