import React, { createContext, useReducer, useEffect } from 'react';
import { generatePuzzle } from '../utils/generator';
import { getErrors, isComplete } from '../utils/solver';

const GameContext = createContext();

const initialState = {
  grid: Array(9).fill().map(() => Array(9).fill(0)),
  fixedCells: Array(9).fill().map(() => Array(9).fill(false)),
  errors: Array(9).fill().map(() => Array(9).fill(false)),
  isCompleted: false,
  difficulty: 'medium',
  timer: 0,
  isPlaying: false,
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        grid: action.payload.grid,
        fixedCells: action.payload.fixedCells,
        errors: Array(9).fill().map(() => Array(9).fill(false)),
        isCompleted: false,
        timer: 0,
        isPlaying: true,
      };
    
    case 'MAKE_MOVE':
      const newGrid = state.grid.map(row => [...row]);
      newGrid[action.payload.row][action.payload.col] = action.payload.value;
      const newErrors = getErrors(newGrid);
      const completed = isComplete(newGrid);
      
      return {
        ...state,
        grid: newGrid,
        errors: newErrors,
        isCompleted: completed,
        isPlaying: !completed,
      };
    
    case 'RESET_GAME':
      return {
        ...initialState,
      };
    
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
      };
    
    case 'UPDATE_TIMER':
      return {
        ...state,
        timer: state.isPlaying ? state.timer + 1 : state.timer,
      };
    
    default:
      return state;
  }
};

const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    // Initialize a new game when component mounts
    initializeNewGame();
  }, []);

  useEffect(() => {
    // Timer effect
    let interval;
    if (gameState.isPlaying) {
      interval = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.isPlaying]);

  const initializeNewGame = (difficulty = gameState.difficulty) => {
    const { puzzle } = generatePuzzle(difficulty);
    const fixedCells = puzzle.map(row => row.map(cell => cell !== 0));
    
    dispatch({
      type: 'INITIALIZE_GAME',
      payload: {
        grid: puzzle,
        fixedCells,
      },
    });
  };

  const makeMove = (row, col, value) => {
    if (!gameState.fixedCells[row][col]) {
      dispatch({
        type: 'MAKE_MOVE',
        payload: { row, col, value },
      });
    }
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
    initializeNewGame();
  };

  const setDifficulty = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        initializeNewGame,
        makeMove,
        resetGame,
        setDifficulty,
        formatTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
