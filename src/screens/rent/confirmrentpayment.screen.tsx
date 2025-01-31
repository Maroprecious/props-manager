import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import {
  DefaultButton,
  HeaderBackButton,
} from "src/components/buttons/buttons.components";
import fontsConstants, {
  deivceWidth,
  deviceHeight,
} from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { formatCurrency } from "src/utils/FormatNumber";
import colorsConstants from "src/constants/colors.constants";
import {
  DefaultInput,
  DefaultSelectInput,
} from "src/components/inputs/inputs.components";
import { AlertModal } from "src/components/modals/alert.modals";
import { Modalize } from "react-native-modalize";
import { Icon } from "react-native-elements";
import { currencySymbol } from "src/constants/currencies.constants";
import moment from "moment";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { useAppSelector } from "src/hooks/useReduxHooks";
// import { PAYSTACK_PUBLIC_KEY } from "@env";
import usePayments from "src/hooks/usePayments";
import { showToast } from "src/components/Toast";
import { PAYMENT_OPTIONS } from "src/constants";
import SecureStoreManager from "src/utils/SecureStoreManager";
import ViewShot from "react-native-view-shot";
import { SaveFileFromUri } from "src/utils/File";
import { WebView } from "react-native-webview";


const PAYSTACK_PUBLIC_KEY = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY as string

