import * as React from "react";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { TouchableOpacity } from "react-native";
import layoutsConstants from "src/constants/layouts.constants";
import colorsConstants from "src/constants/colors.constants";
import { Image } from "react-native-elements";
import ShareApp from "src/utils/ShareApp";

export default function InviteScreen({
  navigation,
  route
}: RootStackScreenProps<"InviteScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={styles.container}
    >
      <HeaderBackButton/>
      <ScreenTitle
        title={`Invite Others`}
        intro={`You can invite your landlord,\ntenants or neighbours\nand make it even more fun!`}
        introTextStyle={{
          lineHeight: fontsConstants.h(20),
          fontSize: fontsConstants.h(16),
        }}
        containerStyle={{
          marginTop: fontsConstants.h(12)
        }}
      />
      <TouchableOpacity
        activeOpacity={layoutsConstants.activeOpacity}
        onPress={async () => {
          await ShareApp(`Fortune0038`)
        }}
        style={{
          backgroundColor: `rgba(182, 251, 0, 0.25)`,
          height: fontsConstants.h(86),
          borderWidth: fontsConstants.h(1),
          borderColor: `rgba(245, 245, 245, 1)`,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: fontsConstants.w(25)
        }}
      >
        <Text style={{
          fontFamily: fontsConstants.Roboto_Bold,
          fontSize: fontsConstants.h(25),
          color: colorsConstants[theme].screenLabel
        }}>
          {`Fortune0038`}
        </Text>
        <View style={{
          alignItems: "center"
        }}>
          <Image
            source={require("src/assets/images/icons/share-invite.png")}
            style={{
              height: fontsConstants.h(22),
              width: fontsConstants.h(22)
            }}
          />
          <Text style={{
            fontFamily: fontsConstants.Roboto_Light,
            fontSize: fontsConstants.h(12),
            color: `#212121`
          }}>
            {`Share Code`}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: fontsConstants.h(40),
    paddingHorizontal: globalConstants.mainViewHorizontalPadding
  },
});
