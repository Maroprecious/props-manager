import React, { useContext } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Slider, SliderProps } from "react-native-elements";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { Text } from "../Themed";
import AppThemeContext from "src/contexts/Theme.context";

const DefaultSlider = ({
  value = 0,
  thumbHeight = fontsConstants.h(40),
  label,
  viewContainerStyle = {},
  minValue = 1,
  maxValue = 10,
  minimumTrackTintColor = colorsConstants.colorPrimary,
  maximumTrackTintColor = "#D8DFEB",
  labelStyle,
  ...props
} : {
  value: number;
  thumbHeight?: number;
  label?: string;
  minValue: number;
  maxValue: number;
  minimumTrackTintColor?: string,
  maximumTrackTintColor?: string,
  viewContainerStyle?: StyleProp<ViewStyle>,
  labelStyle?: StyleProp<TextStyle>,
} & SliderProps) => {
  const theme = useContext(AppThemeContext);
  
  return (
    <View style={[{
      marginBottom: fontsConstants.w(30)
    }, viewContainerStyle]}>
      {label && 
        <Text style={[{
          color: colorsConstants[theme].screenLabel,
          fontFamily: fontsConstants.Lora_Bold,
          fontSize: fontsConstants.w(15),
          marginBottom: fontsConstants.h(10)
        }, labelStyle]}>
          {label}
        </Text>
      }   
      <Slider
        {...props}
        minimumValue={minValue}
        maximumValue={maxValue}
        trackStyle={{ height: fontsConstants.h(4) }}
        thumbStyle={{ backgroundColor: 'transparent' }}
        value={value}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        thumbProps={{
          children: (
            <View style={{
              height: thumbHeight,
              width: thumbHeight,
              justifyContent: "center",
              alignItems: "center",
              borderColor: colorsConstants.colorPrimary,
              borderWidth: fontsConstants.w(1),
              borderRadius: fontsConstants.w(10),
              backgroundColor: colorsConstants.colorWhite,
              shadowOffset: {
                width: fontsConstants.w(100),
                height: fontsConstants.h(100)
              },
              elevation: 5,
            }}>
              <Text style={{
                fontFamily: fontsConstants.American_Typewriter_Regular,
                fontSize: fontsConstants.h(14),
                color: colorsConstants[theme].darkText
              }}>
                {value}
              </Text>
            </View>
          ),
        }}
      />
    </View>
  )
}

export default DefaultSlider;