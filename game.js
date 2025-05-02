// Game constants
const GRID_SIZE = 8;
const ANIMATION_DURATION = 300;
const MATCH_SCORE = 50;
const COMBO_BONUS = 25;

// Item types with their colors
const ITEM_TYPES = ['handbag', 'handshake', 'diamond', 'money', 'instagram', 'youtube', 'mobile'];
const ITEM_COLORS = {
    'handbag': '#E57373',     // Red
    'handshake': '#81C784',   // Green
    'diamond': '#64B5F6',     // Blue
    'money': '#FFD54F',       // Yellow/Gold
    'instagram': '#BA68C8',   // Purple
    'youtube': '#FF0000',     // YouTube Red
    'mobile': '#FF8A65'       // Orange
};

// SVG Icons for game pieces
const ITEM_ICONS = {
    'handbag': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M16,5V4A2,2 0 0,0 14,2H10A2,2 0 0,0 8,4V5H2V19H22V5H16M14,5H10V4H14V5Z" /></svg>',
    'handshake': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M11 6H14L17.29 2.7A1 1 0 0 1 18.71 2.7L21.29 5.29A1 1 0 0 1 21.29 6.7L19 9H11V11A1 1 0 0 1 10 12A1 1 0 0 1 9 11V8A2 2 0 0 1 11 6M5 11V15L2.71 17.29A1 1 0 0 0 2.71 18.7L5.29 21.29A1 1 0 0 0 6.71 21.29L11 17H15A1 1 0 0 0 16 16V15H17A1 1 0 0 0 18 14V13H19A1 1 0 0 0 20 12V11H13V12A2 2 0 0 1 11 14H9A2 2 0 0 1 7 12V9Z" /></svg>',
    'diamond': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M16,9H19L14,16M10,9H14L12,17M5,9H8L10,16M15,4H17L19,7H16M11,4H13L14,7H10M7,4H9L8,7H5M6,2L2,8L12,22L22,8L18,2H6Z" /></svg>',
    'money': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M5,6H19A2,2 0 0,1 21,8V16A2,2 0 0,1 19,18H5A2,2 0 0,1 3,16V8A2,2 0 0,1 5,6M12,12A2,2 0 0,0 10,10A2,2 0 0,0 8,12A2,2 0 0,0 10,14A2,2 0 0,0 12,12Z" /></svg>',
    'instagram': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>',
    'youtube': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>',
    'mobile': '<svg viewBox="0 0 24 24" class="icon"><path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" /></svg>'
};

// Game state
let gameState = {
    grid: [],
    score: 0,
    level: 1,
    moves: 0,
    maxMoves: 20,
    targetScore: 1000,
    gameStatus: 'playing'
};

// Selected cell tracking
let selectedCell = null;

// DOM elements
const gameBoard = document.querySelector('.game-board');
const scoreDisplay = document.querySelector('.score-display');
const levelDisplay = document.querySelector('.level-display');
const movesDisplay = document.querySelector('.moves-display');
const progressBar = document.querySelector('.progress-bar');
const targetScoreDisplay = document.querySelector('.target-score');
const levelCompleteBox = document.getElementById('level-complete');
const gameOverBox = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');
const nextLevelBtn = document.getElementById('next-level-btn');
const tryAgainBtn = document.getElementById('try-again-btn');

// Calculate target score for a given level (doubles each level)
function calculateTargetScore(level) {
    return 1000 * Math.pow(2, level - 1);
}

// Calculate max moves for a given level
function calculateMaxMoves(level) {
    return 20 + ((level - 1) * 3);
}

// Initialize game board
function initializeBoard() {
    const grid = [];
    
    // Create empty grid
    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            // Randomly select an item type
            const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
            
            row.push({
                id: `cell-${x}-${y}`,
                type: randomType,
                x,
                y,
                isSelected: false,
                isMatched: false,
                isAnimating: false
            });
        }
        grid.push(row);
    }
    
    // Check for any matches on initial board and reshuffle if needed
    let hasMatches = checkForMatches(grid).length > 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 5;
    
    while (hasMatches && attempts < MAX_ATTEMPTS) {
        // Reshuffle the board
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
                grid[y][x].type = randomType;
            }
        }
        hasMatches = checkForMatches(grid).length > 0;
        attempts++;
    }
    
    return grid;
}

