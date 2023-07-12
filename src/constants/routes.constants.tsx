import WelcomeScreen from "src/screens/launch/welcome.screen";
import LoginScreen from "src/screens/auth/login.screen";
import CreateAccountScreen from "src/screens/auth/createaccount.screen";
import ForgotPasswordScreen from "src/screens/auth/forgotpassword.screen";
import OTPScreen from "src/screens/auth/otp.screen";
import ResetPasswordScreen from "src/screens/auth/resetpassword.screen";
import { BottomTabNavigator } from "src/navigations/BottomTabNavigator";
import NotificationsScreen from "src/screens/notifications";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import * as React from "react";
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
import  AddProperty  from "src/screens/add-property/add-property";
import AddTenancyDetails from "src/screens/add-property/add-tenancy-details";
import FaqScreen from "src/screens/motetab/faq.screen";
import HelpAndSupportScreen from "src/screens/motetab/Help-support.screen";
import TermsAndConditionScreen from "src/screens/motetab/terms-condition.screen";
import { useAppSelector } from "src/hooks/useReduxHooks";
import SettingScreen from "src/screens/motetab/settings-screen";
import ChangePasswordScreen from "src/screens/motetab/change-password-screen";
import ChangePasswordOtpScreen from "src/screens/motetab/change-password-otp.screen";
import Setup2faScreen from "src/screens/motetab/setup-2fa";
import VerifyWithMobile from "src/screens/motetab/verify-with-mobile.screen";
import VerifyWithEmail from "src/screens/motetab/verify-with-email.screen";
import PayBillsScreen from "src/screens/paymentstab/pay-bills";
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
  }, {
    name: "AddProperty",
    component: AddProperty,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "AddTenancyDetails",
    component: AddTenancyDetails,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "FaqScreen",
    component: FaqScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "HelpAndSupportScreen",
    component: HelpAndSupportScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "TermsAndConditionScreen",
    component: TermsAndConditionScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "SettingScreen",
    component: SettingScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ChangePasswordScreen",
    component: ChangePasswordScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ChangePasswordOtpScreen",
    component: ChangePasswordOtpScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "Setup2faScreen",
    component: Setup2faScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "VerifyWithMobile",
    component: VerifyWithMobile,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "VerifyWithEmail",
    component: VerifyWithEmail,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "PayBillsScreen",
    component: PayBillsScreen,
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
  const { token, user } = useAppSelector((state) => state.auth);
  const routes = user?.id === null || user?.id === undefined ? UserAppRoutes  : WelcomeAppRputes;
  return routes;
};

export default AppRoutes;
