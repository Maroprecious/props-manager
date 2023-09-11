import React, { useContext } from "react";
import { View as RNView, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { Image } from 'react-native-elements'
import { Text } from "src/components/Themed";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import layoutsConstants from "src/constants/layouts.constants";
import colorsConstants from "src/constants/colors.constants";
import { Icon } from "react-native-elements";

export const LocationIcon = ({
  containerStyle = {},
  imageSize = fontsConstants.w(25)
} : {
  imageSize?: number
  containerStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <RNView
      style={[{
        backgroundColor: "rgba(176, 179, 186, 0.1)",
        borderRadius: fontsConstants.w(12),
        height: fontsConstants.w(55),
        width: fontsConstants.w(55),
        justifyContent: "center",
        alignItems: "center"
      }, containerStyle]}
    >
      <Image
        source={require("src/assets/images/icons/location-danger.png")}
        style={{
          height: imageSize,
          width: imageSize,
        }}
        resizeMode="contain"
      />
    </RNView>
  )
}

export const RentalItem = ({
  item = {},
  onViewPress = () => null,
  containerStyle
} : {
  item: any
  onViewPress?: any;
  containerStyle?: StyleProp<ViewStyle>
}) => {
  const theme = useContext(AppThemeContext);
  return (
    <TouchableOpacity style={[{
      borderWidth: fontsConstants.h(1),
      borderColor: colorsConstants.colorPrimary,
      borderRadius: fontsConstants.w(20),
      padding: fontsConstants.w(10),
      flexDirection: "row",
      alignItems: "center",
      marginTop: fontsConstants.h(20)
    }, containerStyle]}
      onPress={onViewPress}
      activeOpacity={layoutsConstants.activeOpacity}
    >
      <LocationIcon
        containerStyle={{
          height: fontsConstants.w(50),
          width: fontsConstants.w(50)
        }}
      />
      <RNView style={{
        flex: 1,
        marginLeft: fontsConstants.w(15),
        marginRight: fontsConstants.w(5)
      }}>
        <Text style={[{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(15),
          color: colorsConstants[theme].darkText,
          marginBottom: fontsConstants.w(10)
        }]}>{item?.propertyName || `Tenancy Details`}</Text>
        <Text style={[{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(11),
          color: colorsConstants[theme].darkText3,
          opacity: 0.6
        }]}>
          {item.propertyLocation || ""}
        </Text>
      </RNView>
      {onViewPress ? (
        <Icon
          name="chevron-forward"
          type="ionicon"
          color={colorsConstants[theme].text}
          iconStyle={{
            opacity: 0.4
          }}
          size={fontsConstants.h(20)}
          onPress={() => onViewPress()}
          activeOpacity={layoutsConstants.activeOpacity}
        />
      ) : null}
    </TouchableOpacity>
  )
}