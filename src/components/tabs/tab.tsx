import * as React from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { FinancialsData } from "src/constants/global.constants";
import { NotificationProps, FinancialData } from "src/types/app.types";
import { NotificationItemCard } from "src/components/cards";
import { useProperties } from "src/contexts/property.context";
import { formatCurrency } from "src/utils/FormatNumber";
import { useEffect, useState } from "react";
import { formatTransaction } from "src/utils/formatTransactions";

type inflowType = Pick<FinancialData, "inflowHistory" | "totalInflow">;
type outflowType = Pick<FinancialData, "outflowHistory" | "totalOutflow">;

const FirstRoute = () => {
  const { financials } = useProperties();
  const [data, setData] = useState<inflowType>({
    inflowHistory: [],
    totalInflow: 0,
  });
  useEffect(() => {
    if (financials.inflowHistory.length) {
      const inflowHistory = formatTransaction(financials.inflowHistory);
      setData({
        inflowHistory,
        totalInflow: financials.totalInflow,
      });
    }
  }, [financials]);

  return (
    <View style={{ marginBottom: 400 }}>
      <View style={styles.first}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="arrow-down-bold"
              size={11}
              color={colorsConstants.colorSuccess}
            />
            <View style={{ flexDirection: "row" }}>
              <Fontisto
                name="database"
                size={11}
                color={colorsConstants.colorSuccess}
              />
              <Fontisto
                name="database"
                size={11}
                color={colorsConstants.colorSuccess}
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
          <Text style={styles.total}>Total Inflow to wallet</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.naira}>₦</Text>
          <Text style={styles.amount}>
            {formatCurrency(financials.totalInflow)}
          </Text>
        </View>
      </View>
      <FlatList
        data={data.inflowHistory}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <NotificationItemCard
              key={index.toString()}
              date={item.date}
              items={item.items}
              onMenuPress={() => {
                console.log("Menu Pressed");
              }}
              onNotificationItemPress={(notification: NotificationProps) => {
                console.log(notification);
              }}
              containerStyle={{
                marginBottom: fontsConstants.h(10),
              }}
            />
          );
        }}
        contentContainerStyle={{
          paddingTop: fontsConstants.h(30),
        }}
        ListEmptyComponent={
          <View style={styles.texts}>
            <Text
              style={{ fontFamily: fontsConstants.Lora_Regular, fontSize: 18 }}
            >
              No Transaction
            </Text>
          </View>
        }
      />
    </View>
  );
};

const SecondRoute = () => {
  const { financials } = useProperties();
  const [data, setData] = useState<outflowType>({
    outflowHistory: [],
    totalOutflow: 0,
  });

  useEffect(() => {
    if (financials.outflowHistory.length) {
      const outflowHistory = formatTransaction(financials.outflowHistory);
      setData({
        outflowHistory,
        totalOutflow: financials.totalOutflow,
      });
    }
  }, [financials]);

  return (
    <View style={{ marginBottom: 400 }}>
      <View style={styles.first}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons
              name="arrow-up-bold"
              size={11}
              color={colorsConstants.criticalRed}
            />
            <View style={{ flexDirection: "row" }}>
              <Fontisto
                name="database"
                size={11}
                color={colorsConstants.criticalRed}
              />
              <Fontisto
                name="database"
                size={11}
                color={colorsConstants.criticalRed}
                style={{ marginLeft: 4 }}
              />
            </View>
          </View>
          <Text style={styles.total}>Total inflow to account</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.naira}>₦</Text>
          <Text style={styles.amount}>
            {formatCurrency(financials.totalOutflow)}
          </Text>
        </View>
      </View>

      <FlatList
        data={data.outflowHistory}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <NotificationItemCard
              key={index.toString()}
              date={item.date}
              items={item.items}
              onMenuPress={() => {
                console.log("Menu Pressed");
              }}
              onNotificationItemPress={(notification: NotificationProps) => {
                console.log(notification);
              }}
              containerStyle={{
                marginBottom: fontsConstants.h(10),
              }}
            />
          );
        }}
        contentContainerStyle={{
          paddingTop: fontsConstants.h(30),
        }}
        ListEmptyComponent={
          <View style={styles.texts}>
            <Text
              style={{ fontFamily: fontsConstants.Lora_Regular, fontSize: 18 }}
            >
              No Transaction
            </Text>
          </View>
        }
      />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function Tab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Inflow to wallet\n (Last 60 days)" },
    { key: "second", title: "Inflow to account \n (Last 60 days)" },
  ]);
  const renderTabBar = (props: any) => (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route: any, idx: any) => {
        const isActive = idx === props.navigationState.index;
        return (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.tabItem,
              isActive ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setIndex(idx)}
          >
            <TabTitle title={route.title} isActive={isActive} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
  return (
    <TabView
      style={{ height: Dimensions.get("window").height, paddingBottom: 0 }}
      animationEnabled={false}
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
const TabTitle = ({ title, isActive }: any) => {
  const [mainTitle, subtitle] = title.split("\n");

  return (
    <View>
      <Text
        style={[
          styles.title,
          isActive ? styles.activeTitle : styles.inactiveTitle,
        ]}
      >
        {mainTitle}
      </Text>
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            isActive ? styles.activeSubtitle : styles.inactiveSubtitle,
          ]}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    elevation: 2,
    borderRadius: 10,
    height: 61.5,
    alignSelf: "center",
    borderColor: colorsConstants.light.border_bottom,
    borderWidth: 0.2,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  activeTab: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    borderColor: "blue", // Customize the active tab border color
  },
  inactiveTab: {
    color: "red",
    height: 60,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  activeTitle: {
    color: colorsConstants.colorPrimary,
    fontFamily: fontsConstants.Lora_Bold,
    opacity: 0.7,
    marginTop: -5,
    fontSize: 14,
  },
  inactiveTitle: {
    color: colorsConstants.light.darkText,
    opacity: 0.19,
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  activeSubtitle: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: 10,
  },
  inactiveSubtitle: {
    fontSize: 10,
    fontFamily: fontsConstants.Lora_Regular,
    opacity: 0.19,
    color: colorsConstants.light.darkText,
  },
  first: {
    marginTop: 15,
    height: 66,
    shadowColor: colorsConstants.light.shadow,
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowRadius: 7,
    borderRadius: 14,
    elevation: 10,
    backgroundColor: colorsConstants.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  amount: {
    marginLeft: 5,
    color: colorsConstants.light.darkText,
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: 14,
  },
  naira: {
    fontFamily: fontsConstants.Lora_Bold,
    fontSize: 25,
    color: colorsConstants.light.darkText,
  },
  total: {
    color: colorsConstants.light.darkText,
    fontSize: 12,
    fontFamily: fontsConstants.Lora_Regular,
    marginTop: 5,
    marginLeft: 7,
    opacity: 0.78,
  },
  texts: {
    justifyContent: "center",
    alignItems: "center",
  },
});
