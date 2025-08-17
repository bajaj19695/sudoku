module.exports = {
  dependencies: {
    'react-native-gesture-handler': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-gesture-handler/android/',
          packageImportPath: 'import io.github.douglasjunior.ReactNativeGetLocation.ReactNativeGetLocationPackage;',
        },
      },
    },
  },
};
