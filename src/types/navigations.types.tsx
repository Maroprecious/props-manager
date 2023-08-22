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
  PayRentScreen: undefined;
  ConfirmRentPayment: {
    amount: number,
    property: {
      id: string,
      address: string,
    },
  };
  TransactionsScreen: undefined;
  RentalsScreen: undefined;
  ViewRentalScreen: {
    rental: {
      id: string,
      tenancy: {
        id: string
      },
      property: {
        id: string,
        address: string,
      }, 
      lastPaymentDate: string,
      nextDueDate: string,
      nextRentAmount: number,
      duration: number,
      landlord?: {
        id: string,
        fullName: string,
        mobile: string
      }
    }
  };
  DocumentsScreen: undefined;
  TenancyScreen: undefined;
  ViewTenancyScreen: {
    data: {
      property: {
        id: string,
        propertyName: string,
        propertyLocation: string,
      }
    }
  };
  ViewTenant: undefined;
  PropertyManagerScreen: undefined;
  AssignPropertyManager: undefined
  YourFinancialsScreen: undefined;
  RequestPaymentScreen: undefined;
  ConfirmRequestPaymentScreen: {
    amount: number,
    purpose: string,
    recipient: {
      name: string,
      email: string,
    },
    comment?: string
  };
  BillsPaymentScreen: undefined
  AirtimeTopUpScreen: undefined
  AddPropertyScreen: {
    actionType?: 'add' | 'edit'
  } | undefined
  PropertyScreen: {
    id: string
  },
  AddTenancyDetails: undefined
  FaqScreen: undefined
  HelpAndSupportScreen: undefined
  TermsAndConditionScreen: undefined
  SettingScreen: undefined
  ChangePasswordScreen: {
    email: string,
  }
  ChangePasswordOtpScreen: undefined
  Setup2faScreen: undefined
  VerifyWithMobile: undefined
  VerifyWithEmail: undefined
  PayBillsScreen: undefined
  EditProfileScreen: undefined
  PropertiesScreen: undefined
  AddUnitsScreen: {
    propertyId: string,
    actionType?: 'add' | 'edit',
    propertyDetails?: {
      propertyName: string,
      propertyAddress: string
    }
  }
  PropertyDetailsScreen: undefined
  ViewUnitsScreen: undefined
  UnitDetailsScreen: undefined
  AddTenantScreen: {
    data: {
      unit: {
        id: string,
      } & any,
      property?: {
        id: string
      }
    },
    from: "unit-screen" | "tenancy-screen"
  }, 
  CompleteAccountCreationScreen: undefined 
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
  ReLoginScreen: undefined;
  ForgotPasswordScreen: {
    type: verificationType
  };
  CreateAccountScreen: undefined;
  OTPScreen: {
    type: verificationType,
    email: string
  };
  ResetPasswordScreen: {
    email: string,
  };
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
