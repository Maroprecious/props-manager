import React from "react";
import { RenderProps, RootStackParamList } from "src/types/navigations.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "src/screens/launch/welcome.screen";
import LoginScreen from "src/screens/auth/login.screen";
import CreateAccountScreen from "src/screens/auth/createaccount.screen";

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

export const UserAppRoutes = [
  {
    name: "App",
    component: <></>,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }
];

const WelcomeAppRputes = [
  {
    name: "WelcomeScreen",
    component: WelcomeScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "LoginScreen",
    component: LoginScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "CreateAccountScreen",
    component: CreateAccountScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  },
];

const AppRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated)
    return UserAppRoutes.map((route: any) => {
      return renderScreen(route);
    });
  else
    return WelcomeAppRputes.map((route: any) => {
      return renderScreen(route);
    });
};

export default AppRoutes;
