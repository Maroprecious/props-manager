import { Dimensions, Platform } from 'react-native';
import fontsConstants from './fonts.constants';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  tabBarHeight: Platform.OS === "android" ? 
    fontsConstants.h(76) :
    fontsConstants.h(80),
  activeOpacity: 0.6
};
