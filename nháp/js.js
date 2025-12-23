const CORRECT_PASSWORD = "phanh"; 
const TARGET_URL = "../html/test.html";

const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const customModal = document.getElementById('customModal');
const modalMessage = document.getElementById('modalMessage');

// --- CÁC HÀM XỬ LÝ ---

// Hiển thị modal
function showModal(message) {
    modalMessage.textContent = message;
    customModal.style.display = 'flex';
}

// Đóng modal
function closeModal() {
    customModal.style.display = 'none';
    passwordInput.focus(); // Trả con trỏ về ô nhập
}

// Hàm phụ: Bật hiệu ứng báo lỗi (viền đỏ)
function triggerErrorEffect() {
    passwordInput.style.borderColor = 'red';
    passwordInput.style.boxShadow = '0 0 8px rgba(255, 0, 0, 0.5)';
}

// --- CÁC SỰ KIỆN ---

// 1. Xử lý khi nhấn nút gửi form
passwordForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const enteredPassword = passwordInput.value.trim();

    // Reset hiệu ứng cũ trước khi kiểm tra
    passwordInput.style.borderColor = ''; 
    passwordInput.style.boxShadow = ''; 

    // Trường hợp 1: Ô nhập trống
    if (enteredPassword === "") {
        showModal("K Nhập Mật Khẩu Ai Cho Vào :00"); 
        triggerErrorEffect();
        return; 
    }

    // Trường hợp 2: Kiểm tra đúng/sai
    if (enteredPassword === CORRECT_PASSWORD) {
        window.location.href = TARGET_URL;
    } else {
        showModal("Ghi Sai Mật Khẩu Roi Kia"); 
        triggerErrorEffect();
        passwordInput.value = ''; // Xóa nội dung sai đi
    }
});

// 2. Xử lý đóng modal khi click ra vùng ngoài (backdrop)
window.addEventListener('click', function(event) {
    if (event.target === customModal) {
        closeModal();
    }
});