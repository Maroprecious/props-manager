import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { View as RNView } from 'react-native'
import { Text } from 'src/components/Themed'
import { Image } from 'react-native-elements'
import { Modalize } from "react-native-modalize"
import colorsConstants from "src/constants/colors.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { DefaultButton } from "../buttons/buttons.components";
import globalConstants from "src/constants/global.constants";
import fontsConstants from "src/constants/fonts.constants";

export const AlertModal = ({
  title = "Alert",
  body,
  type = "success",
  modalRef,
  withButton = true,
  buttonTitle = 'Close',
  onButtonPress
} : {
  modalRef?: any;
  withButton?: boolean;
  buttonTitle?: string;
  onButtonPress?: Function;
  title: string;
  type?: "success" | "error" | "info" | "warning"
  body?: string | ReactElement<{}, string | JSXElementConstructor<any>>;
}) => {
  const theme = useContext(AppThemeContext);

  return (
    <Modalize
      ref={modalRef}
      // withReactModal
      adjustToContentHeight={true}
      withHandle={false}
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
            fontSize: fontsConstants.h(30)
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
              height: fontsConstants.h(117),
              width: fontsConstants.h(117)
            }}
          />
          {typeof body === "string" ? (
            <Text>{body}</Text>
          ) : body}
        </RNView>
        <DefaultButton
          title={buttonTitle}
          onPress={onButtonPress ? () => onButtonPress() : () => {
            modalRef?.current?.close();
          }}
          containerStyle={{
            marginTop: fontsConstants.h(260)
          }}
        />
      </RNView>
    </Modalize>
  ) 
}