// Check for matches in the grid
function checkForMatches(grid) {
    const matches = [];
    
    // Check horizontal matches
    for (let y = 0; y < GRID_SIZE; y++) {
        let matchCount = 1;
        let matchType = grid[y][0].type;
        
        for (let x = 1; x < GRID_SIZE; x++) {
            if (grid[y][x].type === matchType) {
                matchCount++;
                
                // Check if we have at least 3 in a row
                if (matchCount >= 3 && x === GRID_SIZE - 1) {
                    for (let i = x - matchCount + 1; i <= x; i++) {
                        matches.push(grid[y][i]);
                    }
                }
            } else {
                // Check if we have at least 3 in a row before the current cell
                if (matchCount >= 3) {
                    for (let i = x - matchCount; i < x; i++) {
                        matches.push(grid[y][i]);
                    }
                }
                
                // Reset for the new potential match
                matchCount = 1;
                matchType = grid[y][x].type;
            }
        }
    }
    
    // Check vertical matches
    for (let x = 0; x < GRID_SIZE; x++) {
        let matchCount = 1;
        let matchType = grid[0][x].type;
        
        for (let y = 1; y < GRID_SIZE; y++) {
            if (grid[y][x].type === matchType) {
                matchCount++;
                
                // Check if we have at least 3 in a column
                if (matchCount >= 3 && y === GRID_SIZE - 1) {
                    for (let i = y - matchCount + 1; i <= y; i++) {
                        matches.push(grid[i][x]);
                    }
                }
            } else {
                // Check if we have at least 3 in a column before the current cell
                if (matchCount >= 3) {
                    for (let i = y - matchCount; i < y; i++) {
                        matches.push(grid[i][x]);
                    }
                }
                
                // Reset for the new potential match
                matchCount = 1;
                matchType = grid[y][x].type;
            }
        }
    }
    
    return matches;
}

// Swap two cells
function swapCells(grid, x1, y1, x2, y2) {
    const newGrid = JSON.parse(JSON.stringify(grid)); // Deep copy grid
    const temp = { ...newGrid[y1][x1] };
    
    // Update positions
    newGrid[y1][x1] = { ...newGrid[y2][x2], x: x1, y: y1 };
    newGrid[y2][x2] = { ...temp, x: x2, y: y2 };
    
    return newGrid;
}

// Handle cell click
function handleCellClick(x, y) {
    if (gameState.gameStatus !== 'playing') return;
    
    const grid = JSON.parse(JSON.stringify(gameState.grid)); // Deep copy
    
    // If no cell is selected, select this one
    if (!selectedCell) {
        const newGrid = grid.map(row => 
            row.map(cell => ({
                ...cell,
                isSelected: cell.x === x && cell.y === y
            }))
        );
        
        selectedCell = { x, y };
        gameState.grid = newGrid;
        renderBoard();
        return;
    }
    
    // If the same cell is clicked, deselect it
    if (selectedCell.x === x && selectedCell.y === y) {
        const newGrid = grid.map(row => 
            row.map(cell => ({
                ...cell,
                isSelected: false
            }))
        );
        
        selectedCell = null;
        gameState.grid = newGrid;
        renderBoard();
        return;
    }
    
    // Check if the clicked cell is adjacent to the selected cell
    const isAdjacent = 
        (Math.abs(selectedCell.x - x) === 1 && selectedCell.y === y) || 
        (Math.abs(selectedCell.y - y) === 1 && selectedCell.x === x);
    
    if (!isAdjacent) {
        // If not adjacent, deselect the current cell and select the new one
        const newGrid = grid.map(row => 
            row.map(cell => ({
                ...cell,
                isSelected: cell.x === x && cell.y === y
            }))
        );
        
        selectedCell = { x, y };
        gameState.grid = newGrid;
        renderBoard();
        return;
    }
    
    // If adjacent, try to swap
    const newGrid = swapCells(grid, selectedCell.x, selectedCell.y, x, y);
    
    // Check if the swap creates matches
    const matches = checkForMatches(newGrid);
    
    if (matches.length > 0) {
        // Valid move - mark matched cells
        matches.forEach(match => {
            newGrid[match.y][match.x].isMatched = true;
        });
        
        // Update game state with the new grid and increment moves
        gameState.grid = newGrid.map(row => 
            row.map(cell => ({
                ...cell,
                isSelected: false
            }))
        );
        gameState.moves += 1;
        gameState.score += (matches.length * MATCH_SCORE) + (matches.length > 3 ? COMBO_BONUS : 0);
        
        // Clear selection
        selectedCell = null;
        
        // Update UI
        updateUI();
        renderBoard();
        
        // Process matches after a delay to show the animation
        setTimeout(() => {
            processMatches();
        }, ANIMATION_DURATION);
    } else {
        // Invalid move - swap back
        const originalGrid = swapCells(newGrid, x, y, selectedCell.x, selectedCell.y);
        
        // Briefly show the invalid swap for visual feedback
        gameState.grid = newGrid;
        renderBoard();
        
        setTimeout(() => {
            gameState.grid = originalGrid.map(row => 
                row.map(cell => ({
                    ...cell,
                    isSelected: false
                }))
            );
            selectedCell = null;
            renderBoard();
        }, 300);
    }
}

