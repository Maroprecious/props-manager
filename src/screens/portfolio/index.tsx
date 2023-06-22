import React from "react";
import { ImageBackground, StyleSheet, View as RNView } from "react-native";
import { SafeAreaView } from "src/components/Themed";
import { MenuItemCard } from "src/components/cards";
import { TabScreenTitle } from "src/components/labels/screentitle.components";
import fontsConstants from "src/constants/fonts.constants";
import { PortfolioMenuItems } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import useColorScheme from "src/hooks/useColorScheme";
import { RootTabScreenProps } from "src/types/navigations.types";

export default function PortfolioTabScreen({
  navigation,
  route
}: RootTabScreenProps<"PortfolioTabNavigator">) {
  const theme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingHorizontal: fontsConstants.w(20),
          paddingBottom: layoutsConstants.tabBarHeight,
        }}
      >
        <TabScreenTitle
          title={`Portfolio`}
        />
        <RNView
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginTop: fontsConstants.h(20)
          }}
        >
          {PortfolioMenuItems.map((item, index) => (
            <MenuItemCard
              key={index.toString()}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </RNView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
