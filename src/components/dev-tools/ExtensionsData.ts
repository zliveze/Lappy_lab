export interface Extension {
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
  models: Array<{
    category: string;
    models: Array<{
      name: string;
      enabled?: boolean;
      note?: string;
    }>;
  }>;
}

export const extensions: Extension[] = [
  {
    name: "Roo-code",
    description: "Công cụ tự động hóa toàn bộ quá trình code, có khả năng đọc và chỉnh sửa file, điều khiển terminal. Yêu cầu API key từ các nhà cung cấp AI để sử dụng.",
    icon: "/roo-code-icon.png",
    features: [
      "Tự động hóa toàn bộ quá trình code",
      "Đọc và chỉnh sửa file thông minh",
      "Điều khiển terminal",
      "Hỗ trợ đa dạng AI Models",
      "Tích hợp nhiều nhà cung cấp AI"
    ],
    link: "https://github.com/RooVetGit/Roo-Code",
    downloadLink: "https://github.com/RooVetGit/Roo-Code",
    tags: ["API Required", "VS Code"],
    pricing: {
      type: "freemium",
      details: "Requires API keys from providers"
    },
    models: [
      {
        category: "Supported Models (API Required)",
        models: [
          { name: "OpenAI GPT-4" },
          { name: "Anthropic Claude" },
          { name: "Google PaLM" },
          { name: "DeepSeek" }
        ]
      }
    ]
  },
  {
    name: "GitHub Copilot",
    description: "Công cụ AI mạnh mẽ với gói miễn phí và hỗ trợ đầy đủ cho người dùng, tích hợp model o3mini AI hiện đại. Khả năng tự động hóa code và gợi ý thông minh.",
    icon: "/github-copilot-icon.png",
    features: [
      "Gói miễn phí cho người dùng",
      "Tích hợp o3mini AI Model",
      "Tự động hoàn thiện code",
      "Gợi ý code thông minh",
      "Hỗ trợ đa ngôn ngữ"
    ],
    link: "https://github.com/features/copilot",
    downloadLink: "https://marketplace.visualstudio.com/items?itemName=GitHub.copilot",
    pricing: {
      type: "free",
      details: "Free plan with o3mini model"
    },
    tags: ["Free Plan", "VS Code", "Extension"],
    models: [
      {
        category: "AI Models",
        models: [
          { name: "o3mini", note: "Free" },
          { name: "GPT-4", note: "Premium" }
        ]
      }
    ]
  },
  {
    name: "Augment",
    description: "Extension mạnh mẽ với model Claude 3.5 Sonnet, khả năng đọc file và chỉnh sửa code, phân tích cấu trúc dự án. Gói miễn phí lớn với 3000 lệnh/tháng.",
    icon: "/augment-icon.png",
    features: [
      "3000 lệnh miễn phí mỗi tháng",
      "Tích hợp Claude 3.5 Sonnet",
      "Đọc và chỉnh sửa file",
      "Phân tích cấu trúc dự án",
      "Gói premium $30/tháng"
    ],
    link: "https://www.augmentcode.com/",
    downloadLink: "https://www.augmentcode.com/",
    pricing: {
      type: "freemium",
      details: "3000 free commands/month, $30/month premium"
    },
    tags: ["Freemium", "VS Code", "Extension"],
    models: [
      {
        category: "AI Models",
        models: [
          { name: "Claude 3.5 Sonnet", note: "Main" },
          { name: "GPT-3.5", note: "Backup" }
        ]
      }
    ]
  },
  {
    name: "Cline",
    description: "Công cụ tự động hóa code toàn diện với khả năng đọc file, chỉnh sửa file, điều khiển terminal. Yêu cầu API key từ các nhà cung cấp để sử dụng đầy đủ tính năng.",
    icon: "/cline-icon.png",
    features: [
      "Tự động hóa code toàn diện",
      "Đọc và chỉnh sửa file",
      "Điều khiển terminal",
      "Hỗ trợ nhiều AI Models",
      "Yêu cầu API key"
    ],
    link: "https://github.com/cline/cline",
    downloadLink: "https://github.com/cline/cline",
    pricing: {
      type: "freemium",
      details: "Requires API keys from providers"
    },
    tags: ["API Required", "VS Code", "Extension"],
    models: [
      {
        category: "Supported Models (API Required)",
        models: [
          { name: "GPT-4" },
          { name: "Claude 3" },
          { name: "PaLM" },
          { name: "DeepSeek" }
        ]
      }
    ]
  }
]; 