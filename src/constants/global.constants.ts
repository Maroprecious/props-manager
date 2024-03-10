import { NotificationProps } from "src/types/app.types";
import fontsConstants from "./fonts.constants";
export const APP_NAME = "MPM-Mobile";
export const APP_THEME = `${APP_NAME}-APP-THEME`;
export const APP_CONFIRM = `${APP_NAME}-APP-CONFIRM`;
export const APP_TOKEN = `${APP_NAME}-APP-TOKEN`;
export const APP_INITIAL_ROUTE = `${APP_NAME}-APP-INITIAL-ROUTE`;
export const APP_INITIATED_PAYMENT = `${APP_NAME}-APP-INITIATED-PAYMENT`;
export const APP_EXPO_PUSH_TOKEN = `${APP_NAME}-APP-EXPO-PUSH-TOKEN`;
export const APP_SUBSCRIPTIONS_PLANS = `${APP_NAME}-APP-SUBSCRIPTION-PLANS`;
export const APP_PAYMENT_OPTIONS = `${APP_NAME}-APP-PAYMENT-OPTIONS`;

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
  screen: 'SettingScreen'
}, {
  id: 8,
  label: 'Subscriptions',
  icon: require("src/assets/images/icons/subscription.png"),
  screen: 'SubScriptionScreen'
}, {
  id: 2,
  label: 'Bank Account',
  icon: require("src/assets/images/icons/financials.png"),
  screen: 'BankDetailsScreen'
}, {
  id: 3,
  label: 'FAQs',
  icon: require("src/assets/images/icons/faq.png"),
  screen: 'FaqScreen'
}, {
  id: 4,
  label: 'Help and Support',
  icon: require("src/assets/images/icons/question.png"),
  screen: 'HelpAndSupportScreen'
}, {
  id: 5,
  label: 'Invite Others',
  icon: require("src/assets/images/icons/invitation.png"),
  screen: 'InviteScreen'
}, {
  id: 6,
  label: 'Terms and Conditions',
  icon: require("src/assets/images/icons/agreement.png"),
  screen: 'TermsAndConditionScreen'
}, {
  id: 7,
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
export const FinancialsData: NotificationProps[] = [
  {
    date: "2023-04-10",
    items: [{
      id: 4,
      title: "Bill Paid",
      type: "bill",
      text: "You have successfully paid for Your LAWMA bill Receipt No: 0093748 Amount: ₦1,500,000 Transaction ID: 010334903",
      status: "success"
    }]
  },
  {
    date: "2023-04-10",
  items: [{
    id: 4,
    title: "Bill Paid",
    type: "bill",
    text: "You have successfully paid for Your LAWMA bill Receipt No: 0093748 Amount: ₦1,500,000 Transaction ID: 010334903",
    status: "success"
  }]
  },
  {
    date: "2023-04-10",
  items: [{
    id: 4,
    title: "Bill Paid",
    type: "bill",
    text: "You have successfully paid for Your LAWMA bill Receipt No: 0093748 Amount: ₦1,500,000 Transaction ID: 010334903",
    status: "success"
  }]
  }
]

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

export const TransactionHistory: NotificationProps[] = [{
  date: "2023-04-26",
  items: [{
    id: 1,
    title: "Rent Paid",
    type: "bill",
    text: "You have successfully paid your rent for property ID: 00038 Amount: ₦1,500,000 Transaction ID: 010334903",
    status: "success"
  }]
}, {
  date: "2023-04-16",
  items: [{
    id: 2,
    title: "Airtime Recharge",
    type: "bill",
    text: "You have successfully recharged airtime for 07010203040 Amount: ₦1,500 Transaction ID: 010334903",
    status: "success"
  }]
}, {
  date: "2023-03-01",
  items: [{
    id: 3,
    title: "Cable TV Payment",
    type: "bill",
    text: "You successfully paid for DSTV subscription Amount: ₦11,500 Transaction ID: 010334903",
    status: "success"
  }]
}]

export const PaymentsMenuItems = [{
  id: 1,
  label: "Pay\nRent",
  icon: require("src/assets/images/icons/buy-airtime.png"),
  screen: "PayRentScreen"
// }, {
//   id: 2,
//   label: "Pay\nBills",
//   icon: require("src/assets/images/icons/invoice.png"),
//   screen: "BillsPaymentScreen"
// }, {
//   id: 3,
//   label: "Airtime\nTopup",
//   icon: require("src/assets/images/icons/buy-airtime.png"),
//   screen: "AirtimeTopUpScreen"
// }, {
//   id: 4,
//   label: "Request\nPayment",
//   icon: require("src/assets/images/icons/recieve-payment.png"),
//   screen: "RequestPaymentScreen"
}, {
  id: 5,
  label: "Your\nFinancials",
  icon: require("src/assets/images/icons/financials.png"),
  screen: "YourFinancialsScreen"
}, {
  id: 6,
  label: "Transaction\nHistory",
  icon: require("src/assets/images/icons/transaction-history.png"),
  screen: "TransactionsScreen"
}]

export const TenanctPortfolioItems = [{
  id: 1,
  label: "Rentals",
  icon: require("src/assets/images/icons/rental.png"),
  screen: "RentalsScreen"
// }, 
// {
//   id: 2,
//   label: "Documents",
//   icon: require("src/assets/images/icons/documents.png"),
//   screen: "DocumentsScreen"
}]

export const LandlordPortfolioItems = [
  ...TenanctPortfolioItems,
  {
    id: 3,
    label: "Properties",
    icon: require("src/assets/images/icons/town.png"),
    screen: "PropertiesScreen"
  }, {
    id: 4,
    label: "Tenancy",
    icon: require("src/assets/images/icons/tenancy-icon.png"),
    screen: "TenancyScreen"
  // }, {
  //   id: 5,
  //   label: "Property Managers",
  //   icon: require("src/assets/images/icons/Property-manager-icon.png"),
  //   screen: "PropertyManagerScreen"
  // }, {
  // id: 6,
  // label: "Property Analytics",
  // icon: require("src/assets/images/icons/Property-analytics-icon.png"),
  // screen: "RentalsScreen"
  }
]

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

export const Tenancies = [{
  id: 1,
  propertyLocation: '10 Alake Street, Victoria Island. Lagos',
  rentAmount: 1350000,
  dueDate: `2023-02-25`
}, {
  id: 2,
  propertyLocation: '14 Akeju Street, Victoria Island. Lagos',
  rentAmount: 1750000,
  dueDate: `2023-01-14`,
  landlord: 'Mr Money',
  propertyId: 'AXV-MPM-443'
}]

export const DefaultDocuments = [{
  title: 'Tenancy Agreement',
  id: 1,
}, {
  title: 'Legal Statement',
  id: 2,
}, {
  title: 'Signed Reference Form',
  id: 3
}]

export const AccountTypes = [{
  id: 1,
  label: 'Tenant',
  value: 'TENANT'
}, {
  id: 2,
  label: 'Landlord',
  value: 'LANDLORD'
}, {
  id: 3,
  label: 'Property Manager',
  value: 'PROPERTY MANAGER'
}]

export const PaymentRequestTypes = [{
  id: 1,
  label: 'Rent',
  value: 'rent'
}, {
  id: 2,
  label: 'Service Charge',
  value: 'service charge'
}, {
  id: 3,
  label: 'Agreement Fees',
  value: 'agreement fees'
}]

export const BillItems = [{
  id: 1,
  label: "Electricity",
  icon: require("src/assets/images/icons/plugs.png"),
  screen: "PayBillsScreen"
}, {
  id: 2,
  label: "Water",
  icon: require("src/assets/images/icons/blood-drop.png"),
  screen: "BillsPaymentScreen"
}, {
  id: 3,
  label: "Government",
  icon: require("src/assets/images/icons/buy-airtime.png"),
  screen: ""
}, {
  id: 4,
  label: "Cable TV",
  icon: require("src/assets/images/icons/recieve-payment.png"),
  screen: "RequestPaymentScreen"
}, {
  id: 5,
  label: "Buy Air Ticket",
  icon: require("src/assets/images/icons/financials.png"),
  screen: ""
}, {
  id: 6,
  label: "Embassy",
  icon: require("src/assets/images/icons/embassy.png"),
  screen: "TransactionsScreen"
}]

export const NetworkServiceProviders = [{
  label: "MTN",
  value: "mtn"
}, {
  label: "Glo",
  value: "glo"
}, {
  label: "Airtel",
  value: "airtel"
}, {
  label: "Etisalat",
  value: "etisalat"
}]

export const Socials = [
  {
    icon: require('src/assets/images/Whatsapp-icon.png'),
    text: 'Chat Us on WhatsApp',
    contact: '+234 9056378091'
  },
  {
    icon: require('src/assets/images/icons/Call-us.png'),
    text: 'Please Call Us',
    contact: '+234 9056378091'
  },
  {
    icon: require('src/assets/images/icons/Email-Us.png'),
    text: 'Email Us',
    contact: 'info@Supersofttechnology.com'
  },
  {
    icon: require('src/assets/images/icons/World-wide-web-icon.png'),
    text: 'Visit Our Website',
    contact: 'Www.Supersofttechnology.com'
  },
]
export const Faqs = [
  {
    question: 'How do I add my tenancy details?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
  {
    question: 'How do I add my owned properties?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
  {
    question: 'Can I pay my rent using the MPM mobile app?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
  {
    question: 'How do I find my landlord on this app?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
  {
    question: 'How many owned properties can I add?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
  {
    question: 'Can I request payments from here?',
    answer: 'You can add your tenancy details using the Add Tenancy Details page Or by clicking the add tenancy details button on the home page. This functionality allows the user add their tenancy details, including rent amount, due date, landlord information and tenancy location.'
  },
]
export const TenantInfo = [
  {
    id: 1,
    label: "Flat 1",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Jackson Gbenga',
    phone: '070666444555',
    rent_status: "Unpaid",
    amount: '₦ 1,350,000. 00',
  },
  {
    id: 2,
    label: "Flat 2",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Jackson Gbenga',
    phone: '070666444555',
    rent_status: "Paid",
    amount: '₦ 1,350,000. 00',
  },
  {
    id: 3,
    label: "Flat 3",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Jackson Tobi',
    phone: '070666444555',
    rent_status: "Paid",
    amount: '₦ 1,350,000. 00',
  },
  {
    id: 4,
    label: "Flat 4",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Stanley Olaoye',
    phone: '070666444555',
    rent_status: "Unpaid",
    amount: '₦ 1,350,000. 00',
  },
  {
    id: 5,
    label: "Flat 5",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Jackson Gbenga',
    phone: '070666444555',
    rent_status: "Unpaid",
    amount: '₦ 1,350,000. 00',
  }, {
    id: 6,
    label: "Flat 6",
    icon: require("src/assets/images/icons/human-icon.png"),
    occupant: 'Jackson Gbenga',
    phone: '070666444555',
    rent_status: "Paid",
    amount: '₦ 1,350,000. 00',
  },
]
export default {
  componentHeight: fontsConstants.h(50),
  mainViewHorizontalPadding: fontsConstants.w(30),
  activeOpacity: 0.6,
  APP_THEME,
}

export const screenBG = require("src/assets/images/backgrounds/background.png")