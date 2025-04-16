import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import ToastProvider from './ToastProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRandom, faDownload, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const EmailGen = () => {
  const [email, setEmail] = useState('');
  const [maxSuffix, setMaxSuffix] = useState(999);
  const [includeCaseVariants, setIncludeCaseVariants] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [totalVariants, setTotalVariants] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Hủy worker khi unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  // Hàm chèn dấu chấm vào các vị trí chỉ định
  const insertDots = (username: string, dotsPositions: number[]) => {
    const result = [...username];
    // Chèn từ cuối đến đầu để tránh sai lệch vị trí
    for (const pos of [...dotsPositions].sort((a, b) => b - a)) {
      result.splice(pos, 0, '.');
    }
    return result.join('');
  };

  // Tạo các biến thể email với dấu chấm
  const generateDotVariants = (username: string) => {
    const positions = Array.from({ length: username.length - 1 }, (_, i) => i + 1);
    const variants = new Set<string>();
    variants.add(username); // Thêm phiên bản không có dấu chấm

    // Sử dụng bit manipulation để tạo tất cả các tổ hợp
    const totalCombinations = 1 << positions.length;
    for (let mask = 1; mask < totalCombinations; mask++) {
      const dots = positions.filter((_, i) => (mask >> i) & 1);
      const dottedUsername = insertDots(username, dots);
      
      // Kiểm tra không có dấu chấm liên tiếp hoặc ở đầu/cuối
      if (!dottedUsername.includes('..') && 
          !dottedUsername.startsWith('.') && 
          !dottedUsername.endsWith('.')) {
        variants.add(dottedUsername);
      }
    }
    
    return [...variants];
  };

  // Tạo ngẫu nhiên một hậu tố từ 0 đến maxSuffix
  const generateRandomSuffix = (max: number) => {
    return Math.floor(Math.random() * (max + 1)).toString();
  };

  // Tạo ngẫu nhiên một email biến thể
  const generateRandomVariant = () => {
    if (!isValidEmail(email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    const [username, domain] = email.split('@');
    const usernameVariants = generateDotVariants(username);
    const randomUsername = usernameVariants[Math.floor(Math.random() * usernameVariants.length)];
    
    // Nếu đã bật tính năng chữ hoa/thường, có 30% cơ hội thay đổi 1 ký tự chữ hoa/thường
    let finalUsername = randomUsername;
    if (includeCaseVariants && Math.random() > 0.7) {
      const alphaPositions = [];
      for (let i = 0; i < randomUsername.length; i++) {
        if (/[a-zA-Z]/.test(randomUsername[i])) {
          alphaPositions.push(i);
        }
      }
      
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
    
    // 50% cơ hội thêm hậu tố
    const shouldAddSuffix = Math.random() > 0.5;
    const randomEmail = shouldAddSuffix 
      ? `${finalUsername}+${generateRandomSuffix(maxSuffix)}@${domain}`
      : `${finalUsername}@${domain}`;
    
    setGeneratedEmail(randomEmail);
    toast.success('Đã tạo email ngẫu nhiên');
  };

  // Tạo toàn bộ biến thể và xuất ra file
  const generateAllVariants = async () => {
    if (!isValidEmail(email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setTotalVariants(0);
    
    try {
      // Tạo worker nếu chưa có
      if (!workerRef.current) {
        // workerRef.current = new Worker(new URL('./emailWorker.ts', import.meta.url), { type: 'module' });
        workerRef.current = new Worker(
          URL.createObjectURL(
            new Blob([`importScripts('${window.location.origin}/emailWorker.js');`], 
            { type: 'application/javascript' })
          )
        );
      }

      // Theo dõi tiến trình
      workerRef.current.onmessage = (e) => {
        const { type, progress, totalVariants, variants } = e.data;
        
        if (type === 'progress') {
          setProgress(progress);
          setTotalVariants(totalVariants);
        } else if (type === 'complete') {
          toast.success(`Đã hoàn thành! Tổng số: ${formatNumber(totalVariants)} biến thể.`);
          // Yêu cầu kết quả để tải xuống
          workerRef.current?.postMessage({ action: 'getResults' });
        } else if (type === 'result') {
          // Tải xuống danh sách biến thể
          downloadVariants(variants);
          setIsGenerating(false);
          setProgress(100);
        }
      };

      // Gửi email để xử lý
      const batchSize = 1000; // Số lượng hậu tố được xử lý trong mỗi batch
      workerRef.current.postMessage({ 
        email, 
        maxSuffix: Math.min(maxSuffix, 9999), // Giới hạn để demo
        batchSize,
        includeCaseVariants,
        action: 'init'
      });

      toast.loading('Đang tạo biến thể email...', { duration: 3000 });
    } catch (error) {
      console.error('Worker error:', error);
      toast.error('Có lỗi xảy ra khi tạo biến thể email');
      setIsGenerating(false);
    }
  };

  // Tạo file để tải xuống
  const downloadVariants = (variants: string[]) => {
    const content = variants.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email_variants.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Kiểm tra định dạng email
  const isValidEmail = (email: string) => {
    return email.includes('@') && email.split('@').length === 2;
  };

  // Ước tính số lượng biến thể
  const estimateVariantCount = () => {
    if (!email || !email.includes('@')) return 0;
    
    const [username, domain] = email.split('@');
    const isGmail = domain.toLowerCase() === 'gmail.com';
    const dotCount = 2 ** (username.length - 1); // Số lượng biến thể dấu chấm
    
    // Ước tính số biến thể chữ hoa/thường
    let caseCount = 1;
    if (includeCaseVariants) {
      const alphaCount = username.replace(/[^a-zA-Z]/g, '').length;
      // Giới hạn tối đa 3 vị trí để thay đổi chữ hoa/thường
      const maxPositions = Math.min(alphaCount, 3);
      for (let i = 1; i <= maxPositions; i++) {
        // Tổ hợp chập i của alphaCount vị trí
        caseCount += binomialCoefficient(alphaCount, i);
      }
    }
    
    // Với Gmail, mỗi username chỉ cần thêm một biến thể hậu tố
    if (isGmail) {
      return dotCount * caseCount * 2; // x2 vì mỗi biến thể có thể có hoặc không có hậu tố
    } else {
      return dotCount * caseCount * (maxSuffix + 1); // Mỗi username có thể có nhiều suffix khác nhau
    }
  };
  
  // Hàm tính hệ số nhị thức nCk
  const binomialCoefficient = (n: number, k: number) => {
    let res = 1;
    // Sử dụng C(n,k) = C(n,n-k)
    if (k > n - k) {
      k = n - k;
    }
    for (let i = 0; i < k; i++) {
      res *= (n - i);
      res /= (i + 1);
    }
    return Math.round(res);
  };

  // Định dạng số với locale 'en-US' để đảm bảo nhất quán giữa server và client
  const formatNumber = (num: number) => {
    // Sử dụng dấu phẩy làm dấu phân cách hàng nghìn
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Hiển thị giá trị placeholder cho generatedEmail
  const getGeneratedEmailDisplay = () => {
    if (generatedEmail) return generatedEmail;
    return <span className="text-gray-400">Chưa có email biến thể nào được tạo</span>;
  };

  return (
    <ToastProvider>
      <div className="bg-white rounded-xl p-6 shadow-lg animate-fadeInUp h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                           rounded-lg flex items-center justify-center border border-blue-500/20">
              <FontAwesomeIcon icon={faEnvelope} className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 
                                                     bg-clip-text text-transparent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                          bg-clip-text text-transparent">
                Trình Tạo Biến Thể Email
              </h2>
              <p className="text-sm text-gray-500">Tạo các biến thể email theo quy tắc Gmail</p>
            </div>
          </div>
          
          <button
            onClick={generateRandomVariant}
            disabled={!email || isGenerating}
            className={`px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       text-white rounded-lg hover:scale-105 transition-all duration-300 
                       flex items-center gap-2 font-medium shadow-md
                       ${isGenerating || !email ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <FontAwesomeIcon icon={faRandom} className={`text-base ${isGenerating ? 'animate-spin' : ''}`} />
            Tạo Email Ngẫu Nhiên
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Thông tin quy tắc Gmail */}
          <div className="relative">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="absolute right-0 top-0 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="text-base" />
            </button>
            
            {showInfo && (
              <div className="mt-2 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700 animate-fadeIn">
                <p className="font-medium mb-2">Quy tắc chuẩn hóa Gmail:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Vị trí các dấu <span className="font-mono">.</span> trong username <strong>được bỏ qua</strong></li>
                  <li>Phần sau dấu <span className="font-mono">+</span> <strong>được bỏ qua</strong> khi gửi email</li>
                  <li>Gmail <strong>phân biệt chữ hoa/thường</strong> trong username</li>
                  <li>Ví dụ: <span className="font-mono">john.doe@gmail.com</span>, <span className="font-mono">j.o.h.n.doe@gmail.com</span> và <span className="font-mono">johndoe+xyz@gmail.com</span> đều tương đương</li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Form nhập liệu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 font-medium text-sm">Email của bạn</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn (ví dụ: example@gmail.com)"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="maxSuffix" className="block text-gray-700 font-medium text-sm">Giới hạn hậu tố</label>
              <input
                type="number"
                id="maxSuffix"
                value={maxSuffix}
                onChange={(e) => setMaxSuffix(parseInt(e.target.value || '0'))}
                placeholder="Số lớn nhất cho hậu tố (ví dụ: 999)"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="includeCaseVariants"
                  checked={includeCaseVariants}
                  onChange={(e) => setIncludeCaseVariants(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeCaseVariants" className="ml-2 block text-gray-700 text-sm">
                  Thêm biến thể chữ hoa/thường
                </label>
              </div>
              
              <p className="text-gray-500 text-xs">
                {email.length > 0 && email.includes('@') && (
                  <>Với email này, có thể tạo khoảng {formatNumber(estimateVariantCount())} biến thể</>
                )}
              </p>
            </div>
          </div>
          
          {/* Nút xuất file */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={generateAllVariants}
              disabled={!email || isGenerating}
              className="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 
                        text-white rounded-lg hover:scale-105 transition-all duration-300 
                        flex items-center justify-center gap-2 font-medium shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FontAwesomeIcon icon={faDownload} className={isGenerating ? 'animate-spin' : ''} />
              {isGenerating ? 'Đang tạo...' : 'Tạo Tất Cả Biến Thể'}
            </button>
          </div>
          
          {/* Thanh tiến trình */}
          {isGenerating && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-700 mb-1">
                <span>Tiến trình</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {totalVariants > 0 && (
                <p className="text-gray-500 text-xs mt-1">Đã tạo {formatNumber(totalVariants)} biến thể</p>
              )}
            </div>
          )}
          
          {/* Hiển thị email biến thể */}
          <div className="space-y-3">
            <div className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-100 
                           transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary/60 text-sm" />
                  <label className="font-medium text-gray-700 text-sm">Email biến thể</label>
                </div>
                {generatedEmail && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedEmail);
                      toast.success('Đã sao chép vào clipboard');
                    }}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    <FontAwesomeIcon icon={faCopy} className="text-base" />
                  </button>
                )}
              </div>
              <div className="font-mono text-xs bg-white p-3 rounded-md border border-gray-200 
                              break-all group-hover:border-primary/20 transition-colors min-h-[40px] flex items-center">
                {getGeneratedEmailDisplay()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default EmailGen;