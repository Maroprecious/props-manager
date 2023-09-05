import React, { useContext, useEffect, useRef, useState } from "react";
import { ImageBackground, View, StyleSheet, ActivityIndicator, Alert } from "react-native";
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
import  { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { useAppSelector } from "src/hooks/useReduxHooks";
import { PAYSTACK_PUBLIC_KEY } from "@env";
import usePayments from "src/hooks/usePayments";
import { showToast } from "src/components/Toast";
import { PAYMENT_OPTIONS } from "src/constants";
import SecureStoreManager from "src/utils/SecureStoreManager";
import { PaymentData } from "src/types/app.types";
import ViewShot from "react-native-view-shot";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SaveFileFromUri } from "src/utils/File";


export default function ConfirmRentPayment({
  navigation,
  route
}: RootStackScreenProps<"ConfirmRentPayment">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user)
  const { loading: inititating, initiatePayment } = usePayments();
  
  const alertRef = useRef<Modalize>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null); 
  
  const [paymentData, setPaymentData] = useState({
    amountExpected: 0
  });

  useEffect(() => {
    SecureStoreManager.getInitiatedPaymentData().then((res) => {
      const data: PaymentData = JSON.parse(res || `{}`);
      if (data?.referenceId && data?.unitId === `${route?.params?.unit?.id}`)
        setPaymentData(data)
      else
        preparePayment()
    })
  }, [route?.params?.unit?.id])

  const [paymentRefNumber, setPaymentRefNumber] = useState(`-1`);
  const [paymentRes, setPaymentRes] = useState<{
    transactionRef?: any,
    status: string,
    data?: any
  }>({transactionRef: {}, data: {}, status: ''});

  const doDownloadReceipt = async (name: string) => {
    try {
      //@ts-ignore
      const res = await viewShotRef?.current?.capture();   
      if(res) {
        console.log(res, ">>")
        await SaveFileFromUri(res, name)
      }  
    } catch (error) {
      console.log(error)
      showToast({
        title: `Download`,
        message: `Error downloading receipt`,
        type: 'error'
      })
    }
  }

  const preparePayment = async () => {
    const req = await initiatePayment({
      unitId: `${route?.params?.unit?.id}`
    })
    if (req?.hasError === false) {
      setPaymentData(req?.data?.message || {})
      setPaymentRefNumber(`${req?.data?.message?.referenceId}`)
      const data = {
        ...req?.data?.message,
        unitId: `${route?.params?.unit?.id}`
      }
      await SecureStoreManager.setInitiatedPaymentData(JSON.stringify(data))
    }
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
          intro={`Total payment includes the following: rent, service charge and other charges(if any)`}
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
          rightIcon={ inititating ?
            <ActivityIndicator color={colorsConstants.colorPrimary} style={{marginRight: fontsConstants.w(10)}} /> : undefined
          }
          value={inititating ? `0.00` : `${formatCurrency(paymentData?.amountExpected || 0)}`}
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
          value={route.params?.property?.id}
          editable={false}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          value={route.params?.property?.address}
          editable={false}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultButton
          title={`Pay Now`}
          loading={inititating}
          disabled={paymentData?.amountExpected === undefined || paymentData?.amountExpected === 0}
          containerStyle={{
            marginTop: fontsConstants.h(50),
          }}
          onPress={async () => {
            await SecureStoreManager.delInitiatedPaymentData()
            paystackWebViewRef?.current?.startTransaction()
          }}
        />
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={user.email}
          billingName={`${user.firstName || ''} ${user.lastName|| ''}`}
          amount={`${paymentData?.amountExpected.toFixed(2)}`}
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
          onSuccess={ async (res) => {
            setPaymentRes(res)
            res?.status === 'success'
              ? alertRef.current?.open()
              : showToast({
                title: `Payment`,
                message: `Payment Failed`,
                type: `error`,
              })
          }}
          //@ts-ignore
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
          title=""
          buttonTitle="Finish"
          type={undefined}
          onButtonPress={completePayment}
          body={
            <View>
              <ViewShot
                ref={viewShotRef}
                options={{
                  fileName: `MPM-RENT-TNX${paymentRes?.transactionRef?.trxref}-${moment(new Date()).format("DD/MM/YYYY hh:mm a")}`,
                  format: "jpg"
                }}
              >
                <Text style={{
                  fontSize: fontsConstants.h(30),
                  fontFamily: fontsConstants.Lora_Bold,
                  textAlign: "center"
                }}>
                  {`Payment Successful`}
                </Text>
                <View style={{
                  alignItems: "center",
                  marginTop: fontsConstants.h(50)
                }}>
                  <Text style={{textAlign: "center", color: "#777779", fontFamily: fontsConstants.Roboto_Regular, fontSize: fontsConstants.h(15)}}>
                    {`You have successfully paid rent to`}
                  </Text>
                  <Icon name="person-circle" type="ionicon" size={fontsConstants.h(50)} containerStyle={{marginVertical: fontsConstants.h(10)}}/>
                  <Text style={{fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(18), color: colorsConstants[theme].screenLabel}}>{`Ashaolu Davison`}</Text>
                  <Text style={{fontFamily: fontsConstants.Roboto_Medium, fontSize: fontsConstants.h(28), color: colorsConstants[theme].text, marginBottom: fontsConstants.h(30)}}>{`${currencySymbol['ngn']}${formatCurrency(paymentData?.amountExpected || 0)}`}</Text>
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
                  }].map((item, index) => (
                    <View style={[styles.itemViewContainer, {
                      borderColor: colorsConstants[theme].borderLine,
                    }]} key={index.toString()}>
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
                      ) : null}
                    </View>
                  ))}
                </View>
              </ViewShot>
              {/* <View style={[styles.itemViewContainer, {
                borderBottomWidth: fontsConstants.h(1),
                borderColor: colorsConstants[theme].borderLine,
                justifyContent: "space-between",
                alignSelf: "stretch"
              }]}>
                <Text style={[styles.summaryText, {
                  minWidth: fontsConstants.w(100)
                }]}>
                  Download Receipt
                </Text>
                <TouchableOpacity
                  activeOpacity={layoutsConstants.activeOpacity}
                  onPress={() => doDownloadReceipt(`MPM-RENT-TNX${paymentRes?.transactionRef?.trxref}-${moment(new Date()).format("DD/MM/YYYY hh:mm a")}`)}
                >
                  <Image
                    source={require("src/assets/images/icons/download.png")}
                    style={{
                      width: fontsConstants.h(30),
                      height: fontsConstants.h(30)
                    }}
                  />
                </TouchableOpacity>
              </View> */}
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
  inputContainerStyle: {marginBottom: fontsConstants.h(20)},
  itemViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: fontsConstants.h(1),
    paddingVertical: fontsConstants.h(15),
    marginHorizontal: fontsConstants.w(10),
    alignSelf: "flex-start",
  }
});
