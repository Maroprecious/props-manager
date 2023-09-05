import * as React from "react";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import SecureStoreManager from "src/utils/SecureStoreManager";
import { EXPO_APP_ID_TOKEN } from "@env";

export default function useExpoPushToken() {
  const [pushToken, setPushToken] = React.useState<any>(null);
  React.useEffect(() => {
    async function getPushToken() {
      try {
        const pushToken: any = await SecureStoreManager.getExpoPushToken();
        if (pushToken !== null) setPushToken(pushToken);
        else {
          registerForPushNotificationsAsync().then(async (token: any) => {
            if (token !== "permission_not_granted") {
              //implement method to subscribe/save user expo mobile token to backend;
              //if response from backend is success/token saved, call await Store.storeExpoPushToken(token) to save the expo push token to async storage
              setPushToken(token); //you may choose to do this only when response from backend is success
            }
          });
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // console.warn(e);
      }
    }
    getPushToken();
  }, []);
  return pushToken;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "ios") return "permission_not_granted";

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return "permission_not_granted";
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: EXPO_APP_ID_TOKEN,
    })).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}
