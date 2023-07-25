/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import LinkingConfiguration from "./LinkingConfiguration";
import { RenderProps, RootStackParamList } from "src/types/navigations.types";
import AppRoutes from "src/constants/routes.constants";
import { useAppSelector } from "src/hooks/useReduxHooks";
import axios from "axios";

export default function Navigation({
  colorScheme,
  initialRouteName,
}: {
  colorScheme: ColorSchemeName;
  initialRouteName?: keyof RootStackParamList
}) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export function renderScreen({
  name,
  component,
  options = {},
  initialParams = {},
}: RenderProps) {
  return (
    <Stack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
      initialParams={initialParams}
    />
  );
}
function RootNavigator({initialRouteName="WelcomeScreen"}: {initialRouteName?: keyof RootStackParamList}) {
  const { token, user } = useAppSelector((state) => state.auth);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
    >
      {AppRoutes(user).map((route: any) => {
        return renderScreen(route);
      })}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
