const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
const colorPrimary = '#0041A0';
const colorWhite = "#ffffff";
const criticalRed = "#EB212D";

export default {
  colorPrimary,
  criticalRed,
  colorWhite,
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#828488',
    tabLabelDefault: "#B0B3BA",
    tabIconSelected: tintColorLight,
    inputBackground: 'rgba(200, 200, 201, 0.13)',
    inputPlaceHolderColor: 'rgba(3, 3, 3, 0.2)',
    screenLabel: "#242A37",
    screenIntro: "#949496",

    //
    primary: colorPrimary,
    red: criticalRed,
    icon: '#00001D',
    opaqueWhite: 'rgba(255, 255, 255, 0.22)',
    greyWhite: '#F3F4F5',
    shadow: '#00000029',
    textGrey: '#3E3E3E',
    black:'#1A1A1A',
    textLightGrey: '#949496',
    lighterGrey: "rgba(200, 200, 201, 0.13)",
    grey: '#C8C8C9',
    textBlack: '#000000',
    darkText: '#030303',
    textBlack2: '#242A37',
    lighterBlue: '#2972E6',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#828488',
    tabLabelDefault: "#B0B3BA",
    tabIconSelected: tintColorDark,
    inputBackground: 'rgba(200, 200, 201, 0.13)',
    inputPlaceHolderColor: 'rgba(240, 240, 240, 0.2)',
    screenLabel: "rgba(255, 255, 255, 0.8)",
    screenIntro: "rgba(255, 255, 255, 0.6)",
  },
};
