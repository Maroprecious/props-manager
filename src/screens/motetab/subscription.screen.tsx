import * as React from "react";
import { useContext, useRef, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxHooks";
import { formatCurrency, formatCurrencyShort } from "src/utils/FormatNumber";
import colorsConstants from "src/constants/colors.constants";
import { currencySymbol } from "src/constants/currencies.constants";
import { Icon } from "react-native-elements";
import SecureStoreManager from "src/utils/SecureStoreManager";
import { showConfirm } from "src/components/modals/confirm.modals";
import { DefaultSelectInput } from "src/components/inputs/inputs.components";
import useSubscriptions from "src/hooks/useSubscriptions";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { Modalize } from "react-native-modalize";
import ViewShot from "react-native-view-shot";
import { showToast } from "src/components/Toast";
import { PAYSTACK_PUBLIC_KEY } from "@env";
import { PAYMENT_OPTIONS } from "src/constants";
import { AlertModal } from "src/components/modals/alert.modals";
import moment from "moment";
import useUser from "src/hooks/useUser";
import { updateUserProfileData } from "src/services/redux/slices/auth";

export default function SubScriptionScreen({
  navigation,
  route
}: RootStackScreenProps<"SubScriptionScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch();

  const { useInitiatePayment, loading: initiatingPayment } = useSubscriptions();
  const { useGetProfile, loading: gettingUser} = useUser();
  const activePlan = user?.currentSubscriptionMethodDetails?.id || -1;
  const [ selectedPlan, setSelectedPlan ] = useState(-1)
  const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState("")
  const [ plans, setPlans ] = useState<any[]>([]);
  const [paymentData, setPaymentData] = useState({
    amountExpected: 0,
    referenceId: "",
  });
  const [paymentRes, setPaymentRes] = useState<{
    transactionRef?: any;
    status: string;
    data?: any;
  }>({ transactionRef: {}, data: {}, status: "" });
  const [ paymentOptions, setPaymentOptions ] = useState<{label: string, value: string}[]>([]);
  const alertRef = useRef<Modalize>(null);
  const viewShotRef = useRef<ViewShot>(null);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(null);

  const [isUpgrade, setIsUpgrade] = useState(false);

  React.useEffect(() => {
    setIsUpgrade(selectedPlan > plans.findIndex((item: any) => item.id === activePlan))
  }, [selectedPlan, activePlan])

  React.useEffect(() => {
    SecureStoreManager.getSubscriptionPlans().then((res) => {
      const _plans = JSON.parse(res || `[]`) 
      setPlans(_plans)
      setSelectedPlan(_plans.findIndex((item: any) => item.id === activePlan))
    }).catch((e) => {
      console.log(e)
    })
    SecureStoreManager.getAppPaymentOptions().then((res) => {
      const options = JSON.parse(res || `[]`);
      const _options: {label: string, value: string}[] = []
      options.map((option: any) => {
        _options.push({
          label: option?.paymentMethod,
          value: option?.paymentMethod
        })
      })
      setPaymentOptions(_options)
      setSelectedPaymentMethod(_options[0]?.value)
    }).catch((e) => {
      console.log(e)
    })
  }, [])
  
  const initiatePurchase = async () => {
    const paymentDetails = await useInitiatePayment({
      paymentMethod: selectedPaymentMethod,
      subscriptionMethodId: plans[selectedPlan]?.id,
      userId: user?.id || "-1"
    })
    if (paymentDetails?.status === 200 && paymentDetails?.hasError === false && paymentDetails?.data?.message?.referenceId) {
      setPaymentData(paymentDetails?.data?.message || {})
      //@ts-ignore
      if (Number(paymentDetails?.data?.message?.amountExpected) <= 0) 
        doFinish(false)
      else 
        paystackWebViewRef?.current?.startTransaction();
    } else showToast({
            message: `${paymentDetails?.message || paymentDetails?.data?.message || 'Unknown error has occured!'}`
          })
  }

  const doContinue = () => {
    showConfirm({
      message: `Would you like to ${isUpgrade ? 'upgrade' : 'downgrade'} your subscription to ${plans[selectedPlan]?.subscriptionMethodName}`,
      title: `Subscription`,
      type: `info`,
      onConfirm: initiatePurchase
    })
  }

  const doFinish = async (isPaid: boolean) => {
    dispatch(updateUserProfileData({
      ...user,
      currentSubscriptionMethodDetails: {
        ...plans[selectedPlan],
      },
      subscribed: isPaid,
      subscriptionExpired: !isPaid,
      nextSubscriptionDueDate: isPaid ? `${moment().add(1, "month").toDate()}` : null
    }));  
    showConfirm({
      message: `You have successfully ${isUpgrade ? 'upgraded' : 'downgraded'} your subscription to ${plans[selectedPlan]?.subscriptionMethodName}`,
      title: `Subscription`,
      type: isPaid ? `success` : `info`,
      onConfirm: initiatePurchase
    })
    navigation.goBack()
    // useGetProfile(user?.id || "-1").then((res) => {
    //   if (res?.status === 200) {
        
    //   }
    // }).finally(() => {
    //   navigation.goBack()
    // })
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
          title={`Choose Your Plan`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        {plans.map((plan: any, index) => (
          <TouchableOpacity style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: index === selectedPlan ? `rgba(0, 65, 160, 0.3)` : undefined,
            borderRadius: fontsConstants.w(10),
            padding: fontsConstants.w(15),
            borderWidth: index !== selectedPlan ? fontsConstants.h(1) : undefined,
            marginBottom: fontsConstants.h(10)
          }} activeOpacity={layoutsConstants.activeOpacity}
            key={index.toString()}
            onPress={() => setSelectedPlan(index)}
          >
            <View style={{
              flex: 1,
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Text style={{
                  fontFamily: fontsConstants.Roboto_Bold,
                  fontSize: fontsConstants.h(16)
                }}>
                  {`${plan?.subscriptionMethodName || "Plan Name"}`}
                </Text>
                {plan?.subscriptionMethodName !== "Basic" && 
                <View style={{
                  marginLeft: fontsConstants.w(5),
                  backgroundColor: colorsConstants.colorPrimary,
                  paddingVertical: fontsConstants.w(2),
                  paddingHorizontal: fontsConstants.w(10),
                  borderRadius: fontsConstants.w(10)
                }}>
                  <Text style={{
                    fontSize: fontsConstants.h(10),
                    color: colorsConstants.colorWhite
                  }}>
                    {plan?.subscriptionMethodName === "Gold" ? 
                      `Most Popular`
                      : `Ideal`
                    }
                  </Text>
                </View>}
              </View>
              <Text style={{
                fontSize: fontsConstants.h(12),
                textDecorationLine: "underline"
              }}>{`Units`}</Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Icon
                  name="ellipse"
                  type="ionicon"
                  size={fontsConstants.h(5)}
                />
                <Text style={{
                  fontSize: fontsConstants.h(12)
                }}>
                  {` ${plan?.lowerBound} Minimum`}
                </Text>
              </View>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                <Icon
                  name="ellipse"
                  type="ionicon"
                  size={fontsConstants.h(5)}
                />
                <Text style={{
                  fontSize: fontsConstants.h(12)
                }}>
                  {` ${plan?.upperBound} Maximum`}
                </Text>
              </View>
            </View>
            <View style={{
              marginLeft: fontsConstants.w(30),
              alignItems: "center"
            }}>
              <Text style={{
                fontFamily: fontsConstants.American_Typewriter_Bold,
                fontSize: fontsConstants.h(20)
              }}>
                {`${currencySymbol['ngn']}${formatCurrencyShort(plan?.subscriptionPrice || 0)}`}
              </Text>
              <Text style={{
                fontSize: fontsConstants.h(12)
              }}>
                {`Yearly`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {selectedPlan > 0 && (
          <DefaultSelectInput
            label="Select Payment Method"
            labelStyle={{
              fontSize: fontsConstants.h(12)
            }}
            wrapperStyle={{
              marginTop: fontsConstants.h(20),
              zIndex: 2
            }}
            items={paymentOptions}
            value={selectedPaymentMethod}
            onChangeValue={(v: string) => setSelectedPaymentMethod(v)}
          />
        )}
        <DefaultButton
          title={selectedPlan > 0 ? `Continue to Purchase` : `Downgrade to Basic`}
          onPress={doContinue}
          loading={initiatingPayment || gettingUser}
          disabled={selectedPlan < 0 || selectedPlan === plans.findIndex((item: any) => item.id === activePlan)}
          containerStyle={{
            marginTop: fontsConstants.h(20)
          }}
        />
      </ImageBackground>
      <Paystack
        paystackKey={PAYSTACK_PUBLIC_KEY}
        billingEmail={user.email}
        billingName={`${user.firstName || ""} ${user.lastName || ""}`}
        amount={`${paymentData?.amountExpected.toFixed(2)}`}
        firstName={user.firstName || ""}
        lastName={user.lastName || ""}
        phone={user.phoneNumber || ""}
        activityIndicatorColor={colorsConstants.colorPrimary}
        refNumber={paymentData?.referenceId}
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
        title={`Subscription`}
        buttonTitle="Finish"
        type={undefined}
        onButtonPress={() => {
          alertRef?.current?.close();
          doFinish(true)
        }}
        body={
          <View>
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
                {`You have successfully ${isUpgrade ? 'upgraded' : 'downgraded'} to ${plans[selectedPlan]?.subscriptionMethodName}`}
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
                  value: `MPM/SUB/${paymentRes?.transactionRef?.trxref}`,
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
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {marginBottom: fontsConstants.h(45)},
  chargeText: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(13),
  },
  summaryText: {
    fontFamily: fontsConstants.Roboto_Medium,
    fontSize: fontsConstants.h(14),
    opacity: 0.6,
  },
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
