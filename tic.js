const board = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function celebrateWinner() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas size to match the board
    canvas.width = 300; // Adjust as needed
    canvas.height = 300; // Adjust as needed

    // Create confetti particles
    function createParticle(x, y) {
        const particle = {
            x,
            y,
            size: Math.random() * 5 + 2,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 2 + 1,
        };
        particles.push(particle);
    }

    // Draw confetti particles
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        });
    }

    // Create particles when a player wins
    for (let i = 0; i < 100; i++) {
        createParticle(canvas.width / 2, canvas.height / 2);
    }

    // Animate the confetti
    function animate() {
        drawParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

function handleCellClick(e) {
    const cellIndex = Array.from(board).indexOf(e.target);
    
    if (gameState[cellIndex] !== "" || checkWinner() !== null) {
        return;
    }
    
    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    
    let winner = checkWinner();
    if (winner) {
        statusDisplay.textContent = ` Hurray!! ${winner} wins!`;
        celebrateWinner(); // Call the confetti function
    } else if (gameState.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
}


function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return gameState[a];
        }
    }
    return null;
}

function restartGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    board.forEach(cell => {
        cell.textContent = '';
    });
    statusDisplay.textContent = "X's turn";
}

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusDisplay.textContent = "X's turn";
