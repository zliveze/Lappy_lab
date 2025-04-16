import itertools
from tqdm import tqdm
import multiprocessing
from functools import partial
import random

def insert_dots(username, dots_positions):
    """Hàm chèn dấu chấm vào các vị trí chỉ định"""
    result = list(username)
    # Chèn từ cuối đến đầu để tránh sai lệch vị trí
    for pos in sorted(dots_positions, reverse=True):
        result.insert(pos, ".")
    return "".join(result)

def normalize_gmail_address(email):
    """
    Chuẩn hóa địa chỉ Gmail theo quy tắc của Gmail:
    - Với Gmail, phần sau dấu + được bỏ qua
    - Các phần khác giữ nguyên (bao gồm cả chữ hoa/thường và vị trí dấu chấm)
    """
    if '@' not in email:
        return email
    
    username, domain = email.split('@', 1)
    
    # Chỉ áp dụng chuẩn hóa với địa chỉ Gmail
    if domain.lower() == 'gmail.com':
        # Loại bỏ phần sau dấu "+" nếu có
        if '+' in username:
            username = username.split('+', 1)[0]
    
    return f"{username}@{domain}"

def process_username_chunk(chunk_data):
    """Xử lý một nhóm username và domain để tạo biến thể email"""
    usernames, domain, include_suffix = chunk_data
    results = set()
    
    is_gmail = domain.lower() == 'gmail.com'
    normalized_results = set()  # Để kiểm tra trùng lặp sau khi chuẩn hóa
    
    for base_username in usernames:
        email = f"{base_username}@{domain}"
        
        # Kiểm tra email đã tồn tại sau khi chuẩn hóa chưa
        normalized_email = normalize_gmail_address(email)
        if normalized_email not in normalized_results:
            results.add(email)
            normalized_results.add(normalized_email)
        
        # Thêm biến thể với suffix nếu được yêu cầu
        # Với Gmail, chỉ cần thêm một biến thể +suffix vì tất cả suffix đều tương đương
        if include_suffix:
            if is_gmail:
                suffix_email = f"{base_username}+filter@{domain}"
                if normalize_gmail_address(suffix_email) not in normalized_results:
                    results.add(suffix_email)
                    normalized_results.add(normalize_gmail_address(suffix_email))
            else:
                # Với các domain khác, có thể thêm nhiều suffix khác nhau nếu cần
                for suffix in range(1, 11):  # Ví dụ: thêm 10 suffix
                    suffix_email = f"{base_username}+{suffix}@{domain}"
                    results.add(suffix_email)
                
    return results

