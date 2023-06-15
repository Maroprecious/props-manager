import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppThemeContext from "src/contexts/Theme.context";
import { RootStackScreenProps } from "src/types/navigations.types";

export default function WelcomeScreen({
  navigation,
  route
}: RootStackScreenProps<"WelcomeScreen">) {
  const theme = useContext(AppThemeContext);

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("LoginScreen")}>Welcome{`\n`}Start from here...</Text>
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
