import * as React from 'react';
import { Text } from '../Themed';
import { View as RNView, ScrollView, StyleSheet, Platform } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import fontsConstants from 'src/constants/fonts.constants';

type props = {
    title: string,
    text1?: string,
    text2?: string,
    text3?: string,
    text4?: string,

}

export const Terms = ({ title, text1, text2, text3, text4 }: props) => {

    const theme = useColorScheme()
    return (
        <RNView>
            <RNView>
                <Text style={[styles.title, { color: colorsConstants[theme].termsTitle }]}>{title}</Text>
                <Text style={[styles.text, { color: colorsConstants[theme].termsTitle }]}>{text1}</Text>
                <Text style={[styles.text, { color: colorsConstants[theme].termsTitle }]}>{text2}</Text>
                <Text style={[styles.text, { color: colorsConstants[theme].termsTitle }]}>{text3}</Text>

                {
                    text4 && <Text style={[styles.text, { color: colorsConstants[theme].termsTitle,  }]}>{text4}</Text>
                }
            </RNView>
        </RNView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        paddingTop: 4,
        paddingBottom: 30
    },
    title: {
        fontSize: Platform.OS === 'android' ? 11 : 13,
        paddingTop: 10,
        fontFamily: fontsConstants.Lora_Bold,
    },
    text: {
        fontSize: 11,
        fontFamily: fontsConstants.Lora_Regular,
        lineHeight: 19,
        textAlign: 'left'
    }
})