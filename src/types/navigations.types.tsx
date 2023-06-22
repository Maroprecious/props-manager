/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import { FunctionComponent } from 'react';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type verificationType = "verify-email" | "verify-phone-number" | "reset-password";

export type RootStackParamList = LaunchStackParamList & AuthStackParamList & RootTabParamList & {
  App: NavigatorScreenParams<RootTabParamList> | undefined;
  HomeTabScreen: undefined;
  PaymentsTabScreen: undefined;
  PortfolioTabScreen: undefined;
  MoreTabScreen: undefined;
  NotificationsScreen: undefined;
  VerifyEmailScreen: {
    type: verificationType
  }
  OTPVerifyScreen: {
    type: verificationType
  }
  InviteScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type AuthStackScreenProp<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;


export type LaunchStackParamList = {
  WelcomeScreen: undefined;
}

export type AuthStackParamList = {
  LoginScreen: undefined;
  ForgotPasswordScreen: {
    type: verificationType
  };
  CreateAccountScreen: undefined;
  OTPScreen: {
    type: verificationType
  };
  ResetPasswordScreen: undefined;
}

export type RootTabParamList = {
  HomeTabNavigator: undefined;
  PaymentsTabNavigator: undefined;
  PortfolioTabNavigator: undefined;
  MoreTabNavigator: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RenderProps = {
  name: keyof RootStackParamList;
  component: FunctionComponent<any>;
  options: NativeStackNavigationOptions;
  initialParams: any;
};


export type TabsParamList = {
}

export type TabScreensParamList = {

}

export type TabsRenderProps = {
  name: keyof TabScreensParamList;
  component: FunctionComponent<any>;
  options: NativeStackNavigationOptions;
  initialParams: any;
}
