import React, { useContext } from "react";
import { ImageBackground, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
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

export const RentalDetailItem = ({
  value = "",
  label = "",
  radioColor = colorsConstants.radioBoxActive,
  button,
  containerStyle,
  labelStyle,
  valueStyle
} : {
  label: string,
  value: string | number,
  radioColor?: string;
  button?: JSX.Element | any;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
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
        <Text style={[{
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(15)
        }, valueStyle]}>{value}</Text>
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
          item={route.params.rental}
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
              value: `2023-05-23`,
              color: colorsConstants.colorPrimary
            }, {
              id: 2,
              label: 'Next Rent Due Date',
              value: `2024-05-23`,
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
              value: `${currencySymbol['ngn']}${formatCurrency(1350000)}`,
              color: "#FF9401"
            }, {
              id: 2,
              label: 'Tenancy Duration',
              value: `12 months`,
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
              value: `Harry Adebola`,
              color: colorsConstants.colorWhite
            }, {
              id: 2,
              label: 'Landlord\'s Mobile',
              value: `07034578945`,
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
        />
        <DefaultButton
          title={`End Tenancy`}
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
    marginHorizontal: fontsConstants.w(20)
  }
});
