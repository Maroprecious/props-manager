import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import useColorScheme from "src/hooks/useColorScheme";
import { RootStackScreenProps } from "src/types/navigations.types";

export default function LoginScreen({
  navigation,
  route
}: RootStackScreenProps<"LoginScreen">) {
  const theme = useColorScheme();

  return (
    <SafeAreaView>
      <Text>Login Screen</Text>    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
