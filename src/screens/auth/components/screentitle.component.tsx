import React, { useContext } from "react"
import { TextStyle, ViewStyle } from "react-native";
import { StyleProp } from "react-native";
import { View } from "react-native";
import { Text } from "src/components/Themed";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";

export const ScreenTitle = ({
  title = "Title",
  intro,
  containerStyle = {},
  introTextStyle = {},
} : {
  title: string,
  intro?: string,
  introTextStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}) => {

  const theme = useContext(AppThemeContext);

  return (
    <View style={containerStyle}>
      <Text style={{
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.w(25),
        textAlign: "center",
        color: colorsConstants[theme].screenLabel
      }}>
        {title}
      </Text>
      {intro ? (
        <Text style={[{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(12),
          marginBottom: fontsConstants.h(50),
          marginTop: fontsConstants.h(10),
          textAlign: "center",
          color: colorsConstants[theme].screenIntro
        }, introTextStyle]}>
          {intro}
        </Text>
      ) : null}
    </View>
  )
} 