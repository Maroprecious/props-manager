import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme, { useAppTheme } from "./src/hooks/useColorScheme";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import React from "react";
import Navigation from "src/navigations";
import AppThemeContext from "src/contexts/Theme.context";

export default function App() {
  // const [loaded, error] = useFonts(cachedFonts);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<any>(null);

  useEffect(() => {
    useAppTheme().then((theme) => setAppTheme(theme)).catch((e) => console.log(e))
  }, [])
  
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
      'This synthetic event is reused for performance reason',
      'Possible Unhandled Promise Rejection'
    ]);
  }, [])

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <GestureHandlerRootView
        style={{
          flex: 1
        }}
      >
      <AppThemeContext.Provider value={appTheme || colorScheme}>
        <SafeAreaProvider>
          <StatusBar />
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </AppThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
