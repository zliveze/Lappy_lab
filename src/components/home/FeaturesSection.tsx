import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faBolt, faCopy, faSync } from '@fortawesome/free-solid-svg-icons';

export default function FeaturesSection() {
  return (
    <div className="mt-8 lg:mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow animate-fadeInUp delay-100">
          <div className="text-3xl text-primary mb-4">
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h3 className="text-xl font-bold mb-2">An Toàn</h3>
          <p className="text-gray-600">Sử dụng thuật toán mã hóa tiên tiến để tạo ID độc nhất</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow animate-fadeInUp delay-200">
          <div className="text-3xl text-primary mb-4">
            <FontAwesomeIcon icon={faBolt} />
          </div>
          <h3 className="text-xl font-bold mb-2">Nhanh Chóng</h3>
          <p className="text-gray-600">Tạo ID ngay lập tức với một cú nhấp chuột</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow animate-fadeInUp delay-300">
          <div className="text-3xl text-primary mb-4">
            <FontAwesomeIcon icon={faCopy} />
          </div>
          <h3 className="text-xl font-bold mb-2">Dễ Sử Dụng</h3>
          <p className="text-gray-600">Sao chép ID dễ dàng với nút copy tích hợp</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow animate-fadeInUp delay-400">
          <div className="text-3xl text-primary mb-4">
            <FontAwesomeIcon icon={faSync} />
          </div>
          <h3 className="text-xl font-bold mb-2">Tự Động</h3>
          <p className="text-gray-600">Tự động cập nhật và đồng bộ ID trên mọi thiết bị</p>
        </div>
      </div>
    </div>
  );
} 