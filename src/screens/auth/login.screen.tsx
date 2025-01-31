import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View as RNView,
  TouchableOpacity,
} from "react-native";
import { View, Text, ScrollView } from "src/components/Themed";
import { Image } from "react-native-elements";
import { DefaultButton } from "src/components/buttons/buttons.components";
import { DefaultInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants from "src/constants/global.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { ScreenTitle } from "./components/screentitle.component";
import useAuthenticate from "src/hooks/useAuthentication";
import { showToast } from "src/components/Toast";
import SecureStoreManager from "src/utils/SecureStoreManager";
import { populateUserData } from "src/services/redux/slices/auth";
import { useAppDispatch } from "src/hooks/useReduxHooks";
import axios from "axios";

export default function LoginScreen({
  navigation,
  route,
}: RootStackScreenProps<"LoginScreen">) {
  const theme = useContext(AppThemeContext);
  const dispatch = useAppDispatch();

  const { authenticate, authPassword, authEmail, loading } = useAuthenticate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(process.env.EXPO_PUBLIC_API_DEV_URL);
  const doLogin = async () => {
    // const resp = await axios.get(`http://34.193.59.96:10085/api/v1/accounts/submitusername/${email}`)
    const res = await authEmail({
      email,
    });
    if (!res.hasError) {
      const resp = await authPassword({
        password,
        code: res.data,
      });
      console.log(resp.hasError, 'error')
      if (!resp.hasError) {
        showToast({
          title: `Login`,
          message:
            `${resp.data?.statusMessage}` ?? "User logged in successfully",

          type: "success",
        });
        await SecureStoreManager.setAuthToken(resp?.data?.bearerToken || "");
        await SecureStoreManager.setAuthEmail(resp?.data?.email || "");
        const user = { ...resp?.data };
        const token = resp?.data?.bearerToken;
        console.log(user, 'userr')
        // delete user?.["bearerToken"];
        dispatch(
          populateUserData({
            token,
            user,
          })
        );
      
        if (user?.isCompleted === 0)
        
          if (user?.is_verified === 0) navigation.navigate("OTPVerifyScreen",{
            type: 'verify-email',
            email: user?.email
          });
          else
            navigation.navigate("VerifyEmailScreen", {
              type: "verify-email",
            });
        else navigation.navigate("App");
      }
      console.log(resp);
    }
    console.log(res, "res");

    // const req = await authenticate({
    //   email,
    //   password,
    // });
    // if (req.hasError && req.status !== 200)
    //   showToast({
    //     title: `Login`,
    //     message: `${req?.message || req?.statusText || req?.error}`,
    //     type: `error`,
    //   });
    // else {
    //   SecureStoreManager.setAuthToken(req?.data?.token || "");
    //   const user = req?.data;
    //   const token = req?.data?.token;
    //   delete user?.["token"];
    //   dispatch(
    //     populateUserData({
    //       token,
    //       user,
    //     })
    //   );
    //   if (user?.completed === true)
    //     if (user?.verified === true) navigation.navigate("App");
    //     else
    //       navigation.navigate("VerifyEmailScreen", {
    //         type: "verify-email",
    //       });
    //   else navigation.navigate("CompleteAccountCreationScreen");
    // }
  };
  // useEffect(()=>{
  //   dispatch(
  //     populateUserData({
  //       // token,
  //       user: {},
  //     })


  //   );
  // }, [])
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar translucent={true} />
      <ImageBackground
        source={require("src/assets/images/backgrounds/login-background-image.png")}
        style={{
          height: fontsConstants.h(446),
          marginTop: fontsConstants.h(-60),
          alignItems: "center",
          paddingTop: fontsConstants.h(110),
        }}
      >
        <Image
          source={require("src/assets/images/mpm-mobile.png")}
          style={{
            width: fontsConstants.w(158),
            height: fontsConstants.h(85),
          }}
        />
      </ImageBackground>
      <View
        style={{
          marginTop: fontsConstants.h(-115),
          paddingTop: fontsConstants.h(36),
          paddingBottom: fontsConstants.h(20),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          borderTopLeftRadius: fontsConstants.h(40),
          borderTopRightRadius: fontsConstants.h(40),
          justifyContent: "flex-end",
        }}
      >
        <ScreenTitle
          title={`Welcome`}
          intro={`Login to your account`}
          containerStyle={{
            marginBottom: fontsConstants.h(-30),
          }}
        />
        <DefaultInput
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={(t: string) => setEmail(t)}
        />
        <DefaultInput
          placeholder="Enter password"
          value={password}
          onChangeText={(t: string) => setPassword(t)}
          secureTextEntry
        />
        <DefaultButton
          title={`Login`}
          onPress={doLogin}
          loading={loading}
          disabled={email === "" || password === ""}
        />
        <RNView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: fontsConstants.h(25),
          }}
        >
          <TouchableOpacity
            style={{}}
            activeOpacity={globalConstants.activeOpacity}
            onPress={() => navigation.navigate("CreateAccountScreen")}
          >
            <Text style={styles.linkTextStyle}>
              {`Don't have an account? `}
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontFamily: fontsConstants.American_Typewriter_Bold,
                }}
              >
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            activeOpacity={globalConstants.activeOpacity}
            onPress={() =>
              navigation.navigate("ForgotPasswordScreen", {
                type: "reset-password",
              })
            }
          >
            <Text style={styles.linkTextStyle}>
              {`Forgot `}
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontFamily: fontsConstants.American_Typewriter_Bold,
                }}
              >
                password?
              </Text>
            </Text>
          </TouchableOpacity>
        </RNView>
        {/* <Text style={{
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
        </RNView> */}
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
    fontSize: fontsConstants.h(12),
  },
  socialButtonContainerStyle: {
    width: fontsConstants.w(150),
    borderRadius: fontsConstants.h(10),
    backgroundColor: "#F3F4F5",
  },
  socailButtonTitleStyle: {
    fontSize: fontsConstants.h(14),
    fontFamily: fontsConstants.SF_Pro_Rounded_Medium,
    color: "#1A1A1A",
  },
  socialButtonIcon: {
    height: fontsConstants.h(15),
    width: fontsConstants.h(15),
    marginRight: fontsConstants.w(5),
  },
});
