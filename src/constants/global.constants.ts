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
  screen: ''
}, {
  id: 2,
  label: 'FAQs',
  icon: require("src/assets/images/icons/faq.png"),
  screen: ''
}, {
  id: 3,
  label: 'Help and Support',
  icon: require("src/assets/images/icons/question.png"),
  screen: ''
}, {
  id: 4,
  label: 'Invite Others',
  icon: require("src/assets/images/icons/invitation.png"),
  screen: ''
}, {
  id: 5,
  label: 'Terms and Conditions',
  icon: require("src/assets/images/icons/agreement.png"),
  screen: ''
}, {
  id: 6,
  label: 'Logout',
  icon: require("src/assets/images/icons/logout.png"),
  screen: ''
}]

export default {
  componentHeight: fontsConstants.h(60),
  mainViewHorizontalPadding: fontsConstants.w(30),
  activeOpacity: 0.6,
  APP_THEME,
}