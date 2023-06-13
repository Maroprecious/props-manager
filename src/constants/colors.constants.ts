const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const colorPrimary = '#0041A0';
const criticalRed = "#DD3352";

export default {
  colorPrimary,
  criticalRed,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    inputBackground: 'rgba(200, 200, 201, 0.13)',
    inputPlaceHolderColor: 'rgba(3, 3, 3, 0.2)'
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    inputBackground: 'rgba(200, 200, 201, 0.13)',
    inputPlaceHolderColor: 'rgba(240, 240, 240, 0.2)'
  },
};
