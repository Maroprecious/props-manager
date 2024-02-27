import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Layout from "src/components/layout/layout";
import { ScrollView } from "src/components/Themed";
import { View as RNView } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Input } from "src/components/inputs/input-box";
import { useFormik } from "formik";
import { InputAddress } from "src/components/inputs/address-input";
import { Select } from "src/components/select/select";
import { optionProps } from "src/components/select/select";
import { DatePicker } from "src/components/inputs/date-picker/date-picker";
import { CurrencyPicker } from "src/components/inputs/currency-picker/currency-picker";
import { DefaultButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { Success } from "src/components/modals/alert.modals";
import { AddTenancyValidationSchema } from "src/utils/schema";
import { RootStackScreenProps } from "src/types/navigations.types";
import { Modalize } from "react-native-modalize";
import styles from "./styles/add-tenancy-details.styles";
import useColorScheme from "src/hooks/useColorScheme";
import colorsConstants from "src/constants/colors.constants";

const options: optionProps[] = [
  {
    label: "Occupying as tenant",
    value: "2",
  },
  {
    label: "Registering as owner",
    value: "3",
  },
  {
    label: "Registering as manager or caretaker",
    value: "4",
  },
];

export default function AddTenancyDetails({
  navigation,
  route,
}: RootStackScreenProps<"AddTenancyDetails">) {
  const theme = useColorScheme();

  const [visible, setVisible] = useState<boolean>(false);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: {
      address: "",
      status: "",
      rent: "",
      landlords_name: "",
      landlords_mobile: "",
      property_type: "",
      unit_type: "",
      block: "",
      duration: "",
    },
    validationSchema: AddTenancyValidationSchema,
    onSubmit: async (values) => {
      setVisible(true);
    },
  });

  useEffect(() => {
    setFieldValue("status", options[0].value);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView>
        {visible && (
          <Success
            visible={visible}
            setVisible={setVisible}
            text1="Tenancy Details Added"
            text2="Great! You have successfully added your tenancy details. You can invite your landlord or neighbours to our online community."
            feedback={
              <RNView style={styles.buttons}>
                <DefaultButton
                  title={`Invite Others `}
                  type="outline"
                  style={styles.button}
                  onPress={() => navigation.navigate("InviteScreen")}
                >
                  Invite Others
                </DefaultButton>
                <DefaultButton
                  title={`Go to Dashboard`}
                  style={styles.button}
                  onPress={() => {
                    setVisible(false);

                    if (Platform.OS == "ios") {
                      setTimeout(() => {
                        navigation.navigate("App");
                      }, 200);
                    } else {
                      navigation.navigate("App");
                    }
                  }}
                ></DefaultButton>
              </RNView>
            }
          />
        )}
        <Layout goback={true} title="Add Tenancy Details">
          <RNView style={styles.container}>
            <RNView style={styles.input}>
              <InputAddress
                onChange={handleChange("address")}
                onBlur={handleBlur("address")}
                placeholder="Enter Property Address"
                err={!!errors.address && touched.address}
                errMsg={errors.address}
              />
            </RNView>
            <RNView style={styles.select_Container}>
              <Select
                options={options}
                placeholder="Select Occupational Status"
                onChange={(e) => setFieldValue("status", e.value)}
                err={!!errors.status && touched.status}
                errMsg={errors.status}
                containerWidth="94%"
                fontFamily={fontsConstants.Lora_Regular}
                bgColor="rgba(200, 200, 201, 0.2)"
                defaultValue={options[0].value}
                textstyle={styles.error1}
              />
            </RNView>
            <RNView style={styles.select_Container1}>
              <RNView style={styles.selectOption}>
                <Select
                  options={options}
                  placeholder="Property Type"
                  dynamicPlaceholder="Property Type"
                  onChange={(e) => setFieldValue("property_type", e.value)}
                  err={!!errors.property_type && touched.property_type}
                  errMsg={errors.property_type}
                  containerWidth="94%"
                  fontFamily={fontsConstants.Lora_Regular}
                  bgColor="rgba(200, 200, 201, 0.2)"
                  textstyle={styles.error1}
                />
              </RNView>
              <RNView style={styles.selectOption}>
                <Select
                  options={options}
                  placeholder="Unit Type"
                  dynamicPlaceholder="Unit Type"
                  onChange={(e) => setFieldValue("unit_type", e.value)}
                  err={!!errors.unit_type && touched.unit_type}
                  errMsg={errors.unit_type}
                  containerWidth="94%"
                  fontFamily={fontsConstants.Lora_Regular}
                  bgColor="rgba(200, 200, 201, 0.2)"
                  textstyle={styles.error1}
                />
              </RNView>
              <RNView style={styles.selectOption}>
                <Select
                  options={options}
                  placeholder="Select block/flat number"
                  dynamicPlaceholder="Select block/flat number"
                  onChange={(e) => setFieldValue("block", e.value)}
                  err={!!errors.block && touched.block}
                  errMsg={errors.block}
                  containerWidth="94%"
                  fontFamily={fontsConstants.Lora_Regular}
                  bgColor="rgba(200, 200, 201, 0.2)"
                  textstyle={styles.error1}
                />
              </RNView>
              <RNView style={styles.selectOption}>
                <Select
                  options={options}
                  placeholder="Select tenancy duration"
                  dynamicPlaceholder="Select tenancy duration"
                  onChange={(e) => setFieldValue("duration", e.value)}
                  err={!!errors.duration && touched.duration}
                  errMsg={errors.duration}
                  containerWidth="94%"
                  fontFamily={fontsConstants.Lora_Regular}
                  bgColor="rgba(200, 200, 201, 0.2)"
                  textstyle={styles.error1}
                />
              </RNView>
              <RNView style={styles.selectDate}>
                <DatePicker placeholder="Living here since? DD/MM/YYYY" />
              </RNView>
              <RNView style={styles.selectDate1}>
                <DatePicker placeholder="Last rent payment date? DD/MM/YYYY" />
              </RNView>
              <RNView style={styles.selectDate1}>
                <CurrencyPicker
                  onChange={handleChange("rent")}
                  onBlur={handleBlur("rent")}
                  placeholder="Enter rent amount"
                  err={!!errors.rent && touched.rent}
                  errMsg={errors.rent}
                  otherProps={{
                    keyboardType: "number-pad",
                  }}
                />
              </RNView>
              <RNView style={styles.input}>
                <Input
                  onChange={handleChange("landlords_name")}
                  onBlur={handleBlur("landlords_name")}
                  placeholder="Landlord's name"
                  err={!!errors.landlords_name && touched.landlords_name}
                  errMsg={errors.landlords_name}
                  containerWidth="94%"
                  extrastyles={[
                    styles.text_input,
                    { color: colorsConstants[theme].textBlack },
                  ]}
                  textstyle={styles.error}
                />
              </RNView>
              <RNView style={styles.input2}>
                <Input
                  onChange={handleChange("landlords_mobile")}
                  onBlur={handleBlur("landlords_mobile")}
                  placeholder="Landlord's Mobile Number"
                  err={!!errors.landlords_mobile && touched.landlords_mobile}
                  errMsg={errors.landlords_mobile}
                  containerWidth="94%"
                  extrastyles={styles.text_input}
                  textstyle={styles.error}
                  otherProps={{
                    keyboardType: "number-pad",
                    returnKeyLabel: "done",
                  }}
                />
              </RNView>
            </RNView>
            <RNView style={styles.buttonContainer}>
              <DefaultButton
                title={`Submit`}
                onPress={() => handleSubmit()}
                disabled={!isValid}
                style={{ marginHorizontal: 10 }}
              />
            </RNView>
          </RNView>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
