import React, { useContext } from "react"
import { ViewStyle } from "react-native";
import { StyleProp } from "react-native";
import { View } from "react-native";
import { Text } from "src/components/Themed";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";

export const ScreenTitle = ({
  title = "Title",
  intro,
  containerStyle = {}
} : {
  title: string,
  intro?: string,
  containerStyle?: StyleProp<ViewStyle>
}) => {

  const theme = useContext(AppThemeContext);

  return (
    <View style={containerStyle}>
      <Text style={{
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.h(30),
        textAlign: "center",
        color: colorsConstants[theme].screenLabel
      }}>
        {title}
      </Text>
      {intro ? (
        <Text style={{
          fontSize: fontsConstants.h(12),
          marginBottom: fontsConstants.h(50),
          marginTop: fontsConstants.h(10),
          textAlign: "center",
          color: colorsConstants[theme].screenIntro
        }}>
          {intro}
        </Text>
      ) : null}
    </View>
  )
} 