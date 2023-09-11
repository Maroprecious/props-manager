import { StatusBar } from "expo-status-bar";
import React, { useContext, useRef, useState } from "react";
import { StyleSheet, ImageBackground, View as RNView, TouchableOpacity } from "react-native";
import { View, Text, ScrollView } from "src/components/Themed";
import { Image } from 'react-native-elements';
import { DefaultButton } from "src/components/buttons/buttons.components";
import { DefaultInput, DefaultPhoneInput, DefaultSelectInput } from "src/components/inputs/inputs.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants, { AccountTypes } from "src/constants/global.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import colorsConstants from "src/constants/colors.constants";
import { ScreenTitle } from "./components/screentitle.component";
import { Modalize } from "react-native-modalize";
import { AlertModal } from "src/components/modals/alert.modals";
import useAuthenticate from "src/hooks/useAuthentication";
import { showToast } from "src/components/Toast";
import layoutsConstants from "src/constants/layouts.constants";
import { useAppSelector } from "src/hooks/useReduxHooks";
import SecureStoreManager from "src/utils/SecureStoreManager";
import useExpoPushToken from "src/hooks/useExpoPushToken";

export default function CreateAccountScreen({
  navigation,
  route
}: RootStackScreenProps<"CreateAccountScreen">) {
  const user = useAppSelector((state) => state.auth.user)

  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
  const [registrationSuccessful, setRegistrationSuccessful] = useState<boolean>(true);
  const [alertData, setAlertData] = useState<any>({
    title: `Account Creation`,
    message: `Your account has been successfully Created.`,
    subMessage: `Kindly verify your email to access your MPM profile.`,
    buttonTitle: `Verify Email`,
    type: `success`
  })

  const { createAccount, loading } = useAuthenticate()
  const [data, setData] = useState<any>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    password: '',
    phoneNumber: '',
    role: user?.roleType?.toUpperCase() || "",
  })
  const [accountType, setAccountType] = useState('-1');
  const pushToken = useExpoPushToken() || "";

  const doSignUp = async () => {
    const req = await createAccount({
      ...data,
      pushToken,
      userId: user.id,
      isCompleteAccountReg: user?.email !== ''
    })
    if (req.hasError && req.status !== 200)
      showToast({
        title: `Login`,
        message: `${req?.message || req?.statusText || req?.error}`,
        type: `error`
      })
    else {
      setRegistrationSuccessful(true)
      await SecureStoreManager.storeExpoPushToken(pushToken)
      SecureStoreManager.setInitialRouteName("LoginScreen")
      alertRef.current?.open()    
    }
  }
  const handleData = (value: string, name: string):void => {
    setData({...data, [name]: value})
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
      </ImageBackground> 
      <View style={{
        marginTop: fontsConstants.h(-320),
        paddingTop: fontsConstants.h(36),
        paddingBottom: fontsConstants.h(20),
        paddingHorizontal: globalConstants.mainViewHorizontalPadding,
        borderTopLeftRadius: fontsConstants.h(40),
        borderTopRightRadius: fontsConstants.h(40),
        justifyContent: "flex-end"
      }}>
        <ScreenTitle
          title={user?.email === '' ? `Sign Up` : `Complete Sign Up`}
          intro={`Enter sign up details`}
          containerStyle={{
            marginTop: fontsConstants.h(-20),
            marginBottom: fontsConstants.h(-30)
          }}
        />
        <DefaultInput
          placeholder="Firstname"
          keyboardType="default"
          onChangeText={(e) => handleData(e, 'firstName')}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder="Lastname"
          keyboardType="default"
          onChangeText={(e) => handleData(e, 'lastName')}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultPhoneInput
          placeholder="Mobile number"
          onChangeNumber={(number: string) => {
            handleData(number, 'phoneNumber')
          }}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder="Email ID"
          keyboardType="email-address"
          onChangeText={(e) => handleData(e, 'email')}
          value={data?.email}
          containerStyle={styles.inputContainerStyle}
          disabled={user?.email !== ''}
        />
        <DefaultInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(e) => handleData(e, 'password')}
          containerStyle={styles.inputContainerStyle}
        />
        {/* <DefaultSelectInput
          items={AccountTypes}
          value={data?.role}
          setValue={setAccountType}
          onSelectItem={(e: {value: string}) => handleData(e.value, 'role')}
          containerStyle={[styles.inputContainerStyle, {
            zIndex: 10
          }]}    
          dropDownDirection="BOTTOM"    
          disabled={user?.email !== ''}  
        /> */}
        <Text style={[styles.noteText, {
          textAlign: "center",
          marginTop: fontsConstants.h(-5),
          zIndex: -1
        }]}>
          {`By clicking `}
          <Text style={{
            textDecorationLine: "underline",
            zIndex: -1
          }}>Sign up</Text>
          {` you agree to the following`}
        </Text>
        <RNView style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: fontsConstants.h(10),
          zIndex: -1
        }}>
          <TouchableOpacity
            activeOpacity={layoutsConstants.activeOpacity}
            onPress={() => navigation.navigate("TermsAndConditionScreen")}
          >
            <Text style={[styles.noteText, {
              textDecorationLine: "underline"
            }]}>
              {`Terms and Conditions`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.noteText}>{` without reservations`}</Text>
        </RNView>
        <DefaultButton
          title={`Sign up`}
          onPress={doSignUp}
          loading={loading}
          disabled={data.email && data.phoneNumber && data.firstName && data.lastName && data.password && data.role ? false : true}
          containerStyle={{zIndex: -1}}
        />
        {user?.email === '' && 
          <RNView style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: fontsConstants.h(25)
          }}>
            <TouchableOpacity style={{

            }} activeOpacity={globalConstants.activeOpacity}
              onPress={() => {
                navigation.navigate("LoginScreen")
              }}
            >
            <Text style={styles.linkTextStyle}>
                {`Already have an account? `}
                <Text style={{
                  textDecorationLine: "underline",
                  fontFamily: fontsConstants.American_Typewriter_Bold
                }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </RNView>
        }
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
      <AlertModal
        modalRef={alertRef}
        title={alertData.title}
        buttonTitle={alertData.buttonTitle}
        buttonContainerStyle={{
          marginTop: fontsConstants.h(50)
        }}
        type={alertData.type}
        onClosed={() => {
          if(registrationSuccessful) navigation.navigate(user?.email !== '' ? "OTPVerifyScreen" : "OTPScreen", {
            type: "verify-email",
            email: data.email
          })
        }}
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
        onButtonPress={() => registrationSuccessful ? navigation.navigate(user?.email !== '' ? "OTPVerifyScreen" : "OTPScreen", {
          type: "verify-email",
          email: data.email
        }) : alertRef?.current?.close()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {
    marginBottom: fontsConstants.h(20)
  },
  noteText: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(12),
    marginBottom: fontsConstants.h(4)
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
