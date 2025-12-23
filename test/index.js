const CORRECT_PASSWORD = "phanh"; // Mật khẩu đúng
const TARGET_URL = "../html/container.html"; // Trang đích

const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');

// Hàm hiển thị Modal tùy chỉnh
function showModal(message) {
    modalMessage.textContent = message;
    customModal.style.display = 'flex'; // Hiện modal
}

// Hàm đóng Modal
function closeModal() {
    customModal.style.display = 'none'; // Ẩn modal
    passwordInput.focus(); // Tập trung lại vào ô nhập mật khẩu
}

// Hàm xử lý gửi form
passwordForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const enteredPassword = passwordInput.value.trim();

    // Reset hiệu ứng lỗi (viền)
    passwordInput.style.borderColor = ''; 
    passwordInput.style.boxShadow = ''; 

    // 1. Kiểm tra nếu ô nhập mật khẩu trống
    if (enteredPassword === "") {
        // Thay thế alert() bằng showModal()
        showModal("K Nhập Mật Khẩu Ai Cho Vào :00"); 
        
        // Hiệu ứng màu đỏ
        passwordInput.style.borderColor = 'red';
        passwordInput.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
        return; 
    }

    // 2. Kiểm tra mật khẩu đúng hay sai
    if (enteredPassword === CORRECT_PASSWORD) {
        // Mật khẩu đúng: Chuyển hướng
        window.location.href = TARGET_URL;

    } else {
        // Mật khẩu sai:
        
        // Thay thế alert() bằng showModal()
        showModal("Ghi Sai Mật Khẩu Roi Kia"); 
        
        // Hiệu ứng màu đỏ
        passwordInput.style.borderColor = 'red';
        passwordInput.style.boxShadow = '0 0 8px rgba(255, 0, 0, 0.7)';
        
        // Xóa nội dung đã nhập
        passwordInput.value = ''; 
    }
});