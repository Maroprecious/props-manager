import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useAppSelector } from "src/hooks/useReduxHooks";
import { AlertModalType } from "src/types/app.types";
import { NetworkResponse } from "src/types/api.response.types";

export default function ResetPasswordScreen({
  navigation,
  route
}: RootStackScreenProps<"ResetPasswordScreen" | "ChangePasswordScreen">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user)
  const userLoggedIn = user?.id !== null && user?.id !== undefined

  const alertRef = useRef<Modalize>(null);

  const { loading, resetPassword, updatePassword } = useAuthenticate();

  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [actionResponseType, setActionResponseType] = useState<AlertModalType | undefined>(undefined);
  const [errorMessages, setErrorMessages] = useState<any>({
    currentPassword: undefined,
    password: undefined,
    confirmPassword: undefined
  })

  useEffect(() => {
    const validatePassword = IsValidPassword(password, 8);
    !validatePassword.valid ? setErrorMessages({
      ...errorMessages,
      password: validatePassword.message
    }) : setErrorMessages({
      ...errorMessages,
      password: undefined
    })
  }, [password])

  useEffect(() => {
    confirmPassword !== password ? setErrorMessages({
      ...errorMessages,
      confirmPassword: "Does not match password"
    }) : setErrorMessages({
      ...errorMessages,
      confirmPassword: undefined
    })
  }, [confirmPassword])
  
  const doResetPassword = async () => {
    const req = await resetPassword({
      email: route.params.email,
      newPassword: password
    })
    handleApiRes(req)
  }

  const doUpdatePassword = async () => {
    const req = await updatePassword({
      userId: user.id || "",
      oldPassword: currentPassword,
      newPassword: password
    })
    handleApiRes(req)
  }

  const handleApiRes = (req: NetworkResponse) => {
    if (req?.hasError) {
      setActionResponseType("error")
      showToast({
        type:`error`,
        title:`Password Reset`,
        message: req?.message || req?.error || req?.statusText || "Unable to reset password"
      })
    }
    else {
      setActionResponseType("success")
      alertRef?.current?.open();
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
          title={!userLoggedIn ? 
            `Enter New Password`
            : `Change Password`
          }
          intro={!userLoggedIn ? 
            `Kindly enter new password`
            : `Please enter your old password and select new password to effect password change..`
          }
        />
        {userLoggedIn && (
          <DefaultInput
            placeholder="Enter old password"
            secureTextEntry
            value={currentPassword}
            onChangeText={(t: string) => setCurrentPassword(t)}
            errorMessage={errorMessages.currentPassword}
          />
        )}
        <DefaultInput
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={(t: string) => setPassword(t)}
          errorMessage={errorMessages.password}
        />
        <DefaultInput
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(t: string) => setConfirmPassword(t)}
          errorMessage={errorMessages.confirmPassword}
        />
        <DefaultButton
          title={!userLoggedIn ? `Set Password`: `Change Password`}
          onPress={!userLoggedIn ? doResetPassword : doUpdatePassword}
          disabled={password === "" || password !== confirmPassword || errorMessages.password !== undefined}
          loading={loading}
        />
      </View>
      <AlertModal
        modalRef={alertRef}
        closeOnOverlayTap={false}
        onClosed={() => {
          userLoggedIn ?
          navigation.navigate("MoreTabScreen")
          : navigation.navigate("LoginScreen")
        }}
        title={!userLoggedIn ? 
          `New Password Set`
          : `Password Changed`
        }
        type={actionResponseType}
        body={(
          <>
            <Text style={{
              textAlign: "center",
              fontFamily: fontsConstants.Raleway_Regular,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].screenLabel
            }}>
              {`You have successfully\n${!userLoggedIn ? `setup` : `changed`} your new\npassword.`}            
            </Text>
            <Text style={{
              fontSize: fontsConstants.h(16),
              fontFamily: fontsConstants.Raleway_Regular,
              marginTop: fontsConstants.h(9),
              textAlign: 'center'
            }}>
              {!userLoggedIn ?
                `Kindly login to access\nyour MPM profile.`
                : `Please keep your new password\nsafe as you will require it regularly to\naccess your MPM account`
              }
            </Text>
          </>
        )}
        onButtonPress={() => userLoggedIn ? navigation.navigate("MoreTabScreen") : navigation.navigate("LoginScreen")}
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
