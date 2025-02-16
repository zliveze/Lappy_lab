import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CURSOR_RULES, WINDSURF_RULES } from './ruleTemplates';

export default function RulesSection() {
  const [copiedCursor, setCopiedCursor] = useState(false);
  const [copiedWindsurf, setCopiedWindsurf] = useState(false);

  const copyToClipboard = (text: string, type: 'cursor' | 'windsurf') => {
    navigator.clipboard.writeText(text);
    if (type === 'cursor') {
      setCopiedCursor(true);
      setTimeout(() => setCopiedCursor(false), 2000);
    } else {
      setCopiedWindsurf(true);
      setTimeout(() => setCopiedWindsurf(false), 2000);
    }
  };

  return (
    <section id="examples" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Mẫu Rule Files
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Tham khảo các mẫu cấu hình cho Cursor và Windsurf IDE
          </p>
          <a 
            href="https://github.com/grapeot/devin.cursorrules"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 hover:text-blue-800"
          >
            Nguồn: github.com/grapeot/devin.cursorrules
          </a>
          <br />
          <div className="flex items-center justify-center gap-4">
            <Image 
              src="https://foxfio.com/wp-content/uploads/2025/01/logo-cursor.jpg"
              alt="Cursor IDE Logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <a href='https://cursor.directory/' target='_blank' rel='noopener noreferrer'
              className='text-blue-600 hover:text-blue-800'
            >
              Thư viện rule
            </a>
          </div>
        </div>

        {/* Grid layout cho 2 rule files */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cursor Rules */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                .cursorrules
              </h3>
              <button
                onClick={() => copyToClipboard(CURSOR_RULES, 'cursor')}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={copiedCursor ? faCheck : faCopy} />
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto h-[400px]">
                <code className="text-gray-300 text-sm">{CURSOR_RULES}</code>
              </pre>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Tính năng chính:
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Tự động hoàn thiện code với Claude 3 Opus</li>
                  <li>Tạo documentation và test với GPT-4</li>
                  <li>Refactoring và sửa lỗi với Claude 3 Sonnet</li>
                  <li>Tự động import và format code</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Windsurf Rules */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                .windsurfrules
              </h3>
              <button
                onClick={() => copyToClipboard(WINDSURF_RULES, 'windsurf')}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={copiedWindsurf ? faCheck : faCopy} />
              </button>
            </div>
            <div className="p-6">
              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto h-[400px]">
                <code className="text-gray-300 text-sm">{WINDSURF_RULES}</code>
              </pre>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Tính năng chính:
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Code completion và chat với Claude 3 Sonnet</li>
                  <li>Tạo documentation với GPT-4</li>
                  <li>Gợi ý code với DeepSeek (tiết kiệm credits)</li>
                  <li>Tự động import và format code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 