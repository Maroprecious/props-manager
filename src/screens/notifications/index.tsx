import React, { useContext } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { NotificationItemCard } from "src/components/cards";
import fontsConstants from "src/constants/fonts.constants";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationsData } from "src/constants/global.constants";
import { NotificationProps } from "src/types/app.types";

export default function NotificationsScreen({
  navigation,
  route
}: RootStackScreenProps<"NotificationsScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1
        }}
      >
        <HeaderBackButton
          containerStyle={{
            marginTop: fontsConstants.h(40),
            paddingHorizontal: layoutsConstants.mainViewHorizontalPadding
          }}
        />
        <ScreenTitle
          title={`Notifications`}
        />
        <FlatList
          data={NotificationsData}
          renderItem={({ item, index }) => {
            return (
              <NotificationItemCard
                key={index.toString()}
                date={item.date}
                items={item.items}
                onMenuPress={() => {
                  console.log("Menu Pressed")
                }}
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
