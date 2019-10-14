module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['relay', { schema: 'data/schema.json' }]],
};
