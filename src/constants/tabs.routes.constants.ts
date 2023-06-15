import HomeTabScreen from "src/screens/hometab";
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
  component: HomeTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const PortfolioTabRoutes: Array<RenderProps> = [{
  name: "HomeTabScreen",
  component: HomeTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];

export const MoreTabRoutes: Array<RenderProps> = [{
  name: "HomeTabScreen",
  component: HomeTabScreen,
  options: {
    headerShown: false,
  },
  initialParams: {},
}];