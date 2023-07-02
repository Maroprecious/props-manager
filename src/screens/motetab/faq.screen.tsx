import * as React from 'react';
import { useState } from 'react';
import Layout from "src/components/layout/layout";
import { StyleSheet, View as RNView, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'src/components/Themed';
import { RootStackScreenProps } from 'src/types/navigations.types';
import { Faqs } from 'src/constants/global.constants';
import { MaterialIcons } from '@expo/vector-icons';
import { number } from 'yup';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';

export default function FaqScreen({
    navigation,
    route
}: RootStackScreenProps<"FaqScreen">) {
    const theme = useColorScheme()

    const [visible, setVisible] = useState<boolean>(false)

    const toggle = (id: any) => {
        setVisible(id)
    }
    return (
        <Layout goback={true} title='FAQs'>
            <RNView style={styles.container}>
                <RNView>
                    {
                        Faqs.map((elem, id: any) => (
                            <React.Fragment key={id}>
                                <RNView style={styles.accordion}>
                                    <RNView style={styles.question_icon}>
                                        <Text style={[styles.question, { color: colorsConstants[theme].socialText }]}>{elem.question}</Text>
                                        {visible !== id ?
                                            <TouchableOpacity onPress={() => toggle(id)}>
                                                <MaterialIcons name="keyboard-arrow-up" size={15} color="black" />
                                                <MaterialIcons name="keyboard-arrow-down" size={15} color="black" style={{ marginTop: -5 }} />
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => setVisible(!visible)}>
                                                <Text style={styles.close}>Close</Text>
                                            </TouchableOpacity>

                                        }
                                    </RNView>
                                    {visible === id ?
                                        <Text style={[styles.answer, { color: colorsConstants[theme].socialText }]}>{elem.answer}</Text>
                                        : null}
                                </RNView>
                                <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.5 }}></RNView>

                            </React.Fragment>

                        ))
                    }
                </RNView>

            </RNView>
        </Layout>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
    },
    question_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '5%',
    },
    question: {
        fontSize: Platform.OS === 'android' ? 14 : 16,

        fontFamily: fontsConstants.Roboto_Light,
    },
    accordion: {
        justifyContent: 'center',
        paddingVertical: Platform.OS === 'android' ? 22 : 27
    },
    answer: {
        paddingTop: 9,
        fontSize: 12.2,
        fontFamily: fontsConstants.Roboto_Light,
        lineHeight: 20,
        paddingRight: 10
    },
    close: {
        fontSize: 12,
        fontFamily: fontsConstants.Lora_Regular,
        textDecorationLine: 'underline'
    },

})