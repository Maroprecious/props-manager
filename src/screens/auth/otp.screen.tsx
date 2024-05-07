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
import { useAppSelector } from "src/hooks/useReduxHooks";
import SecureStoreManager from "src/utils/SecureStoreManager";

export default function OTPScreen({
  navigation,
  route
}: RootStackScreenProps<"OTPScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
  const user = useAppSelector((state) => state.auth.user)

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

  useEffect(() => {
    if(otp.length === 6) doConfirmOTP()
  }, [otp])

  const doConfirmOTP = async () => {
    const req = await verifyOTP({
      otp,
      username: user?.email
    });
    if (req?.hasError)
      showToast({
        type:`error`,
        title:`OTP Verification`,
        message: req?.message || req?.error || req?.statusText || "Unable to verify OTP"
      })
    else {
      SecureStoreManager.setInitialRouteName("LoginScreen")
      switch (screenType) {
        case "reset-password":
            navigation.navigate("ResetPasswordScreen", {
              email: route.params.email
            })
          break;
        case "verify-email":
          setAlertData({
            ...alertData,
            title: `Email Verified`,
            message: `You have successfully verified your email ID.`,
            subMessage: `You can now proceed to dashboard to continue other in-app activities.`,
            buttonTitle: `Proceed`,
            // screen: 'LoginScreen'
            screen: user?.firstName === null || user?.lastName === undefined ? `ReLoginScreen` :
              user?.id === null ?
             `LoginScreen` : `App`
          })
          alertRef?.current?.open();
          break;
        case "add-bank-account":
          navigation.pop()
          navigation.navigate('BankDetailsScreen')
          break;
        default:
          break;
      }
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
            : screenType === "verify-email" || screenType === "add-bank-account" ? `Email Verification PIN`
            : `Verify`
          }
          intro={screenType === "reset-password" ? `Please enter the password reset PIN\nsent to your email ID`
            : screenType === "verify-email" ? `Please enter the email verification PIN sent to your email ID\n${route.params.email}`
            : screenType === "add-bank-account" ? `We need to verify your email before you can continue.` 
            :``
          }
        />
        <OtpInput
          value={otp}
          onChange={(code: string) => setOTP(code)}
          boxCount={6}
          boxSize={fontsConstants.h(35)}
          inputStyle={{
            borderRadius: fontsConstants.w(10)
          }}
          itemSpacing={fontsConstants.w(5)}
          containerStyle={{
            marginBottom: fontsConstants.h(10)
          }}
        />
        {counter > 0 ? (
          <Text style={[styles.requestNewText, {
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
        <DefaultButton
          title={`Confirm`}
          disabled={Number(otp) === 0 || otp === ""}
          loading={loading}
          onPress={doConfirmOTP}
          containerStyle={{marginTop: fontsConstants.h(20)}}
        />
        {screenType === "reset-password" && 
          <DefaultButton
            title={`Cancel`}
            type="outline"
            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("LoginScreen")}
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
        }
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
        onButtonPress={() => {
          try {
            navigation.navigate(alertData.screen)     
          } catch (error) {
            console.log(error)
            navigation.navigate("ReLoginScreen")
          }
        }}
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
    fontSize: fontsConstants.h(12),
    color: colorsConstants.colorPrimary,
    textDecorationLine: "underline",
  }
});
