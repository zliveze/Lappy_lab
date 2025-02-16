import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCrown, faStar, faCheck, faRobot } from '@fortawesome/free-solid-svg-icons';
import { tools } from './ToolsData';

interface ModelInfo {
  name: string;
  enabled?: boolean;
  credit?: string;
  beta?: boolean;
  note?: string;
}

interface Tool {
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  link: string;
  downloadLink: string;
  tags: string[];
  highlight?: boolean;
  models?: Array<{
    name: string;
    type?: string;
  }>;
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const cardClasses = `relative bg-white rounded-xl shadow-lg overflow-hidden border
                      ${tool.highlight 
                        ? 'border-blue-500 shadow-blue-100 scale-105 z-10' 
                        : 'border-gray-100'}`;

  const getModels = (toolName: string) => {
    switch (toolName) {
      case "Cursor IDE":
        return [
          "claude-3-5-sonnet-20241022",
          "claude-3-opus",
          "claude-3.5-haiku",
          "claude-3.5-sonnet",
          "cursor-fast",
          "cursor-small",
          "deepseek-r1",
          "deepseek-v3",
          "gemini-2.0-flash",
          "gemini-2.0-flash-thinking-exp",
          "gemini-2.0-pro-exp",
          "gpt-3.5-turbo",
          "gpt-4",
          "gpt-4-turbo-2024-04-09",
          "gpt-4o",
          "gpt-4o-mini",
          "grok-2",
          "o1",
          "o1-mini",
          "o1-preview",
          "o3-mini"
        ];
      case "Windsurf AI":
        return [
          {
            category: "Premium",
            models: [
              { name: "Claude 3.5 Sonnet", credit: "1x credit" },
              { name: "GPT-4o", credit: "1x credit" },
              { name: "DeepSeek V3", credit: "0.25x credit" },
              { name: "DeepSeek R1", credit: "0.5x credit" },
              { name: "o3-mini (medium reasoning)", credit: "1x credit", beta: true },
              { name: "Gemini 2.0 Flash", credit: "0.25x credit", beta: true }
            ]
          },
          {
            category: "Non-premium",
            models: [
              { name: "Cascade Base" }
            ]
          }
        ];
      case "Aide IDE":
        return [
          {
            category: "Available Models",
            models: [
              { name: "Claude Sonnet", enabled: true },
              { name: "Claude Haiku", enabled: false },
              { name: "GPT-4o", enabled: false },
              { name: "Gemini 1.5 Pro", enabled: false },
              { name: "DeepSeek V3", enabled: false },
              { name: "DeepSeek r1", enabled: false },
              { name: "Gemini 2.0 Flash Exp", enabled: false },
              { name: "Gemini 2.0 Flash Thinking Experimental", enabled: false }
            ]
          }
        ];
      case "Roo-code":
      case "GitHub Copilot":
      case "Augment":
      case "Cline":
        const tool = tools.find(t => t.name === toolName);
        return tool?.models || [];
      default:
        return [];
    }
  };

  const models = getModels(tool.name);
  const isWindsurf = tool.name === "Windsurf AI";

  return (
    <div className={cardClasses}>
      {/* Ranking Badge */}
      {tool.highlight ? (
        <div className="absolute -top-2 -right-2 w-[120px] h-[120px] overflow-hidden">
          <div className="absolute top-[30px] right-[-35px] w-[170px] h-[36px] 
                         bg-gradient-to-r from-blue-600 to-purple-600
                         rotate-45 transform origin-center
                         flex items-center justify-center gap-1.5
                         shadow-lg">
            <FontAwesomeIcon icon={faCrown} className="text-yellow-300 text-sm" />
            <span className="text-white text-xs font-bold tracking-wider">BEST CHOICE</span>
          </div>
        </div>
      ) : (
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                        rounded-full border border-purple-500/20 flex items-center gap-2">
          <FontAwesomeIcon icon={faStar} className="text-purple-500 text-xs" />
          <span className="text-xs font-medium text-purple-600">VERY GOOD</span>
        </div>
      )}

      {/* AI Models Hover Card */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 
                      opacity-0 flex flex-col p-6 text-white z-30 
                      pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faRobot} className="text-xl text-blue-400" />
          <h3 className="text-lg font-bold">Supported AI Models</h3>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="grid grid-cols-1 gap-2">
            {tool.models?.map((model) => (
              <div key={model.name} 
                   className="flex items-center gap-2 px-3 py-2 rounded-lg
                             bg-white/5 border border-white/10 backdrop-blur-sm
                             hover:bg-white/10 transition-colors duration-200">
                <span className="text-sm font-mono text-gray-300">
                  {model.name}
                </span>
                {model.type && (
                  <span className="text-xs text-gray-500 ml-auto">
                    {model.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          Hover to see available AI models
        </div>
      </div>

      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-lg overflow-hidden relative
                          ${tool.highlight ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
            <Image 
              src={tool.icon} 
              alt={tool.name} 
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {tool.name}
              {tool.highlight && (
                <span className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 
                                to-purple-500 text-white text-xs px-2 py-1 rounded-full">
                  #1
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{tool.category}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tool.description}</p>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span key={tag} 
                  className={`px-3 py-1 text-xs rounded-full
                            ${tool.highlight 
                              ? 'bg-blue-50 text-blue-600 border border-blue-200/50' 
                              : 'bg-purple-50 text-purple-600 border border-purple-200/50'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={`p-6 ${tool.highlight ? 'bg-blue-50/50' : 'bg-gray-50'}`}>
        <h4 className="font-medium text-gray-900 mb-3">Tính Năng Chính</h4>
        <ul className="space-y-2">
          {tool.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
              <FontAwesomeIcon 
                icon={faCheck} 
                className={`mt-1 ${tool.highlight ? 'text-blue-400' : 'text-purple-400'}`}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 bg-white border-t border-gray-100">
        <a href={tool.downloadLink}
           className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg 
                      text-white font-medium
                      ${tool.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}>
          <FontAwesomeIcon icon={faDownload} className="text-lg" />
          <span>Tải Xuống</span>
        </a>
      </div>
    </div>
  );
} 