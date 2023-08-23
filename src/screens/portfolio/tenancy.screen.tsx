import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View as RNView, ScrollView, ImageBackground, FlatList } from "react-native";
import { SafeAreaView, Text, View } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants, { deviceHeight } from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { Tenancies } from "src/constants/global.constants";
import colorsConstants from "src/constants/colors.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { LocationIcon } from "../rent/components";
import Layout from "src/components/layout/layout";
import { RenderAddButton, RenderPropertyDetails } from "../property/components";
import { TabScreenTitle } from "src/components/labels/screentitle.components";
import layoutsConstants from "src/constants/layouts.constants";
import useProperty from "src/hooks/useProperties";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { Line } from "src/components/cards";
import ContentLoader, { List, BulletList, Rect } from 'react-content-loader/native';
import { ScreenTitle } from "../auth/components/screentitle.component";
import { currencySymbol } from "src/constants/currencies.constants";
import { formatCurrency } from "src/utils/FormatNumber";

export default function TenancyScreen({
    navigation,
    route
}: RootStackScreenProps<"TenancyScreen">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user)
  const { loading, getProperties, getOneProperty } = useProperty();

  const [properties, setProperties] = useState<any>([]);
  
  
  const [selected, setSelected] = useState<any>(-1)

  const [selectedDetails, setSelectedDetails] = useState<any>({})
  
  const fetchProperties = async () => {
    const req = await getProperties({
      userId: `${user.id}`
    })
    if (req?.hasError === false) {
      setProperties(req?.data?.message)
    }
  } 

  React.useEffect(() => {
    fetchProperties()
  }, [navigation])

  useEffect(() => {
    setSelected(properties[0]?.id)
  }, [properties])

  useEffect(() => {
    console.log(selected, "selected")
    if (selected !== -1)
      getOneProperty({
        propertId: selected
      }).then((res) => {
        if(res.hasError === false) {
          setSelectedDetails({
            ...res?.data?.message,
            ...res?.data?.additionalDetail
          })
        }
      }).catch((e) => {
        console.log(e)
        let selectedIndex = -1;
        properties.forEach((item: any, index: number) => {
          if (item.id === selected) selectedIndex = index;
        })
        setSelectedDetails({
          ...properties[selectedIndex]
        })
      })
  }, [selected])

  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
          style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: fontsConstants.w(20),
        }}
      >
        <HeaderBackButton />
        <ScreenTitle
          title={`Tenancy`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <Text style={{
          fontFamily: fontsConstants.Lora_Bold,
          fontSize: fontsConstants.h(13.5),
          color: colorsConstants[theme].screenLabel,
          marginBottom: fontsConstants.h(10),
        }}>
          {`Listed Properties`}
        </Text>
        <RNView style={{
          maxHeight: fontsConstants.h(250),
          borderWidth: 1,
          borderRadius: fontsConstants.w(10),
          borderColor: colorsConstants[theme].borderLine,
          paddingHorizontal: fontsConstants.w(10),
          paddingVertical: fontsConstants.h(10)
        }}>
          <ScrollView 
            showsVerticalScrollIndicator={false}>
            {properties.map((item: any, index: number) => (
              <RenderPropertyDetails
                key={index.toString()}
                itemHeaderText={`${item?.propertyName || ''}`}
                item={{
                  id: item?.id,
                  propertyLocation: item?.propertyLocation,
                  // propertyName: item?.propertyName,
                }}
                selectable
                selectedId={selected}
                setSelected={(item: any) => setSelected(item?.id)}
              />
            ))}
            {user.roleType === "landlord" && <RNView
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <RenderAddButton
                onPress={() => navigation.navigate("AddPropertyScreen")}
              />
            </RNView>}
          </ScrollView>
        </RNView>
        <RNView 
          style={{
            marginTop: fontsConstants.h(20),
            flex: 1
          }}>
          {[{
            id: 1,
            label: 'Property ID:',
            value: selectedDetails?.id,
          }, {
            id: 2,
            label: 'Property Name:',
            value: selectedDetails?.propertyName,
          }, {
            id: 3,
            label: 'Number of Units:',
            value: `${(selectedDetails?.numberOfUnoccupiedUnits || 0) + (selectedDetails?.numberOfOccupiedUnits)}`,
          }, {
            id: 4,
            label: 'Number of Tenants:',
            value: `${selectedDetails?.numberOfTenants}`,
          // }, {
          //   id: 5,
          //   label: 'Rent Amount per Unit:',
          //   value: `₦ 1,350,000. 00`,
          //   valueTextOpacity: 1
          }, {
            id: 6,
            label: 'Total Rent Expected:',
            value: `${currencySymbol['ngn']}${formatCurrency(selectedDetails?.expectedRentChargeSum || 0)}`,
            valueTextOpacity: 1
          }].map((item, index) => (
            <View key={item.id.toString()} >
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: 'space-between',
                height: 50,
              }}>
                <Text style={{
                  fontFamily: fontsConstants.Lora_Regular,
                  fontSize: fontsConstants.w(14),
                  color: colorsConstants[theme].darkText,
                  marginRight: fontsConstants.w(10)
                }}>
                  {item.label}
                </Text>
                {loading ? (
                  <ContentLoader
                    height={40}
                    style={{
                      flex: 1
                    }}
                    speed={1}
                    backgroundColor={colorsConstants[theme].lighterGrey}
                    foregroundColor={colorsConstants[theme]["grey0.13"]}
                    viewBox="0 0 380 70"
                  >
                    <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                  </ContentLoader>
                ) : (
                <Text style={{
                  fontFamily: fontsConstants.Lora_Regular,
                  fontSize: fontsConstants.w(12),
                  color: colorsConstants[theme].darkText,
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                  {item.value}
                </Text>
                )}
              </View>
            <Line color={colorsConstants[theme].dropShadow} height={fontsConstants.h(1)}/>
          </View>
          ))}
          <DefaultButton
            title={`View Tenants`}
            disabled={selectedDetails?.id === -1 || loading}
            onPress={() => navigation.navigate("ViewTenancyScreen", {
              data: {
                property: {
                  id: selectedDetails?.id,
                  propertyLocation: selectedDetails?.propertyLocation,
                  propertyName: selectedDetails?.propertyName
                },
              }
            })}
            containerStyle={{
              marginTop: fontsConstants.h(20)
            }}
          />
        </RNView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
