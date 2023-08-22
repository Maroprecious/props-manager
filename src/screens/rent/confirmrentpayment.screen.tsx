import React, { useContext, useRef, useState } from "react";
import { ImageBackground, View, StyleSheet, TouchableOpacity, Platform } from "react-native";
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
import { DefaultInput, DefaultSelectInput } from "src/components/inputs/inputs.components";
import { AlertModal } from "src/components/modals/alert.modals";
import { Modalize } from "react-native-modalize";
import { Avatar, Icon, Image } from "react-native-elements";
import { currencySymbol } from "src/constants/currencies.constants";
import moment from "moment";
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";

export default function ConfirmRentPayment({
  navigation,
  route
}: RootStackScreenProps<"ConfirmRentPayment">) {
  const theme = useContext(AppThemeContext);
  const alertRef = useRef<Modalize>(null);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const viewShotRef = useRef(null);
  console.log(alertRef.current)
  const shareImage = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 0.9
      })
      await Sharing.shareAsync(uri)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <ViewShot
        ref={viewShotRef}
        options={{ format: 'jpg', quality: 0.9 }}
        style={{
          width: '100%',
          opacity: 1,
          backgroundColor: '#fff',
          height: '80%',
        }}>
        <ImageBackground
          source={require("src/assets/images/backgrounds/background.png")}
          style={{
            flex: 1,
            paddingTop: fontsConstants.h(40),
            paddingHorizontal: globalConstants.mainViewHorizontalPadding,
            paddingBottom: layoutsConstants.tabBarHeight / 2
          }}
        >
          <HeaderBackButton />
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
            disabledInputStyle={{ color: colorsConstants[theme].darkText, opacity: 1 }}
            inputStyle={{
              textAlign: "center",
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].darkText,
              marginLeft: fontsConstants.w(-20)
            }}
            containerStyle={{ marginBottom: fontsConstants.h(20) }}
          />
          <DefaultSelectInput
            items={[{
              label: "First Bank",
              value: "first bank"
            }]}
            listMode="MODAL"
            searchable
            searchPlaceholder="Search..."
            value={`first bank`}
            containerStyle={{ marginBottom: fontsConstants.h(20), maxHeight: fontsConstants.h(350) }}
            dropDownDirection="BOTTOM"
          />
          <DefaultInput
            placeholder={`Account Number`}
            containerStyle={styles.inputContainerStyle}
          />
          <DefaultInput
            placeholder={`Landlord's Name`}
            containerStyle={styles.inputContainerStyle}
          />
          <DefaultInput
            placeholder={`Narration`}
            multiline
            numberOfLines={4}
            inputHeight={fontsConstants.h(90)}
            containerStyle={styles.inputContainerStyle}
          />
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={[styles.chargeText, { color: colorsConstants[theme].darkText }]}>
              {`Service Charge:`}
            </Text>
            <Text style={[styles.chargeText, { color: colorsConstants[theme].darkText }]}>
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
            onPress={() => {
              setTimeout(() => {
                setIsModalOpen(true)
              }, .20);
              alertRef.current?.open()
            }}
          />
          <AlertModal
            modalRef={alertRef}
            modalStyle={{
              paddingTop: fontsConstants.h(70)
            }}

            body={
              <View style={{
                alignItems: "center",
                marginTop: fontsConstants.h(50)
              }}>
                <Text style={{ textAlign: "center", color: "#777779", fontFamily: fontsConstants.Roboto_Regular, fontSize: fontsConstants.h(15) }}>
                  {`You have successfully paid rent to`}
                </Text>
                <Icon name="person-circle" type="ionicon" size={fontsConstants.h(50)} containerStyle={{ marginVertical: fontsConstants.h(10) }} />
                <Text style={{ fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(18), color: colorsConstants[theme].screenLabel }}>{`Ashaolu Davison`}</Text>
                <Text style={{ fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(28), color: colorsConstants[theme].text, marginBottom: fontsConstants.h(30) }}>{`${currencySymbol['ngn']}${formatCurrency(route.params?.amount || 0)}`}</Text>
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
                },
                  // {
                  //   id: 5,
                  //   label: 'Download Receipt',
                  //   icon: require("src/assets/images/icons/download.png")
                  // }
                ].map((item, index) => (
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
                      <View style={{ flex: 1, alignItems: "flex-end" }}>
                        <TouchableOpacity onPress={shareImage}>
                          <Image
                            source={item.icon}
                            style={{
                              height: fontsConstants.h(30),
                              width: fontsConstants.h(30),
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                ))}
              </View>
            }
            buttonContainerStyle={{
              marginTop: fontsConstants.h(80),
              display: 'none'
            }}
            title="Payment Successful"
            buttonTitle="Finish"
            type={undefined}
          />
        </ImageBackground>
      </ViewShot>
      {
        isModalOpen && <View style={styles.absolute}>
          <View style={{ borderTopColor: colorsConstants[theme].borderLine, borderTopWidth: 1, marginBottom: 20, width: '100%', alignSelf: 'center' }}>

          </View>
          <View style={styles.flex}>
            <Text style={styles.summaryText}>Download Receipt</Text>
            <TouchableOpacity onPress={shareImage}>
              <Image
                source={require("src/assets/images/icons/download.png")}
                style={{
                  height: fontsConstants.h(30),
                  width: fontsConstants.h(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <DefaultButton
            title={`Finish`}
            containerStyle={{
              marginTop: fontsConstants.h(60),
            }}
            onPress={() => {
              setIsModalOpen(false)
              alertRef.current?.close()
            }}
          />
        </View>
      }
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
  },
  inputContainerStyle: { marginBottom: fontsConstants.h(20) },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  absolute: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '68%' : '75%',
    width: '80%',
    alignSelf: 'center',
    zIndex: 1
  }
});
