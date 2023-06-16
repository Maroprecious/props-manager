import fontsConstants from "./fonts.constants";
export const APP_NAME = "MPM-Mobile";
export const APP_THEME = `${APP_NAME}-APP-THEME`;

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

export default {
  componentHeight: fontsConstants.h(60),
  mainViewHorizontalPadding: fontsConstants.w(30),
  activeOpacity: 0.6,
  APP_THEME,
}