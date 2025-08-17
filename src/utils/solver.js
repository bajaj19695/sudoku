// Sudoku solver and validation utilities

export const isValidSudoku = (grid) => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const val = grid[row][col];
      if (val !== 0) {
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const val = grid[row][col];
      if (val !== 0) {
        if (seen.has(val)) return false;
        seen.add(val);
      }
    }
  }

  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set();
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          const val = grid[row][col];
          if (val !== 0) {
            if (seen.has(val)) return false;
            seen.add(val);
          }
        }
      }
    }
  }

  return true;
};

export const isComplete = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return false;
    }
  }
  return isValidSudoku(grid);
};

export const getErrors = (grid) => {
  const errors = Array(9).fill().map(() => Array(9).fill(false));
  
  // Check for conflicts in rows
  for (let row = 0; row < 9; row++) {
    const seen = {};
    for (let col = 0; col < 9; col++) {
      const val = grid[row][col];
      if (val !== 0) {
        if (seen[val]) {
          errors[row][col] = true;
          errors[row][seen[val]] = true;
        } else {
          seen[val] = col;
        }
      }
    }
  }

  // Check for conflicts in columns
  for (let col = 0; col < 9; col++) {
    const seen = {};
    for (let row = 0; row < 9; row++) {
      const val = grid[row][col];
      if (val !== 0) {
        if (seen[val]) {
          errors[row][col] = true;
          errors[seen[val]][col] = true;
        } else {
          seen[val] = row;
        }
      }
    }
  }

  // Check for conflicts in 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = {};
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          const val = grid[row][col];
          if (val !== 0) {
            if (seen[val]) {
              errors[row][col] = true;
              errors[seen[val].row][seen[val].col] = true;
            } else {
              seen[val] = { row, col };
            }
          }
        }
      }
    }
  }

  return errors;
};

export const canSolve = (grid) => {
  const gridCopy = grid.map(row => [...row]);
  return solveSudokuBacktrack(gridCopy);
};

const solveSudokuBacktrack = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudokuBacktrack(grid)) {
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

const isValidMove = (grid, row, col, num) => {
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