def generate_email_variants(email, num_processes=None, include_suffix=True):
    """Tạo các biến thể email có xem xét đến quy tắc của Gmail"""
    # Tách phần username và domain
    if "@" not in email or email.count("@") != 1:
        print("Email không hợp lệ.")
        return set()
    
    username, domain = email.split("@")
    
    # Tạo danh sách các vị trí có thể chèn dấu chấm
    positions = list(range(1, len(username)))
    
    # Tạo các biến thể bằng cách thêm dấu chấm
    print("Đang tạo các biến thể dấu chấm...")
    dotted_variants = set()
    # Sử dụng bit manipulation để tạo tất cả các tổ hợp dấu chấm nhanh hơn
    total_combinations = 1 << len(positions)
    for mask in tqdm(range(total_combinations), desc="Tạo biến thể dấu chấm"):
        dots = [positions[i] for i in range(len(positions)) if (mask >> i) & 1]
        dotted_username = insert_dots(username, dots)
        # Kiểm tra không có dấu chấm liên tiếp hoặc ở đầu/cuối
        if ".." not in dotted_username and not dotted_username.startswith(".") and not dotted_username.endswith("."):
            dotted_variants.add(dotted_username)
    
    # Tạo cả biến thể viết hoa/thường từ dotted_variants
    print("Đang tạo biến thể chữ hoa/thường...")
    case_variants = set()
    
    # Chỉ xem xét các ký tự chữ cái để tạo biến thể chữ hoa/thường
    for dotted_username in tqdm(dotted_variants, desc="Xử lý biến thể chữ hoa/thường"):
        # Xác định vị trí các chữ cái trong username
        alpha_positions = [i for i, char in enumerate(dotted_username) if char.isalpha()]
        
        # Tạo biến thể chữ hoa/thường (giới hạn số lượng để tránh bùng nổ tổ hợp)
        max_positions = min(len(alpha_positions), 3)  # Chỉ xem xét tối đa 3 vị trí để tránh bùng nổ tổ hợp
        
        for num_to_change in range(1, max_positions + 1):
            for positions_to_change in itertools.combinations(alpha_positions, num_to_change):
                # Tạo biến thể mới bằng cách thay đổi chữ hoa/thường tại các vị trí đã chọn
                new_username = list(dotted_username)
                for pos in positions_to_change:
                    if new_username[pos].islower():
                        new_username[pos] = new_username[pos].upper()
                    else:
                        new_username[pos] = new_username[pos].lower()
                case_variants.add(''.join(new_username))
    
    # Kết hợp các biến thể
    all_username_variants = dotted_variants.union(case_variants)
    
    # Sử dụng đa luồng để xử lý song song
    if num_processes is None:
        num_processes = multiprocessing.cpu_count()
    
    # Chia nhỏ danh sách username để xử lý song song
    username_chunk_size = max(1, len(all_username_variants) // num_processes)
    username_chunks = [list(all_username_variants)[i:i+username_chunk_size] 
                      for i in range(0, len(all_username_variants), username_chunk_size)]
    
    # Phân phối công việc cho các process
    tasks = [(chunk, domain, include_suffix) for chunk in username_chunks]
    
    # Tạo pool và xử lý song song
    print(f"Đang xử lý song song với {num_processes} processes...")
    with multiprocessing.Pool(processes=num_processes) as pool:
        results = list(tqdm(pool.imap(process_username_chunk, tasks), 
                         total=len(tasks), 
                         desc="Tạo biến thể email"))
    
    # Gộp kết quả
    all_variants = set()
    print("Đang gộp kết quả...")
    for result_set in tqdm(results, desc="Gộp kết quả"):
        all_variants.update(result_set)
    
    return all_variants

def main():
    # Yêu cầu người dùng nhập email
    user_email = input("Nhập email của bạn: ").strip()

    # Kiểm tra email đầu vào
    if "@" not in user_email or user_email.count("@") != 1:
        print("Email không hợp lệ. Vui lòng thử lại.")
        return

    print("Đang tạo danh sách email biến thể...")
    
    # Hỏi người dùng có muốn thêm các biến thể suffix không
    include_suffix = input("Thêm biến thể với suffix (+1, +2, ..)? (Y/n): ").strip().lower() != 'n'
    
    # Cho phép người dùng chọn số lượng CPU sử dụng
    try:
        num_cpus = int(input(f"Số CPU sử dụng (mặc định: {multiprocessing.cpu_count()}): ") or multiprocessing.cpu_count())
    except ValueError:
        num_cpus = multiprocessing.cpu_count()
        print(f"Giá trị không hợp lệ, sử dụng giá trị mặc định: {num_cpus}")
    
    # Tạo danh sách email
    variants = generate_email_variants(user_email, num_processes=num_cpus, include_suffix=include_suffix)
    
    # Xuất ra file với tiến trình
    output_file = "email_variants.txt"
    print(f"Đang xuất {len(variants)} email ra file...")
    with open(output_file, "w") as f:
        for email in tqdm(variants, desc="Xuất ra file"):
            f.write(email + "\n")

    print(f"Quá trình hoàn tất. Danh sách email được lưu trong tệp {output_file}.")
    print(f"Tổng số biến tyhể email: {len(variants)}")

if __name__ == "__main__":
    main()