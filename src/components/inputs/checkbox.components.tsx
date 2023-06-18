import React, { useContext } from "react"
import { StyleProp, ViewStyle } from "react-native";
import { CheckBox, CheckBoxProps, Icon } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";

export const DefaultRadiobox = ({
  checked = true,
  checkedColor = colorsConstants.radioBoxActive,
  containerStyle = {},
  size = fontsConstants.h(25),
  ...props
} : {
} & CheckBoxProps) => {
  const theme = useContext(AppThemeContext);
  return (
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
  )
}