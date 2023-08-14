import React, { useContext, useRef, useState } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
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
import { Icon, Image } from "react-native-elements";
import { currencySymbol } from "src/constants/currencies.constants";
import moment from "moment";
import  { Paystack, paystackProps }  from 'react-native-paystack-webview';
import { useAppSelector } from "src/hooks/useReduxHooks";
import { PAYSTACK_PUBLIC_KEY } from "@env";
import usePayments from "src/hooks/usePayments";
import { showToast } from "src/components/Toast";
import { PAYMENT_OPTIONS } from "src/constants";

export default function ConfirmRentPayment({
  navigation,
  route
}: RootStackScreenProps<"ConfirmRentPayment">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user)
  const { loading: inititating, initiatePayment } = usePayments();
  
  const alertRef = useRef<Modalize>(null);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null); 
  
  const [paymentRefNumber, setPaymentRefNumber] = useState(`-1`);
  const [paymentRes, setPaymentRes] = useState<{
    transactionRef?: any,
    status: string,
    data?: any
  }>({transactionRef: {}, data: {}, status: ''});

  const preparePayment = async () => {
    const req = await initiatePayment({
      amount: 30000,
      email: user.email,
      userId: `${user.id}`
    })
    paystackWebViewRef?.current?.startTransaction();
    setPaymentRefNumber(`${Math.floor((Math.random() * 1000000000) + 1)}`)
  }

  const completePayment = async () => {
    alertRef?.current?.close()
    navigation.navigate("RentalsScreen")
  }

  return (
    <SafeAreaView
      style={styles.container}
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
        {/* <DefaultSelectInput
          items={[{
            label: "First Bank",
            value: "first bank"
          }]}
          listMode="MODAL"
          searchable
          searchPlaceholder="Search..."
          value={`first bank`}
          containerStyle={{marginBottom: fontsConstants.h(20), maxHeight: fontsConstants.h(350)}}
          dropDownDirection="BOTTOM"      
        /> */}
        <DefaultInput
          placeholder={`Property ID`}
          disabled
          containerStyle={styles.inputContainerStyle}
        />
        {/* <DefaultInput
          placeholder={`Landlord's Name`}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          placeholder={`Narration`}
          multiline
          numberOfLines={4}
          inputHeight={fontsConstants.h(90)}
          containerStyle={styles.inputContainerStyle}
        /> */}
        {/* <View style={{
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
        </View> */}
        <DefaultButton
          title={`Pay Now`}
          loading={inititating}
          // disabled
          containerStyle={{
            marginTop: fontsConstants.h(50),
          }}
          onPress={preparePayment}
        />
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={user.email}
          billingName={`${user.firstName || ''} ${user.lastName|| ''}`}
          amount={`${route.params?.amount.toFixed(2)}`}
          firstName={user.firstName || ''}
          lastName={user.lastName || ''}
          phone={user.phoneNumber || ''}
          activityIndicatorColor={colorsConstants.colorPrimary}
          refNumber={paymentRefNumber}
          channels={PAYMENT_OPTIONS}
          onCancel={(e) => {
            // handle response here
            showToast({
              title: `Payment`,
              type: `info`,
              message: `Payment cancelled`,
            })
          }}
          onSuccess={(res) => {
            console.log(res)
            setPaymentRes(res)
            res?.status === 'success'
              ? alertRef.current?.open()
              : showToast({
                title: `Payment`,
                message: `Payment Failed`,
                type: `error`,
              })
          }}
          ref={paystackWebViewRef}
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
          onButtonPress={completePayment}
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
                value: `TNX${paymentRes?.transactionRef?.trxref}`
              }, {
                id: 3,
                label: 'Reference:',
                value: `MPM/RENT/${paymentRes?.transactionRef?.trxref}`
              }, {
                id: 4,
                label: 'Date / Time:',
                value: moment(new Date()).format("DD/MM/YYYY hh:mm a")
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
    </SafeAreaView>
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
  inputContainerStyle: {marginBottom: fontsConstants.h(20)}
});
