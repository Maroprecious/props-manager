import React, { useContext } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import AppThemeContext from "src/contexts/Theme.context";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import fontsConstants from "src/constants/fonts.constants";
import { RenderProps, RootTabParamList, RootTabScreenProps } from "src/types/navigations.types";
import { HomeTabRoutes, MoreTabRoutes, PaymentsTabRoutes, PortfolioTabRoutes } from "src/constants/tabs.routes.constants";

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const InTabStack = createNativeStackNavigator();



function renderTabsScreen({
  name,
  component,
  options = {},
  initialParams = {},
}: RenderProps) {
  return (
    <InTabStack.Screen
      name={name}
      key={name}
      options={options}
      component={component}
      initialParams={initialParams}
    />
  );
}

function HomeTabNavigator() {
  return (
    <InTabStack.Navigator>
      {HomeTabRoutes.map((route) => {
        return renderTabsScreen(route);
      })}
    </InTabStack.Navigator>
  );
}

function PaymentsTabNavigator() {
  return (
    <InTabStack.Navigator>
      {PaymentsTabRoutes.map((route) => {
        return renderTabsScreen(route);
      })}
    </InTabStack.Navigator>
  );
}

function PortfolioTabNavigator() {
  return (
    <InTabStack.Navigator>
      {PortfolioTabRoutes.map((route) => {
        return renderTabsScreen(route);
      })}
    </InTabStack.Navigator>
  );
}

function MoreTabNavigator() {
  return (
    <InTabStack.Navigator>
      {MoreTabRoutes.map((route) => {
        return renderTabsScreen(route);
      })}
    </InTabStack.Navigator>
  );
}

export function BottomTabNavigator() {
  const theme = useContext(AppThemeContext);

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTabNavigator"
      backBehavior="history"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colorsConstants.colorPrimary,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: layoutsConstants.tabBarHeight,
          borderTopLeftRadius: fontsConstants.h(25),
          borderTopRightRadius: fontsConstants.h(25),
          position: "absolute"
        },
        tabBarLabelStyle: {
          // fontFamily: fontsConstants.Epilogue_Medium,
          fontSize: fontsConstants.h(10),
          marginBottom: fontsConstants.h(20)
        }
      }}
      >
      <BottomTab.Screen
        name="HomeTabNavigator"
        component={HomeTabNavigator}
        options={({ navigation }: RootTabScreenProps<'HomeTabNavigator'>) => ({
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabBarItemViewStyle, {
              backgroundColor: focused ? colorsConstants.colorWhite : undefined,
            }]}>
              <Icon
                type="ionicon"
                name={focused ? `home` : `home`}
                size={fontsConstants.h(20)}
                color={focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabIconDefault}
              />
              <Text style={[styles.tabBarLabelStyle, {
                color: focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabLabelDefault,
              }]}>
                {`Home`}
              </Text>
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="PaymentsTabNavigator"
        component={PaymentsTabNavigator}
        options={{
          title: 'Payments',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabBarItemViewStyle, {
              backgroundColor: focused ? colorsConstants.colorWhite : undefined,
            }]}>
              <Icon
                name={focused ? `account-balance-wallet` : `account-balance-wallet`}
                size={fontsConstants.h(20)}
                color={focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabIconDefault}
              />
              <Text style={[styles.tabBarLabelStyle, {
                color: focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabLabelDefault
              }]}>
                {`Payments`}
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="PortfolioTabNavigator"
        component={PortfolioTabNavigator}
        options={{
          title: 'Portfolio',
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabBarItemViewStyle, {
              backgroundColor: focused ? colorsConstants.colorWhite : undefined,
            }]}>
              <FontAwesome5
                name={focused ? `mail-bulk` : `mail-bulk`}
                size={fontsConstants.h(20)}
                color={focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabIconDefault}
              />
              <Text style={[styles.tabBarLabelStyle, {
                color: focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabLabelDefault
              }]}>
                {`Portfolio`}
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="MoreTabNavigator"
        component={MoreTabNavigator}
        options={{
          headerShown: false,
          title: 'More',
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabBarItemViewStyle, {
              backgroundColor: focused ? colorsConstants.colorWhite : undefined,
            }]}>
              <Icon
                type="ionicon"
                name={focused ? `grid-outline` : `grid-outline`}
                size={fontsConstants.h(20)}
                color={focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabIconDefault}
              />
              <Text style={[styles.tabBarLabelStyle, {
                color: focused ? colorsConstants.colorPrimary : colorsConstants[theme].tabLabelDefault
              }]}>
                {`More`}
              </Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  tabBarItemViewStyle: {
    width: fontsConstants.w(50),
    height: Platform.OS === "android" ? 
      fontsConstants.h(55)
      : fontsConstants.h(45),
    marginBottom: fontsConstants.h(-10),
    borderTopRightRadius: fontsConstants.h(12),
    borderTopLeftRadius: fontsConstants.h(12),
    paddingTop: fontsConstants.h(5),
    alignItems: "center",
  },
  tabBarLabelStyle: {
    marginTop: fontsConstants.h(3),
    fontFamily: fontsConstants.Lora_Bold,
    fontSize: fontsConstants.h(10),
    marginBottom: fontsConstants.h(20),
  }
})