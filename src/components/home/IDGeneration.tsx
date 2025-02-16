import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faShieldAlt, faKey, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { generateIds, copyToClipboard } from '@/utils/idGenerator';
import Swal from 'sweetalert2';

export default function IDGeneration() {
  const [ids, setIds] = useState({
    macMachineId: "Nhấn \"Tạo ID Mới\" để tạo ID",
    sqmId: "Nhấn \"Tạo ID Mới\" để tạo ID",
    machineId: "Nhấn \"Tạo ID Mới\" để tạo ID",
    devDeviceId: "Nhấn \"Tạo ID Mới\" để tạo ID"
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateIds = async () => {
    try {
      setIsGenerating(true);
      
      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Đang tạo ID mới...',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      const newIds = await generateIds();
      setIds(newIds);

      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Đã tạo ID mới thành công!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Có lỗi xảy ra khi tạo ID',
        showConfirmButton: false,
        timer: 1500
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 mt-12 mx-auto shadow-lg max-w-7xl w-[95%] animate-fadeInUp">
      <div className="space-y-4">
        {/* Header Section - More Impressive */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                           rounded-lg flex items-center justify-center border border-blue-500/20">
              <FontAwesomeIcon icon={faKey} className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 
                                                      bg-clip-text text-transparent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                            bg-clip-text text-transparent">
                Tạo ID Mới
              </h2>
              <p className="text-sm text-gray-500">Tự động tạo ID ngẫu nhiên và an toàn</p>
            </div>
          </div>
          <button
            onClick={handleGenerateIds}
            disabled={isGenerating}
            className={`px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       text-white rounded-lg hover:scale-105 transition-all duration-300 
                       flex items-center gap-2 font-medium shadow-md
                       ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <FontAwesomeIcon 
              icon={faSync} 
              className={`text-base ${isGenerating ? 'animate-spin' : ''}`} 
            />
            {isGenerating ? 'Đang tạo...' : 'Tạo ID Mới'}
          </button>
        </div>

        {/* ID Display Grid - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Mac Machine ID', value: ids.macMachineId, icon: faShieldAlt },
            { label: 'SQM ID', value: ids.sqmId, icon: faKey },
            { label: 'Machine ID', value: ids.machineId, icon: faShieldAlt },
            { label: 'Device ID', value: ids.devDeviceId, icon: faKey }
          ].map((item) => (
            <div key={item.label} 
                 className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-100 
                          transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={item.icon} className="text-primary/60 text-sm" />
                  <label className="font-medium text-gray-700 text-sm">{item.label}</label>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <FontAwesomeIcon icon={faClipboard} className="text-base" />
                </button>
              </div>
              <div className="font-mono text-xs bg-white p-3 rounded-md border border-gray-200 
                            break-all group-hover:border-primary/20 transition-colors">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 