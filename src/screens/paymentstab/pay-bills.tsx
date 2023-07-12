import React from "react";
import { ImageBackground, StyleSheet, View as RNView, Platform, KeyboardAvoidingView, Dimensions } from "react-native";
import { SafeAreaView, Text, ScrollView } from "src/components/Themed";
import useColorScheme from "src/hooks/useColorScheme";
import { RootStackScreenProps } from "src/types/navigations.types";
import Layout from "src/components/layout/layout";
import { Input, InputBox } from "src/components/inputs/input-box";
import * as Yup from 'yup'
import { useState } from 'react';
import { formatNumber } from "src/utils/FormatNumber";
import { useFormik } from 'formik';
import colorsConstants from 'src/constants/colors.constants';
import { SelectBar } from 'src/components/select/search';
import { LineInput } from "src/components/inputs/line-input";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import { PaymentSuccessful } from "src/components/modals/payment-success";
import fontsConstants from "src/constants/fonts.constants";

const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Enter an amount'),
    biller: Yup.string().required('Select a biller'),
    service: Yup.string().required('Select a service'),
    meter_name: Yup.string().required('Enter meter reg name'),
    meter_number: Yup.string().required('Enter meter number'),
    narration: Yup.string().required('Enter narration'),
    // bank_names: Yup.string().required('Select a bank'),
    // acct_nos: Yup.string().required('Enter account number'),
    // landlord_names: Yup.string().required("Enter Landlord's number"),

})

const billers = [
    {
        label: 'IKEDC',
        value: "2"
    },
    {
        label: 'IBDC',
        value: "3"
    },
    {
        label: 'EEDC',
        value: "4"
    },
    {
        label: 'ABDC',
        value: "5"
    },
]
const services = [
    {
        label: 'water',
        value: "2"
    },
    {
        label: 'light',
        value: "3"
    },
    {
        label: 'power',
        value: "4"
    },
]
export default function PayBillsScreen({
    navigation,
    route
}: RootStackScreenProps<"PayBillsScreen">) {
    const theme = useColorScheme();

    const [visible, setVisible] = useState<boolean>(false)
    const [isvisible, setIsVisible] = useState<boolean>(false)
    const [showReceipt, setShowReceipt] = useState<boolean>(false)
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        values,
        isValid
    } = useFormik({
        initialValues: {
            biller: '',
            amount: '',
            service: '',
            meter_name: '',
            meter_number: '',
            bank_names: "",
            acct_nos: "",
            landlord_names: "",
            narration: ''
        },
        validationSchema,
        onSubmit: async (values) => {

            setShowReceipt(true)
        },
    });
    console.log(errors)

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                {
                    <PaymentSuccessful
                        visible={showReceipt}
                        setVisible={setShowReceipt}
                        title='Payment Successful'
                        source='Card **** **** **** 7786'
                        transaction_id='TXN8890452GT02'
                        reference='MPM/RENT/676012'
                        date='23 / 05 / 2023 : 08:46 am'
                        name='IKEDC'
                        amount={formatNumber(1000).concat('.00')}
                        success_message='You have successfully paid bill to'
                        recharge='58951 99902 78740 88743 9980' />
                }
                <Layout title='Pay Bills' goback={true}>
                    <RNView style={styles.container}>
                        <Text style={styles.title}>
                            Amount
                        </Text>
                        <InputBox
                            onChange={handleChange("amount")}
                            onBlur={handleBlur("amount")}
                            otherProps={{
                                placeholderTextColor: colorsConstants[theme].shadowText,
                                keyboardType: 'number-pad',
                                value: formatNumber(values.amount)

                            }}
                            err={!!errors.amount && touched.amount}
                            errMsg={errors.amount}
                            containerWidth='99%'
                            textstyle={{ marginBottom: -3, }}
                            extrastyles={{ fontFamily: fontsConstants.Lora_Regular, color: colorsConstants[theme].darkText }}
                        />
                        <SelectBar
                            options={billers}
                            searchPlaceholder='Search biller'
                            placeholder='Kindly select your biller'
                            onChange={(e) => setFieldValue('biller', e.value)}
                            err={!!errors.biller && touched.biller}
                            errMsg={errors.biller}
                            textstyle={{ marginBottom: -3 }}
                        />
                        {values.biller && <>
                            <SelectBar
                                extraStyles={{ marginTop: -25 }}
                                searchPlaceholder='Search service'
                                placeholder='Select Service'
                                placestyle={{ fontFamily: fontsConstants.Lora_Bold, color: 'rgba(6, 24, 37, 0.40)' }}
                                options={services}
                                onChange={(e) => setFieldValue('service', e.value)}
                                err={!!errors.service && touched.service}
                                errMsg={errors.service}
                                textstyle={{ marginBottom: -3 }}
                            />

                            <LineInput
                                onChange={handleChange("meter_name")}
                                onBlur={handleBlur("meter_name")}
                                extrastyles={{ marginTop: -25 }}
                                placeholder='Enter Meter Reg Name'
                                err={!!errors.meter_name && touched.meter_name}
                                errMsg={errors.meter_name}
                                textstyle={{ marginBottom: -3 }}
                            />

                            <LineInput
                                onChange={handleChange("meter_number")}
                                onBlur={handleBlur("meter_number")}
                                placeholder='Enter Meter Number'
                                otherProps={{
                                    keyboardType: 'number-pad'
                                }}
                                err={!!errors.meter_number && touched.meter_number}
                                errMsg={errors.meter_number}
                            />

                            <LineInput
                                onChange={handleChange("narration")}
                                onBlur={handleBlur("narration")}
                                placeholder='Narration'
                            />
                        </>

                        }

                        <DefaultButton
                            title={
                                values.biller ? 'Pay' : 'Next'
                            }
                            containerStyle={{
                                width: '90%',
                                alignSelf: 'center',
                                position: 'absolute',
                                bottom: Platform.OS === 'android' ? 150 : 250
                        
                            }}
                            disabled={values.biller ? false : true}
                            onPress={() => {

                                handleSubmit()

                            }}>

                        </DefaultButton>

                    </RNView>

                </Layout>

            </ScrollView>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '90%',
        alignSelf: 'center',

    },
    container: {
        width: '100%',
        alignSelf: 'center',
        height: Dimensions.get('window').height,
    },
    title: {
        fontFamily: fontsConstants.Lora_Regular,
        paddingLeft: '10%',
        marginBottom: -10,
        marginTop: 20
    }
})
