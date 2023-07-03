import * as React from "react";
import { Text } from "src/components/Themed";
import { StyleSheet, View as RNView, TouchableOpacity,ScrollView,  KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import Layout from "src/components/layout/layout";
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import { useState, useEffect } from "react";
import { Input } from "src/components/inputs/input-box";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "src/utils/schema";
import { DefaultButton } from "src/components/buttons/buttons.components";
import ChangePasswordOtpScreen from "./change-password-otp.screen";

export default function ChangePasswordScreen({
    navigation,
    route
}: RootStackScreenProps<"ChangePasswordScreen">) {
    const theme = useColorScheme()
    const [value, setValue] = useState(false)

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        isValid
    } = useFormik({
        initialValues: {
            old_password: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values) => {
            navigation.navigate('ChangePasswordOtpScreen')
        },
    });

    useEffect(() => {
        // setFieldValue('status', options[0].value)
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} >
                <Layout goback={true}>
                    <ScrollView>
                        <Text style={styles.header}>Change Password</Text>
                    <RNView style={styles.container}>
                        <RNView style={styles.title}>
                            <Text style={[{ color: colorsConstants[theme].titleText }, styles.titleText]}>Please enter your old password and select new password to effect password change..</Text>
                        </RNView>
                        <RNView style={styles.inputBox}>
                            <Input
                                onChange={handleChange("old_password")}
                                onBlur={handleBlur("old_password")}
                                placeholder="Enter Old Password"
                                err={!!errors.old_password && touched.old_password}
                                errMsg={errors.old_password}
                                containerWidth='94%'
                                extrastyles={[styles.text_input, { color: colorsConstants[theme].darkText, alignSelf: 'center' }]}
                                textstyle={styles.error} />
                        </RNView>
                        <RNView style={styles.inputBox}>
                            <Input
                                onChange={handleChange("password")}
                                onBlur={handleBlur("password")}
                                placeholder="Enter New Password"
                                err={!!errors.password && touched.password}
                                errMsg={errors.password}
                                containerWidth='94%'
                                extrastyles={[styles.text_input, { color: colorsConstants[theme].darkText, alignSelf: 'center' }]}
                                textstyle={styles.error} />
                        </RNView>
                        <RNView style={styles.inputBox}>
                            <Input
                                onChange={handleChange("confirm_password")}
                                onBlur={handleBlur("confirm_password")}
                                placeholder="Confirm New password"
                                err={!!errors.confirm_password && touched.confirm_password}
                                errMsg={errors.confirm_password}
                                containerWidth='94%'
                                extrastyles={[styles.text_input, { color: colorsConstants[theme].darkText }]}
                                textstyle={styles.error} />
                        </RNView>
                        <RNView style={styles.button_container}>
                            <DefaultButton
                                title={`Change Password`}
                                onPress={() => handleSubmit()}
                                disabled={!isValid}
                                titleStyle={{ fontSize: Platform.OS === 'android' ? 17 : 20 }}
                            />
                        </RNView>
                    </RNView>
                    </ScrollView>
                </Layout>
        </KeyboardAvoidingView>

    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: '100%',
        paddingBottom: 20
    },
    text_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25
    },
    text: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 16
    },
    titleText: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'center',
    },
    title: {
        width: Platform.OS === 'android' ? '75%' : '70%',
        alignSelf: 'center',
        paddingBottom: 20
    },
    text_input: {
        marginLeft: 20,
        fontSize: Platform.OS === 'android' ? 13 : 14,
        backgroundColor: colorsConstants.light.lighterGrey,
        alignSelf: 'center',
        fontFamily: fontsConstants.American_Typewriter_Regular
    },
    error: {
        width: '97%',
        marginLeft: '3%'
    },
    inputBox: {
        width: '95%',
        alignSelf: 'center',
    },
    button_container: {
        width: '90%',
        marginTop: 30,
    },
    header:{
        fontSize: 27,
        fontFamily: fontsConstants.Lora_Bold,
        textAlign: 'center'
    }
})