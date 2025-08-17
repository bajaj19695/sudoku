// Sudoku puzzle generator utility

export const generateEmptyGrid = () => {
  return Array(9).fill().map(() => Array(9).fill(0));
};

export const isValidMove = (grid, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

export const solveSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generateCompleteSudoku = () => {
  const grid = generateEmptyGrid();
  
  // Fill the grid with a valid solution
  const fillGrid = (grid) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          // Shuffle numbers for randomness
          numbers.sort(() => Math.random() - 0.5);
          
          for (let num of numbers) {
            if (isValidMove(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  
  fillGrid(grid);
  return grid;
};

export const generatePuzzle = (difficulty = 'medium') => {
  const completeGrid = generateCompleteSudoku();
  const puzzle = completeGrid.map(row => [...row]);
  
  // Number of cells to remove based on difficulty
  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  };
  
  const toRemove = cellsToRemove[difficulty] || cellsToRemove.medium;
  
  // Randomly remove cells
  let removed = 0;
  while (removed < toRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  
  return {
    puzzle,
    solution: completeGrid
  };
};
