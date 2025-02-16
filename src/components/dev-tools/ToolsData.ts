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

export const tools: Tool[] = [
  {
    name: "Windsurf AI",
    description: "IDE nhẹ với hiệu suất cao, tích hợp AI hỗ trợ lập trình. Tốc độ xử lý nhanh và tiết kiệm tài nguyên. Gói miễn phí giới hạn, premium $20/tháng với đầy đủ tính năng.",
    icon: "https://www.techspot.com/images2/downloads/topdownload/2024/12/2024-12-12-ts3_thumbs-a49-p_256.webp",
    category: "VERY GOOD", 
    features: [
      "Gói miễn phí giới hạn tính năng",
      "Tạo code tự động",
      "Tái cấu trúc code",
      "Tạo tài liệu tự động",
      "Premium $20/tháng không giới hạn"
    ],
    link: "https://codeium.com/windsurf",
    downloadLink: "https://codeium.com/windsurf",
    tags: ["Freemium", "Premium $20", "Nhẹ"]
  },
  {
    name: "Cursor IDE",
    description: "IDE tốt nhất hiện nay với tích hợp Claude 3 Opus và các model mới nhất của Anthropic. Hỗ trợ đa dạng ngôn ngữ lập trình và tính năng AI mạnh mẽ. Gói premium $20/tháng.",
    icon: "https://foxfio.com/wp-content/uploads/2025/01/logo-cursor.jpg",
    category: "BEST CHOICE",
    features: [
      "Gói miễn phí giới hạn tính năng",
      "Tích hợp Claude 3 Opus",
      "Giải thích code chi tiết",
      "Phát hiện lỗi thông minh",
      "Premium $20/tháng không giới hạn"
    ],
    link: "https://cursor.sh",
    downloadLink: "https://download.cursor.sh",
    tags: ["Freemium", "Premium $20", "Claude 3"],
    highlight: true,
    models: [
      { name: "Claude 3 Opus", type: "Premium" },
      { name: "Claude 3.5 Sonnet", type: "Premium" },
      { name: "GPT-4", type: "Premium" },
      { name: "DeepSeek", type: "Free" },
      { name: "Gemini Pro", type: "Free" }
    ]
  },
  {
    name: "Aide IDE",
    description: "IDE mới với tích hợp Deepseek, mang đến trải nghiệm lập trình nâng cao với AI. Hoàn toàn miễn phí với đầy đủ tính năng.",
    icon: "https://codestory.ai/aide-bezel.svg",
    category: "VERY GOOD",
    features: [
      "Hoàn toàn miễn phí",
      "Tích hợp Deepseek",
      "Gợi ý code thông minh", 
      "Phân tích code",
      "Hỗ trợ làm việc nhóm"
    ],
    link: "https://aide.dev/",
    downloadLink: "https://aide.app/download",
    tags: ["Miễn phí", "Deepseek", "V3"]
  }
]; 