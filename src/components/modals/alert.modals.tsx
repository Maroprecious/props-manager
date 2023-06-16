import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { View as RNView, StyleProp, ViewStyle } from 'react-native'
import { Text } from 'src/components/Themed'
import { Image } from 'react-native-elements'
import { Modalize } from "react-native-modalize"
import colorsConstants from "src/constants/colors.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { DefaultButton } from "../buttons/buttons.components";
import globalConstants from "src/constants/global.constants";
import fontsConstants from "src/constants/fonts.constants";
import { Keyboard } from "react-native"

export const AlertModal = ({
  title = "Alert",
  cancelButtonTitle = "Cancel",
  body,
  type = "success",
  modalRef,
  withButton = true,
  withCancelButton = false,
  buttonTitle = 'Close',
  onButtonPress,
  onCancelButtonPress,
  cancelButtonContainerStyle = {}
} : {
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
      modalStyle={{
        minHeight: "100%",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: colorsConstants[theme].background,
        paddingHorizontal: globalConstants.mainViewHorizontalPadding,
        paddingBottom: fontsConstants.h(87),
        paddingTop: fontsConstants.h(100)
      }}
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
            containerStyle={{
              marginTop: withCancelButton ? fontsConstants.h(170) : fontsConstants.h(250)
            }}
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