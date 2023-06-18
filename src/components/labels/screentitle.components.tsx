import React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../Themed"
import fontsConstants from "src/constants/fonts.constants";

export const TabScreenTitle = ({
  title = "Title",
  titleStyle = {},
  containerStyle = {}
} :{ 
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[{
      marginTop: fontsConstants.h(80),
      marginBottom: fontsConstants.h(22),
      alignItems: "center"
    }, containerStyle]}>
      <Text style={[{
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.h(30)
      }, titleStyle]}>
        {title}
      </Text>
    </View>
  )
}