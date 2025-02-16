import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faDiscord, faGithub, faWindows } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light text-white mt-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#2d2d2d 1px, transparent 1px), linear-gradient(to right, #2d2d2d 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-blue-500" />
              Cursor ID Generator
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Công cụ chuyên nghiệp giúp bạn tạo và quản lý ID cho Cursor IDE. 
              Được phát triển bởi Nguyên Kỷ.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Version 2.0</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Stable Release</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
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
                        className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2">
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Liên Hệ
            </h3>
            <div className="space-y-4">
              {[
                { href: 'https://www.facebook.com/nyaamv', icon: faFacebookF, platform: 'Facebook', username: '@nyaamv' },
                { href: 'https://discord.gg/ERdN89wQEC', icon: faDiscord, platform: 'Discord', username: 'Tham gia cộng đồng' },
                { href: 'https://github.com/Letandat071', icon: faGithub, platform: 'Github', username: '@Letandat071' },
              ].map((contact) => (
                <a key={contact.href} 
                   href={contact.href} 
                   className="flex items-center gap-3 text-gray-300 hover:text-white group">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <FontAwesomeIcon icon={contact.icon} />
                  </div>
                  <div>
                    <div className="font-medium">{contact.platform}</div>
                    <div className="text-xs text-gray-400">{contact.username}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-blue-500">
              Tải Xuống
            </h3>
            <div className="space-y-4">
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
                   className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faWindows} className="text-2xl group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="font-medium">{download.version}</div>
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
            <div className="text-gray-400 text-sm">
              © 2024 Cursor ID Generator. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-gray-400">
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