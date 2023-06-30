import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { View as RNView, StyleProp, ViewStyle } from 'react-native'
import { Text } from 'src/components/Themed'
import { Image } from 'react-native-elements'
import { Modalize, ModalizeProps } from "react-native-modalize"
import colorsConstants from "src/constants/colors.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { DefaultButton } from "../buttons/buttons.components";
import globalConstants from "src/constants/global.constants";
import fontsConstants from "src/constants/fonts.constants";
import { Keyboard } from "react-native"
import { StatusBar } from "react-native"
import {StyleSheet, Modal, } from 'react-native';
import Layout from "../layout/layout"
import { useRef } from 'react';
// import { Button } from 'src/components/buttons/button';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';


export const AlertModal = ({
  title = "Alert",
  cancelButtonTitle = "Cancel",
  body,
  type,
  modalRef,
  withButton = true,
  withCancelButton = false,
  buttonTitle = 'Close',
  onButtonPress,
  onCancelButtonPress,
  cancelButtonContainerStyle = {},
  buttonContainerStyle = {},
  modalStyle = {},
}: {
  modalRef?: any;
  withButton?: boolean;
  withCancelButton?: boolean;
  buttonTitle?: string;
  onButtonPress?: Function;
  onCancelButtonPress?: Function;
  title: string;
  cancelButtonTitle?: string;
  type?: "success" | "error" | "info" | "warning"
  body?: string | ReactElement<{}, string | JSXElementConstructor<any>>;
  cancelButtonContainerStyle?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
}) => {
  const theme = useContext(AppThemeContext);

  return (
    <Modalize
      ref={modalRef}
      // withReactModal
      adjustToContentHeight={true}
      withHandle={false}
      onOpen={() => {
        Keyboard.dismiss()
      }}
      modalStyle={[{
        minHeight: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: colorsConstants[theme].background,
        paddingHorizontal: globalConstants.mainViewHorizontalPadding,
        paddingBottom: fontsConstants.h(87),
        paddingTop: fontsConstants.h(100)
      }, modalStyle]}
      childrenStyle={{
      }}
    >
      <RNView style={{
      }}>
        <RNView style={{
          alignItems: "center"
        }}>
          <Text style={{
            fontSize: fontsConstants.h(30),
            fontFamily: fontsConstants.Lora_Bold
          }}>
            {title}
          </Text>
          {type !== undefined ? (
            <Image
              source={type === "success" ? require("src/assets/images/icons/check-success.png")
                : type === "error" ? require("src/assets/images/icons/check-success.png")
                  : type === "info" ? require("src/assets/images/icons/check-success.png")
                    : require("src/assets/images/icons/check-success.png")
              }
              style={{
                marginTop: fontsConstants.h(72),
                marginBottom: fontsConstants.h(27),
                height: fontsConstants.h(100),
                width: fontsConstants.h(100)
              }}
            />
          ) : null}
          {typeof body === "string" ? (
            <Text style={{
              fontFamily: fontsConstants.Raleway_Regular,
              fontSize: fontsConstants.h(14)
            }}>{body}</Text>
          ) : body}
        </RNView>
        {withButton ? (
          <DefaultButton
            title={buttonTitle}
            onPress={onButtonPress ? () => onButtonPress() : () => {
              modalRef?.current?.close();
            }}
            containerStyle={[{
              marginTop: withCancelButton ? fontsConstants.h(130) : fontsConstants.h(210)
            }, buttonContainerStyle]}
          />
        ) : null}
        {withCancelButton ? (
          <DefaultButton
            title={cancelButtonTitle}
            type="outline"
            onPress={onCancelButtonPress ? () => onCancelButtonPress() : () => {
              modalRef?.current?.close();
            }}
            titleStyle={[{
              color: colorsConstants.criticalRed
            }]}
            buttonStyle={[{
              borderColor: colorsConstants.criticalRed,
            }]}
            containerStyle={[{
              marginTop: fontsConstants.h(20),
            }, cancelButtonContainerStyle]}
          />
        ) : null}
      </RNView>
    </Modalize>
  )
}



type props = {
  text1?: string;
  text2?: string;
  text3?: string;
  page?: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  feedback: React.ReactNode
}

export const Success = ({
  text1,
  text2,
  text3,
  page,
  visible,
  setVisible,
  feedback
}: props) => {
  const navigation = useNavigation();
  const animation = useRef(null);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => null}
      animationType='slide'
      transparent={false}

    >
      <RNView style={styles.animationContainer}>
        <StatusBar backgroundColor='#fff' />
        <Layout>
          <RNView style={styles.overlay}>
            <Text style={styles.successHeader}>{text1}</Text>
            <RNView>
            <Image source={require('src/assets/images/icons/check-success.png')} style={styles.success_img} />
            </RNView>
            <Text style={styles.successText}>{text2}</Text>
            {
              text3 && <Text style={styles.successText2}>{text3}</Text>

            }
            <RNView style={styles.bottom}>
              {feedback}
            </RNView>
          </RNView>
          </Layout>
      </RNView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  overlay: {
    backgroundColor: colorsConstants.light.opaqueWhite,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
  },
  success_img:{
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 40
  },
  successHeader: {
    color: colorsConstants.light.textBlack2,
    fontSize: Platform.OS === 'android' ? 27 : 30,
    paddingTop: Platform.OS === 'android' ? 90 : 150,
    fontFamily: fontsConstants.Lora_Bold
  },
  successText: {
    color: colorsConstants.light.textBlack2,
    fontSize: Platform.OS === 'android' ? 20 : 23,
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 23 : 43,
    letterSpacing: 0.01,
    lineHeight: 30.7,
    paddingHorizontal: 10,
    fontFamily: fontsConstants.Raleway_Regular
  },
  successText2: {
    color: colorsConstants.light.textBlack2,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    letterSpacing: 0.01,
    lineHeight: 20,
    fontFamily: fontsConstants.Raleway_Regular

  },
  button: {
    width: '77%',
    alignSelf: 'center',
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    bottom: Platform.OS === 'android' ? 80 : 100,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }

});
