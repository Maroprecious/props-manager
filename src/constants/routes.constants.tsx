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
import AddTenancyDetails from "src/screens/property/addtenancydetails.screen";
import FaqScreen from "src/screens/motetab/faq.screen";
import HelpAndSupportScreen from "src/screens/motetab/support.screen";
import TermsAndConditionScreen from "src/screens/motetab/tandc.screen";
import SettingScreen from "src/screens/motetab/settings.screen";
import ChangePasswordOtpScreen from "src/screens/motetab/changepasswordotp.screen";
import Setup2faScreen from "src/screens/motetab/2fasetup.screen";
import VerifyWithMobile from "src/screens/motetab/verifywithmobile.screen";
import VerifyWithEmail from "src/screens/motetab/verifywithemail.screen";
import PayBillsScreen from "src/screens/paymentstab/paybills.screen";
import TenancyScreen from "src/screens/portfolio/tenancy.screen";
import ViewTenancyScreen from "src/screens/portfolio/viewtenancy.screen";
import ViewTenant from "src/screens/portfolio/viewtenantdetails.screen";
import PropertyManagerScreen from "src/screens/portfolio/propertymanager.screen";
import AssignPropertyManager from "src/screens/portfolio/assignpropertymgr.screen";
import EditProfileScreen from "src/screens/motetab/editprofile.screen";
import { AuthUserType } from "src/types/app.types";
import YourFinancialsScreen from "src/screens/paymentstab/yourfinancials.screen";
import PropertiesScreen from "src/screens/property";
import AddPropertyScreen from "src/screens/property/addproperty.screen";
import AddUnitsScreen from "src/screens/property/addunits.screen";
import PropertyScreen from "src/screens/property/property.screen";
import PropertyDetailsScreen from "src/screens/property/properttydetails.screen";
import ViewUnitsScreen from "src/screens/property/viewunits.screen";
import UnitDetailsScreen from "src/screens/property/unitdetails.screen";
import AddTenantScreen from "src/screens/property/addtenant.screen";
import BankDetailsScreen from "src/screens/motetab/bankaccount.screen";
import SubScriptionScreen from "src/screens/motetab/subscription.screen";
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

export const CommonRoutes = [{
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
}]

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
    name: "TenancyScreen",
    component: TenancyScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ViewTenancyScreen",
    component: ViewTenancyScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "PropertyManagerScreen",
    component: PropertyManagerScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "AssignPropertyManager",
    component: AssignPropertyManager,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
      name: "ViewTenant",
      component: ViewTenant,
      options: {
        headerShown: false,
      },
      initialParams: {},
    },{
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
    name: "PropertyScreen",
    component: PropertyScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      id: "-1"
    },
  }, {
    name: "AddPropertyScreen",
    component: AddPropertyScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "AddUnitsScreen",
    component: AddUnitsScreen,
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
    name: "SettingScreen",
    component: SettingScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ChangePasswordScreen",
    component: ResetPasswordScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      email: ""
    },
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
  }, {
    name: "EditProfileScreen",
    component: EditProfileScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "YourFinancialsScreen",
    component: YourFinancialsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "PropertiesScreen",
    component: PropertiesScreen,
    options: {
      headerShown: false
    },
    initialParams: {},
  }, {
    name: "PropertyDetailsScreen",
    component: PropertyDetailsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ViewUnitsScreen",
    component: ViewUnitsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "UnitDetailsScreen",
    component: UnitDetailsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "AddTenantScreen",
    component: AddTenantScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "CompleteAccountCreationScreen",
    component: CreateAccountScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "ReLoginScreen",
    component: LoginScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "BankDetailsScreen",
    component: BankDetailsScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  }, {
    name: "SubScriptionScreen",
    component: SubScriptionScreen,
    options: {
      headerShown: false,
    },
    initialParams: {},
  },
  ...CommonRoutes
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
    initialParams: {
      email: ""
    },
  },
  ...CommonRoutes
];

const AppRoutes = (user: AuthUserType) => {
  const routes = user?.id === null || user?.id === undefined ? WelcomeAppRputes : UserAppRoutes;
  return routes;
};

export default AppRoutes;