// Process matches and drop new items
function processMatches() {
    const grid = JSON.parse(JSON.stringify(gameState.grid)); // Deep copy
    const matches = checkForMatches(grid);
    
    if (matches.length === 0) {
        // Check if game is over
        if (gameState.moves >= gameState.maxMoves) {
            gameState.gameStatus = gameState.score >= gameState.targetScore ? 'won' : 'lost';
            updateUI();
        }
        return;
    }
    
    // Remove matched cells and drop new ones
    // We need to process by columns, starting from the bottom
    for (let x = 0; x < GRID_SIZE; x++) {
        // Find matched cells in this column
        const matchedInColumn = matches.filter(match => match.x === x);
        
        if (matchedInColumn.length > 0) {
            // Sort matched cells from bottom to top
            matchedInColumn.sort((a, b) => b.y - a.y);
            
            // For each matched cell, shift everything above it down
            for (let i = 0; i < matchedInColumn.length; i++) {
                const match = matchedInColumn[i];
                
                // Start from the matched cell and move up
                for (let y = match.y; y > 0; y--) {
                    grid[y][x] = {
                        ...grid[y-1][x],
                        y: y,
                        isMatched: false,
                        isAnimating: true
                    };
                }
                
                // Create a new cell at the top
                grid[0][x] = {
                    id: `cell-${x}-0-${Date.now()}-${i}`, // Unique ID
                    type: ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)],
                    x,
                    y: 0,
                    isSelected: false,
                    isMatched: false,
                    isAnimating: true
                };
            }
        }
    }
    
    // Update score
    gameState.score += (matches.length * MATCH_SCORE) + (matches.length > 3 ? COMBO_BONUS : 0);
    
    // Check for game end
    if (gameState.moves >= gameState.maxMoves) {
        gameState.gameStatus = gameState.score >= gameState.targetScore ? 'won' : 'lost';
    }
    
    // Update game state
    gameState.grid = grid;
    
    // Update UI
    updateUI();
    renderBoard();
    
    // Reset animation flags after animation completes
    setTimeout(() => {
        gameState.grid = gameState.grid.map(row => 
            row.map(cell => ({
                ...cell,
                isAnimating: false
            }))
        );
        renderBoard();
        
        // Check for cascading matches
        setTimeout(() => {
            const newMatches = checkForMatches(gameState.grid);
            if (newMatches.length > 0) {
                processMatches();
            }
        }, 100);
    }, ANIMATION_DURATION);
}

// Reset game
function resetGame() {
    const initialLevel = 1;
    gameState = {
        grid: initializeBoard(),
        score: 0,
        level: initialLevel,
        moves: 0,
        maxMoves: calculateMaxMoves(initialLevel),
        targetScore: calculateTargetScore(initialLevel),
        gameStatus: 'playing'
    };
    
    selectedCell = null;
    
    // Hide message boxes
    levelCompleteBox.classList.add('hidden');
    gameOverBox.classList.add('hidden');
    
    updateUI();
    renderBoard();
}

// Next level
function nextLevel() {
    const newLevel = gameState.level + 1;
    
    // If reached maximum level (25), show completion
    if (newLevel > 25) {
        alert("Congratulations! You've completed all 25 levels of Influencer Match3!");
        resetGame();
        return;
    }
    
    gameState = {
        grid: initializeBoard(),
        score: 0,
        level: newLevel,
        moves: 0,
        maxMoves: calculateMaxMoves(newLevel),
        targetScore: calculateTargetScore(newLevel),
        gameStatus: 'playing'
    };
    
    selectedCell = null;
    
    // Hide message box
    levelCompleteBox.classList.add('hidden');
    
    updateUI();
    renderBoard();
}

// Update UI elements
function updateUI() {
    scoreDisplay.textContent = `Score: ${gameState.score}`;
    levelDisplay.textContent = `Level ${gameState.level}`;
    movesDisplay.textContent = `Moves: ${gameState.moves}/${gameState.maxMoves}`;
    
    // Update progress bar
    const progressPercentage = Math.min((gameState.score / gameState.targetScore) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;
    
    targetScoreDisplay.textContent = `Target: ${gameState.targetScore}`;
    
    // Show/hide game status messages
    if (gameState.gameStatus === 'won') {
        levelCompleteBox.classList.remove('hidden');
        gameOverBox.classList.add('hidden');
    } else if (gameState.gameStatus === 'lost') {
        levelCompleteBox.classList.add('hidden');
        gameOverBox.classList.remove('hidden');
    } else {
        levelCompleteBox.classList.add('hidden');
        gameOverBox.classList.add('hidden');
    }
}

// Render the game board
function renderBoard() {
    // Clear the board
    gameBoard.innerHTML = '';
    
    // Create cells
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const cell = gameState.grid[y][x];
            const cellElement = document.createElement('div');
            
            cellElement.id = cell.id;
            cellElement.className = 'cell';
            cellElement.style.backgroundColor = cell.isMatched 
                ? 'rgba(255, 255, 255, 0.2)' 
                : ITEM_COLORS[cell.type];
            
            if (cell.isSelected) {
                cellElement.classList.add('selected');
            }
            
            if (cell.isMatched) {
                cellElement.classList.add('matched');
            }
            
            if (cell.isAnimating) {
                cellElement.classList.add('animating');
            }
            
            // Add icon
            cellElement.innerHTML = ITEM_ICONS[cell.type];
            
            // Add click event
            cellElement.addEventListener('click', () => handleCellClick(x, y));
            
            gameBoard.appendChild(cellElement);
        }
    }
}

// Event listeners
restartBtn.addEventListener('click', resetGame);
nextLevelBtn.addEventListener('click', nextLevel);
tryAgainBtn.addEventListener('click', resetGame);

// Initialize the game
function init() {
    resetGame();
}

// Start the game
init();