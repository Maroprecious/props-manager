import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "FontsFree-Net-american-typewriter": require("../assets/fonts/FontsFree-Net-american-typewriter.ttf"),
          "American-Typewriter-Bold": require("../assets/fonts/American-Typewriter-Bold.ttf"),
          "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
          "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
          "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
          "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
          "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
          "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
          "Lora-Bold": require("../assets/fonts/Lora-Bold.ttf"),
          "Lora-Medium": require("../assets/fonts/Lora-Medium.ttf"),
          "Lora-Regular": require("../assets/fonts/Lora-Regular.ttf"),
          "Lora-SemiBold": require("../assets/fonts/Lora-SemiBold.ttf"),
          "FontsFree-Net-SF-Pro-Rounded-Medium": require("../assets/fonts/FontsFree-Net-SF-Pro-Rounded-Medium.ttf"),
          "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
          "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
          "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
          "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
          "Avenir-Medium": require("../assets/fonts/Avenir-Medium.ttf"),
          "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
          "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        });
        // await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
