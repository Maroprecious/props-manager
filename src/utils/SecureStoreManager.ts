import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemeName } from 'react-native';
import { APP_INITIAL_ROUTE, APP_THEME, APP_TOKEN } from 'src/constants/global.constants';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from 'src/types/navigations.types';

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
  getInitialRouteName: async () => {
    try {
      const theme: any = await AsyncStorage.getItem(`${APP_INITIAL_ROUTE}`)
      return theme;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setInitialRouteName: async (route: keyof RootStackParamList) => {
    try {
      await AsyncStorage.setItem(`${APP_INITIAL_ROUTE}`, `${route}`);
    } catch (error) {
      console.log(error);
    }
  },
  getAuthToken: async () => {
    try {
      const token = await SecureStore.getItemAsync(`${APP_TOKEN}`);
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setAuthToken: async (token: string) => {
    try {
      await SecureStore.setItemAsync(`${APP_TOKEN}`, token);
    } catch (error) {
      console.log(error);
    }
  },
}

export default SecureStoreManager;