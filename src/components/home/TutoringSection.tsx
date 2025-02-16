import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faWindows, faApple, faLinux } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export default function TutoringSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 5000; // 5 seconds per slide

  const images = [
    '/ide/ide_1.png',
    '/ide/ide_2.png',
    '/ide/ide_3.png',
    '/ide/ide_4.png'
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, images.length]);

  const moveSlide = (direction: number) => {
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
    let newSlide = currentSlide + direction;
    if (newSlide >= images.length) newSlide = 0;
    if (newSlide < 0) newSlide = images.length - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-8 mb-12 mx-auto shadow-lg max-w-7xl w-[95%] animate-fadeInUp">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                         rounded-lg flex items-center justify-center border border-blue-500/20">
            <FontAwesomeIcon icon={faBook} className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 
                                                     bg-clip-text text-transparent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                          bg-clip-text text-transparent">
              Hướng Dẫn Sử Dụng
            </h2>
            <p className="text-sm text-gray-500">Các bước thực hiện thay đổi ID</p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Steps */}
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                             rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">Đóng Cursor</h3>
                <p className="text-sm text-gray-600">
                  Đảm bảo đóng hoàn toàn ứng dụng Cursor trước khi tiến hành.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                             rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Tìm File Cấu Hình</h3>
                <p className="text-sm text-gray-600 mb-2">Tìm một trong các đường dẫn sau:</p>
                
                {/* Windows path */}
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faWindows} className="text-primary w-5 text-center" />
                  <div className="flex-1 bg-white p-2 rounded font-mono text-xs border border-gray-200">
                    %APPDATA%\Roaming\Cursor\User\globalstorage\storage.json
                  </div>
                </div>
                
                {/* MacOS path */}
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faApple} className="text-primary w-5 text-center" />
                  <div className="flex-1 bg-white p-2 rounded font-mono text-xs border border-gray-200">
                    ~/Library/Application Support/Cursor/User/globalstorage/storage.json
                  </div>
                </div>
                
                {/* Linux path */}
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faLinux} className="text-primary w-5 text-center" />
                  <div className="flex-1 bg-white p-2 rounded font-mono text-xs border border-gray-200">
                    ~/.config/cursor/User/globalstorage/storage.json
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                             rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">Thay Thế ID</h3>
                <p className="text-sm text-gray-600">
                  Mở file và thay thế ID cũ bằng ID mới được tạo.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image Slider */}
          <div className="relative h-[400px] rounded-xl overflow-hidden"
               onMouseEnter={() => setIsAutoPlaying(false)}
               onMouseLeave={() => setIsAutoPlaying(true)}>
            {/* Image Container */}
            <div className="absolute inset-0 transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <div className="flex h-full">
                {images.map((image, index) => (
                  <div key={index} className="min-w-full h-full relative">
                    <Image
                      src={image}
                      alt={`Cursor IDE Tutorial ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button onClick={() => moveSlide(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                             text-white p-3 rounded-full transition-colors z-10">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={() => moveSlide(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 
                             text-white p-3 rounded-full transition-colors z-10">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors 
                            ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>

            {/* Optional: Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
              <div 
                className="h-full bg-white/50 transition-all duration-500"
                style={{ 
                  width: `${(currentSlide + 1) * (100 / images.length)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 