import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { Tenancies } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { formatCurrency } from "src/utils/FormatNumber";
import moment from "moment";
import { LocationIcon } from "./components";
import { RenderAddTenancyButton } from "../property/components";

export default function PayRentScreen({
  navigation,
  route
}: RootStackScreenProps<"PayRentScreen">) {
  const theme = useContext(AppThemeContext);

  const [selected, setSelected] = useState<any>({id: -1})

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        minHeight: '100%'
      }}
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
        <HeaderBackButton/>
        <ScreenTitle
          title={`Pay Rent`}
          introTextStyle={{
            lineHeight: fontsConstants.h(20),
            fontSize: fontsConstants.h(16),
          }}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(52)
          }}
        />
        <View style={{
        }}>
          <Text style={{
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(15),
            color: colorsConstants[theme].screenLabel,
            marginBottom: fontsConstants.h(20)
          }}>
            {`Rent Recipient Property`}
          </Text>
          <View style={{
            borderWidth: fontsConstants.h(1),
            borderColor: colorsConstants.colorPrimary,
            borderRadius: fontsConstants.w(20),
            padding: fontsConstants.w(14),
            marginBottom: fontsConstants.h(20)
          }}>
            {Tenancies.map((item, index) => (
              <View
                key={index.toString()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: fontsConstants.h(10)
                }}
              >
              <LocationIcon
                imageSize={fontsConstants.w(20)}
                containerStyle={{
                  height: fontsConstants.w(45),
                  width: fontsConstants.w(45),
                }}
              /> 
              <Text style={{
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(14),
                color: colorsConstants[theme].darkText3,
                marginHorizontal: fontsConstants.w(10),
                flex: 1
              }}>
                {item.propertyLocation}
              </Text>
              <DefaultRadiobox
                checked={selected?.id === item.id}
                checkedColor={colorsConstants.radioBoxActive}
                size={fontsConstants.w(20)}
                label={`Select`}
                onPress={() => setSelected(item)}
              />
              </View>
            ))}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: fontsConstants.h(24)
            }}>
              <Text style={{
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(14),
                color: colorsConstants[theme].darkText3
              }}>
                {`No additional tenancy record found`}
              </Text>
              <RenderAddTenancyButton

              />
            </View>
          </View>
          <View>
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(15),
              color: colorsConstants[theme].screenLabel,
              marginBottom: fontsConstants.h(20)
            }}>
              {`Selected Property Details`}
            </Text>
            <View style={{
              backgroundColor: colorsConstants[theme]["grey0.13"],
              padding: fontsConstants.w(14),
              borderRadius: fontsConstants.h(10)
            }}>
              {[{
                id: 1,
                label: 'Property ID:',
                value: selected?.propertyId || 'Property not registered in Mypropsmanger',
                valueTextOpacity: selected?.propertyId ? 1 : 0.3
              }, {
                id: 2,
                label: 'Landlord:',
                value: selected?.landlord || 'Not Specified',
                valueTextOpacity: selected?.landlord ? 1 : 0.3
              }, {
                id: 3, 
                label: 'Rent Amount:',
                value: `₦${formatCurrency(selected?.rentAmount || 0)}`,
                valueTextOpacity: selected?.rentAmount ? 1 : 0.3
              }, {
                id: 4,
                label: 'Rent Due Date:',
                value: moment(selected?.dueDate).format("DD/MM/YYYY"),
                valueTextOpacity: selected?.dueDate ? 1 : 0.3
              }].map((item, index) => (
                <View key={index.toString()} style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: fontsConstants.h(5)
                }}>
                  <Text style={{
                    fontFamily: fontsConstants.Lora_Regular,
                    fontSize: fontsConstants.w(14),
                    color: colorsConstants[theme].darkText,
                    minWidth: fontsConstants.w(100)
                  }}>
                    {item.label}
                  </Text>
                  <Text style={{
                    fontFamily: fontsConstants.Lora_Regular,
                    fontSize: fontsConstants.w(12),
                    color: colorsConstants[theme].darkText,
                    opacity: item.valueTextOpacity,
                    flex: 2.5,
                    marginLeft: fontsConstants.w(5)
                  }}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <DefaultButton
          title={`Next`}
          onPress={() => navigation.navigate("ConfirmRentPayment", {
            amount: selected?.rentAmount
          })}
          disabled={selected?.id === -1}
          containerStyle={{
            marginTop: fontsConstants.h(100)
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
