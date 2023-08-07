import * as React from "react";
import { useContext, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants, { screenBG } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { NoPropertiesCard } from "src/components/cards";
import useProperty from "src/hooks/useProperties";
import { RenderPropertyDetails } from "./components";

export default function PropertiesScreen({
  navigation,
  route
}: RootStackScreenProps<"PropertiesScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const { loading, getProperties } = useProperty();

  const [properties, setProperties] = useState<any>([]);

  const fetchProperties = async () => {
    const req = await getProperties({
      userId: `${user.id}`
    })
    if (req?.hasError === false) setProperties(req?.data?.message)
  } 

  React.useEffect(() => {
    fetchProperties()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={screenBG}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding / 2,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Properties`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <FlatList
          data={properties}
          refreshing={loading}
          onRefresh={() => fetchProperties()}
          renderItem={({ item, index }) => {
            return (
              <RenderPropertyDetails
                item={item}
                itemHeaderText="Property Details"
                showItemId={false}
                containerStyle={{
                  marginBottom: fontsConstants.h(20)
                }}
                onViewPressed={() => {
                  console.log(item)
                }}
              />
            )
          }}
          ListEmptyComponent={
            <NoPropertiesCard/>
          }
          contentContainerStyle={{
            flex: 1
          }}
        />
        <DefaultButton
          title={`Add Property`}
          onPress={() => navigation.navigate("AddPropertyScreen")}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
