const TARGET_URL = "../html/test.html";


document.addEventListener("DOMContentLoaded", () => {
    
    // Hàm Throttle (Hạn chế tốc độ gọi hàm)
    // Đảm bảo hàm callback chỉ được gọi tối đa 1 lần trong khoảng thời gian 'limit'
    const throttle = (callback, limit) => {
        let waiting = false;
        return function () {
            if (!waiting) {
                // Sử dụng 'this' và 'arguments' để đảm bảo context và tham số được truyền đúng
                callback.apply(this, arguments); 
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, limit);
            }
        }
    }   
    
    // --- 1. HIỆU ỨNG CHUỘT (HEART TRAIL) ---

    // **ĐỊNH NGHĨA HÀM TẠO TRÁI TIM**
    const createHeart = (event) => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = `${event.clientX}px`;
        heart.style.top = `${event.clientY}px`;
        heart.textContent = "❤️";
        document.body.appendChild(heart);

        // Tự động xóa trái tim sau 1 giây (1000ms)
        setTimeout(() => {
            heart.remove();
        }, 1000);
    };

    // **ĐĂNG KÝ SỰ KIỆN CHỈ MỘT LẦN VỚI THROTTLE (2000ms = 2 giây)**
    // Đã loại bỏ sự kiện mousemove không có throttle ban đầu.
    document.body.addEventListener("mousemove", throttle(createHeart, 100));


    // --- 2. HIỆU ỨNG TUYẾT RƠI (CANVAS) ---
    
    const canvas = document.getElementById("snowfall");
    if (!canvas) return; 

    const ctx = canvas.getContext("2d");
    const SNOWFLAKE_COUNT = 200; // Số lượng bông tuyết

    // Hàm điều chỉnh kích thước canvas theo kích thước cửa sổ
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const snowflakes = [];

    // Class đại diện cho một bông tuyết
    class Snowflake {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }

        // Đặt lại vị trí ngẫu nhiên cho bông tuyết
        reset() {
            this.x = Math.random() * canvas.width;
            this.radius = Math.random() * 2 + 1; 
            this.speed = Math.random() * 1 + 0.5; 
            this.opacity = Math.random() * 0.7 + 0.3; 
            this.color = `rgba(255, 255, 255, ${this.opacity})`; 
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.y * 0.01) * 0.1;

            if (this.y > canvas.height + this.radius) {
                this.reset();
                this.y = -this.radius; 
            }
            this.draw();
        }
    }

    // Khởi tạo tất cả bông tuyết
    function initSnowflakes() {
        for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    // Vòng lặp chính của hiệu ứng
    function animateSnowfall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        snowflakes.forEach((snowflake) => snowflake.update());
        requestAnimationFrame(animateSnowfall);
    }
    
    // Bắt đầu hiệu ứng
    initSnowflakes();
    animateSnowfall();


    // --- 3. XỬ LÝ SỰ KIỆN THIỆP ---
    
    const card = document.getElementById("card");
    const showCardButton = document.getElementById("showCardButton");
    const closeCardButton = document.getElementById("closeCardButton");
    const mainBox = document.getElementById("mainBox");

    // Hiển thị thiệp
    showCardButton.addEventListener("click", () => {
        card.classList.add("show");
        mainBox.style.opacity = '0'; 
    });

    // Đóng thiệp
    closeCardButton.addEventListener("click", () => {
        card.classList.remove("show");
        mainBox.style.opacity = '1'; 
    });

    // Đóng thiệp bằng phím Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            card.classList.remove("show");
            mainBox.style.opacity = '1';
        }
    });
});