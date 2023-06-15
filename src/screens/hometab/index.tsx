import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import fontsConstants from "src/constants/fonts.constants";
import useColorScheme from "src/hooks/useColorScheme";
import { RootTabScreenProps } from "src/types/navigations.types";

export default function HomeTabScreen({
  navigation,
  route
}: RootTabScreenProps<"HomeTabNavigator">) {
  const theme = useColorScheme();

  return (
    <ScrollView style={styles.container}>
      <Text style={{alignSelf: "center", marginTop: fontsConstants.h(200)}}>Home Tab</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
