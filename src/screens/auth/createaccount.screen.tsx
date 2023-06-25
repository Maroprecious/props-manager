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

export default function CreateAccountScreen({
  navigation,
  route
}: RootStackScreenProps<"CreateAccountScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
  const [registrationSuccessful, setRegistrationSuccessful] = useState<boolean>(true);
  const [alertData, setAlertData] = useState<any>({
    title: `Account Creation`,
    message: `Your account has been successfully Created.`,
    subMessage: `Kindly login to access your MPM profile.`,
    buttonTitle: `Login`,
    type: `success`
  })

  const [accountType, setAccountType] = useState(-1);

  const doSignUp = async () => {
    alertRef.current?.open()
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
          title={`Sign Up`}
          intro={`Enter sign up details`}
          containerStyle={{
            marginTop: fontsConstants.h(-20),
            marginBottom: fontsConstants.h(-30)
          }}
        />
        <DefaultInput
          placeholder="Firstname"
          keyboardType="default"
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder="Lastname"
          keyboardType="default"
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultPhoneInput
          placeholder="Mobile number"
          keyboardType="number-pad"
          onChangeNumber={(number: string) => {
            console.log(number)
          }}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder="Email ID"
          keyboardType="email-address"
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder="Password"
          secureTextEntry
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultSelectInput
          items={AccountTypes}
          value={accountType}
          setValue={setAccountType}
          containerStyle={styles.inputContainerStyle}    
          dropDownDirection="BOTTOM"      
        />
        <RNView style={{zIndex: -99999999999}}>
          <Text style={[styles.noteText, {
            textAlign: "center",
            marginTop: fontsConstants.h(-5)
          }]}>
            {`By clicking `}
            <Text style={{
              textDecorationLine: "underline"
            }}>Sign up</Text>
            {`you agree to the following`}
          </Text>
          <RNView style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: fontsConstants.h(10)
          }}>
            <TouchableOpacity>
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
          />
          <RNView style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: fontsConstants.h(25)
          }}>
            <TouchableOpacity style={{

            }} activeOpacity={globalConstants.activeOpacity}
              onPress={() => navigation.navigate("LoginScreen")}
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
        </RNView>
      </View>
      <AlertModal
        modalRef={alertRef}
        title={alertData.title}
        buttonTitle={alertData.buttonTitle}
        type={alertData.type}
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
        onButtonPress={() => registrationSuccessful ? navigation.navigate("LoginScreen") : alertRef?.current?.close()}
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
