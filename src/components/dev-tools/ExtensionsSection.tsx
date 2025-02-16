import { extensions } from './ExtensionsData';
import ExtensionCard from './ExtensionCard';

export default function ExtensionsSection() {
  return (
    <section className="relative mt-32 pt-32">
      {/* Tilted Separator */}
      <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 
                       transform -rotate-3 origin-top-left scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        </div>
      </div>

      {/* Section Content */}
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent inline-block">
            VS Code Extensions
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Mở rộng khả năng code với các extension AI mạnh mẽ, 
            tích hợp trực tiếp vào VS Code của bạn
          </p>
        </div>

        {/* Extension Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {extensions.map((extension) => (
            <ExtensionCard 
              key={extension.name} 
              extension={extension} 
            />
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="text-sm text-gray-400">Powered by VS Code</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 