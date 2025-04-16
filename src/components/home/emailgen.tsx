import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import ToastProvider from './ToastProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRandom, faDownload, faCopy, faInfoCircle, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * EmailGenerator component tạo ra các biến thể email dựa trên một địa chỉ email gốc.
 * Hỗ trợ thêm dấu chấm, thay đổi chữ hoa/thường, và thêm hậu tố.
 * Cung cấp chức năng tạo ngẫu nhiên hoặc tạo toàn bộ và xuất file.
 */
const EmailGenerator = () => {
  const [email, setEmail] = useState('');
  const [maxSuffix, setMaxSuffix] = useState(999);
  const [includeCaseVariants, setIncludeCaseVariants] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [totalVariants, setTotalVariants] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const estimate = useRef(0); // Lưu trữ ước tính

  useEffect(() => {
    // Khởi tạo và hủy worker
    const workerUrl = new URL('/emailWorker.js', window.location.origin).toString();
    let workerInstance: Worker | null = null;
    try {
        workerInstance = new Worker(workerUrl);
        workerInstance.addEventListener('message', handleWorkerMessage);
        workerRef.current = workerInstance;
    } catch (e) {
        console.error("Failed to create worker:", e);
        toast.error("Không thể khởi tạo bộ xử lý nền.");
    }
    
    return () => {
      if (workerInstance) {
        workerInstance.removeEventListener('message', handleWorkerMessage);
        workerInstance.terminate();
      }
      workerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ chạy một lần khi mount

  useEffect(() => {
    // Cập nhật ước tính khi email hoặc tùy chọn thay đổi
    estimate.current = estimateVariantCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, maxSuffix, includeCaseVariants]);

  const handleWorkerMessage = (e: MessageEvent) => {
    const { type, progress: workerProgress, totalVariants: workerTotal, variants, error: workerError } = e.data;
    
    if (type === 'progress') {
      setProgress(workerProgress);
      setTotalVariants(workerTotal);
    } else if (type === 'complete') {
      toast.dismiss('generating');
      toast.success(`Hoàn thành! Tổng: ${formatNumber(workerTotal)} biến thể.`);
      workerRef.current?.postMessage({ action: 'getResults' });
    } else if (type === 'result') {
      downloadVariants(variants);
      setIsGenerating(false);
      setProgress(100); // Mark as complete
    } else if (type === 'error') {
        console.error("Worker error:", workerError);
        toast.dismiss('generating');
        toast.error(`Lỗi xử lý nền: ${workerError}`);
        setIsGenerating(false);
    }
  };

  /** Chèn dấu chấm vào các vị trí chỉ định trong username */
  const insertDots = (username: string, dotsPositions: number[]): string => {
    const result = [...username];
    for (const pos of [...dotsPositions].sort((a, b) => b - a)) {
      result.splice(pos, 0, '.');
    }
    return result.join('');
  };

  /** Tạo các biến thể email với dấu chấm */
  const generateDotVariants = (username: string): string[] => {
    const positions = Array.from({ length: username.length - 1 }, (_, i) => i + 1);
    const variants = new Set<string>();
    variants.add(username);
    const totalCombinations = 1 << positions.length;
    for (let mask = 1; mask < totalCombinations; mask++) {
      const dots = positions.filter((_, i) => (mask >> i) & 1);
      if (dots.length === 0) continue;
      const dottedUsername = insertDots(username, dots);
      if (!dottedUsername.includes('..') && 
          !dottedUsername.startsWith('.') && 
          !dottedUsername.endsWith('.')) {
        variants.add(dottedUsername);
      }
    }
    return [...variants];
  };

  /** Tạo ngẫu nhiên một hậu tố từ 0 đến maxSuffix */
  const generateRandomSuffix = (max: number): string => {
    return Math.floor(Math.random() * (max + 1)).toString();
  };

  /** Tạo ngẫu nhiên một email biến thể */
  const generateRandomVariant = () => {
    if (!isValidEmail(email)) {
      toast.error('Vui lòng nhập email hợp lệ.');
      return;
    }
    const [username, domain] = email.split('@');
    if (!username || !domain) {
        toast.error('Định dạng email không đúng.');
        return;
    }

    const usernameVariants = generateDotVariants(username);
    const randomUsername = usernameVariants[Math.floor(Math.random() * usernameVariants.length)];
    let finalUsername = randomUsername;
    if (includeCaseVariants && Math.random() > 0.7) { // 30% chance
      const alphaPositions = [...randomUsername.matchAll(/[a-zA-Z]/g)].map(m => m.index!); // Non-null assertion ok here
      if (alphaPositions.length > 0) {
        const posToChange = alphaPositions[Math.floor(Math.random() * alphaPositions.length)];
        const chars = [...randomUsername];
        chars[posToChange] = 
          chars[posToChange].toLowerCase() === chars[posToChange]
            ? chars[posToChange].toUpperCase()
            : chars[posToChange].toLowerCase();
        finalUsername = chars.join('');
      }
    }
    const shouldAddSuffix = Math.random() > 0.5;
    const randomEmail = shouldAddSuffix 
      ? `${finalUsername}+${generateRandomSuffix(Math.min(maxSuffix, 9999))}@${domain}` // Limit suffix for random
      : `${finalUsername}@${domain}`;    
    setGeneratedEmail(randomEmail);
    toast.success('Đã tạo email ngẫu nhiên!');
  };

  /** Tạo toàn bộ biến thể và xuất ra file thông qua Worker */
  const generateAllVariants = () => {
    if (!isValidEmail(email)) {
      toast.error('Vui lòng nhập email hợp lệ.');
      return;
    }
    if (!workerRef.current) {
        toast.error("Bộ xử lý nền chưa sẵn sàng, vui lòng thử lại.");
        // Optionally attempt to re-initialize worker here
        return;
    }

    setIsGenerating(true);
    setProgress(0);
    setTotalVariants(0);
    toast.loading('Đang chuẩn bị tạo biến thể...', { id: 'generating' });

    const safeMaxSuffix = Math.min(maxSuffix, 99999); // Safety limit

    workerRef.current.postMessage({ 
      action: 'init',
      email, 
      maxSuffix: safeMaxSuffix,
      includeCaseVariants,
      batchSize: 1000 // Adjust batch size based on performance
    });
  };

  /** Tạo file và kích hoạt tải xuống */
  const downloadVariants = (variants: string[]) => {
    if (!variants || variants.length === 0) {
        toast.error("Không có dữ liệu biến thể để tải xuống.");
        return;
    }
    try {
      const content = variants.join('\n');
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `email_variants_${email.split('@')[0] || 'list'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.dismiss('generating'); // Dismiss loading toast if any
      toast.success("Đã tải xuống tệp biến thể!");
    } catch (error) {
        console.error("Download error:", error);
        toast.error("Không thể tạo tệp tải xuống.");
        setIsGenerating(false); // Ensure state is reset on error
    }
  };

  /** Kiểm tra định dạng email cơ bản */
  const isValidEmail = (emailInput: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
  };

  /** Ước tính số lượng biến thể */
  const estimateVariantCount = (): number => {
    if (!email || !isValidEmail(email)) return 0;
    const [username = ''] = email.split('@');
    if (username.length === 0) return 0;
    // Limit calculation for very long usernames to prevent performance issues/freezing
    if (username.length > 15) return Infinity;
    try {
      const dotCombinations = 1 << (username.length - 1);
      let caseMultiplier = 1;
      if (includeCaseVariants) {
          const alphaCount = username.replace(/[^a-zA-Z]/g, '').length;
          // Simple estimation: 1 (original) + combinations of changing 1 char + combinations of changing 2 chars
          // This avoids calculating 2^alphaCount which can be huge
          caseMultiplier = 1 + (alphaCount > 0 ? alphaCount : 0) + (alphaCount > 1 ? (alphaCount * (alphaCount - 1)) / 2 : 0);
      }
      // Multiply by suffixes (+1 because suffix can be 0)
      const suffixCount = maxSuffix >= 0 ? maxSuffix + 1 : 1; 
      const total = dotCombinations * caseMultiplier * suffixCount;
      // Return Infinity if the number is too large to prevent display issues
      return total > 1_000_000_000 ? Infinity : total;
    } catch (e) {
      // Handle potential errors like bitshift on large numbers
      return Infinity;
    }
  };

  /** Định dạng số với dấu phẩy */
  const formatNumber = (num: number): string => {
    if (num === Infinity) return "Rất nhiều";
    if (isNaN(num)) return "0";
    return num.toLocaleString('en-US');
  };

  /** Sao chép email vào clipboard */
  const copyToClipboard = () => {
    if (generatedEmail) {
      navigator.clipboard.writeText(generatedEmail)
        .then(() => toast.success('Đã sao chép email!'))
        .catch(err => {
            console.error('Clipboard copy failed:', err);
            toast.error('Không thể sao chép.');
        });
    }
  };

  /** Ngừng quá trình tạo biến thể */
  const stopGeneration = () => {
    if (workerRef.current) {
      workerRef.current.terminate(); // Terminate current worker
      workerRef.current = null;      // Set ref to null
      // Re-initialize worker for future use immediately
      const workerUrl = new URL('/emailWorker.js', window.location.origin).toString();
      try {
          const newWorker = new Worker(workerUrl);
          newWorker.addEventListener('message', handleWorkerMessage);
          workerRef.current = newWorker; // Assign new worker to ref
      } catch(e) {
          console.error("Failed to re-initialize worker:", e);
          toast.error("Không thể khởi động lại bộ xử lý.");
      }
    }
    setIsGenerating(false);
    setProgress(0);
    setTotalVariants(0);
    toast.dismiss('generating');
    toast.error("Đã dừng tạo biến thể.");
  };

  return (
    <ToastProvider>
      {/* Áp dụng theme tối, padding chuẩn */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg animate-fadeInUp h-full flex flex-col relative border border-white/10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 
                           rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 
                                                     bg-clip-text text-transparent" />
            </div>
            {/* Title */}
            <div>
              <h2 className="text-lg font-semibold text-white">Email Variant Generator</h2>
              <p className="text-xs text-gray-400">Tạo biến thể email cho Gmail và các dịch vụ khác</p>
            </div>
          </div>
          {/* Nút Info */}
          <button 
             onClick={() => setShowInfo(!showInfo)}
             className="text-gray-500 hover:text-blue-400 transition-colors p-1 ml-2 rounded-full hover:bg-white/10 flex-shrink-0"
             aria-label={showInfo ? "Đóng thông tin" : "Xem thông tin"}
          >
              <FontAwesomeIcon icon={showInfo ? faTimes : faInfoCircle} />
          </button>
        </div>

        {/* Input Section */}
        <div className="mb-5">
          <label htmlFor="emailInput" className="block text-sm font-medium text-gray-300 mb-1.5">
            Nhập email gốc
          </label>
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ví dụ: username@gmail.com"
            aria-label="Email gốc"
             // Style cho input trong theme tối
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {/* Hiển thị ước tính */}
          <p className="text-xs text-gray-500 mt-1.5">
             Ước tính số lượng biến thể: {formatNumber(estimate.current)}
           </p>
        </div>

        {/* Options Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="maxSuffix" className="block text-sm font-medium text-gray-300 mb-1.5">
              Hậu tố tối đa (+suffix)
            </label>
            <input
              id="maxSuffix"
              type="number"
              min="0"
              max="99999" // Safety limit
              value={maxSuffix}
              onChange={(e) => setMaxSuffix(Math.max(0, parseInt(e.target.value, 10)) || 0)}
              aria-label="Hậu tố tối đa"
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex items-center pt-2 sm:pt-6 sm:justify-end">
            <label htmlFor="includeCaseVariants" className="flex items-center cursor-pointer">
              <input
                id="includeCaseVariants"
                type="checkbox"
                checked={includeCaseVariants}
                onChange={(e) => setIncludeCaseVariants(e.target.checked)}
                // Style checkbox
                className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 focus:ring-offset-gray-800 focus:ring-2 transition cursor-pointer"
              />
              <span className="ml-2 text-sm font-medium text-gray-300 select-none">
                Bao gồm chữ hoa/thường
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={generateRandomVariant}
            disabled={isGenerating || !isValidEmail(email)}
            // Style button chính
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faRandom} />
            Tạo Ngẫu Nhiên
          </button>
          <button
            onClick={generateAllVariants}
            disabled={isGenerating || !isValidEmail(email)}
             // Style button phụ
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faDownload} />
            )}
            {isGenerating ? 'Đang tạo...' : 'Tạo & Tải Tất Cả'}
          </button>
          {/* Nút dừng */} 
           {isGenerating && (
                <button
                   onClick={stopGeneration}
                   className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-600/40 hover:text-red-300 transition-colors flex-shrink-0"
                   aria-label="Dừng tạo biến thể"
               >
                   <FontAwesomeIcon icon={faTimes} />
               </button>
            )}
        </div>

        {/* Generation Progress */}
        {isGenerating && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{`Tiến độ: ${progress}%`}</span>
              <span>{`Đã tạo: ${formatNumber(totalVariants)}`}</span>
            </div>
             {/* Progress bar style */} 
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden border border-gray-600">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Generated Email Display */} 
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 flex items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-200 truncate flex-1" aria-live="polite">
            {generatedEmail || <span className="text-gray-500 italic">Chưa có email biến thể</span>}
          </span>
          <button
            onClick={copyToClipboard}
            disabled={!generatedEmail}
            className="text-gray-400 hover:text-blue-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0 p-1"
            aria-label="Sao chép email đã tạo"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
        
        {/* Info Panel - Overlay */} 
        {showInfo && (
           <div 
              className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm z-20 flex items-center justify-center p-4"
              onClick={() => setShowInfo(false)} // Close on overlay click
            >
               <div 
                 className="bg-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-sm sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] flex flex-col shadow-2xl"
                 onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
                >
                   <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
                       <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400"/> Thông Tin Tính Năng
                       </h3>
                       <button onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Đóng thông tin">
                           <FontAwesomeIcon icon={faTimes} />
                       </button>
                   </div>
                   <div className="text-sm text-gray-300 space-y-3 leading-relaxed flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700/50">
                      <p>
                          Công cụ này tạo ra các địa chỉ email "biến thể" từ một email gốc. Các biến thể này thường vẫn trỏ về cùng một hộp thư đến nhưng có thể hữu ích cho việc đăng ký nhiều tài khoản hoặc bộ lọc email.
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-400">
                         <li><strong className="text-gray-200">Thêm dấu chấm (.):</strong> Gmail bỏ qua dấu chấm trong tên người dùng (vd: <code className="text-xs bg-white/10 px-1 rounded text-gray-200">u.s.er@gmail.com</code> → <code className="text-xs bg-white/10 px-1 rounded text-gray-200">user@gmail.com</code>).</li>
                         <li><strong className="text-gray-200">Chữ hoa/thường:</strong> Một số dịch vụ (không phải Gmail) có thể phân biệt chữ hoa/thường (vd: <code className="text-xs bg-white/10 px-1 rounded text-gray-200">UserName@domain.com</code>).</li>
                         <li><strong className="text-gray-200">Hậu tố (+suffix):</strong> Gmail và một số dịch vụ khác bỏ qua mọi thứ sau dấu <code className="text-xs bg-white/10 px-1 rounded text-gray-200">+</code> (vd: <code className="text-xs bg-white/10 px-1 rounded text-gray-200">user+news@gmail.com</code> → <code className="text-xs bg-white/10 px-1 rounded text-gray-200">user@gmail.com</code>).</li>
                      </ul>
                       <p>
                           <strong className="text-yellow-400">Lưu ý:</strong> Khả năng hoạt động của các biến thể phụ thuộc vào nhà cung cấp dịch vụ email của bạn. Gmail hỗ trợ đầy đủ các tính năng này. Các dịch vụ khác có thể khác nhau.
                       </p>
                        <p>
                           Việc tạo <strong className="text-gray-200">tất cả</strong> biến thể có thể mất nhiều thời gian và tạo ra file rất lớn nếu tên người dùng dài hoặc hậu tố tối đa lớn. Giới hạn hậu tố được khuyến nghị là dưới 10000.
                       </p>
                   </div>
                    <button onClick={() => setShowInfo(false)} className="mt-5 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                       Đã hiểu
                   </button>
               </div>
           </div>
       )}
      </div>
    </ToastProvider>
  );
};

// Giữ lại tên export gốc để không phá vỡ import ở trang index
// Bạn nên đổi tên tệp thành EmailGenerator.tsx và cập nhật import ở trang index
export default EmailGenerator;