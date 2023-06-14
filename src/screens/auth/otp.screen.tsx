import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import colorsConstants from "src/constants/colors.constants";
import OtpInput from "src/components/inputs/otpinputs.components";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";

export default function OTPScreen({
  navigation,
  route
}: RootStackScreenProps<"OTPScreen">) {
  const theme = useContext(AppThemeContext);

  const doConfirmOTP = async () => {
    navigation.navigate("ResetPasswordScreen")
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        translucent={true}
      />
      <HeaderBackButton/>
      <View style={{
        paddingTop: fontsConstants.h(50)
      }}>
        <Text style={{
          fontSize: fontsConstants.h(24),
          textAlign: "center"
        }}>
          {`Forgot Password`}
        </Text>
        <Text style={{
          fontSize: fontsConstants.h(12),
          marginBottom: fontsConstants.h(50),
          textAlign: "center"
        }}>
          {`Please enter the password reset PIN\nsent to your email ID`}
        </Text>
        <OtpInput
          value="2501"
          boxCount={4}
          containerStyle={{
            marginBottom: fontsConstants.h(20)
          }}
        />
        <DefaultButton
          title={`Confirm`}
          onPress={doConfirmOTP}
        />
        <DefaultButton
          title={`Cancel`}
          type="outline"
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("WelcomeScreen")}
          titleStyle={{
            color: colorsConstants.criticalRed
          }}
          buttonStyle={{
            borderColor: colorsConstants.criticalRed,
          }}
          containerStyle={{
            marginTop: fontsConstants.h(30)
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: fontsConstants.h(50),
    paddingHorizontal: globalConstants.mainViewHorizontalPadding
  },
});
