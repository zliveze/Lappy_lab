import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faRobot } from '@fortawesome/free-solid-svg-icons';

interface ModelInfo {
  name: string;
  enabled?: boolean;
  note?: string;
}

interface ModelCategory {
  category: string;
  models: ModelInfo[];
}

interface Extension {
  name: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
  downloadLink: string;
  tags: string[];
  pricing: {
    type: 'free' | 'paid' | 'freemium';
    details: string;
  };
  models: ModelCategory[];
}

export default function ExtensionCard({ extension }: { extension: Extension }) {
  return (
    <div className="relative bg-[#1E1E1E] rounded-lg overflow-hidden
                    border border-[#333333] group hover:border-[#007ACC]/50
                    transition-all duration-300">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3 className="text-lg font-semibold text-white/90 group-hover:text-[#007ACC] 
                        transition-colors duration-300">
            {extension.name}
          </h3>
          <div className={`px-2.5 py-1 rounded-md text-xs font-medium
                          ${extension.pricing.type === 'free' 
                            ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                            : extension.pricing.type === 'paid'
                            ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                            : 'bg-[#007ACC]/10 text-[#007ACC] border border-[#007ACC]/20'}`}>
            {extension.pricing.type === 'free' ? 'Free' 
              : extension.pricing.type === 'paid' ? 'Paid'
              : 'Freemium'}
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {extension.description}
        </p>
        <div className="text-xs text-gray-500">
          {extension.pricing.details}
        </div>
      </div>

      {/* Features */}
      <div className="px-5 py-4 bg-black/20 border-t border-[#333333]">
        <div className="grid grid-cols-2 gap-2">
          {extension.features.map((feature) => (
            <div key={feature} 
                 className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300
                           bg-[#252525] rounded-md border border-[#333333]
                           group-hover:border-[#007ACC]/20 group-hover:bg-[#007ACC]/5
                           transition-all duration-300">
              <span className="w-1 h-1 rounded-full bg-[#007ACC]/50" />
              <span className="line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Models */}
      <div className="px-5 py-4 border-t border-[#333333]">
        {extension.models.map((category) => (
          <div key={category.category} className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FontAwesomeIcon icon={faRobot} className="text-[#007ACC]" />
              {category.category}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {category.models.map((model) => (
                <div key={model.name}
                     className="flex items-center justify-between gap-2 px-3 py-2
                               bg-[#252525] rounded-md border border-[#333333]
                               group-hover:border-[#007ACC]/20">
                  <span className="text-sm font-mono text-gray-300 truncate">
                    {model.name}
                  </span>
                  {model.note && (
                    <span className="text-xs text-gray-500 shrink-0">
                      {model.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-5 bg-black/20 border-t border-[#333333]">
        <a href={extension.downloadLink}
           className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                     bg-[#007ACC] text-white/90 font-medium rounded-md
                     hover:bg-[#0098FF] active:bg-[#007ACC]
                     transition-all duration-300">
          <FontAwesomeIcon icon={faDownload} className="text-sm" />
          <span>Install Extension</span>
        </a>
      </div>
    </div>
  );
} 