import * as React from "react";
import { Text } from "src/components/Themed";
import { StyleSheet, View as RNView, TouchableOpacity, } from "react-native";
import Layout from "src/components/layout/layout";
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import { useState } from "react";

export default function Setup2faScreen({
    navigation,
    route
}: RootStackScreenProps<"Setup2faScreen">) {
    const theme = useColorScheme()
    const [value, setValue] = useState(false)
    return (
        <Layout goback={true} title='Setup 2FA'>
            <RNView style={styles.container}>
                <RNView>
                    <TouchableOpacity onPress={() => navigation.navigate('VerifyWithMobile')}>
                        <RNView style={styles.text_container}>
                            <Text style={[styles.text, { color: colorsConstants[theme].socialText }]}>Verify with mobile Number</Text>
                            <AntDesign name="right" size={16} color={colorsConstants[theme].borderLine} />
                        </RNView>
                    </TouchableOpacity>
                    <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.3 }}></RNView>
                    <TouchableOpacity onPress={() => navigation.navigate('VerifyWithEmail')}>
                        <RNView style={styles.text_container}>
                            <Text style={[styles.text, { color: colorsConstants[theme].socialText }]}>Verify with email</Text>
                            <AntDesign name="right" size={16} color={colorsConstants[theme].borderLine} />
                        </RNView>
                    </TouchableOpacity>
                    <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.3 }}></RNView>

                </RNView>


            </RNView>
        </Layout>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
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
    }
})