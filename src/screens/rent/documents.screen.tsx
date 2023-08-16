import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { DefaultDocuments, Tenancies } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { Entypo } from "@expo/vector-icons";
import { PropertiesListView } from "../property/components";

export default function DocumentsScreen({
  navigation,
  route
}: RootStackScreenProps<"DocumentsScreen">) {
  const theme = useContext(AppThemeContext);

  const [selected, setSelected] = useState<any>({ id: -1 })

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flex: 1 }}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding / 2,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton />
        <ScreenTitle
          title={`Documents`}
          introTextStyle={{
            lineHeight: fontsConstants.h(20),
            fontSize: fontsConstants.h(16),
          }}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(20)
          }}
        />
        <View style={{
        }}>
          <PropertiesListView
            data={Tenancies}
            selectedId={selected?.id}
            setSelected={setSelected}
            selectable={true}
            showItemId={false}
            headerText={`Linked Properties`}
            itemHeaderText={`Property Location`}
          />
          <View>
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(15),
              color: colorsConstants[theme].screenLabel,
              marginBottom: fontsConstants.h(20)
            }}>
              {`Uploaded Documents`}
            </Text>
            {DefaultDocuments.map((item, index) => (
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colorsConstants[theme]["grey0.13"],
                borderRadius: fontsConstants.w(10),
                marginBottom: fontsConstants.h(10),
                paddingHorizontal: fontsConstants.w(20),
                paddingVertical: fontsConstants.h(10)
              }} key={index.toString()}>
                <Text style={{
                  flex: 1,
                  color: colorsConstants[theme].darkText,
                  fontFamily: fontsConstants.Lora_Regular,
                  fontSize: fontsConstants.h(14),
                  marginRight: fontsConstants.w(15)
                }}>
                  {item.title}
                </Text>
                {[{
                  id: 1,
                  label: 'Download',
                  icon: {
                    name: "download",
                    color: colorsConstants.colorPrimary
                  },
                  onPress: (item: any) => alert("download pressed")
                }, {
                  id: 2,
                  label: 'Delete',
                  icon: {
                    name: "trash",
                    color: colorsConstants.criticalRed
                  },
                  onPress: (item: any) => alert("delete pressed")
                }].map((item: any, index) => (
                  <TouchableOpacity style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: fontsConstants.w(10)
                  }} key={index.toString()}
                    activeOpacity={layoutsConstants.activeOpacity}
                    onPress={() => item.onPress(item)}
                  >
                    <View style={{
                      alignItems: "center"
                    }}>
                      <Entypo
                        name={item.icon.name}
                        size={fontsConstants.h(15)}
                        color={item.icon.color}
                      />
                      <Text style={{
                        fontFamily: fontsConstants.Lora_Regular,
                        fontSize: fontsConstants.h(10),
                        color: colorsConstants[theme].darkText
                      }}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
        <DefaultButton
          title={`Upload Document`}
          containerStyle={{
            marginTop: fontsConstants.h(50),
            marginHorizontal: fontsConstants.w(20)
          }}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
