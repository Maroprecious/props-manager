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
import InviteScreen from "src/screens/motetab/invite.screen";
import PayRentScreen from "src/screens/rent/payrent.screen";
import ConfirmRentPayment from "src/screens/rent/confirmrentpayment.screen";
import TransactionsScreen from "src/screens/transactions/history.screen";
import RentalsScreen from "src/screens/rent/rentals.screen";
import ViewRentalScreen from "src/screens/rent/view.screen";
import DocumentsScreen from "src/screens/rent/documents.screen";
import RequestPaymentScreen from "src/screens/rent/requestpayment.screen";
import ConfirmRequestPaymentScreen from "src/screens/rent/confirmpaymentrequest.screen";
import BillsPaymentScreen from "src/screens/bills";
import AirtimeTopUpScreen from "src/screens/bills/airtimetopup.screen";

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
  }, {
    name: "InviteScreen",
    component: InviteScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "PayRentScreen",
    component: PayRentScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ConfirmRentPayment",
    component: ConfirmRentPayment,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "TransactionsScreen",
    component: TransactionsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "RentalsScreen",
    component: RentalsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ViewRentalScreen",
    component: ViewRentalScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "DocumentsScreen",
    component: DocumentsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "RequestPaymentScreen",
    component: RequestPaymentScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ConfirmRequestPaymentScreen",
    component: ConfirmRequestPaymentScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "BillsPaymentScreen",
    component: BillsPaymentScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "AirtimeTopUpScreen",
    component: AirtimeTopUpScreen,
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
