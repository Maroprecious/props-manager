import React, { useContext, useEffect, useRef, useState } from "react"
import { DeviceEventEmitter, ModalProps, View, Pressable, StyleSheet, Platform, StyleProp, TextStyle, StatusBar, Image as RNImage } from "react-native"
import { Modal } from "react-native"
import colorsConstants from "src/constants/colors.constants"
import fontsConstants from "src/constants/fonts.constants"
import layoutsConstants from "src/constants/layouts.constants"
import AppThemeContext from "src/contexts/Theme.context"
import { Text } from "../Themed"
import { Icon, Image } from "react-native-elements"
import { DefaultButton } from "../buttons/buttons.components"
import { APP_CONFIRM } from "src/constants/global.constants"
import { useAppTheme } from "src/hooks/useColorScheme"

type modalTypes = "delete" | "cancel" | "info"

type ConfirmProps = {
  title: string,
  message: string,
  type: modalTypes,
  modalProps?: ModalProps,
  onCancel?: any,
  onConfirm?: any,
}

const defaultConfirmOptions: ConfirmProps = {
  title: "Title",
  type: "delete",
  message: "Kindly confirm your tenancy\nremoval request.",
  modalProps: {},
  onCancel: () => null,
  onConfirm: () => null
}

export const ConfirmModal = () => {

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(defaultConfirmOptions.title);
  const [message, setMessage] = useState(defaultConfirmOptions.message);
  const [type, setType] = useState<modalTypes>(defaultConfirmOptions.type);
  const [modalProps, setModalProps] = useState({});
  const onCancel = useRef(defaultConfirmOptions.onCancel);
  const onConfirm = useRef(defaultConfirmOptions.onConfirm);
  const theme = useContext(AppThemeContext);

  const onShowConfirm = (opt: ConfirmProps) => {
    setVisible(true);
    setMessage(opt?.message || "Please confirm action");
    setTitle(opt?.title || "Confirm")
    setType(opt?.type || "delete")
    setModalProps(opt?.modalProps || {})
    if (opt?.onCancel)
      onCancel.current = opt?.onCancel
    if (opt?.onConfirm)
      onConfirm.current = opt?.onConfirm
  }

  const confirm = () => {
    setVisible(false)
    onConfirm.current()
  }

  const cancel = () => {
    setVisible(false)
    onCancel.current()
  }

  useEffect(() => {
    DeviceEventEmitter.addListener(APP_CONFIRM, onShowConfirm);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    }
  }, []);

  const buttonStyle = {
    title: {
      fontFamily: fontsConstants.Roboto_Black,
      fontSize: fontsConstants.h(18)
    },
    buttonHeight: fontsConstants.h(50),
    radius: fontsConstants.h(10)
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
      style={{
      }}
      {...modalProps}
    >
      <View style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colorsConstants[theme].modalBg,
      }}>
        <View style={{
          height: fontsConstants.h(395),
          marginHorizontal: layoutsConstants.mainViewHorizontalPadding,
          borderRadius: fontsConstants.w(20),
          backgroundColor: colorsConstants[theme].cardBg,
          paddingTop: fontsConstants.h(15),
          paddingHorizontal: fontsConstants.w(20)
        }}>
          <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(25),
            textAlign: "center"
          }}>{title}</Text>
          <Icon
            name={type === "delete" ? "trash-outline" : type === "info" ? "information-circle-outline" : "close"} 
            type="ionicon"
            color={colorsConstants.criticalRed}
            size={fontsConstants.h(100)}
            style={{
              marginTop: fontsConstants.h(50)
            }}
          />
          <Text style={{
            marginTop: fontsConstants.h(18),
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(15),
            textAlign: "center",
            lineHeight: fontsConstants.h(19)
          }}>
            {message}
          </Text>
          <View style={{
            flexDirection: "row",
            marginTop: fontsConstants.h(50)
          }}>
            <DefaultButton
              title={`Cancel`}
              onPress={cancel}
              type="clear"
              buttonHeight={buttonStyle.buttonHeight}
              borderRadius={buttonStyle.radius}
              titleStyle={buttonStyle.title}
              buttonStyle={{
              }}
              containerStyle={{
                flex: 1,
                marginRight: fontsConstants.w(5)
              }}
            />
            <DefaultButton
              title={`Confirm`}
              onPress={confirm}
              buttonHeight={buttonStyle.buttonHeight}
              borderRadius={buttonStyle.radius}
              titleStyle={buttonStyle.title}
              buttonStyle={{
                backgroundColor: colorsConstants.criticalRed,
              }}
              containerStyle={{
                flex: 1,
                marginLeft: fontsConstants.w(5)
              }}
            />
          </View>
        </View>  
      </View>
    </Modal>
  )
}

export const showConfirm = (options: ConfirmProps) => {
  DeviceEventEmitter.emit(APP_CONFIRM, options);
}



