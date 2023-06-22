import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { View, SafeAreaView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps, verificationType } from "src/types/navigations.types";
import colorsConstants from "src/constants/colors.constants";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "./components/screentitle.component";

export default function ForgotPasswordScreen({
  navigation,
  route
}: RootStackScreenProps<"ForgotPasswordScreen">) {
  const theme = useContext(AppThemeContext);

  const screenType: verificationType = route.params?.type;

  const doGetPin = async () => {
    switch (screenType) {
      case "reset-password":
        navigation.navigate("OTPScreen", route.params)
        break;
      case "verify-email": 
        navigation.navigate("OTPVerifyScreen", route.params)
        break;
      default:
        break;
    }
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
        paddingTop: fontsConstants.h(12)
      }}>
        <ScreenTitle
          title={screenType === "reset-password" ? `Forgot Password`
            : screenType === "verify-email" ? `Verify Email`
            : ``
          }
          intro={screenType === "reset-password" ? `Please enter your email address. You will\nreceive a password reset PIN` 
            : screenType === "verify-email" ? `Please enter your email address, You will receive an email verification PIN.`
            : ``
          }
          containerStyle={{
          }}
        />
        <DefaultInput
          placeholder="Enter email ID"
          keyboardType="email-address"
        />
        <DefaultButton
          title={screenType === "reset-password" ? `Send Reset PIN`
            : screenType === "verify-email" ? `Send Verification PIN`
            : `Verify`
          }
          onPress={doGetPin}
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
    paddingTop: fontsConstants.h(40),
    paddingHorizontal: globalConstants.mainViewHorizontalPadding
  },
});
