import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { GameContext } from '../context/GameContext';
import GridCell from '../components/GridCell';
import NumberPad from '../components/NumberPad';

const GameScreen = () => {
  const { gameState, makeMove, resetGame } = useContext(GameContext);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  const handleCellPress = (row, col) => {
    if (!gameState.fixedCells[row][col]) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberPress = (number) => {
    if (selectedCell.row !== -1 && selectedCell.col !== -1) {
      makeMove(selectedCell.row, selectedCell.col, number);
    }
  };

  const handleClear = () => {
    if (selectedCell.row !== -1 && selectedCell.col !== -1) {
      makeMove(selectedCell.row, selectedCell.col, 0);
    }
  };

  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        grid.push(
          <GridCell
            key={`${row}-${col}`}
            value={gameState.grid[row][col]}
            isSelected={selectedCell.row === row && selectedCell.col === col}
            isFixed={gameState.fixedCells[row][col]}
            hasError={gameState.errors[row][col]}
            onPress={() => handleCellPress(row, col)}
          />
        );
      }
    }
    return grid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>
      <View style={styles.gridContainer}>
        <View style={styles.grid}>
          {renderGrid()}
        </View>
      </View>
      <NumberPad onNumberPress={handleNumberPress} onClear={handleClear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  gridContainer: {
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 315, // 9 cells * 35px width
    height: 315, // 9 cells * 35px height
  },
});

export default GameScreen;
