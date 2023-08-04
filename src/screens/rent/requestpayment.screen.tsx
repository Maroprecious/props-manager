import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { PaymentRequestTypes } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { currencyToString, formatCurrency } from "src/utils/FormatNumber";
import colorsConstants from "src/constants/colors.constants";
import { DefaultInput, DefaultSelectInput } from "src/components/inputs/inputs.components";

export default function RequestPaymentScreen({
  navigation,
  route
}: RootStackScreenProps<"RequestPaymentScreen">) {
  const theme = useContext(AppThemeContext);
  const [amount, setAmount] = useState('0.00')
  const [recipientEmail, setRecipientEmail] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [comment, setComment] = useState("")
  const [purpose, setPurpose] = useState("")

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{minHeight: "100%"}}
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
          title={`Request Payment`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <DefaultSelectInput
          items={PaymentRequestTypes}
          value={purpose}
          setValue={setPurpose}
          placeholder="Kindly select"
          label="Payment Purpose"
          containerStyle={{marginBottom: fontsConstants.h(20), maxHeight: fontsConstants.h(350)}}
          wrapperStyle={{zIndex: 10}}
          dropDownDirection="BOTTOM"      
        />
        <DefaultInput
          label={`Amount`}
          leftIcon={
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(25),
              color: colorsConstants[theme].darkText,
              marginLeft: fontsConstants.w(20)
            }}>{`₦`}</Text>
          }
          keyboardType="number-pad"
          value={amount}
          onChangeText={(v: string) => setAmount(v)}
          onFocus={(e: any) => {
            setAmount(currencyToString(amount))
          }}
          onBlur={(e: any) => {
            setAmount(formatCurrency(Number(amount)))
          }}
          inputStyle={{
            textAlign: "center",
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(25),
            color: colorsConstants[theme].darkText,
            marginLeft: fontsConstants.w(-20)
          }}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Recipient's Name`}
          value={recipientName}
          onChangeText={(v: string) => setRecipientName(v)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Recipient's Email`}
          value={recipientEmail}
          keyboardType="email-address"
          onChangeText={(v: string) => setRecipientEmail(v)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Comment`}
          value={comment}
          onChangeText={(v: string) => setComment(v)}
          multiline
          numberOfLines={2}
          inputHeight={fontsConstants.h(90)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultButton
          title={`Next`}
          disabled={Number(amount) === 0 || amount === ""}
          onPress={() => navigation.navigate("ConfirmRequestPaymentScreen", {
            amount: Number(amount.replace(",","")),
            recipient: {
              email: recipientEmail,
              name: recipientName
            },
            purpose,
            comment
          })}
          containerStyle={{
            marginTop: fontsConstants.h(20),
            marginHorizontal: fontsConstants.w(20)
          }}
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
  },
  inputContainerStyle: {marginBottom: fontsConstants.h(50)}
});