export default function ConfirmRentPayment({
  navigation,
  route,
}: RootStackScreenProps<"ConfirmRentPayment">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user);
  const {
    loading: inititating,
    initiatePayment,
    getPaymentMethods,
    initiateSquadPayment,
    verifySquadPayment,
  } = usePayments();
  const [paymentOptions, setPaymentOptions] = useState<{
    options: { value: string; label: string }[];
    selectedOption: string;
    paymentUrl: string;
  }>({
    options: [],
    selectedOption: "",
    paymentUrl: "",
  });
  const alertRef = useRef<Modalize>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null);
  const [paymentData, setPaymentData] = useState({
    amountExpected: 0,
    referenceId: "",
  });
  const [showSquadPayment, setShowSquad] = useState<boolean>(false);
  const [isWebViewLoading, setIsWebViewLoading] = useState<boolean>(false);
  // https://mychattelmanager.com/?reference=5846260099
  useEffect(() => {
    // SecureStoreManager.getInitiatedPaymentData().then((res) => {
    //   const data: PaymentData = JSON.parse(res || `{}`);
    //   if (data?.referenceId && data?.unitId === `${route?.params?.unit?.id}`)
    //     setPaymentData(data)
    //   else
    if (route.params?.unit?.id && paymentOptions) {
      preparePayment();
    }
    // })
  }, [route?.params?.unit?.id, paymentOptions]);

  useEffect(() => {
    (async () => {
      const req = await getPaymentMethods();
      if (req?.hasError === false && Array.isArray(req.data?.message)) {
        const arr = req.data.message.map(
          (element: { paymentMethod: string; paymentType: string }) => ({
            label: element.paymentMethod,
            value: element.paymentType,
          })
        );
        setPaymentOptions({ ...paymentOptions, options: arr, selectedOption: "Paystack" });
      }
    })();
  }, []);

  const [paymentRefNumber, setPaymentRefNumber] = useState(`-1`);
  const [landlordName, setLandlordName] = useState("MPM");
  const [paymentRes, setPaymentRes] = useState<{
    transactionRef?: any;
    status: string;
    data?: any;
  }>({ transactionRef: {}, data: {}, status: "" });

  const doDownloadReceipt = async (name: string) => {
    try {
      //@ts-ignore
      const res = await viewShotRef?.current?.capture();
      if (res) {
        console.log(res, ">>");
        await SaveFileFromUri(res, name);
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: `Download`,
        message: `Error downloading receipt`,
        type: "error",
      });
    }
  };

  const handleVerifySquadPaymentStatus = async () => {
    setShowSquad(false);
    const req = await verifySquadPayment({
      referenceId: paymentData.referenceId,
    });
    if (req?.hasError === false) {
      setPaymentRes({
        transactionRef: {
          trxref: paymentData.referenceId,
        },
        status: "success",
      });
      alertRef.current?.open();
    } else {
      showToast({
        title: `Payment`,
        message: `Payment Failed`,
        type: `error`,
      });
    }
  };

  const preparePayment = async () => {
    const req = await initiatePayment({
      unitId: `${route?.params?.unit?.id}`,
      paymentMethod: paymentOptions.selectedOption.split("_")[1] || paymentOptions?.options[0]?.label,
    });
    if (req?.hasError === false) {
      setPaymentData(req?.data?.message || {});
      setPaymentRefNumber(`${req?.data?.message?.referenceId}`);
      setLandlordName(`${req?.data?.message?.landlordName}`);
      const data = {
        ...req?.data?.message,
        unitId: `${route?.params?.unit?.id}`,
      };
      // await SecureStoreManager.setInitiatedPaymentData(JSON.stringify(data))
    }
  };

  const handleSquadPaymentInitialization = async () => {
    if (!showSquadPayment && paymentOptions.paymentUrl === "") {
      const req = await initiateSquadPayment({
        referenceId: paymentData.referenceId,
        customer_email: user.email,
      });

      if (req?.hasError === false) {
        console.log(req);
        setShowSquad(true);
        setIsWebViewLoading(true);
        setPaymentOptions({
          ...paymentOptions,
          paymentUrl: req.data?.message?.checkoutUrl,
          selectedOption: "Squad"
        });
      }
    } else {
      setShowSquad((prev) => !prev);
    }
  };

  const completePayment = async () => {
    alertRef?.current?.close();
    navigation.navigate("RentalsScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? fontsConstants.h(70) : fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2,
        }}
      >
        <HeaderBackButton />
        <ScreenTitle
          title={`Confirm Payment`}
          intro={`Total payment includes the following: rent, service charge and other charges(if any)`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(45),
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.w(18),
            color: colorsConstants[theme].darkText,
            marginBottom: fontsConstants.h(10),
          }}
        >
          {`Rent Amount Due`}
        </Text>
        <DefaultInput
          leftIcon={
            <Text
              style={{
                fontFamily: fontsConstants.Lora_Bold,
                fontSize: fontsConstants.h(25),
                color: colorsConstants[theme].darkText,
                marginLeft: fontsConstants.w(20),
              }}
            >{`₦`}</Text>
          }
          disabled
          rightIcon={
            inititating ? (
              <ActivityIndicator
                color={colorsConstants.colorPrimary}
                style={{ marginRight: fontsConstants.w(10) }}
              />
            ) : undefined
          }
          value={
            inititating
              ? `0.00`
              : `${formatCurrency(paymentData?.amountExpected || 0)}`
          }
          disabledInputStyle={{
            color: colorsConstants[theme].darkText,
            opacity: 1,
          }}
          inputStyle={{
            textAlign: "center",
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(25),
            color: colorsConstants[theme].darkText,
            marginLeft: fontsConstants.w(-20),
          }}
          containerStyle={{ marginBottom: fontsConstants.h(20) }}
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
        {paymentOptions?.options?.length > 1 && <DefaultSelectInput
          items={paymentOptions.options}
          value={
            Array.isArray(paymentOptions.selectedOption.split("_"))
              ? paymentOptions.selectedOption.split("_")[0]
              : ""
          }
          loading={inititating}
          placeholder="Select payment option"
          onSelectItem={(option: { value: string; label: string }) =>
            setPaymentOptions({
              ...paymentOptions,
              selectedOption: `${option.value}_${option.label}`,
            })
          }
        />}

        <DefaultButton
          title={`Pay Now`}
          loading={inititating}
          disabled={
            paymentData?.amountExpected === undefined ||
            paymentData?.amountExpected === 0 || inititating
          }
          containerStyle={{
            marginTop: fontsConstants.h(50),
          }}
          onPress={async () => {
            await SecureStoreManager.delInitiatedPaymentData();
            if (paymentOptions.selectedOption?.toLowerCase().includes("paystack")) {
              paystackWebViewRef?.current?.startTransaction();
            } else {
              handleSquadPaymentInitialization();
            }
          }}
        />
        {paymentOptions.paymentUrl && showSquadPayment && (
          <View
            style={{
              position: "absolute",
              zIndex: 10000,
              top: 0,
              flex: 1,
              height: deviceHeight,
              width: deivceWidth,

              backgroundColor: "#fff",
            }}
          >
            {isWebViewLoading && (
              <View
                style={{
                  marginTop: fontsConstants.h(100),
                }}
              >
                <ActivityIndicator size="small" />
              </View>
            )}
            {
              <WebView
                originWhitelist={["*"]}
                source={{
                  uri: paymentOptions.paymentUrl,
                }}
                onLoadEnd={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  setIsWebViewLoading(nativeEvent.loading);
                }}
                onNavigationStateChange={(navState) => {
                  const { url } = navState;
                  if (
                    url?.includes(paymentData.referenceId.toString()) &&
                    url.includes("?reference=")
                  ) {
                    handleVerifySquadPaymentStatus();
                  }
                }}
                style={{ flex: 1 }}
              />
            }

            <DefaultButton
              title={`Cancel payment`}
              onPress={() => {
                setShowSquad(false);
              }}
              containerStyle={{
                marginHorizontal: fontsConstants.h(10),
                position: "absolute",
                bottom: fontsConstants.h(20),
                width: "90%",
              }}
            >
              Cancel payment
            </DefaultButton>
          </View>
        )}
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={user.email}
          billingName={`${user.firstName || ""} ${user.lastName || ""}`}
          amount={`${paymentData?.amountExpected.toFixed(2)}`}
          firstName={user.firstName || ""}
          lastName={user.lastName || ""}
          phone={user.phoneNumber || ""}
          activityIndicatorColor={colorsConstants.colorPrimary}
          refNumber={paymentRefNumber}
          channels={PAYMENT_OPTIONS}
          onCancel={(e) => {
            // handle response here
            showToast({
              title: `Payment`,
              type: `info`,
              message: `Payment cancelled`,
            });
          }}
          onSuccess={async (res) => {
            setPaymentRes(res);
            res?.status === "success"
              ? alertRef.current?.open()
              : showToast({
                  title: `Payment`,
                  message: `Payment Failed`,
                  type: `error`,
                });
            paymentRes?.transactionRef?.trxref;
          }}
          //@ts-ignore
          ref={paystackWebViewRef}
        />
        <AlertModal
          modalRef={alertRef}
          modalStyle={{
            paddingTop: fontsConstants.h(70),
          }}
          buttonContainerStyle={{
            marginTop: fontsConstants.h(80),
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
                  fileName: `MPM-RENT-TNX${
                    paymentRes?.transactionRef?.trxref
                  }-${moment(new Date()).format("DD/MM/YYYY hh:mm a")}`,
                  format: "jpg",
                }}
              >
                <Text
                  style={{
                    fontSize: fontsConstants.h(30),
                    fontFamily: fontsConstants.Lora_Bold,
                    textAlign: "center",
                  }}
                >
                  {`Payment Successful`}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: fontsConstants.h(50),
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#777779",
                      fontFamily: fontsConstants.Roboto_Regular,
                      fontSize: fontsConstants.h(15),
                    }}
                  >
                    {`You have successfully paid rent to`}
                  </Text>
                  <Icon
                    name="person-circle"
                    type="ionicon"
                    size={fontsConstants.h(50)}
                    containerStyle={{ marginVertical: fontsConstants.h(10) }}
                  />
                  <Text
                    style={{
                      fontFamily: fontsConstants.Roboto_Medium,
                      fontSize: fontsConstants.h(18),
                      color: colorsConstants[theme].screenLabel,
                    }}
                  >
                    {landlordName || "MPM"}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontsConstants.Roboto_Medium,
                      fontSize: fontsConstants.h(28),
                      color: colorsConstants[theme].text,
                      marginBottom: fontsConstants.h(30),
                    }}
                  >{`${currencySymbol["ngn"]}${formatCurrency(
                    paymentData?.amountExpected || 0
                  )}`}</Text>
                  {[
                    {
                      //   id: 1,
                      //   label: 'Source',
                      //   value: 'Card **** **** **** 7786'
                      // }, {
                      id: 2,
                      label: "Transaction ID:",
                      value: `TNX${paymentRes?.transactionRef?.trxref}`,
                    },
                    {
                      id: 3,
                      label: "Reference:",
                      value: `MPM/RENT/${paymentRes?.transactionRef?.trxref}`,
                    },
                    {
                      id: 4,
                      label: "Date / Time:",
                      value: moment(new Date()).format("DD/MM/YYYY hh:mm a"),
                    },
                  ].map((item, index) => (
                    <View
                      style={[
                        styles.itemViewContainer,
                        {
                          borderColor: colorsConstants[theme].borderLine,
                        },
                      ]}
                      key={index.toString()}
                    >
                      <Text
                        style={[
                          styles.summaryText,
                          {
                            minWidth: fontsConstants.w(100),
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item?.value ? (
                        <Text
                          style={[
                            styles.summaryText,
                            {
                              flex: 1,
                              textAlign: "right",
                            },
                          ]}
                        >
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
  },
  chargeText: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(13),
  },
  summaryText: {
    fontFamily: fontsConstants.Roboto_Medium,
    fontSize: fontsConstants.h(14),
    opacity: 0.6,
  },
  inputContainerStyle: { marginBottom: fontsConstants.h(20) },
  itemViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: fontsConstants.h(1),
    paddingVertical: fontsConstants.h(15),
    marginHorizontal: fontsConstants.w(10),
    alignSelf: "flex-start",
  },
});
