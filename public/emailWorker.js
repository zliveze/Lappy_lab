// Hàm chèn dấu chấm vào các vị trí chỉ định
const insertDots = (username, dotsPositions) => {
  const result = [...username];
  // Chèn từ cuối đến đầu để tránh sai lệch vị trí
  for (const pos of [...dotsPositions].sort((a, b) => b - a)) {
    result.splice(pos, 0, '.');
  }
  return result.join('');
};

// Tạo các biến thể email với dấu chấm
const generateDotVariants = (username) => {
  const positions = Array.from({ length: username.length - 1 }, (_, i) => i + 1);
  const variants = new Set();
  variants.add(username); // Thêm phiên bản không có dấu chấm

  // Sử dụng bit manipulation để tạo tất cả các tổ hợp
  const totalCombinations = 1 << positions.length;
  for (let mask = 1; mask < totalCombinations; mask++) {
    const dots = positions.filter((_, i) => (mask >> i) & 1);
    const dottedUsername = insertDots(username, dots);
    
    // Kiểm tra không có dấu chấm liên tiếp hoặc ở đầu/cuối
    if (!dottedUsername.includes('..') && 
        !dottedUsername.startsWith('.') && 
        !dottedUsername.endsWith('.')) {
      variants.add(dottedUsername);
    }
  }
  
  return [...variants];
};

// Biến để chứa tất cả các biến thể
let allVariants = new Set();

// Xử lý message từ thread chính
self.onmessage = (event) => {
  const { email, maxSuffix, batchSize = 1000, action } = event.data;

  if (action === 'init') {
    // Khởi tạo quá trình tạo biến thể
    allVariants = new Set();
    
    const [username, domain] = email.split('@');
    const usernameVariants = generateDotVariants(username);
    
    // Thông báo số lượng biến thể username và bắt đầu tạo
    self.postMessage({ 
      type: 'init', 
      usernameVariantsCount: usernameVariants.length,
      maxSuffix
    });
    
    // Thêm các biến thể cơ bản không có hậu tố
    for (const variant of usernameVariants) {
      allVariants.add(`${variant}@${domain}`);
    }
    
    // Báo cáo tiến trình
    self.postMessage({ 
      type: 'progress',
      progress: 0,
      variant: `${username}@${domain}`,
      totalVariants: allVariants.size
    });
    
    // Bắt đầu tạo các biến thể có hậu tố
    generateSuffixVariants(usernameVariants, domain, maxSuffix, batchSize);
  } else if (action === 'getResults') {
    // Trả về kết quả cuối cùng
    self.postMessage({ 
      type: 'result',
      variants: [...allVariants]
    });
  }
};

// Tạo các biến thể có hậu tố theo batch để tránh trình duyệt bị treo
function generateSuffixVariants(
  usernameVariants, 
  domain, 
  maxSuffix, 
  batchSize,
  startSuffix = 0
) {
  const endSuffix = Math.min(startSuffix + batchSize, maxSuffix);
  let processedCount = 0;
  
  for (const variant of usernameVariants) {
    for (let suffix = startSuffix; suffix <= endSuffix; suffix++) {
      allVariants.add(`${variant}+${suffix}@${domain}`);
      processedCount++;
      
      // Báo cáo tiến trình theo từng 1000 mục
      if (processedCount % 1000 === 0) {
        self.postMessage({ 
          type: 'progress',
          progress: (endSuffix / maxSuffix) * 100,
          variant: `${variant}+${suffix}@${domain}`,
          totalVariants: allVariants.size
        });
      }
    }
  }
  
  // Báo cáo tiến trình sau khi hoàn thành batch
  self.postMessage({ 
    type: 'progress',
    progress: (endSuffix / maxSuffix) * 100,
    totalVariants: allVariants.size
  });
  
  // Tiếp tục với batch tiếp theo nếu chưa xong
  if (endSuffix < maxSuffix) {
    setTimeout(() => {
      generateSuffixVariants(usernameVariants, domain, maxSuffix, batchSize, endSuffix + 1);
    }, 0);
  } else {
    // Đã hoàn thành tất cả
    self.postMessage({ 
      type: 'complete',
      totalVariants: allVariants.size
    });
  }
} 