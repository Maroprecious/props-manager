import { useNavigation } from "@react-navigation/native"
import React, { useContext } from "react"
import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, TouchableOpacity, ViewStyle, GestureResponderEvent } from "react-native"
import { Image } from 'react-native-elements'
import { Button, ButtonProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants"
import fontsConstants from "src/constants/fonts.constants"
import globalConstants from "src/constants/global.constants"
import AppThemeContext from "src/contexts/Theme.context"

export const DefaultButton = ({
  buttonHeight = globalConstants.componentHeight,
  titleStyle = {},
  buttonStyle = {},
  type = "solid",
  borderRadius = fontsConstants.h(10),
  ...props
} : {
  type?: "outline" | "solid" | "clear"
  titleStyle?: StyleProp<TextStyle>
  buttonStyle?: StyleProp<ViewStyle>
  buttonHeight?: number
  borderRadius?: number
} & ButtonProps) => {
  return (
    <Button
      titleStyle={[{
        fontFamily: fontsConstants.American_Typewriter_Bold,
        fontSize: fontsConstants.h(18)
      }, titleStyle]}
      type={type}
      disabledStyle={{
        backgroundColor: type === "solid" ? 
          colorsConstants.colorPrimaryDisabled
          : undefined,
      }}
      disabledTitleStyle={{
        color: type === "solid" ? colorsConstants.colorWhite : undefined
      }}
      buttonStyle={[{
        height: buttonHeight,
        borderRadius: borderRadius,
        backgroundColor: type === "solid" ? 
          colorsConstants.colorPrimary
          : undefined,
        borderWidth: type === "outline" ? 
          fontsConstants.h(1)
          : undefined,
      }, buttonStyle]}
      containerStyle={{
        height: buttonHeight,
        borderRadius: borderRadius,
      }}
      {...props}
    />
  )
}

export const HeaderBackButton = ({
  onPress,
  style = {},
  iconSource,
  containerStyle = {}
}: {
  onPress?: any;
  style?: StyleProp<ImageStyle>;
  iconSource?: ImageSourcePropType;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const navigation = useNavigation();
  const theme = useContext(AppThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={globalConstants.activeOpacity}
      style={[{

      }, containerStyle]}
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        navigation.canGoBack()
          ? navigation.goBack()
          : console.log("Can not go back");
      }}
    >
      <Image
        style={[
          { width: fontsConstants.h(25), height: fontsConstants.h(25)},
          style,
        ]}
        source={ iconSource ? iconSource :
          theme === "dark"
            ? require("src/assets/images/icons/arrrow-back-light.png")
            : require("src/assets/images/icons/arrrow-back-dark.png")
        }
      />
    </TouchableOpacity>
  );
};
