import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { StyleProp, ViewStyle } from "react-native";
import { Card, CardProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";

export const DefaultCard = ({
  children = <></>,
  containerStyle = {},
  ...props
} : {
  children?: ReactElement<{}, string | JSXElementConstructor<any>>;
  containerStyle?: StyleProp<ViewStyle>
} & CardProps) => {
  const theme = useContext(AppThemeContext);
  return (
    <Card
      {...props}
      containerStyle={[{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: fontsConstants.w(14),
        paddingVertical: fontsConstants.h(5),
        backgroundColor: colorsConstants[theme].cardBg,
        // borderColor: colorsConstants[theme].borderLine,
        // elevation: 5,
      }, containerStyle]}
    >
      {children}
    </Card>
  )
}