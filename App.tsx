import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme, { useAppTheme } from "./src/hooks/useColorScheme";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { persistor, store } from 'src/services/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { enableMapSet } from 'immer';

import { useEffect, useState } from "react";
import { LogBox } from "react-native";
import React from "react";
import Navigation from "src/navigations";
import AppThemeContext from "src/contexts/Theme.context";
import { ConfirmModal } from "src/components/modals/confirm.modals";
import { CustomToast } from "src/components/Toast";
import SecureStoreManager from "src/utils/SecureStoreManager";
import { PropertyProvider } from "src/contexts/property.context";
import { UnitProvider } from "src/contexts/unit.context";

enableMapSet()

export default function App() {
  // const [loaded, error] = useFonts(cachedFonts);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = useState<any>(null);
  const [initialRouteName, setInitialRouteName] = useState(undefined)

  useEffect(() => {
    useAppTheme().then((theme) => setAppTheme(theme)).catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead',
      'This synthetic event is reused for performance reason',
      'Possible Unhandled Promise Rejection',
      'Constants.platform.ios.model has been deprecated'
    ]);
    try {
      SecureStoreManager.getInitialRouteName().then((route) => setInitialRouteName(route))
    } catch (error) { }
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
        <PropertyProvider>
          <UnitProvider>
            <SafeAreaProvider>
              <Provider
                store={store}
              >
                <PersistGate
                  loading={null}
                  persistor={persistor}
                >
                  <StatusBar />
                  <Navigation
                    colorScheme={appTheme || colorScheme}
                    initialRouteName={initialRouteName}
                  />
                  <ConfirmModal

                  />
                  <CustomToast

                  />
                </PersistGate>
              </Provider>
            </SafeAreaProvider>
          </UnitProvider>
        </PropertyProvider>
      </AppThemeContext.Provider>
    </GestureHandlerRootView>
  );
}
