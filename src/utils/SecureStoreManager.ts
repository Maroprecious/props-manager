import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemeName } from 'react-native';
import { APP_THEME } from 'src/constants/global.constants';


const SecureStoreManager = {
  getAppTheme: async () => {
    try {
      const theme: any = await AsyncStorage.getItem(`${APP_THEME}`)
      return theme;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setAppTheme: async (theme: ColorSchemeName) => {
    try {
      await AsyncStorage.setItem(`${APP_THEME}`, `${theme}`);
    } catch (error) {
      console.log(error);
    }
  },
}

export default SecureStoreManager;