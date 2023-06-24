import React, { useContext, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "src/components/Themed";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { TransactionHistory } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationProps } from "src/types/app.types";
import { NotificationItemCard } from "src/components/cards";

export default function TransactionsScreen({
  navigation,
  route
}: RootStackScreenProps<"TransactionsScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton
          containerStyle={{
            marginTop: fontsConstants.h(40),
            paddingHorizontal: layoutsConstants.mainViewHorizontalPadding
          }}
        />
        <ScreenTitle
          title={`Transaction History`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
          }}
        />
        
        <FlatList
          data={TransactionHistory}
          renderItem={({ item, index }) => {
            return (
              <NotificationItemCard
                key={index.toString()}
                date={item.date}
                items={item.items}
                showMenuButton={false}
                onNotificationItemPress={(notification: NotificationProps) => {
                  console.log(notification)
                }}
                containerStyle={{
                  marginBottom: fontsConstants.h(10)
                }}
              />
            )
          }}
          contentContainerStyle={{
            paddingHorizontal: fontsConstants.w(18),
            paddingTop: fontsConstants.h(30),
          }}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
