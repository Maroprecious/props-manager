import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef } from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { DefaultButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { Modalize } from "react-native-modalize";
import { AlertModal } from "src/components/modals/alert.modals";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "./components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";

export default function ResetPasswordScreen({
  navigation,
  route
}: RootStackScreenProps<"ResetPasswordScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);

  const doResetPassword = async () => {
    alertRef?.current?.open();
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        translucent={true}
      />
      <View style={{
        paddingTop: fontsConstants.h(50)
      }}>
        <ScreenTitle
          title={`Enter New Password`}
          intro={`Kindly enter new password`}
        />
        <DefaultInput
          placeholder="Enter new password"
          secureTextEntry
        />
        <DefaultInput
          placeholder="Confirm new password"
          secureTextEntry
        />
        <DefaultButton
          title={`Set Password`}
          onPress={doResetPassword}
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
    paddingTop: fontsConstants.h(50),
    paddingHorizontal: globalConstants.mainViewHorizontalPadding
  },
});
