import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, View as RNView } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { Modalize } from "react-native-modalize";
import { RentalItem } from "./components";
import useTenant from "src/hooks/useTenant";
import { useAppSelector } from "src/hooks/useReduxHooks";
import moment from "moment";

export default function RentalsScreen({
  navigation,
  route
}: RootStackScreenProps<"RentalsScreen">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
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

  useEffect(() => {
    fetchProperties()
  }, [navigation])


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flex: 1}}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Rentals`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(45)
          }}
        />
        <RNView style={{
          flex: 1
        }}>
          {properties.map((item: any, index: number) => (
            <RentalItem
              key={index.toString()}
              item={{
                id: item?.unit?.id || '',
                propertyName: item?.unit?.unitName,
                propertyLocation: item?.property_details?.propertyLocation,
              }}
              onViewPress={() => navigation.navigate("ViewRentalScreen", {
                rental: {
                  duration: item?.unit?.tenantDuration?.split(" ")[0] || 12,
                  id: item?.unit?.id,
                  unitName: item?.unit?.unitName,
                  tenancy: {
                    id: item?.tenancy?.id
                  },
                  lastPaymentDate: moment(item?.tenancy?.lastPaymentDate).format("YYYY-MM-DD"),
                  nextDueDate: moment(item?.tenancy?.nextDueDate).format("YYYY-MM-DD"),
                  nextRentAmount: item?.unit?.unitRent,
                  property: {
                    id: item?.property_details?.id,
                    address: item?.property_details?.propertyLocation
                  },
                  landlord: {
                    fullName: `${item?.landlord_detail?.firstName} ${item?.landlord_detail?.lastName}`,
                    id: `${item?.landlord_detail?.userId}`,
                    mobile: `${item?.landlord_detail?.phoneNumber}`
                  }
                }
              })}
            />
          ))}
          {properties.length < 1 && (
            <Text style={{
              alignSelf: "center",
              marginTop: fontsConstants.h(100),
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(20),
              opacity: layoutsConstants.activeOpacity
            }}>
              {`No Rentals`}
            </Text>
          )}
        </RNView>
        {/* {user.roleType !== "tenant" && 
          <DefaultButton
            title={`Add Tenancy`}
            containerStyle={{
              marginTop: fontsConstants.h(20),
              marginHorizontal: fontsConstants.w(20)
            }}
            onPress={() => navigation.navigate('AddPropertyScreen')}
          />
        } */}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
});
