import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CURSOR_RULES, WINDSURF_RULES } from './ruleTemplates';
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
    <section id="generator" className="py-16 bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#059669',
              color: '#fff',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#dc2626',
              color: '#fff',
            },
          },
          loading: {
            style: {
              background: '#1e40af',
              color: '#fff',
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Tạo Rule File
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Nhập thông tin dự án của bạn để tạo file cấu hình tối ưu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Thông Tin Dự Án
                </h3>
                <button
                  onClick={() => setProjectDetails(PROJECT_TEMPLATE)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Dùng Mẫu
                </button>
              </div>
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full h-[500px] p-4 text-gray-800 border rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập thông tin dự án..."
              />
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={generateRule}
                disabled={isLoading || !projectDetails}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 
                          bg-blue-600 text-white rounded-lg font-medium
                          hover:bg-blue-700 disabled:opacity-50 
                          disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} />
                )}
                Tạo Rule File
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Rule File
                </h3>
                {generatedRule && (
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  </button>
                )}
              </div>
              <pre className="h-[500px] p-4 bg-gray-900 rounded-lg overflow-auto">
                <code className="text-gray-300 text-sm">
                  {generatedRule || 'Rule file sẽ hiển thị ở đây...'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 