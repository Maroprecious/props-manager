import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { formatCurrency } from "src/utils/FormatNumber";
import moment from "moment";
import { LocationIcon } from "./components";
import { RenderAddButton } from "../property/components";
import { useAppSelector } from "src/hooks/useReduxHooks";
import useTenant from "src/hooks/useTenant";

export default function PayRentScreen({
  navigation,
  route
}: RootStackScreenProps<"PayRentScreen">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user);

  const { loading, getOccupiedProperties } = useTenant();

  const [properties, setProperties] = useState<any>([]);

  const fetchProperties = async () => {
    const req = await getOccupiedProperties({
      tenantId: `${user.id}`
    });
    if (req?.hasError === false) setProperties(req?.data?.message || [])
    else setProperties([]) 
  }
  const [selected, setSelected] = useState<any>({id: -1})

  useEffect(() => {
    fetchProperties()
  }, [navigation])

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
            {properties.map((item: any, index: number) => (
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
                {item?.unit?.id}
              </Text>
              <DefaultRadiobox
                checked={selected?.unit?.id === item.unit?.id}
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
              <RenderAddButton

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
                value: selected?.property_details?.id || 'Property not registered in Mypropsmanger',
                valueTextOpacity: selected?.property_details?.id ? 1 : 0.3
              }, {
                id: 2,
                label: 'Landlord:',
                value: `${selected?.landlord_detail?.firstName} ${selected?.landlord_detail?.lastName}` || 'Not Specified',
                valueTextOpacity: selected?.landlord_detail?.firstName ? 1 : 0.3
              }, {
                id: 3, 
                label: 'Rent Amount:',
                value: `₦${formatCurrency(selected?.unit?.unitRent || 0)}`,
                valueTextOpacity: selected?.unit?.unitRent ? 1 : 0.3
              }, {
                id: 4,
                label: 'Rent Due Date:',
                value: moment(new Date('20'+selected?.tenancy?.lastPaymentDate)).add((selected?.tenancy?.tenantDuration?.split(" ")[0]), "months").format("YYYY-MM-DD"),
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
            amount: selected?.unit?.unitRent,
            property: {
              id: selected?.property_details?.id,
              address: selected?.property_details?.propertyLocation
            }
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
