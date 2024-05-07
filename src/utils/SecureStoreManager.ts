import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemeName } from 'react-native';
import { APP_EMAIL, APP_EXPO_PUSH_TOKEN, APP_INITIAL_ROUTE, APP_INITIATED_PAYMENT, APP_PAYMENT_OPTIONS, APP_SUBSCRIPTIONS_PLANS, APP_THEME, APP_TOKEN } from 'src/constants/global.constants';
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
  setAuthEmail: async (token: string) => {
    try {
      await SecureStore.setItemAsync(`${APP_EMAIL}`, token);
    } catch (error) {
      console.log(error);
    }
  },
  getAuthEmail: async () => {
    try {
     return await SecureStore.getItemAsync(`${APP_EMAIL}`);
    } catch (error) {
      console.log(error);
    }
  },
  getInitiatedPaymentData: async () => {
    try {
      const data = await SecureStore.getItemAsync(`${APP_INITIATED_PAYMENT}`);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  setInitiatedPaymentData: async (data: string) => {
    try {
      await SecureStore.setItemAsync(`${APP_INITIATED_PAYMENT}`, data);
    } catch (error) {
      console.log(error);
    }
  },
  delInitiatedPaymentData: async () => {
    try {
      await SecureStore.deleteItemAsync(`${APP_INITIATED_PAYMENT}`);
    } catch (error) {
      console.log(error);
    }
  },
  storeExpoPushToken: async (token: string) => {
    try {
      return await SecureStore.setItemAsync(APP_EXPO_PUSH_TOKEN, token);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  getExpoPushToken: async () => {
    try {
      return await SecureStore.getItemAsync(APP_EXPO_PUSH_TOKEN);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  deleteExpoPushToken: () => {
    try {
      SecureStore.deleteItemAsync(APP_EXPO_PUSH_TOKEN);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  storeSubscriptionPlans: async (plans: string) => {
    try {
      return await SecureStore.setItemAsync(APP_SUBSCRIPTIONS_PLANS, plans);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  getSubscriptionPlans: async () => {
    try {
      return await SecureStore.getItemAsync(APP_SUBSCRIPTIONS_PLANS);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
  storeAppPaymentOptions: async (plans: string) => {
    try {
      return await SecureStore.setItemAsync(APP_PAYMENT_OPTIONS, plans);
    } catch (error) {
      console.log('Store save error', error);
    }
  },
  getAppPaymentOptions: async () => {
    try {
      return await SecureStore.getItemAsync(APP_PAYMENT_OPTIONS);
    } catch (error) {
      console.log('Store read error', error);
    }
  },
}

export default SecureStoreManager;