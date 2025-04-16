import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent } from 'react';
import { toast } from 'react-hot-toast';
import ToastProvider from './ToastProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faRandom, faDownload, faCopy, faInfoCircle, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

// Kiểu dữ liệu cho message từ Worker
interface WorkerMessageData {
  type: 'progress' | 'complete' | 'result' | 'error';
  progress?: number;
  totalVariants?: number;
  variants?: string[];
  error?: string;
}

/**
 * EmailGenerator component ... (JSDoc giữ nguyên) ...
 */
const EmailGenerator = () => {
  // Khai báo kiểu rõ ràng cho state
  const [email, setEmail] = useState<string>('');
  const [maxSuffix, setMaxSuffix] = useState<number>(999);
  const [includeCaseVariants, setIncludeCaseVariants] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [totalVariants, setTotalVariants] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const workerRef = useRef<Worker | null>(null);
  const estimate = useRef<number | typeof Infinity>(0); // Ước tính có thể là Infinity

  // ... (useEffect hooks for worker and estimate - giữ nguyên logic) ...
  useEffect(() => {
    const workerUrl = new URL('/emailWorker.js', window.location.origin).toString();
    let workerInstance: Worker | null = null;
    try {
        workerInstance = new Worker(workerUrl);
        workerInstance.addEventListener('message', handleWorkerMessage);
        workerRef.current = workerInstance;
    } catch (e) { console.error("Failed to create worker:", e); toast.error("Không thể khởi tạo bộ xử lý nền."); }
    return () => { if (workerInstance) { workerInstance.removeEventListener('message', handleWorkerMessage); workerInstance.terminate(); } workerRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { estimate.current = estimateVariantCount(); // eslint-disable-next-line react-hooks/exhaustive-deps 
}, [email, maxSuffix, includeCaseVariants]);


  // Thêm kiểu cho tham số event
  const handleWorkerMessage = (e: MessageEvent<WorkerMessageData>) => {
    const { type, progress: workerProgress, totalVariants: workerTotal, variants, error: workerError } = e.data;
    
    if (type === 'progress') {
      setProgress(workerProgress ?? 0); // Fallback nếu progress là undefined
      setTotalVariants(workerTotal ?? 0); // Fallback nếu totalVariants là undefined
    } else if (type === 'complete') {
      toast.dismiss('generating');
      toast.success(`Hoàn thành! Tổng: ${formatNumber(workerTotal ?? 0)} biến thể.`);
      workerRef.current?.postMessage({ action: 'getResults' });
    } else if (type === 'result') {
      downloadVariants(variants ?? []); // Fallback nếu variants là undefined
      setIsGenerating(false);
      setProgress(100);
    } else if (type === 'error') {
        console.error("Worker error:", workerError);
        toast.dismiss('generating');
        toast.error(`Lỗi xử lý nền: ${workerError ?? 'Không xác định'}`);
        setIsGenerating(false);
    }
  };

  // --- Các hàm xử lý logic - Thêm kiểu tham số và trả về --- 

  const insertDots = (username: string, dotsPositions: number[]): string => {
     const result = [...username];
     for (const pos of [...dotsPositions].sort((a, b) => b - a)) {
       result.splice(pos, 0, '.');
     }
     return result.join('');
   };

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

  const generateRandomSuffix = (max: number): string => {
     return Math.floor(Math.random() * (max + 1)).toString();
   };

  // Hàm generateRandomVariant không trả về gì (void)
  const generateRandomVariant = (): void => {
     if (!isValidEmail(email)) { toast.error('Vui lòng nhập email hợp lệ.'); return; }
     const [username, domain] = email.split('@');
     if (!username || !domain) { toast.error('Định dạng email không đúng.'); return; }
     const usernameVariants = generateDotVariants(username);
     const randomUsername = usernameVariants[Math.floor(Math.random() * usernameVariants.length)];
     let finalUsername = randomUsername;
     if (includeCaseVariants && Math.random() > 0.7) {
       const alphaPositions = [...randomUsername.matchAll(/[a-zA-Z]/g)].map(m => m.index!);
       if (alphaPositions.length > 0) {
         const posToChange = alphaPositions[Math.floor(Math.random() * alphaPositions.length)];
         const chars = [...randomUsername];
         chars[posToChange] = chars[posToChange].toLowerCase() === chars[posToChange] ? chars[posToChange].toUpperCase() : chars[posToChange].toLowerCase();
         finalUsername = chars.join('');
       }
     }
     const shouldAddSuffix = Math.random() > 0.5;
     const randomEmail = shouldAddSuffix ? `${finalUsername}+${generateRandomSuffix(Math.min(maxSuffix, 9999))}@${domain}` : `${finalUsername}@${domain}`;
     setGeneratedEmail(randomEmail);
     toast.success('Đã tạo email ngẫu nhiên!');
   };

  const generateAllVariants = (): void => {
     if (!isValidEmail(email)) { toast.error('Vui lòng nhập email hợp lệ.'); return; }
     if (!workerRef.current) { toast.error("Bộ xử lý nền chưa sẵn sàng, vui lòng thử lại."); return; }
     setIsGenerating(true); setProgress(0); setTotalVariants(0);
     toast.loading('Đang chuẩn bị tạo biến thể...', { id: 'generating' });
     const safeMaxSuffix = Math.min(maxSuffix, 99999);
     workerRef.current.postMessage({ action: 'init', email, maxSuffix: safeMaxSuffix, includeCaseVariants, batchSize: 1000 });
   };

  const downloadVariants = (variants: string[]): void => {
     if (!variants || variants.length === 0) { toast.error("Không có dữ liệu biến thể để tải xuống."); return; }
     try {
       const content = variants.join('\n');
       const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
       const url = URL.createObjectURL(blob);
       const a = document.createElement('a'); a.href = url;
       a.download = `email_variants_${email.split('@')[0] || 'list'}.txt`;
       document.body.appendChild(a); a.click(); document.body.removeChild(a);
       URL.revokeObjectURL(url);
       toast.dismiss('generating');
       toast.success("Đã tải xuống tệp biến thể!");
     } catch (error) { console.error("Download error:", error); toast.error("Không thể tạo tệp tải xuống."); setIsGenerating(false); }
   };

  const isValidEmail = (emailInput: string): boolean => {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
   };

  const estimateVariantCount = (): number | typeof Infinity => {
     if (!email || !isValidEmail(email)) return 0;
     const [username = ''] = email.split('@');
     if (username.length === 0) return 0;
     if (username.length > 15) return Infinity;
     try {
       const dotCombinations = 1 << (username.length - 1);
       let caseMultiplier = 1;
       if (includeCaseVariants) {
           const alphaCount = username.replace(/[^a-zA-Z]/g, '').length;
           caseMultiplier = 1 + (alphaCount > 0 ? alphaCount : 0) + (alphaCount > 1 ? (alphaCount * (alphaCount - 1)) / 2 : 0);
       }
       const suffixCount = maxSuffix >= 0 ? maxSuffix + 1 : 1; 
       const total = dotCombinations * caseMultiplier * suffixCount;
       return total > 1_000_000_000 ? Infinity : total;
     } catch (e) { return Infinity; }
   };

  const formatNumber = (num: number | typeof Infinity): string => {
     if (num === Infinity) return "Rất nhiều";
     if (isNaN(num)) return "0";
     return num.toLocaleString('en-US');
   };

  const copyToClipboard = (): void => {
     if (generatedEmail) {
       navigator.clipboard.writeText(generatedEmail)
         .then(() => toast.success('Đã sao chép email!'))
         .catch(err => { console.error('Clipboard copy failed:', err); toast.error('Không thể sao chép.'); });
     }
   };

  const stopGeneration = (): void => {
     if (workerRef.current) {
       workerRef.current.terminate(); workerRef.current = null;
       const workerUrl = new URL('/emailWorker.js', window.location.origin).toString();
       try { const newWorker = new Worker(workerUrl); newWorker.addEventListener('message', handleWorkerMessage); workerRef.current = newWorker; } 
       catch(e) { console.error("Failed to re-initialize worker:", e); toast.error("Không thể khởi động lại bộ xử lý."); }
     }
     setIsGenerating(false); setProgress(0); setTotalVariants(0);
     toast.dismiss('generating');
     toast.error("Đã dừng tạo biến thể.");
   };

   // Thêm kiểu cho event handlers của input/checkbox
   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
     setEmail(event.target.value);
   };

   const handleSuffixChange = (event: ChangeEvent<HTMLInputElement>): void => {
     setMaxSuffix(Math.max(0, parseInt(event.target.value, 10)) || 0);
   };

   const handleCaseChange = (event: ChangeEvent<HTMLInputElement>): void => {
     setIncludeCaseVariants(event.target.checked);
   };

   // Thêm kiểu cho MouseEvent nếu cần (ví dụ: onClick)
   const handleInfoToggle = (event: MouseEvent<HTMLButtonElement>): void => {
      setShowInfo(!showInfo);
   };

  // --- Phần JSX --- 
  return (
    <ToastProvider>
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg animate-fadeInUp h-full flex flex-col relative border border-white/10">
        {/* Header Section */} 
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
           {/* ... (Header content) ... */} 
            <div className="flex items-center gap-3"> <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0"> <FontAwesomeIcon icon={faEnvelope} className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" /> </div> <div> <h2 className="text-lg font-semibold text-white">Email Variant Generator</h2> <p className="text-xs text-gray-400">Tạo biến thể email</p> </div> </div> <button onClick={handleInfoToggle} className="text-gray-500 hover:text-blue-400 transition-colors p-1 ml-2 rounded-full hover:bg-white/10 flex-shrink-0" aria-label={showInfo ? "Đóng thông tin" : "Xem thông tin"}> <FontAwesomeIcon icon={showInfo ? faTimes : faInfoCircle} /> </button>
        </div>
        
        {/* Input Section */} 
        <div className="mb-5">
          <label htmlFor="emailInput" className="block text-sm font-medium text-gray-300 mb-1.5"> Nhập email gốc </label> 
          <input id="emailInput" type="email" value={email} onChange={handleEmailChange} placeholder="ví dụ: username@gmail.com" aria-label="Email gốc" className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" /> 
          <p className="text-xs text-gray-500 mt-1.5"> Ước tính số lượng biến thể: {formatNumber(estimate.current)} </p>
        </div>
           
        {/* Options Section */} 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
           <div> 
             <label htmlFor="maxSuffix" className="block text-sm font-medium text-gray-300 mb-1.5"> Hậu tố tối đa (+suffix) </label> 
             <input id="maxSuffix" type="number" min="0" max="99999" value={maxSuffix} onChange={handleSuffixChange} aria-label="Hậu tố tối đa" className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" /> 
           </div> 
           <div className="flex items-center pt-2 sm:pt-6 sm:justify-end"> 
             <label htmlFor="includeCaseVariants" className="flex items-center cursor-pointer"> 
               <input id="includeCaseVariants" type="checkbox" checked={includeCaseVariants} onChange={handleCaseChange} className="w-4 h-4 text-blue-500 bg-gray-600 border-gray-500 rounded focus:ring-blue-600 focus:ring-offset-gray-800 focus:ring-2 transition cursor-pointer" /> 
               <span className="ml-2 text-sm font-medium text-gray-300 select-none"> Bao gồm chữ hoa/thường </span> 
             </label> 
           </div>
          </div>
         
        {/* Action Buttons */} 
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button onClick={generateRandomVariant} disabled={isGenerating || !isValidEmail(email)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"> <FontAwesomeIcon icon={faRandom} /> Tạo Ngẫu Nhiên </button> 
          <button onClick={generateAllVariants} disabled={isGenerating || !isValidEmail(email)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"> {isGenerating ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faDownload} />} {isGenerating ? 'Đang tạo...' : 'Tạo & Tải Tất Cả'} </button> 
          {isGenerating && <button onClick={stopGeneration} className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-600/40 hover:text-red-300 transition-colors flex-shrink-0" aria-label="Dừng tạo biến thể"> <FontAwesomeIcon icon={faTimes} /> </button>} 
          </div>
         
        {/* Generation Progress */} 
          {isGenerating && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1"> <span>{`Tiến độ: ${progress}%`}</span> <span>{`Đã tạo: ${formatNumber(totalVariants)}`}</span> </div> 
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden border border-gray-600"> <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} ></div> </div>
            </div>
          )}
         
        {/* Generated Email Display */} 
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 flex items-center justify-between gap-3 mt-auto">
          <span className="text-sm text-gray-200 truncate flex-1" aria-live="polite"> {generatedEmail || <span className="text-gray-500 italic">Chưa có email biến thể</span>} </span> 
          <button onClick={copyToClipboard} disabled={!generatedEmail} className="text-gray-400 hover:text-blue-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors flex-shrink-0 p-1" aria-label="Sao chép email đã tạo"> <FontAwesomeIcon icon={faCopy} /> </button>
              </div>
       
        {/* Info Panel - Overlay */} 
        {showInfo && (
           <div 
              className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm z-20 flex items-center justify-center p-4"
              onClick={() => setShowInfo(false)} 
            >
               <div 
                 className="bg-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-sm sm:max-w-lg max-h-[85vh] sm:max-h-[80vh] flex flex-col shadow-2xl" 
                 onClick={(e) => e.stopPropagation()} 
                >
                  {/* ... (Info Panel Content - giữ nguyên) ... */} 
                   <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10"> <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2"> <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400"/> Thông Tin </h3> <button onClick={() => setShowInfo(false)} className="text-gray-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Đóng thông tin"> <FontAwesomeIcon icon={faTimes} /> </button> </div> <div className="text-sm text-gray-300 space-y-3 leading-relaxed flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700/50"> <p> Công cụ này tạo ra các địa chỉ email "biến thể" từ một email gốc... </p> <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-400"> <li><strong className="text-gray-200">Thêm dấu chấm (.):</strong> ...</li> <li><strong className="text-gray-200">Chữ hoa/thường:</strong> ...</li> <li><strong className="text-gray-200">Hậu tố (+suffix):</strong> ...</li> </ul> <p> <strong className="text-yellow-400">Lưu ý:</strong> ... </p> <p> Việc tạo <strong className="text-gray-200">tất cả</strong> biến thể có thể mất nhiều thời gian... </p> </div> <button onClick={() => setShowInfo(false)} className="mt-5 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"> Đã hiểu </button>
               </div>
           </div>
       )}
      </div>
    </ToastProvider>
  );
};

export default EmailGenerator; 