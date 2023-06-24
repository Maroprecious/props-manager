import React, { useContext } from "react"
import { ViewStyle } from "react-native"
import { StyleProp } from "react-native"
import { Input, InputProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants"
import fontsConstants from "src/constants/fonts.constants"
import globalConstants from "src/constants/global.constants"
import AppThemeContext from "src/contexts/Theme.context"

export const DefaultInput = ({
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  ...props
} : {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
} & InputProps) => {

  const theme = useContext(AppThemeContext);

  return (
    <Input
      placeholderTextColor={colorsConstants[theme].inputPlaceHolderColor}
      inputStyle={{
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingHorizontal: fontsConstants.w(20),
        fontSize: fontsConstants.h(14)
      }}
      inputContainerStyle={{
        height: inputHeight,
        backgroundColor: colorsConstants[theme].inputBackground,
        borderRadius: fontsConstants.h(10),
        borderBottomWidth: 0
      }}
      containerStyle={[{
        height: inputHeight,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: fontsConstants.h(30)
      }, containerStyle]}
      {...props}
    />
  )
}