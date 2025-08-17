// Theme configuration for the Sudoku app

export const colors = {
  primary: '#2196f3',
  secondary: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#333333',
  textSecondary: '#666666',
  border: '#cccccc',
  selectedCell: '#e3f2fd',
  fixedCell: '#f5f5f5',
  errorCell: '#ffebee',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  large: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal',
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 8,
  },
};

export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  xl: 16,
};

export const layout = {
  cellSize: 35,
  gridSize: 315, // 9 * cellSize
  numberPadButtonSize: 70,
  numberPadButtonHeight: 50,
};

export default {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  layout,
};
