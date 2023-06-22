import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps, verificationType } from "src/types/navigations.types";
import colorsConstants from "src/constants/colors.constants";
import OtpInput from "src/components/inputs/otpinputs.components";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "./components/screentitle.component";
import { AlertModal } from "src/components/modals/alert.modals";
import { Modalize } from "react-native-modalize";

export default function OTPScreen({
  navigation,
  route
}: RootStackScreenProps<"OTPScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
  const [alertData, setAlertData] = useState<any>({
    title: ``,
    message: ``,
    subMessage: ``,
    screen: ``,
    buttonTitle: ``
  })

  const screenType: verificationType = route.params?.type;

  const doConfirmOTP = async () => {
    switch (screenType) {
      case "reset-password":
        navigation.navigate("ResetPasswordScreen")
        break;
      case "verify-email":
        setAlertData({
          ...alertData,
          title: `Email Verified`,
          message: `You have successfully verified your email ID.`,
          subMessage: `Kindly go back to dashboard to continue other in-app activities.`,
          buttonTitle: `Finish`,
          screen: `App`
        })
        alertRef?.current?.open();
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
          title={screenType === "reset-password" ? `Reset Password`
            : screenType === "verify-email" ? `Email Verification PIN`
            : `Verify`
          }
          intro={screenType === "reset-password" ? `Please enter the password reset PIN\nsent to your email ID`
            : screenType === "verify-email" ? `Please enter the email verification PIN sent to your email ID.`
            : ``
          }
        />
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
      <AlertModal
        modalRef={alertRef}
        title={alertData.title}
        buttonTitle={alertData.buttonTitle}
        body={(
          <>
            <Text style={{
              textAlign: "center",
              fontFamily: fontsConstants.Raleway_Regular,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].screenLabel
            }}>
              {alertData.message}            
            </Text>
            <Text style={{
              fontSize: fontsConstants.h(16),
              fontFamily: fontsConstants.Raleway_Regular,
              marginTop: fontsConstants.h(9),
              textAlign: 'center'
            }}>
              {alertData.subMessage}
            </Text>
          </>
        )}
        onButtonPress={() => navigation.navigate(alertData.screen)}
      />
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
