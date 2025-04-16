import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faWindows, faApple, faLinux } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

/**
 * Định nghĩa kiểu cho một bước trong hướng dẫn.
 */
interface TutorialStep {
  title: string;
  content: string | null;
  paths?: Array<{ icon: any; label: string; path: string }>;
}

/**
 * TutoringSection component.
 * 
 * Hiển thị hướng dẫn từng bước và một slider ảnh minh họa
 * cách thay đổi ID cấu hình trong Cursor IDE.
 * Bao gồm chức năng tự động trượt ảnh và điều hướng thủ công.
 * 
 * @state {number} currentSlide - Chỉ số của slide ảnh hiện tại.
 * @state {boolean} isAutoPlaying - Cờ xác định trạng thái tự động trượt ảnh.
 * @ref {React.RefObject<NodeJS.Timeout | null>} intervalRef - Tham chiếu đến interval tự động trượt.
 * @ref {React.RefObject<HTMLDivElement>} sliderRef - Tham chiếu đến container của slider để bắt sự kiện hover.
 */
export default function TutoringSection() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const autoPlayInterval: number = 5000; // 5 giây mỗi slide
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const images: string[] = [
    '/ide/ide_1.png',
    '/ide/ide_2.png',
    '/ide/ide_3.png',
    '/ide/ide_4.png',
    '/ide/ide_5.png' // Thêm ảnh nếu có
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, images.length]);

  /**
   * Chuyển slide ảnh tới hoặc lùi.
   * Tạm dừng tự động trượt khi được gọi.
   * 
   * @param {number} direction - Hướng chuyển (-1 cho lùi, 1 cho tới).
   */
  const moveSlide = (direction: number): void => {
    setIsAutoPlaying(false); // Tạm dừng auto-play khi điều hướng thủ công
    let newSlide = currentSlide + direction;
    if (newSlide >= images.length) newSlide = 0;
    if (newSlide < 0) newSlide = images.length - 1;
    setCurrentSlide(newSlide);
  };

  /**
   * Chuyển đến một slide ảnh cụ thể theo chỉ số.
   * Tạm dừng tự động trượt khi được gọi.
   * 
   * @param {number} index - Chỉ số của slide muốn chuyển đến.
   */
  const goToSlide = (index: number): void => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  // Mảng dữ liệu cho các bước hướng dẫn
  const steps: TutorialStep[] = [
    { title: "Đóng Hoàn Toàn Cursor", content: "Đảm bảo bạn đã thoát hoàn toàn ứng dụng Cursor IDE, kể cả các tiến trình chạy nền (kiểm tra Task Manager nếu cần)." },
    { title: "Tìm Thư Mục Cấu Hình", content: null, paths: [ { icon: faWindows, label: 'Windows', path: '%APPDATA%\\Cursor\\User\\globalStorage\\storage.json' }, { icon: faApple, label: 'MacOS', path: '~/Library/Application Support/Cursor/User/globalStorage/storage.json' }, { icon: faLinux, label: 'Linux', path: '~/.config/cursor/User/globalStorage/storage.json' } ] },
    { title: "Mở và Chỉnh Sửa File", content: "Mở tệp 'storage.json' bằng một trình soạn thảo văn bản (như Notepad++, VS Code). Tìm và thay thế các giá trị ID cũ (macMachineId, sqmId, machineId, devDeviceId) bằng các ID mới bạn đã tạo ở trên." },
    { title: "Lưu File và Khởi Động Lại", content: "Lưu lại thay đổi trong tệp 'storage.json'. Sau đó, mở lại Cursor IDE. ID của bạn đã được cập nhật!" }
  ];

  return (
    <section aria-labelledby="tutoring-title" className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 mt-12 mb-12 mx-auto shadow-xl max-w-7xl w-[95%] animate-fadeInUp border border-white/10">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          {/* Icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
            <FontAwesomeIcon icon={faBook} className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" />
          </div>
          {/* Title */}
          <div>
            <h2 id="tutoring-title" className="text-lg sm:text-xl font-semibold text-white">
              Hướng Dẫn Sử Dụng (Thay đổi ID)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">Các bước thực hiện đơn giản</p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Steps - Áp dụng theme tối */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-200 mb-1 text-base">{step.title}</h3>
                  {step.content && <p className="text-sm text-gray-400 leading-relaxed">{step.content}</p>}
                  {step.paths && <div className="mt-2 space-y-2">
                    <p className="text-xs text-gray-500">(Chọn đường dẫn phù hợp hệ điều hành)</p>
                    {step.paths.map(p => (
                      <div key={p.label} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={p.icon} className="w-4 h-4 text-gray-500 flex-shrink-0" title={p.label} />
                        <div className="flex-1 bg-gray-800 p-1.5 px-2 rounded font-mono text-[11px] sm:text-xs text-gray-300 border border-gray-600 break-all select-all">
                          {p.path}
                        </div>
                      </div>
                    ))}
                  </div>}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Image Slider - Áp dụng theme tối */}
          <div ref={sliderRef} className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden bg-gray-800 border border-gray-600/50 shadow-inner"
               onMouseEnter={() => setIsAutoPlaying(false)}
               onMouseLeave={() => setIsAutoPlaying(true)}>
            {/* Image Container */}
            <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out h-full"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {images.map((image, index) => (
                <div key={index} className="min-w-full h-full relative flex-shrink-0">
                  <Image
                    src={image}
                    alt={`Hướng dẫn Cursor IDE - Bước ${index + 1}`}
                    fill
                    className="object-contain sm:object-cover"
                    sizes="(max-width: 1023px) 90vw, 45vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay nhẹ ở dưới */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-800/80 via-gray-800/20 to-transparent pointer-events-none"></div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons - Style cho theme tối */}
            <button onClick={() => moveSlide(-1)}
                    aria-label="Ảnh trước đó"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-white/50">
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button onClick={() => moveSlide(1)}
                    aria-label="Ảnh kế tiếp"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-colors duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-white/50">
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>

            {/* Dots Navigation - Style cho theme tối */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Đi tới ảnh ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 