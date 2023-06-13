/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  Platform,
} from "react-native";

import {SafeAreaView as DefaultSafeAreaView, SafeAreaViewProps as DefaultSafeAreaViewProps} from 'react-native-safe-area-context';
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";

import useColorScheme from "src/hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colorsConstants.light & keyof typeof colorsConstants.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colorsConstants[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaViewProps;
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText
      style={[
        { color, lineHeight: fontsConstants.h(20) },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView 
      style={[{ backgroundColor, marginTop: Platform.OS === "ios" ? fontsConstants.h(-35) : undefined,  }, 
        style
      ]} {...otherProps} 
      edges={[]}
    />
  );
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
