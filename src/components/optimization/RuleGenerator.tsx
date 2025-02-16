import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faCode, faFileCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';

const PROJECT_TEMPLATE = `# Thông Tin Dự Án
Tên Dự Án: 
Công Nghệ Sử Dụng: [Liệt kê các công nghệ]
Tính Năng Chính: [Liệt kê tính năng]

# Chi Tiết Phát Triển
- Framework/Thư viện: 
- Cơ Sở Dữ Liệu: 
- APIs/Tích Hợp:
- Công Cụ Testing:
- Triển Khai:

# Lựa Chọn IDE
Chọn một:
[ ] Cursor IDE
[ ] Windsurf IDE

# Yêu Cầu Bổ Sung
- Quy Tắc Code:
- Số Lượng Thành Viên:
- Yêu Cầu Hiệu Suất:
- Lưu Ý Đặc Biệt:`;

const getPromptTemplate = (details: string) => {
  // Extract project info from Vietnamese input
  const projectInfo = {
    name: details.match(/Tên Dự Án:\s*(.+)/)?.[1] || '',
    tech: details.match(/Công Nghệ Sử Dụng:\s*(.+)/)?.[1] || '',
    features: details.match(/Tính Năng Chính:\s*(.+)/)?.[1] || '',
    framework: details.match(/Framework\/Thư viện:\s*(.+)/)?.[1] || '',
    database: details.match(/Cơ Sở Dữ Liệu:\s*(.+)/)?.[1] || '',
    deployment: details.match(/Triển Khai:\s*(.+)/)?.[1] || '',
    ide: details.includes('Cursor IDE') ? 'Cursor' : 'Windsurf'
  };

  return `Based on the following project details:
Project Name: ${projectInfo.name}
Tech Stack: ${projectInfo.tech}
Features: ${projectInfo.features}
Framework: ${projectInfo.framework}
Database: ${projectInfo.database}
Deployment: ${projectInfo.deployment}
IDE Choice: ${projectInfo.ide} IDE

Please generate a rule file exactly matching this format from https://github.com/grapeot/devin.cursorrules:

# Instructions

During your interaction with the user, if you find anything reusable in this project (e.g. version of a library, model name), especially about a fix to a mistake you made or a correction you received, you should take note in the \`Lessons\` section in the \`.cursorrules\` file so you will not make the same mistake again. 

You should also use the \`.cursorrules\` file as a Scratchpad to organize your thoughts. When you receive a new task, first review the Scratchpad content, clear old tasks if necessary, explain the new task, and plan your steps. Use todo markers like:
[X] Task 1
[ ] Task 2

# Tools

Note all the tools are in python. So in the case you need to do batch processing, you can always consult the python files and write your own script.

## Screenshot Verification
For visual testing and verification, use:
\`\`\`bash
venv/bin/python tools/screenshot_utils.py URL [--output OUTPUT] [--width WIDTH] [--height HEIGHT]
\`\`\`

## LLM
For code assistance and reviews:
\`\`\`bash
venv/bin/python ./tools/llm_api.py --prompt "Your question" --provider "anthropic"
\`\`\`

The LLM API supports multiple providers:
- OpenAI (default, model: gpt-4o)
- Azure OpenAI (model: configured via AZURE_OPENAI_MODEL_DEPLOYMENT)
- DeepSeek (model: deepseek-chat)
- Anthropic (model: claude-3-sonnet-20240229)
- Gemini (model: gemini-pro)

# Lessons

## User Specified Lessons
[Generate lessons specific to ${projectInfo.name} project requirements]

## ${projectInfo.ide} learned
[Generate IDE-specific lessons based on the project tech stack]

# Scratchpad

**Current Task: Project Setup for ${projectInfo.name}**

Progress:
[X] Initialize project with ${projectInfo.tech}
[X] Set up development environment
[ ] Configure database (${projectInfo.database})
[ ] Set up testing framework
[ ] Configure deployment to ${projectInfo.deployment}

Next Steps:
1. Set up project structure
2. Configure development tools
3. Implement core features
4. Set up CI/CD pipeline`;
};

