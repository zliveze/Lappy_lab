import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faShieldAlt, faKey, faClipboard, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { generateIds, copyToClipboard } from '@/utils/idGenerator';
import { toast } from 'react-hot-toast';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * Định nghĩa kiểu cho đối tượng chứa các ID được tạo.
 */
interface GeneratedIds {
  macMachineId: string;
  sqmId: string;
  machineId: string;
  devDeviceId: string;
}

/**
 * IDGeneration component tạo và hiển thị các loại ID hệ thống khác nhau.
 * Cung cấp nút để tạo ID mới và sao chép từng ID vào clipboard.
 */
export default function IDGeneration() {
  const [ids, setIds] = useState<GeneratedIds>({
    macMachineId: "(chưa tạo)",
    sqmId: "(chưa tạo)",
    machineId: "(chưa tạo)",
    devDeviceId: "(chưa tạo)"
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateIds = async () => {
    setIsGenerating(true);
    const toastId = toast.loading('Đang tạo ID mới...');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newIds: GeneratedIds = await generateIds();
      setIds(newIds);
      toast.success('Đã tạo ID mới thành công!', { id: toastId });
    } catch (error) {
      console.error("Lỗi tạo ID:", error);
      toast.error('Có lỗi xảy ra khi tạo ID', { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (value: string, label: string) => {
    if (value && value !== "(chưa tạo)") {
      copyToClipboard(value);
      toast.success(`Đã sao chép ${label}!`);
    } else {
      toast.error("Chưa có ID để sao chép.");
    }
  };

  const idItems: Array<{ label: string; value: string; icon: IconDefinition; color: string }> = [
    { label: 'Mac Machine ID', value: ids.macMachineId, icon: faShieldAlt, color: 'text-blue-400' },
    { label: 'SQM ID', value: ids.sqmId, icon: faKey, color: 'text-purple-400' },
    { label: 'Machine ID', value: ids.machineId, icon: faShieldAlt, color: 'text-green-400' },
    { label: 'Device ID', value: ids.devDeviceId, icon: faKey, color: 'text-pink-400' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-lg animate-fadeInUp h-full flex flex-col border border-white/10">
      <div className="space-y-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 pb-4 border-b border-white/10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 
                           rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
              <FontAwesomeIcon icon={faKey} className="text-lg bg-gradient-to-r from-blue-400 to-purple-400 
                                                     bg-clip-text text-transparent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">ID Generator</h2>
              <p className="text-xs text-gray-400">Tạo ID ngẫu nhiên và an toàn</p>
            </div>
          </div>
          <button
            onClick={handleGenerateIds}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <FontAwesomeIcon 
              icon={isGenerating ? faSpinner : faSync} 
              className={isGenerating ? 'animate-spin' : ''} 
            />
            {isGenerating ? 'Đang tạo...' : 'Tạo ID Mới'}
          </button>
        </div>

        {/* ID Display Grid - Cải thiện responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
          {idItems.map((item) => (
            <div key={item.label} 
                 className="group bg-gray-700/30 hover:bg-gray-700/60 p-3 sm:p-4 rounded-lg border border-gray-600/50 transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={item.icon} className={`text-sm ${item.color} w-4 h-4 flex-shrink-0`} />
                  <label className="font-medium text-gray-300 text-xs sm:text-sm truncate">{item.label}</label>
                </div>
                <button
                  onClick={() => handleCopy(item.value, item.label)}
                  disabled={!item.value || item.value === '(chưa tạo)'} 
                  className="text-gray-500 hover:text-blue-400 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors p-1 ml-1 flex-shrink-0"
                  aria-label={`Sao chép ${item.label}`}
                >
                  <FontAwesomeIcon icon={faClipboard} className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="font-mono text-[11px] sm:text-xs bg-gray-800/50 p-2 sm:p-3 rounded border border-gray-600/50 
                            break-all text-gray-400 group-hover:border-gray-500/50 transition-colors flex-1 flex items-center min-h-[36px] sm:min-h-[40px]">
                {item.value && item.value !== '(chưa tạo)' ? (
                  item.value
                ) : (
                  <span className="text-gray-500 italic">(chưa tạo)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 