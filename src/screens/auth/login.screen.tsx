import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, ImageBackground, View as RNView, TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "src/components/Themed";
import { Image } from 'react-native-elements';
import { DefaultButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants from "src/constants/global.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import colorsConstants from "src/constants/colors.constants";
import { ScreenTitle } from "./components/screentitle.component";

export default function LoginScreen({
  navigation,
  route
}: RootStackScreenProps<"LoginScreen">) {
  const theme = useContext(AppThemeContext);

  const doLogin = async () => {
    navigation.navigate("App")
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar
        translucent={true}
      />
      <ImageBackground
        source={require("src/assets/images/backgrounds/login-background-image.png")}
        style={{
          height: fontsConstants.h(446),
          marginTop: fontsConstants.h(-60),
          alignItems: "center",
          paddingTop: fontsConstants.h(110)
        }}
      >
        <Image
          source={require("src/assets/images/mpm-mobile.png")}
          style={{
            width: fontsConstants.w(158),
            height: fontsConstants.h(85)
          }}
        />
      </ImageBackground> 
      <View style={{
        marginTop: fontsConstants.h(-115),
        paddingTop: fontsConstants.h(36),
        paddingBottom: fontsConstants.h(20),
        paddingHorizontal: globalConstants.mainViewHorizontalPadding,
        borderTopLeftRadius: fontsConstants.h(40),
        borderTopRightRadius: fontsConstants.h(40),
        justifyContent: "flex-end"
      }}>
        <ScreenTitle
          title={`Welcome`}
          intro={`Login to your account`}
          containerStyle={{
            marginBottom: fontsConstants.h(-30)
          }}
        />
        <DefaultInput
          placeholder="Enter email or mobile number"
          keyboardType="email-address"
        />
        <DefaultInput
          placeholder="Enter password"
          secureTextEntry
        />
        <DefaultButton
          title={`Login`}
          onPress={doLogin}
        />
        <RNView style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: fontsConstants.h(25)
        }}>
          <TouchableOpacity style={{

          }} activeOpacity={globalConstants.activeOpacity}
            onPress={() => navigation.navigate("CreateAccountScreen")}
          >
          <Text style={styles.linkTextStyle}>
              {`Don't have an account? `}
              <Text style={{
                textDecorationLine: "underline",
                fontFamily: fontsConstants.American_Typewriter_Bold
              }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{

          }} activeOpacity={globalConstants.activeOpacity}
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={styles.linkTextStyle}>
              {`Forgot `}
              <Text style={{
                textDecorationLine: "underline",
                fontFamily: fontsConstants.American_Typewriter_Bold
              }}>password?</Text>
            </Text>
          </TouchableOpacity>
        </RNView>
        <Text style={{
          marginTop: fontsConstants.h(20),
          textAlign: "center",
          color: "#949496",
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(14)
        }}>{`Login with social account`}</Text>
        <RNView style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: fontsConstants.h(17),
          justifyContent: "center"
        }}>
          <DefaultButton
            title={`Google`}
            iconPosition="left"
            icon={
              <Image
                source={require("src/assets/images/icons/google-icon.png")}
                style={[styles.socialButtonIcon]}
              />
            }
            titleStyle={styles.socailButtonTitleStyle}
            buttonHeight={fontsConstants.h(50)}
            buttonStyle={[styles.socialButtonContainerStyle, {
            }]}
            containerStyle={{
              borderRadius: fontsConstants.h(10),
              marginRight: fontsConstants.w(7)
            }}
            raised
          />
          <DefaultButton
            title={`Facebook`}
            iconPosition="left"
            icon={
              <Image
                source={require("src/assets/images/icons/facebook-icon-f.png")}
                style={[styles.socialButtonIcon, {
                  height: fontsConstants.h(20),
                  width: fontsConstants.h(10)
                }]}
              />
            }
            titleStyle={styles.socailButtonTitleStyle}
            buttonHeight={fontsConstants.h(50)}
            buttonStyle={[styles.socialButtonContainerStyle, {
            }]}
            containerStyle={{
              borderRadius: fontsConstants.h(10),
              marginLeft: fontsConstants.w(7)
            }}
            raised
          />
        </RNView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linkTextStyle: {
    fontFamily: fontsConstants.American_Typewriter_Regular,
    fontSize: fontsConstants.h(12)
  },
  socialButtonContainerStyle: {
    width: fontsConstants.w(150),
    borderRadius: fontsConstants.h(10),
    backgroundColor: "#F3F4F5" 
  },
  socailButtonTitleStyle: {
    fontSize: fontsConstants.h(14),
    fontFamily: fontsConstants.SF_Pro_Rounded_Medium,
    color: "#1A1A1A"
  },
  socialButtonIcon: {
    height: fontsConstants.h(15),
    width: fontsConstants.h(15),
    marginRight: fontsConstants.w(5)
  }
});
