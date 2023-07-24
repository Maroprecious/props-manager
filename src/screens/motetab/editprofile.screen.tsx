import * as React from "react";
import { useContext } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { TouchableOpacity } from "react-native";
import layoutsConstants from "src/constants/layouts.constants";
import colorsConstants from "src/constants/colors.constants";
import { Image } from "react-native-elements";
import { DefaultInput, DefaultPhoneInput } from "src/components/inputs/inputs.components";

export default function EditProfileScreen({
  navigation,
  route
}: RootStackScreenProps<"EditProfileScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{minHeight: "100%"}}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Edit Profile`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <DefaultInput
          label={`First Name`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Last Name`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Alias`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultPhoneInput
          label={`Mobile`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Email`}
          disabled
          value="Email"
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultButton
          title={`Update`}
          onPress={() => navigation.goBack()}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {marginBottom: fontsConstants.h(45)}
});
