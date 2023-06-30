import * as React from 'react';
import Layout from "src/components/layout/layout";
import { StyleSheet, View as RNView, Image, Platform } from 'react-native';
import { Text } from 'src/components/Themed';
import { Socials } from 'src/constants/global.constants';
import { RootStackScreenProps } from 'src/types/navigations.types';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import fontsConstants from 'src/constants/fonts.constants';

export default function HelpAndSupportScreen({
    navigation,
    route
}: RootStackScreenProps<"HelpAndSupportScreen">) {

    const theme = useColorScheme()

    return (
        <Layout goback={true} title='Help and Support'>
            <RNView style={styles.img_container}>
                <Image source={require('../../assets/images/icons/help-support.png')} style={styles.support_img} />
            </RNView>
            <RNView style={styles.socials}>
                {
                    Socials.map((elem: any, id) => (
                        <React.Fragment key={id}>
                            <RNView style={styles.social_info}>
                                <Image source={elem.icon} style={styles.icon} />
                                <RNView style={styles.info}>
                                    <Text style={[styles.text, { color: colorsConstants[theme].modalBg }]}>{elem.text}</Text>
                                    <Text style={[styles.contact, {color: colorsConstants[theme].socialText}]}>{elem.contact}</Text>
                                </RNView>
                            </RNView>
                            <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.5, paddingTop: 0.8 }}></RNView>
                        </React.Fragment>
                    ))
                }
            </RNView>
        </Layout>
    )

}
const styles = StyleSheet.create({
    support_img: {
        width: Platform.OS === 'android' ? 250 : 320,
        height: Platform.OS === 'android' ? 250 : 320,
        resizeMode: Platform.OS === 'android' ? 'contain' : 'cover',
        alignSelf: 'center'
    },
    img_container: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 10
    },
    socials: {
        width: '90%',
        alignSelf: 'flex-start',
        paddingLeft: '5%',
        height: 280,
        justifyContent: 'space-between',
        marginTop: 30,

    },
    social_info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,

    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    info: {
        marginLeft: 30,
    },
    text: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 15,
        lineHeight: 15
    },
    contact:{
        fontFamily: fontsConstants.Roboto_Light,
      fontSize: 16,
        lineHeight: 30
    }
})