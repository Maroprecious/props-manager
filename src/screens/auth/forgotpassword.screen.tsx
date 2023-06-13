import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, SafeAreaView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants from "src/constants/global.constants";
import useColorScheme from "src/hooks/useColorScheme";
import { RootStackScreenProps } from "src/types/navigations.types";
import colorsConstants from "src/constants/colors.constants";

export default function ForgotPasswordScreen({
  navigation,
  route
}: RootStackScreenProps<"ForgotPasswordScreen">) {
  const theme = useColorScheme();

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
          {`Please enter your email address. You will\nreceive a password reset PIN`}
        </Text>
        <DefaultInput
          placeholder="Enter email ID"
        />
        <DefaultButton
          title={`Send Reset PIN`}
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
    paddingHorizontal: fontsConstants.w(30),
  },
});
