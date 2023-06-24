import React, { useContext, useRef } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { formatCurrency } from "src/utils/FormatNumber";
import colorsConstants from "src/constants/colors.constants";
import { DefaultInput } from "src/components/inputs/inputs.components";
import { AlertModal } from "src/components/modals/alert.modals";
import { Modalize } from "react-native-modalize";
import { Avatar, Icon, Image } from "react-native-elements";
import { currencySymbol } from "src/constants/currencies.constants";
import moment from "moment";

export default function ConfirmRentPayment({
  navigation,
  route
}: RootStackScreenProps<"ConfirmRentPayment">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);

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
          title={`Confirm Payment`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(45)
          }}
        />
        <Text style={{
          textAlign: "center",
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.w(18),
          color: colorsConstants[theme].darkText,
          marginBottom: fontsConstants.h(10)
        }}>
          {`Rent Amount Due`}
        </Text>
        <DefaultInput
          leftIcon={
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].darkText,
              marginLeft: fontsConstants.w(20)
            }}>{`₦`}</Text>
          }
          disabled
          value={`${formatCurrency(route.params?.amount || 0)}`}
          disabledInputStyle={{color: colorsConstants[theme].darkText, opacity: 1}}
          inputStyle={{
            textAlign: "center",
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(25),
            color: colorsConstants[theme].darkText,
            marginLeft: fontsConstants.w(-20)
          }}
          containerStyle={{marginBottom: fontsConstants.h(20)}}
        />
        <DefaultInput
          placeholder={`Account Number`}
          containerStyle={{marginBottom: fontsConstants.h(20)}}
        />
        <DefaultInput
          placeholder={`Landlord's Name`}
          containerStyle={{marginBottom: fontsConstants.h(20)}}
        />
        <DefaultInput
          placeholder={`Narration`}
          multiline
          numberOfLines={4}
          inputHeight={fontsConstants.h(90)}
          containerStyle={{marginBottom: fontsConstants.h(20)}}
        />
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Text style={[styles.chargeText, {color: colorsConstants[theme].darkText}]}>
            {`Service Charge:`}
          </Text>
          <Text style={[styles.chargeText, {color: colorsConstants[theme].darkText}]}>
            {`₦${formatCurrency(5)}`}
          </Text>
        </View>
        <DefaultButton
          title={`Next`}
          // disabled
          containerStyle={{
            marginTop: fontsConstants.h(50),
            marginHorizontal: fontsConstants.w(20)
          }}
          onPress={() => alertRef.current?.open()}
        />
        <AlertModal
          modalRef={alertRef}
          modalStyle={{
            paddingTop: fontsConstants.h(70)
          }}
          buttonContainerStyle={{
            marginTop: fontsConstants.h(80)
          }}
          title="Payment Successful"
          buttonTitle="Finish"
          type={undefined}
          body={
            <View style={{
              alignItems: "center",
              marginTop: fontsConstants.h(50)
            }}>
              <Text style={{textAlign: "center", color: "#777779", fontFamily: fontsConstants.Roboto_Regular, fontSize: fontsConstants.h(15)}}>
                {`You have successfully paid rent to`}
              </Text>
              <Icon name="person-circle" type="ionicon" size={fontsConstants.h(50)} containerStyle={{marginVertical: fontsConstants.h(10)}}/>
              <Text style={{fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(18), color: colorsConstants[theme].screenLabel}}>{`Ashaolu Davison`}</Text>
              <Text style={{fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(28), color: colorsConstants[theme].text, marginBottom: fontsConstants.h(30)}}>{`${currencySymbol['ngn']}${formatCurrency(route.params?.amount || 0)}`}</Text>
              {[{
                id: 1,
                label: 'Source',
                value: 'Card **** **** **** 7786'
              }, {
                id: 2,
                label: 'Transaction ID:',
                value: 'TXN8890452GT02'
              }, {
                id: 3,
                label: 'Reference:',
                value: 'MPM/RENT/676012'
              }, {
                id: 4,
                label: 'Date / Time:',
                value: moment('2023-05-23 08:46').format("DD/MM/YYYY hh:mm a")
              },{
                id: 5,
                label: 'Download Receipt',
                icon: require("src/assets/images/icons/download.png")
              }].map((item, index) => (
                <View style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTopWidth: fontsConstants.h(1),
                  borderBottomWidth: item.id === 5 ? fontsConstants.h(1) : undefined,
                  borderColor: colorsConstants[theme].borderLine,
                  paddingVertical: fontsConstants.h(15),
                  marginHorizontal: fontsConstants.w(10),
                  alignSelf: "flex-start",
                }} key={index.toString()}>
                  <Text style={[styles.summaryText, {
                    minWidth: fontsConstants.w(100)
                  }]}>
                    {item.label}
                  </Text>
                  {item?.value ? (
                    <Text style={[styles.summaryText, {
                      flex: 1,
                      textAlign: "right"
                    }]}>
                      {item.value}
                    </Text>
                  ) : item?.icon ? (
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                      <Image
                        source={item.icon}
                        style={{
                          height: fontsConstants.h(30),
                          width: fontsConstants.h(30),
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          }
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, chargeText: {
    fontFamily: fontsConstants.Lora_Regular, fontSize: fontsConstants.h(13)
  },
  summaryText: {
    fontFamily: fontsConstants.Roboto_Medium,
    fontSize: fontsConstants.h(14),
    opacity: 0.6
  }
});
