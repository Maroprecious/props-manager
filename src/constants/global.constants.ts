import { NotificationProps } from "src/types/app.types";
import fontsConstants from "./fonts.constants";
import { API_DEV_URL, API_PROD_URL } from "@env";
export const APP_NAME = "MPM-Mobile";
export const APP_THEME = `${APP_NAME}-APP-THEME`;
export const APP_CONFIRM = `${APP_NAME}-APP-CONFIRM`;

export const API_BASE_URL =  __DEV__ ? `${API_DEV_URL}` : `${API_PROD_URL}`;

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
  id: 2,
  label: 'FAQs',
  icon: require("src/assets/images/icons/faq.png"),
  screen: 'FaqScreen'
}, {
  id: 3,
  label: 'Help and Support',
  icon: require("src/assets/images/icons/question.png"),
  screen: 'HelpAndSupportScreen'
}, {
  id: 4,
  label: 'Invite Others',
  icon: require("src/assets/images/icons/invitation.png"),
  screen: 'InviteScreen'
}, {
  id: 5,
  label: 'Terms and Conditions',
  icon: require("src/assets/images/icons/agreement.png"),
  screen: 'TermsAndConditionScreen'
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
}, {
  id: 2,
  label: "Pay\nBills",
  icon: require("src/assets/images/icons/invoice.png"),
  screen: "BillsPaymentScreen"
}, {
  id: 3,
  label: "Airtime\nTopup",
  icon: require("src/assets/images/icons/buy-airtime.png"),
  screen: "AirtimeTopUpScreen"
}, {
  id: 4,
  label: "Request\nPayment",
  icon: require("src/assets/images/icons/recieve-payment.png"),
  screen: "RequestPaymentScreen"
}, {
  id: 5,
  label: "Your\nFinancials",
  icon: require("src/assets/images/icons/financials.png"),
  screen: ""
}, {
  id: 6,
  label: "Transaction\nHistory",
  icon: require("src/assets/images/icons/transaction-history.png"),
  screen: "TransactionsScreen"
}]

export const PortfolioMenuItems = [{
  id: 1,
  label: "Rental",
  icon: require("src/assets/images/icons/rental.png"),
  screen: "RentalsScreen"
}, {
  id: 2,
  label: "Documents",
  icon: require("src/assets/images/icons/documents.png"),
  screen: "DocumentsScreen"
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

export const Tenancies = [{
  id: 1,
  address: '10 Alake Street, Victoria Island. Lagos',
  rentAmount: 1350000,
  dueDate: `2023-02-25`
}, {
  id: 2,
  address: '14 Akeju Street, Victoria Island. Lagos',
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
  value: 1
}, {
  id: 2,
  label: 'Landlord',
  value: 2
}, {
  id: 3,
  label: 'Property Manager',
  value: 3
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
  screen: "PayRentScreen"
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

export const Socials =[
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
export const Faqs =[
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

export default {
  componentHeight: fontsConstants.h(60),
  mainViewHorizontalPadding: fontsConstants.w(30),
  activeOpacity: 0.6,
  APP_THEME,
}