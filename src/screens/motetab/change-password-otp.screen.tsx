import * as React from "react";
import { Text, ScrollView } from "src/components/Themed";
import { StyleSheet, View as RNView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import Layout from "src/components/layout/layout";
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';;
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ChangePasswordSchema } from "src/utils/schema";
import { DefaultButton } from "src/components/buttons/buttons.components";
import OtpInput from "src/components/inputs/otpinputs.components";
import { Success } from "src/components/modals/alert.modals";

export default function ChangePasswordOtpScreen({
    navigation,
    route
}: RootStackScreenProps<"ChangePasswordOtpScreen">) {
    const theme = useColorScheme()
    const [value, setValue] = useState(false)
    const [visible, setVisible] = useState<boolean>(false)

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
            new_password: '',
            confirm_password: ''
        },
        validationSchema: ChangePasswordSchema,
        onSubmit: async (values) => {
            setVisible(true)
        },
    });

    useEffect(() => {
        // setFieldValue('status', options[0].value)
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={{ height: '100%' }}>

            <Layout goback={false} title='Change Password' textstyle={{ marginTop: 80 }}>
                <RNView style={styles.container}>
                    <RNView style={styles.title}>
                        <Text style={[{ color: colorsConstants[theme].titleText }, styles.titleText]}>Please enter the password reset PIN sent to your email ID.</Text>
                    </RNView>
                    <OtpInput
                        value="2501"
                        boxCount={4}
                        textStyle={{ fontSize: Platform.OS === 'ios' ? 22 : 18, color: colorsConstants[theme].otptext, fontFamily: fontsConstants.Lato_Bold }}
                        inputStyle={{ width: Platform.OS === 'ios' ? 80 : 60, height: Platform.OS === 'ios' ? 80 : 60, alignItems: 'center' }}
                        containerStyle={{
                            marginBottom: fontsConstants.h(20)

                        }}
                        
                    />
                    <RNView style={styles.button_container}>
                        <DefaultButton
                            title={`Confirm`}
                            onPress={() => setVisible(true)}
                            titleStyle={{ fontSize: 20 }}
                        />

                    </RNView>
                    <RNView style={styles.button_container}>
                        <DefaultButton
                            type="outline"
                            buttonStyle={{ borderWidth: 1, borderColor: colorsConstants.criticalRed }}
                            title={`Cancel`}
                            onPress={() => navigation.goBack()}
                            titleStyle={{ fontSize: 20, color: colorsConstants.criticalRed}}
                        />

                    </RNView>
                </RNView>
            </Layout>
            {visible &&
                    <Success
                        visible={visible}
                        setVisible={setVisible}
                        textStyle={{width: '80%'}}
                        text1='Password Changed'
                        text2='You have successfully changed your password.'
                        text3="Please keep your new password safe as you will require it regularly to access your MPM account."
                        feedback={
                            <RNView style={styles.button}>
                                <DefaultButton title={`Finish`}  style={styles.button} onPress={() => {
                                    setVisible(false)

                                    if (Platform.OS == 'ios') {
                                        setTimeout(() => {
                                            navigation.navigate('App')
                                        }, 200);
                                    } else {
                                        navigation.navigate('App')
                                    }

                                }}></DefaultButton>
                            </RNView>
                        }
                    />
                }
        </KeyboardAvoidingView>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        width: '70%',
        alignSelf: 'center'
    },
    button_container: {
        width: '90%',
        marginTop: 30,
    },
    button: {
        alignSelf: 'center',
        width: '84%',
        backgroundColor: 'transparent'
    },
})