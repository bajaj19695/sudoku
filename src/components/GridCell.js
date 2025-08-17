import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GridCell = ({ value, isSelected, isFixed, onPress, hasError }) => {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isSelected && styles.selectedCell,
        isFixed && styles.fixedCell,
        hasError && styles.errorCell,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.cellText, isFixed && styles.fixedText]}>
        {value !== 0 ? value : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedCell: {
    backgroundColor: '#e3f2fd',
  },
  fixedCell: {
    backgroundColor: '#f5f5f5',
  },
  errorCell: {
    backgroundColor: '#ffebee',
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fixedText: {
    color: '#666',
  },
});

export default GridCell;
