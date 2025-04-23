/* eslint-disable no-restricted-globals */

// Khai báo kiểu cho self trong worker context
declare const self: Worker;

// Hàm chèn dấu chấm vào các vị trí chỉ định trong username
const insertDots = (username: string, dotsPositions: number[]) => {
  const result = [...username];
  // Chèn từ cuối đến đầu để tránh sai lệch vị trí
  for (const pos of [...dotsPositions].sort((a, b) => b - a)) {
    result.splice(pos, 0, '.');
  }
  return result.join('');
};

// Chuẩn hóa địa chỉ Gmail theo quy tắc của Gmail
const normalizeGmailAddress = (email: string) => {
  if (!email.includes('@')) return email;
  
  const [username, domain] = email.split('@');
  
  // Chỉ áp dụng chuẩn hóa với địa chỉ Gmail
  if (domain.toLowerCase() === 'gmail.com') {
    // Loại bỏ phần sau dấu "+" nếu có
    const normalizedUsername = username.includes('+') 
      ? username.split('+', 1)[0]
      : username;
    
    return `${normalizedUsername}@${domain}`;
  }
  
  return email;
};

// Tạo các biến thể email với dấu chấm
const generateDotVariants = (username: string) => {
  const positions = Array.from({ length: username.length - 1 }, (_, i) => i + 1);
  const variants = new Set<string>();
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

// Tạo biến thể chữ hoa/thường (giới hạn số lượng để tránh bùng nổ)
const generateCaseVariants = (usernames: string[]) => {
  const allVariants = new Set<string>(usernames);
  
  for (const username of usernames) {
    // Xác định vị trí các chữ cái trong username
    const alphaPositions = [];
    for (let i = 0; i < username.length; i++) {
      if (/[a-zA-Z]/.test(username[i])) {
        alphaPositions.push(i);
      }
    }
    
    // Giới hạn số vị trí chữ hoa/thường để tránh bùng nổ tổ hợp
    const maxPositions = Math.min(alphaPositions.length, 3);
    
    // Tạo các biến thể chữ hoa/thường cho 1 đến maxPositions vị trí
    for (let numToChange = 1; numToChange <= maxPositions; numToChange++) {
      // Lấy tất cả tổ hợp numToChange vị trí từ alphaPositions
      const combinations = getCombinations(alphaPositions, numToChange);
      
      for (const positionsToChange of combinations) {
        // Tạo biến thể mới bằng cách thay đổi chữ hoa/thường
        const chars = [...username];
        for (const pos of positionsToChange) {
          if (chars[pos].toLowerCase() === chars[pos]) {
            chars[pos] = chars[pos].toUpperCase();
          } else {
            chars[pos] = chars[pos].toLowerCase();
          }
        }
        allVariants.add(chars.join(''));
      }
    }
  }
  
  return [...allVariants];
};

// Hàm hỗ trợ tạo tổ hợp k phần tử từ mảng arr
const getCombinations = (arr: number[], k: number) => {
  const result: number[][] = [];
  
  function backtrack(start: number, current: number[]) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
};

// Biến để chứa tất cả các biến thể
let allVariants = new Set<string>();
// Biến để kiểm tra trùng lặp khi chuẩn hóa
let normalizedVariants = new Set<string>();

// Xử lý message từ thread chính
self.onmessage = (event) => {
  const { email, maxSuffix, batchSize = 1000, includeCaseVariants = true, action } = event.data;

  if (action === 'init') {
    // Khởi tạo quá trình tạo biến thể
    allVariants = new Set<string>();
    normalizedVariants = new Set<string>();
    
    const [username, domain] = email.split('@');
    const isGmail = domain.toLowerCase() === 'gmail.com';
    
    // Tạo biến thể dấu chấm
    const dotVariants = generateDotVariants(username);
    
    // Tạo thêm biến thể chữ hoa/thường nếu được bật
    const allUsernameVariants = includeCaseVariants 
      ? generateCaseVariants(dotVariants)
      : dotVariants;
    
    // Thông báo số lượng biến thể username và bắt đầu tạo
    self.postMessage({ 
      type: 'init', 
      usernameVariantsCount: allUsernameVariants.length,
      maxSuffix
    });
    
    // Thêm các biến thể cơ bản không có hậu tố
    let addedCount = 0;
    for (const variant of allUsernameVariants) {
      const newEmail = `${variant}@${domain}`;
      const normalizedEmail = normalizeGmailAddress(newEmail);
      
      // Chỉ thêm nếu chưa có biến thể tương đương
      if (!normalizedVariants.has(normalizedEmail)) {
        allVariants.add(newEmail);
        normalizedVariants.add(normalizedEmail);
        addedCount++;
        
        // Báo cáo tiến độ theo từng 1000 biến thể
        if (addedCount % 1000 === 0) {
          self.postMessage({ 
            type: 'progress',
            progress: 0,
            totalVariants: allVariants.size
          });
        }
      }
    }
    
    // Báo cáo tiến trình
    self.postMessage({ 
      type: 'progress',
      progress: 0,
      variant: `${username}@${domain}`,
      totalVariants: allVariants.size
    });
    
    // Bắt đầu tạo các biến thể có hậu tố
    // Đối với Gmail, mỗi username chỉ cần một biến thể hậu tố
    if (isGmail) {
      generateGmailSuffixVariants(allUsernameVariants, domain);
    } else {
      // Đối với các domain khác, tạo nhiều biến thể hậu tố
      generateSuffixVariants(allUsernameVariants, domain, maxSuffix, batchSize);
    }
  } else if (action === 'getResults') {
    // Trả về kết quả cuối cùng
    self.postMessage({ 
      type: 'result',
      variants: [...allVariants]
    });
  }
};

// Tạo các biến thể có hậu tố đặc biệt cho Gmail (chỉ cần một suffix)
function generateGmailSuffixVariants(usernameVariants: string[], domain: string) {
  let addedCount = 0;
  const totalUsernames = usernameVariants.length;
  
  for (const variant of usernameVariants) {
    // Với Gmail, tất cả các hậu tố đều tương đương, nên chỉ cần thêm một biến thể
    const suffixEmail = `${variant}+filter@${domain}`;
    const normalizedEmail = normalizeGmailAddress(suffixEmail);
    
    // Chỉ thêm nếu chưa có biến thể tương đương
    if (!normalizedVariants.has(normalizedEmail)) {
      allVariants.add(suffixEmail);
      normalizedVariants.add(normalizedEmail);
    }
    
    addedCount++;
    
    // Báo cáo tiến độ theo từng 1000 biến thể hoặc phần trăm
    if (addedCount % 1000 === 0 || addedCount === totalUsernames) {
      const progress = 50 + (addedCount / totalUsernames) * 50; // 50-100% của tiến trình
      self.postMessage({ 
        type: 'progress',
        progress,
        totalVariants: allVariants.size
      });
    }
  }
  
  // Đã hoàn thành tất cả
  self.postMessage({ 
    type: 'complete',
    totalVariants: allVariants.size
  });
}

// Tạo các biến thể có hậu tố theo batch cho domain không phải Gmail
function generateSuffixVariants(
  usernameVariants: string[], 
  domain: string, 
  maxSuffix: number, 
  batchSize: number,
  startSuffix = 0
) {
  const endSuffix = Math.min(startSuffix + batchSize, maxSuffix);
  let processedCount = 0;
  
  for (const variant of usernameVariants) {
    for (let suffix = startSuffix; suffix <= endSuffix; suffix++) {
      const suffixEmail = `${variant}+${suffix}@${domain}`;
      allVariants.add(suffixEmail);
      processedCount++;
      
      // Báo cáo tiến trình theo từng 1000 mục
      if (processedCount % 1000 === 0) {
        self.postMessage({ 
          type: 'progress',
          progress: 50 + ((endSuffix / maxSuffix) * 50), // 50-100% của tiến trình
          totalVariants: allVariants.size
        });
      }
    }
  }
  
  // Báo cáo tiến trình sau khi hoàn thành batch
  self.postMessage({ 
    type: 'progress',
    progress: 50 + ((endSuffix / maxSuffix) * 50), // 50-100% của tiến trình
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

// Xuất worker interface
export default {
  onmessage: null as ((event: MessageEvent) => void) | null
}; 