// Lấy các phần tử
const dinosaur = document.getElementById('dinosaur');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');

// Các biến để kiểm soát trò chơi
let isJumping = false;
let score = 0;
let cactusPosition = 600;
let jumpHeight = 100;
let gravity = 0.5;

// Điều khiển nhảy của T-Rex
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        jump();
    }
});

// Hàm nhảy
function jump() {
    let jumpUpInterval = setInterval(function() {
        if (jumpHeight > 0) {
            dinosaur.style.bottom = `${parseInt(dinosaur.style.bottom) + 10}px`;
            jumpHeight -= 10;
        } else {
            clearInterval(jumpUpInterval);
            let jumpDownInterval = setInterval(function() {
                if (jumpHeight < 100) {
                    dinosaur.style.bottom = `${parseInt(dinosaur.style.bottom) - 10}px`;
                    jumpHeight += 10;
                } else {
                    clearInterval(jumpDownInterval);
                    isJumping = false;
                }
            }, 20);
        }
    }, 20);
}

// Hàm di chuyển chướng ngại vật và kiểm tra va chạm
function moveCactus() {
    cactusPosition -= 5; // Tốc độ di chuyển của cactus
    cactus.style.right = cactusPosition + 'px';

    // Nếu cactus đi ra ngoài màn hình, reset lại
    if (cactusPosition < -20) {
        cactusPosition = 600;
        score++;
    }

    // Kiểm tra va chạm giữa dinosaur và cactus
    if (parseInt(cactus.style.right) > 50 && parseInt(cactus.style.right) < 100 &&
        parseInt(dinosaur.style.bottom) <= 50) {
        alert('Game Over! Your Score: ' + score);
        resetGame();
    }

    // Cập nhật điểm
    scoreElement.textContent = 'Score: ' + score;
}

// Hàm reset game
function resetGame() {
    dinosaur.style.bottom = '0';
    cactusPosition = 600;
    score = 0;
    scoreElement.textContent = 'Score: 0';
}

// Cập nhật trò chơi mỗi 20ms
setInterval(moveCactus, 20);
