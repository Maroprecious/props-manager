import React, { useContext, useRef } from "react";
import { ImageBackground, StyleSheet, View as RNView } from "react-native";
import { ScrollView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { Tenancies } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { Modalize } from "react-native-modalize";
import { RentalItem } from "./components";

export default function RentalsScreen({
  navigation,
  route
}: RootStackScreenProps<"RentalsScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flex: 1}}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Rentals`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(45)
          }}
        />
        <RNView style={{
          flex: 1
        }}>
          {Tenancies.map((item, index) => (
            <RentalItem
              key={index.toString()}
              item={item}
              onViewPress={() => navigation.navigate("ViewRentalScreen", {
                rental: item
              })}
            />
          ))}
        </RNView>
        <DefaultButton
          title={`Add Tenancy`}
          containerStyle={{
            marginTop: fontsConstants.h(20),
            marginHorizontal: fontsConstants.w(20)
          }}
          onPress={() => navigation.navigate('AddPropertyScreen')}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
});
