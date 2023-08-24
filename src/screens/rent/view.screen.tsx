import React, { useContext } from "react";
import { ActivityIndicator, ImageBackground, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import colorsConstants from "src/constants/colors.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { formatCurrency } from "src/utils/FormatNumber";
import { currencySymbol } from "src/constants/currencies.constants";
import { RentalItem } from "./components";
import useTenant from "src/hooks/useTenant";
import { showConfirm } from "src/components/modals/confirm.modals";
import { showToast } from "src/components/Toast";

export const RentalDetailItem = ({
  value = "",
  label = "",
  radioColor = colorsConstants.radioBoxActive,
  button,
  containerStyle,
  labelStyle,
  valueStyle,
  loading = false
} : {
  label: string,
  value: string | number,
  radioColor?: string;
  button?: JSX.Element | any;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  loading?: boolean
}) => {
  return (
    <View
      style={[{
        borderColor: colorsConstants.colorPrimary,
        borderWidth: fontsConstants.h(1),
        borderRadius: fontsConstants.w(16),
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: fontsConstants.h(10)
      }, containerStyle]}
    >
      <View>
        <Text style={[{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(12),
          marginBottom: fontsConstants.h(10)
        }, labelStyle]}>{label}</Text>
        {loading ? (
          <ActivityIndicator
            color={colorsConstants.colorPrimary}
            size={fontsConstants.h(18)}
            style={{
              alignSelf: "flex-start"
            }}
          />
        ) : (
          <Text style={[{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(15)
          }, valueStyle]}>{value}</Text>
        )}
      </View>
      <View style={{
        alignItems: "center",
      }}>
        <DefaultRadiobox
          checked
          checkedColor={radioColor}
          size={fontsConstants.h(12)}
          containerStyle={{
            marginBottom: fontsConstants.h(15)
          }}
        />
        {button ? button : null}
      </View>
    </View>  
  )
}

export default function ViewRentalScreen({
  navigation,
  route
}: RootStackScreenProps<"ViewRentalScreen">) {
  const theme = useContext(AppThemeContext);
  const rentalDetails = route?.params?.rental

  const { loading, endTenancy } = useTenant();

  const doEndTenancy = async () => {
    showConfirm({
      title: `End Tenancy`,
      message: `Are you sure you want to end your tenancy for propery ${rentalDetails.property.id}. \nLocated at ${rentalDetails.property.address}`,
      type: `info`,
      onConfirm: async () => {
        const req = await endTenancy({
          tenancyId: rentalDetails?.tenancy?.id
        })
        showToast({
          title: `End Tenancy`,
          message: req?.message || `Tenancy ended successfully`,
          type: req?.hasError === false ? "success" : "error"
        })
        if (req?.hasError === false) navigation.navigate("RentalsScreen")
      }
    })
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingBottom: layoutsConstants.tabBarHeight / 2,
          paddingHorizontal: fontsConstants.w(18)
        }}
      >
        <HeaderBackButton
          containerStyle={{
            marginTop: fontsConstants.h(40),
          }}
        />
        <ScreenTitle
          title={`Rental Details`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(20)
          }}
        />
        <RentalItem
          item={{
            id: rentalDetails.id,
            propertyLocation: rentalDetails.property.address
          }}
          containerStyle={{marginBottom: fontsConstants.h(20)}}
        />
        <View style={{
          flex: 1,
          marginBottom: fontsConstants.h(40)
        }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: fontsConstants.w(10)
            }}
          >
            {[{
              id: 1,
              label: 'Last Rent Paid',
              value: rentalDetails.lastPaymentDate,
              color: colorsConstants.colorPrimary
            }, {
              id: 2,
              label: 'Next Rent Due Date',
              value: rentalDetails.nextDueDate,
              color: colorsConstants.criticalRed
            }].map((item, index) => (
              <RentalDetailItem
                key={index.toString()}
                label={item.label}
                value={item.value}
                radioColor={item.color}
                labelStyle={{color: colorsConstants[theme].darkText}}
                valueStyle={{color: colorsConstants[theme].darkText3}}
                containerStyle={{
                  marginLeft: index === 1 ? fontsConstants.w(5) : 0,
                  marginRight: index === 1 ? 0 : fontsConstants.w(5)
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: fontsConstants.w(10)
            }}
          >
            {[{
              id: 1,
              label: 'Next Rent Amount',
              value: `${currencySymbol['ngn']}${formatCurrency(Number(rentalDetails.nextRentAmount))}`,
              color: "#FF9401"
            }, {
              id: 2,
              label: 'Tenancy Duration',
              value: `${rentalDetails.duration} months`,
              color: "#633EFF"
            }].map((item, index) => (
              <RentalDetailItem
                key={index.toString()}
                label={item.label}
                value={item.value}
                radioColor={item.color}
                labelStyle={{color: colorsConstants[theme].darkText}}
                valueStyle={{color: colorsConstants[theme].darkText3}}
                containerStyle={{
                  marginLeft: index === 1 ? fontsConstants.w(5) : 0,
                  marginRight: index === 1 ? 0 : fontsConstants.w(5)
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: fontsConstants.w(10)
            }}
          >
            {[{
              id: 1,
              label: 'Landlord\'s Name',
              value: rentalDetails.landlord?.fullName || '',
              color: colorsConstants.colorWhite
            }, {
              id: 2,
              label: 'Landlord\'s Mobile',
              value: rentalDetails?.landlord?.mobile || '',
              color: colorsConstants.colorWhite
            }].map((item, index) => (
              <RentalDetailItem
                key={index.toString()}
                label={item.label}
                value={item.value}
                radioColor={item.color}
                labelStyle={{color: colorsConstants[theme].darkText}}
                valueStyle={{color: colorsConstants[theme].darkText3}}
                containerStyle={{
                  marginLeft: index === 1 ? fontsConstants.w(5) : 0,
                  marginRight: index === 1 ? 0 : fontsConstants.w(5)
                }}
              />
            ))}
          </View>
        </View>
        <DefaultButton
          title={`Pay Rent`}
          containerStyle={styles.btnContainerStyle}
          onPress={() => {
            navigation.navigate("ConfirmRentPayment", {
              amount: rentalDetails?.nextRentAmount,
              property: rentalDetails?.property
            })
          }}
        />
        <DefaultButton
          title={`End Tenancy`}
          onPress={doEndTenancy}
          loading={loading}
          type="outline"
          titleStyle={[{
            color: colorsConstants.criticalRed
          }]}
          buttonStyle={[{
            borderColor: colorsConstants.criticalRed,
          }]}
          containerStyle={styles.btnContainerStyle}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, btnContainerStyle: {
    marginVertical: fontsConstants.h(10),
  }
});
