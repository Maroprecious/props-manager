import * as React from "react";
import { useContext, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import {
  DefaultButton,
  HeaderBackButton,
} from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants, { screenBG } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { NoPropertiesCard } from "src/components/cards";
import useProperty from "src/hooks/useProperties";
import { RenderPropertyDetails } from "./components";
import { Icon } from "react-native-elements";
import colorsConstants from "src/constants/colors.constants";
import { useProperties } from "src/contexts/property.context";
import { useFocusEffect } from "@react-navigation/native";

export default function PropertiesScreen({
  navigation,
  route,
}: RootStackScreenProps<"PropertiesScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user);
  const { loading, getProperties } = useProperty();

  const [properties, setProperties] = useState<any>([]);

  const { setProperty } = useProperties();
  const fetchProperties = async () => {
    const req = await getProperties({
      userId: `${user?.email}`,
    });
    console.log(req)
    if (!req?.hasError) setProperties(req?.data?.properties);
  console.log(req.data.properties, 'props')

  };
console.log(properties, "properties")
  useFocusEffect(
    React.useCallback(() => {
      fetchProperties();
    }, [navigation, user])
  );

  //   React.useEffect(() => {
  //     fetchProperties()
  //   }, [navigation])
  // // console.log(properties, 'propssss')
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={screenBG}
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? fontsConstants.h(70) : fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding / 2,
          paddingBottom: layoutsConstants.tabBarHeight / 2,
        }}
      >
        <HeaderBackButton />
        <ScreenTitle
          title={`Properties`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35),
          }}
        />
        <FlatList
          data={properties}
          refreshing={loading}
          onRefresh={() => fetchProperties()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                activeOpacity={layoutsConstants.activeOpacity}
                onPress={() => {
                  setProperty(item);
                  navigation.navigate("PropertyDetailsScreen");
                }}
              >
                <RenderPropertyDetails
                  item={item}
                  itemHeaderText={item?.propertyName || "Property Name"}
                  showItemId={false}
                  containerStyle={{
                    marginBottom: fontsConstants.h(20),
                  }}
                  hasRightComponent={false}
                  rightIcon={
                    <Icon
                      name="chevron-forward"
                      type="ionicon"
                      color={colorsConstants[theme].text}
                      iconStyle={{
                        opacity: 0.4,
                      }}
                      size={fontsConstants.h(20)}
                      activeOpacity={layoutsConstants.activeOpacity}
                    />
                  }
                />
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={!loading ? <NoPropertiesCard /> : <></>}
          contentContainerStyle={{
            // flex: 1,
            paddingBottom: fontsConstants.h(10),
          }}
          showsVerticalScrollIndicator={false}
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
