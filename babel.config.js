module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@services': './src/services',
          '@hooks': './src/hooks',
          '@types': './src/types',
        },
      },
    ],
  ],
};
