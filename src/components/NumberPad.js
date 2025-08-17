import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NumberPad = ({ onNumberPress, onClear }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.container}>
      <View style={styles.numbersGrid}>
        {numbers.map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => onNumberPress(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 240,
  },
  numberButton: {
    width: 70,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    margin: 5,
    borderRadius: 8,
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f44336',
    marginTop: 10,
    borderRadius: 8,
  },
  clearText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NumberPad;
