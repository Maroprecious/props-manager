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
        <Text style={{
          fontSize: fontsConstants.h(24),
          textAlign: "center"
        }}>
          {`Enter New Password`}
        </Text>
        <Text style={{
          fontSize: fontsConstants.h(12),
          marginBottom: fontsConstants.h(40),
          textAlign: "center"
        }}>
          {`Kindly enter new password`}
        </Text>
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
              fontSize: fontsConstants.h(25)
            }}>
              {`You have successfully\nsetup your new\npassword.`}            
            </Text>
            <Text style={{
              fontSize: fontsConstants.h(16),
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
