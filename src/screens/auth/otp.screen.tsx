import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View as RNView, TouchableOpacity } from "react-native";
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
import useAuthenticate from "src/hooks/useAuthentication";
import { showToast } from "src/components/Toast";
import layoutsConstants from "src/constants/layouts.constants";

export default function OTPScreen({
  navigation,
  route
}: RootStackScreenProps<"OTPScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);

  const { loading, verifyOTP, requestPasswordReset } = useAuthenticate();

  const [otp, setOTP] = useState("");
  const [counter, setCounter] = useState(0);

  const [alertData, setAlertData] = useState<any>({
    title: ``,
    message: ``,
    subMessage: ``,
    screen: ``,
    buttonTitle: ``
  })

  const screenType: verificationType = route.params?.type;

  const startCount = (seconds: number) => {
    let x = setInterval(function() {
      seconds = seconds - 1;
      if (seconds <= 0) {
        clearInterval(x);
      }
      setCounter(seconds);
    }, 1000);
  }
  
  const doRequestCode = async () => {
    const req = await requestPasswordReset({
      email: route.params.email,
    });
    if (req?.hasError)
      showToast({
        type:`error`,
        title:`Password Reset`,
        message: req?.message || req?.error || req?.statusText || "Unable to request password reset"
      })
    else startCount(60);
  }

  useEffect(() => {
    startCount(60)
  }, [])

  const doConfirmOTP = async () => {
    switch (screenType) {
      case "reset-password":
        const req = await verifyOTP({
          otp
        });
        if (req?.hasError)
          showToast({
            type:`error`,
            title:`OTP Verification`,
            message: req?.message || req?.error || req?.statusText || "Unable to verify OTP"
          })
        else
          navigation.navigate("ResetPasswordScreen", {
            email: route.params.email
          })
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
        {counter > 0 ? (
          <Text style={[styles.requestNewText, {
            color: colorsConstants[theme].screenIntro
          }]}>
            {`Request new OTP in ${counter}`}
          </Text>
        ) : (
          <TouchableOpacity disabled={loading} activeOpacity={layoutsConstants.activeOpacity} onPress={doRequestCode}>
            <Text style={[styles.requestNewText, {
              // color: colorsConstants[theme].screenIntro
            }]}>
              {`Request New OTP`}
            </Text>
          </TouchableOpacity>
        )}
        <OtpInput
          value={otp}
          onChange={(code: string) => setOTP(code)}
          boxCount={4}
          containerStyle={{
            marginBottom: fontsConstants.h(20)
          }}
        />
        <DefaultButton
          title={`Confirm`}
          disabled={Number(otp) === 0 || otp === ""}
          loading={loading}
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
  }, requestNewText: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(12)
  }
});
