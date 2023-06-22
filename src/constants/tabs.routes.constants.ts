import HomeTabScreen from "src/screens/hometab";
import MoreTabScreen from "src/screens/motetab";
import PaymentsTabScreen from "src/screens/paymentstab";
import PortfolioTabScreen from "src/screens/portfolio";
import { RenderProps } from "src/types/navigations.types";

export const HomeTabRoutes: Array<RenderProps> = [{
  name: "HomeTabScreen",
  component: HomeTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const PaymentsTabRoutes: Array<RenderProps> = [{
  name: "PaymentsTabScreen",
  component: PaymentsTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const PortfolioTabRoutes: Array<RenderProps> = [{
  name: "PortfolioTabScreen",
  component: PortfolioTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const MoreTabRoutes: Array<RenderProps> = [{
  name: "MoreTabScreen",
  component: MoreTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];