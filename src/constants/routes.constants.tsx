import WelcomeScreen from "src/screens/launch/welcome.screen";
import LoginScreen from "src/screens/auth/login.screen";
import CreateAccountScreen from "src/screens/auth/createaccount.screen";
import ForgotPasswordScreen from "src/screens/auth/forgotpassword.screen";
import OTPScreen from "src/screens/auth/otp.screen";
import ResetPasswordScreen from "src/screens/auth/resetpassword.screen";
import { BottomTabNavigator } from "src/navigations/BottomTabNavigator";
import NotificationsScreen from "src/screens/notifications";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import React from "react";
import fontsConstants from "./fonts.constants";
import layoutsConstants from "./layouts.constants";
import { View } from "src/components/Themed";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

export const UserAppRoutes = [
  {
    name: "App",
    component: BottomTabNavigator,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "NotificationsScreen",
    component: NotificationsScreen,
    options: {
      headerShown: false,
      header: ({  }) => (
        <View>
          <HeaderBackButton
            containerStyle={{
              marginTop: fontsConstants.h(40),
              paddingHorizontal: layoutsConstants.mainViewHorizontalPadding
            }}
          />
        </View>
      ),
    },
    initialParams: {}
  }, {
    name: "VerifyEmailScreen",
    component: ForgotPasswordScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      type: "verify-email"
    }
  }, {
    name: "OTPVerifyScreen",
    component: OTPScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      type: "verify-email"
    },
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
  }, {
    name: "ForgotPasswordScreen",
    component: ForgotPasswordScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "OTPScreen",
    component: OTPScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ResetPasswordScreen",
    component: ResetPasswordScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  },
];

const AppRoutes = () => {
  const user = {id: "null"};
  const routes = user?.id === null || user?.id === undefined ? WelcomeAppRputes : UserAppRoutes;
  return routes;
};

export default AppRoutes;
