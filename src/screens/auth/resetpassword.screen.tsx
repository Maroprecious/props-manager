import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { Modalize } from "react-native-modalize";
import { AlertModal } from "src/components/modals/alert.modals";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "./components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import useAuthenticate from "src/hooks/useAuthentication";
import IsValidPassword from "src/utils/IsPassword";
import { showToast } from "src/components/Toast";

export default function ResetPasswordScreen({
  navigation,
  route
}: RootStackScreenProps<"ResetPasswordScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);

  const { loading, resetPassword } = useAuthenticate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doResetPassword = async () => {
    const validatePassword = IsValidPassword(password, 8);
    if (!validatePassword.valid)
      showToast({
        type: `info`,
        title: `Password`,
        message: validatePassword.message
      })
    else {
      const req = await resetPassword({
        email: route.params.email,
        newPassword: password
      })
      if (req?.hasError)
        showToast({
          type:`error`,
          title:`Password Reset`,
          message: req?.message || req?.error || req?.statusText || "Unable to verify OTP"
        })
      else alertRef?.current?.open();
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
          title={`Enter New Password`}
          intro={`Kindly enter new password`}
        />
        <DefaultInput
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={(t: string) => setPassword}
        />
        <DefaultInput
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(t: string) => setConfirmPassword}
        />
        <DefaultButton
          title={`Set Password`}
          onPress={doResetPassword}
          disabled={password === "" || password !== confirmPassword}
          loading={loading}
        />
      </View>
      <AlertModal
        modalRef={alertRef}
        title={`New Password Set`}
        body={(
          <>
            <Text style={{
              textAlign: "center",
              fontFamily: fontsConstants.Raleway_Regular,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].screenLabel
            }}>
              {`You have successfully\nsetup your new\npassword.`}            
            </Text>
            <Text style={{
              fontSize: fontsConstants.h(16),
              fontFamily: fontsConstants.Raleway_Regular,
              marginTop: fontsConstants.h(9),
              textAlign: 'center'
            }}>
              {`Kindly login to access\nyour MPM profile.`}
            </Text>
          </>
        )}
        onButtonPress={() => navigation.navigate("LoginScreen")}
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