export default function RuleGenerator() {
  const [projectDetails, setProjectDetails] = useState('');
  const [generatedRule, setGeneratedRule] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRule = async () => {
    if (!projectDetails.trim()) {
      toast.error('Vui lòng nhập thông tin dự án!');
      return;
    }

    const loadingToast = toast.loading('Đang tạo rule file...');
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=AIzaSyCLw9O7jCGzOGwb-BVbVrvz9JxdQdmnr5g",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: getPromptTemplate(projectDetails)
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setGeneratedRule(data.candidates[0].content.parts[0].text);
        toast.success('Rule file đã được tạo thành công!', {
          id: loadingToast,
        });
      } else {
        throw new Error('Không thể tạo rule file');
      }
    } catch (error) {
      console.error('Error generating rule:', error);
      toast.error('Có lỗi xảy ra khi tạo rule file!', {
        id: loadingToast,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRule);
    setCopied(true);
    toast.success('Đã sao chép vào clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(to right, #1a1a1a 1px, transparent 1px)',
               backgroundSize: '24px 24px',
               opacity: 0.03
             }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#059669',
              color: '#fff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#dc2626',
              color: '#fff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
          loading: {
            style: {
              background: '#1e40af',
              color: '#fff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full text-blue-600 text-sm font-medium mb-4">
            <FontAwesomeIcon icon={faLightbulb} className="text-blue-500" />
            AI-Powered Generator
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Rule File Generator
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Tạo file cấu hình tối ưu cho dự án của bạn với công nghệ AI tiên tiến
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="group bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden 
                         hover:shadow-xl transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                                flex items-center justify-center border border-blue-500/20">
                    <FontAwesomeIcon icon={faFileCode} className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 
                                                                bg-clip-text text-transparent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Thông Tin Dự Án
                    </h3>
                    <p className="text-sm text-gray-500">Mô tả chi tiết dự án của bạn</p>
                  </div>
                </div>
                <button
                  onClick={() => setProjectDetails(PROJECT_TEMPLATE)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium
                            hover:bg-blue-100 transition-colors"
                >
                  Dùng Mẫu
                </button>
              </div>
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full h-[450px] p-6 text-gray-800 bg-gray-50/50 rounded-xl
                          border border-gray-100 focus:border-blue-500/20
                          focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                          transition-all duration-300 resize-none
                          font-mono text-sm leading-relaxed"
                placeholder="Nhập thông tin dự án..."
              />
            </div>
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
              <button
                onClick={generateRule}
                disabled={isLoading || !projectDetails}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 
                          bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                          rounded-xl font-medium text-sm
                          hover:from-blue-700 hover:to-purple-700
                          disabled:opacity-50 disabled:cursor-not-allowed 
                          transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent 
                               skew-x-[45deg] group-hover:-translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center gap-2">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <FontAwesomeIcon icon={faCode} className="text-lg" />
                  )}
                  <span className="tracking-wide">
                    {isLoading ? 'Đang Tạo Rule File...' : 'Tạo Rule File'}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="group bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden
                         hover:shadow-xl transition-all duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                                flex items-center justify-center border border-purple-500/20">
                    <FontAwesomeIcon icon={faCode} className="text-lg bg-gradient-to-r from-purple-500 to-pink-500 
                                                           bg-clip-text text-transparent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Rule File
                    </h3>
                    <p className="text-sm text-gray-500">File cấu hình được tạo tự động</p>
                  </div>
                </div>
                {generatedRule && (
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg 
                              hover:bg-purple-100 transition-colors
                              flex items-center gap-2 text-sm font-medium"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                    {copied ? 'Đã Sao Chép' : 'Sao Chép'}
                  </button>
                )}
              </div>
              <div className="relative h-[450px] rounded-xl overflow-hidden group">
                <pre className="absolute inset-0 p-6 bg-gray-900 overflow-auto
                               font-mono text-sm leading-relaxed">
                  <code className="text-gray-300">
                    {generatedRule || &apos;Rule file sẽ hiển thị ở đây...&apos;}
                  </code>
                </pre>
                {!generatedRule && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95">
                    <div className="text-center">
                      <FontAwesomeIcon icon={faCode} className="text-4xl text-gray-600 mb-4" />
                      <p className="text-gray-400">Nhập thông tin dự án và nhấn &quot;Tạo Rule File&quot;</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 