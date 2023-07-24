import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, Platform, StyleProp, View, ViewStyle } from "react-native";
import Animated, { Easing, FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { Text } from "./Themed";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { Icon } from "react-native-elements";

type ToastProps = {
  duration?: number;
  position?: "top" | "bottom";
  type?: "success" | "error" | "warning" | "info";
  title?: string;
  message?: string;
  onDismiss?: Function;
  displacement?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const defaultToastOptions = {
  duration: 5,
  position: "top",
  onDismiss: () => null,
  title: 'Toast',
  message: "",
  type:  "info",
  displacement: 50,
  containerStyle: {}
}

export const CustomToast = () => {
  const [visible, setVisible] = useState(false);
  const [duration, setDuration] = useState(defaultToastOptions.duration);
  const [position, setPosition] = useState(defaultToastOptions.position);
  const [title, setTitle] = useState(defaultToastOptions.title);
  const [message, setMessage] = useState(defaultToastOptions.message);
  const [type, setType] = useState(defaultToastOptions.type);
  const [displacement, setDisplacement] = useState(defaultToastOptions.displacement);
  const [containerStyle, setContainerStyle] = useState(defaultToastOptions.containerStyle);

  const onShowToast = (opt: ToastProps) => {
    setVisible(true);
    setDuration(opt?.duration || duration);
    setPosition(opt?.position || position);
    setTitle(opt?.title || "");
    setMessage(opt?.message || "");
    setType(opt?.type || "info");
    setDisplacement(opt?.displacement || 50);
    setContainerStyle(opt?.containerStyle || containerStyle);
  }

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_CUSTOM_TOAST, onShowToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    }
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, duration * 1000);
    }
  }, [visible]);
  if (!visible) return null;
  return (
    <Animated.View 
      entering={FadeIn.duration(200).easing(Easing.ease)} 
      exiting={FadeOut.duration(200).easing(Easing.ease)} 
      layout={Layout.springify()}
      style={[{
      backgroundColor: type === "info" ? 
        colorsConstants.colorInfo
        : type === "success" ? 
        colorsConstants.colorSuccess
        : type === "error" ? 
        colorsConstants.colorDanger
        : colorsConstants.colorWarning,
      borderRadius: fontsConstants.w(8),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: fontsConstants.h(10),
      paddingHorizontal: fontsConstants.w(20),
      position: "absolute",
      top: position === "top" ? Platform.OS === "android" ? fontsConstants.h(displacement) : fontsConstants.h(displacement + 5) : undefined,
      bottom: position === "bottom" ? fontsConstants.h(displacement) : undefined,
      left: fontsConstants.w(12),
      right: fontsConstants.w(12),
      zIndex: 1000,
    }, containerStyle]}>
      <Icon
        type='ionicon'
        name={type === "success" ? `thumbs-up-outline` : type === "info" ? `information-outline` : type === "warning" ? `alert-outline` : `bug-outline`}
        size={fontsConstants.h(30)}
        color={colorsConstants.colorWhite}
        containerStyle={{
        }}
      />
      <View style={{
        flex: 1,
        marginLeft: fontsConstants.w(15)
      }}>
        <Text style={{
          fontFamily: fontsConstants.Lora_Medium,
          fontSize: fontsConstants.h(14),
          color: colorsConstants.colorWhite
        }}>
          {title}
        </Text>
        {message ? (
          <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(12),
            lineHeight: fontsConstants.h(15),
            marginTop: fontsConstants.h(5),
            color: colorsConstants.colorWhiteOpaq["0.6"]
          }}>
            {message}
          </Text>
        ) : null}
      </View>
    </Animated.View>
  )
}

export const showToast = (options: ToastProps) => {
  DeviceEventEmitter.emit(SHOW_CUSTOM_TOAST, options);
}

export const SHOW_CUSTOM_TOAST = 'SHOW_CUSTOM_TOAST';