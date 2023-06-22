import { NotificationProps } from "src/types/app.types";
import fontsConstants from "./fonts.constants";
export const APP_NAME = "MPM-Mobile";
export const APP_THEME = `${APP_NAME}-APP-THEME`;
export const APP_CONFIRM = `${APP_NAME}-APP-CONFIRM`;

export const SliderData = [
  {
    image: require("src/assets/images/intro-slide-1.png"),
    header: `Enhancing \nYour Rental \nExperience`,
    subtext: `Efficiently Streamlined Platform \nfor Landlords and Tenants …`
  },
  {
    image: require("src/assets/images/intro-slide-2.png"),
    header: 'Property \nManagement \nMade Easy',
    subtext: `Simplify Administration and \nManagement of your Properties …`
  },
  {
    image: require("src/assets/images/intro-slide-3.png"),
    header: 'Effortless \nDocumentation \nManagement',
    subtext: `Organize, Access, and Secure \nYour Property Records …`
  },
]

export const MenuItems = [{
  id: 1,
  label: 'Settings',
  icon: require("src/assets/images/icons/gear.png"),
  screen: 'InviteScreen'
}, {
  id: 2,
  label: 'FAQs',
  icon: require("src/assets/images/icons/faq.png"),
  screen: 'InviteScreen'
}, {
  id: 3,
  label: 'Help and Support',
  icon: require("src/assets/images/icons/question.png"),
  screen: 'InviteScreen'
}, {
  id: 4,
  label: 'Invite Others',
  icon: require("src/assets/images/icons/invitation.png"),
  screen: 'InviteScreen'
}, {
  id: 5,
  label: 'Terms and Conditions',
  icon: require("src/assets/images/icons/agreement.png"),
  screen: 'InviteScreen'
}, {
  id: 6,
  label: 'Logout',
  icon: require("src/assets/images/icons/logout.png"),
  screen: ''
}]

export const RecentActivitiesData: NotificationProps[] = [{
  date: "2023-04-26",
  items: [{
    id: 1,
    title: "Settings",
    type: "settings",
    text: "You have successfully completed your profile setup."
  }, {
    id: 2,
    title: "Rent Details Added",
    type: "invoice",
    text: "You have successfully added your rental details for easy management."
  }, {
    id: 3,
    title: "Added Tenancy Details",
    type: "location",
    text: "You have completed your onboarding by adding your tenancy details."
  }]
}, {
  date: "2023-04-10",
  items: [{
    id: 4,
    title: "Bill Paid",
    type: "bill",
    text: "You have successfully paid for Your LAWMA bill Receipt No: 0093748 Amount: ₦1,500,000 Transaction ID: 010334903",
    status: "success"
  }]
}]

export const NotificationsData: NotificationProps[] = [{
  date: "2023-04-26",
  items: [{
    id: 1,
    title: "Settings",
    type: "settings",
    text: "You have successfully completed your profile setup."
  }, {
    id: 2,
    title: "Rent Details Added",
    type: "invoice",
    text: "You have successfully added your rental details for easy management."
  }, {
    id: 3,
    title: "Added Tenancy Details",
    type: "location",
    text: "You have completed your onboarding by adding your tenancy details."
  }]
}, {
  date: "2023-04-10",
  items: [{
    id: 4,
    title: "Bill Paid",
    type: "bill",
    text: "You have successfully paid for Your LAWMA bill Receipt No: 0093748 Amount: ₦1,500,000 Transaction ID: 010334903",
    status: "success"
  }]
}, ...RecentActivitiesData]

export const PaymentsMenuItems = [{
  id: 1,
  label: "Pay\nRent",
  icon: require("src/assets/images/icons/buy-airtime.png"),
  screen: ""
}, {
  id: 2,
  label: "Pay\nBills",
  icon: require("src/assets/images/icons/invoice.png"),
  screen: ""
}, {
  id: 3,
  label: "Airtime\nTopup",
  icon: require("src/assets/images/icons/buy-airtime.png"),
  screen: ""
}, {
  id: 4,
  label: "Request\nPayment",
  icon: require("src/assets/images/icons/recieve-payment.png"),
  screen: ""
}, {
  id: 5,
  label: "Your\nFinancials",
  icon: require("src/assets/images/icons/financials.png"),
  screen: ""
}, {
  id: 6,
  label: "Transaction\nHistory",
  icon: require("src/assets/images/icons/transaction-history.png"),
  screen: ""
}]

export const PortfolioMenuItems = [{
  id: 1,
  label: "Rental",
  icon: require("src/assets/images/icons/rental.png"),
  screen: ""
}, {
  id: 2,
  label: "Documents",
  icon: require("src/assets/images/icons/documents.png"),
  screen: ""
}]

export const DashboardSliderInfo = [{
  id: 1,
  title: 'Invite Others',
  message: `Hello! You can invite your\nLandlord, tenants or neighbours\nand make it even more fun!\nSimply tap on the "Invite Others"\nTo share the app with them.`,
  hasLink: true,
  linkLabel: `Click to Invite Others`,
  image: require("src/assets/images/invite-others-social.png")
}, {
  id: 2,
  title: 'Add Tenancy Details',
  message: `Welcome to props manager app!\nTo get started, please verify your\nemail address to unlock all the\nfeatures and benefits awaiting you.\nThank you for joining us!`,
  hasLink: true,
  linkLabel: `Click to Add Details`,
  image: require("src/assets/images/add-tenancy-image.png")
}]

export default {
  componentHeight: fontsConstants.h(60),
  mainViewHorizontalPadding: fontsConstants.w(30),
  activeOpacity: 0.6,
  APP_THEME,
}