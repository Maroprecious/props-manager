import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useColorScheme from "src/hooks/useColorScheme";
import { RootStackScreenProps } from "src/types/navigations.types";

export default function WelcomeScreen({
  navigation,
  route
}: RootStackScreenProps<"WelcomeScreen">) {
  const theme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text>Welcome{`\n`}Start from here...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
