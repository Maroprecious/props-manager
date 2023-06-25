import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultInput, DefaultSelectInput } from "src/components/inputs/inputs.components";
import { currencySymbol } from "src/constants/currencies.constants";
import colorsConstants from "src/constants/colors.constants";
import { formatCurrency } from "src/utils/FormatNumber";

export default function ConfirmRequestPaymentScreen({
  navigation,
  route
}: RootStackScreenProps<"ConfirmRequestPaymentScreen">) {
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
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Confirm Payment Request`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(10)
          }}
        />
        <View style={{
          borderRadius: fontsConstants.w(10),
          borderWidth: fontsConstants.w(1),
          borderColor: "#DCDDE0",
          alignItems: "center",
          padding: fontsConstants.w(10),
          marginBottom: fontsConstants.w(30)
        }}>
          <Text style={[styles.summaryText, {color: colorsConstants[theme].darkText}]}>{`You are requesting`}</Text>
          <Text style={[styles.summaryText2, {color: colorsConstants[theme].darkText}]}>{`${currencySymbol['ngn']}${formatCurrency(route.params.amount) || 0.00}`}</Text>
          <Text style={[styles.summaryText, {color: colorsConstants[theme].darkText}]}>{`from`}</Text>
          <Text style={[styles.summaryText2, {color: colorsConstants[theme].darkText, marginTop: fontsConstants.w(15), marginBottom: fontsConstants.h(0)}]}>{route.params.recipient.name}</Text>
          <Text style={[styles.summaryText, {color: colorsConstants[theme].darkText}]}>{route.params.recipient.email}</Text>
          <Text style={[styles.summaryText, {color: colorsConstants[theme].darkText, marginVertical: fontsConstants.h(12)}]}>{`Your Comment`}</Text>
          <Text style={[styles.summaryText, {color: colorsConstants[theme].darkText, marginBottom: fontsConstants.h(10)}]}>{route.params.comment?.replace(/\n{2,}/g, '\t') || "NIL"}</Text>
        </View>
        <DefaultSelectInput
          items={[{
            label: "First Bank",
            value: "first bank"
          }]}
          value={``}
          placeholder="Kindly select"
          label="Your Collection Bank"
          containerStyle={{marginBottom: fontsConstants.h(20), maxHeight: fontsConstants.h(350)}}
          wrapperStyle={{zIndex: 10}}
          dropDownDirection="BOTTOM"      
        />
        <DefaultInput
          label={`Collection Account Number`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultButton
          title={`Send Request`}
          // disabled
          containerStyle={{
            marginTop: fontsConstants.h(20),
            marginHorizontal: fontsConstants.w(20)
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
  summaryText: {
    fontFamily: fontsConstants.Lora_Regular, fontSize: fontsConstants.w(15), opacity: 0.78
  },
  summaryText2: {
    fontFamily: fontsConstants.Lora_Bold, fontSize: fontsConstants.w(24),
    marginVertical: fontsConstants.w(6)
  },
  inputContainerStyle: {marginBottom: fontsConstants.h(50)}
});
