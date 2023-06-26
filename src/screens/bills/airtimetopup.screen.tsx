import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultInput, DefaultSelectInput } from "src/components/inputs/inputs.components";
import colorsConstants from "src/constants/colors.constants";
import { NetworkServiceProviders } from "src/constants/global.constants";

export default function AirtimeTopUpScreen({
  navigation,
  route
}: RootStackScreenProps<"AirtimeTopUpScreen">) {
  const theme = useContext(AppThemeContext);
  const [provider, setProvider] = useState("")
  const [mobile, setMobile] = useState("")
  const [amount, setAmount] = useState('0');

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
          title={`Airtime Recharge`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <View style={{
          flex: 1
        }}>
          <DefaultInput
            label="Amount"
            value={amount}
            onChangeText={(v: string) => setAmount(v)}
            leftIcon={
              <Text style={{
                fontFamily: fontsConstants.Lora_Bold,
                fontSize: fontsConstants.h(14),
                color: colorsConstants[theme].darkText,
                marginLeft: fontsConstants.w(20)
              }}>{`₦`}</Text>
            }
            inputStyle={{textAlign: "center"}}
            keyboardType="number-pad"
            inputHeight={fontsConstants.h(50)}
            containerStyle={{
              marginBottom: fontsConstants.h(50)
            }}
          />
          <DefaultSelectInput
            items={NetworkServiceProviders}
            value={provider}
            setValue={setProvider}
            placeholder="Kindly select your network provider"
            containerStyle={{marginBottom: fontsConstants.h(20)}}
            wrapperStyle={{zIndex: 1}}
          />
          <DefaultInput
            value={mobile}
            onChangeText={(v: string) => setMobile(v)}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>
        <DefaultButton
          title={`Next`}
          containerStyle={{marginHorizontal: fontsConstants.w(20)}}
          disabled={provider === "" || mobile === "" || Number(amount) === 0 || amount === ""}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, inputContainerStyle: {

  }
});
