// Lấy các phần tử trong HTML
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

// Các biến lưu trữ thông tin di chuyển
let playerSpeed = 5;
let enemySpeed = 2;
let gameWidth = 600;
let gameHeight = 400;

// Điều khiển di chuyển player bằng phím mũi tên
document.addEventListener('keydown', function (event) {
    const playerRect = player.getBoundingClientRect();
    
    if (event.key === 'ArrowLeft' && playerRect.left > 0) {
        player.style.left = playerRect.left - playerSpeed + 'px';
    } else if (event.key === 'ArrowRight' && playerRect.right < gameWidth) {
        player.style.left = playerRect.left + playerSpeed + 'px';
    } else if (event.key === 'ArrowUp' && playerRect.top > 0) {
        player.style.top = playerRect.top - playerSpeed + 'px';
    } else if (event.key === 'ArrowDown' && playerRect.bottom < gameHeight) {
        player.style.top = playerRect.top + playerSpeed + 'px';
    }
});

// Di chuyển enemy xuống dưới và quay lại
function moveEnemy() {
    const enemyRect = enemy.getBoundingClientRect();
    
    if (enemyRect.top < gameHeight) {
        enemy.style.top = enemyRect.top + enemySpeed + 'px';
    } else {
        enemy.style.top = '10px';
    }
}

// Kiểm tra va chạm giữa player và enemy
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();
    
    if (playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top) {
        alert('Game Over!');
        resetGame();
    }
}

// Reset game khi va chạm
function resetGame() {
    player.style.top = '350px';
    player.style.left = '50%';
    enemy.style.top = '10px';
    enemy.style.left = '50%';
}

// Cập nhật game mỗi 10ms
setInterval(function() {
    moveEnemy();
    checkCollision();
}, 10);
