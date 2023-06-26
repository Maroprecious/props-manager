import React, { useContext } from "react";
import { ImageBackground, StyleSheet, View as RNView } from "react-native";
import { SafeAreaView, } from "src/components/Themed";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { BillItems } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { MenuItemCard } from "src/components/cards";
import colorsConstants from "src/constants/colors.constants";
import { DefaultInput } from "src/components/inputs/inputs.components";
import { Icon } from "react-native-elements";

export default function BillsPaymentScreen({
  navigation,
  route
}: RootStackScreenProps<"BillsPaymentScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: fontsConstants.w(20),
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Pay Bills`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <RNView
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            marginTop: fontsConstants.h(20)
          }}
        >
          <DefaultInput
            placeholder="Search bill"
            placeholderTextColor={colorsConstants[theme].darkText}
            rightIcon={
              <Icon
                name="search"
                type="ionicon"
                size={fontsConstants.h(15)}
              />
            }
            inputContainerStyle={{
              borderBottomWidth: fontsConstants.h(1),
              borderColor: colorsConstants[theme].borderLine,
              height: fontsConstants.h(45),
            }}
            inputStyle={{
              paddingHorizontal: 0,
              fontSize: fontsConstants.w(12)
            }}
            containerStyle={{
              height: fontsConstants.h(45)
            }}
          />
          {BillItems.map((item: any, index) => (
            <MenuItemCard
              key={index.toString()}
              label={item.label}
              icon={item.icon}
              labelStyle={{
                fontFamily: fontsConstants.Montserrat_Medium,
                fontSize: fontsConstants.w(10),
                color: colorsConstants[theme].grey
              }}
              onItemPress={() => navigation.navigate(item.screen)}
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
  }
});
