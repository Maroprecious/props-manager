import React, { useContext } from "react"
import { StyleProp, TextStyle, View } from "react-native";
import { CheckBox, CheckBoxProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { Text } from "../Themed";

export const DefaultRadiobox = ({
  checked = true,
  checkedColor = colorsConstants.radioBoxActive,
  containerStyle = {},
  size = fontsConstants.h(25),
  label,
  labelStyle = {},
  ...props
} : {
  label?: string,
  labelStyle?: StyleProp<TextStyle>
} & CheckBoxProps) => {
  const theme = useContext(AppThemeContext);
  return (
    <View style={{
      alignItems: label ? "center" : undefined
    }}>
      {label ? (
        <Text style={{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(11),
          marginBottom: fontsConstants.h(5),
          color: colorsConstants[theme].darkText
        }}>{label}</Text>
      ) : null}
      <CheckBox
        checked={checked}
        checkedIcon="radio-button-checked"
        uncheckedIcon="radio-button-unchecked"
        iconType="material"
        checkedColor={checkedColor}
        size={size}
        containerStyle={[{
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }, containerStyle]}
        {...props}
      />
    </View>
  )
}