import * as React from 'react';
import { Text, View, ScrollView } from 'src/components/Themed';
import { StyleSheet, Modal, TouchableOpacity, StatusBar, Dimensions, ImageBackground, Platform } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import { DefaultButton } from '../buttons/buttons.components';
import { View as RNView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRef } from 'react';
import * as Sharing from 'expo-sharing';
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import styles from './styles/payment-success.styles'
import useColorScheme from 'src/hooks/useColorScheme';
import fontsConstants from 'src/constants/fonts.constants';


type props = {
    title: string
    success_message: string,
    name: string,
    amount: string,
    source: string,
    transaction_id: string,
    reference: string,
    recharge?: string
    date: string,
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;

}

export const PaymentSuccessful = ({
    title,
    success_message,
    name,
    amount,
    source,
    transaction_id,
    reference, date,
    recharge,
    visible,
    setVisible
}: props) => {
    const navigation = useNavigation()
    const theme = useColorScheme();
    const viewShotRef = useRef(null);
    const shareImage = async () => {
        try {
            const uri = await captureRef(viewShotRef, {
                format: 'png',
                quality: 0.9
            })
            await Sharing.shareAsync(uri)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Modal
            visible={visible}
            onRequestClose={() => null}
            animationType='slide'
            transparent={false}>
            <ScrollView>
                <StatusBar backgroundColor={colorsConstants[theme].background} />
                <RNView style={styles.container}>
                    <ImageBackground source={require("src/assets/images/backgrounds/background.png")} style={{ width: '100%', height: '100%' }}>
                        <ViewShot
                            ref={viewShotRef}
                            options={{ format: 'jpg', quality: 0.9 }}
                            style={{
                                width: '100%',
                                opacity: 1,
                                backgroundColor: '#fff'
                            }}

                        >
                            <ImageBackground source={require("src/assets/images/backgrounds/background.png")} style={{ width: '100%' }}>

                                <Text style={[styles.title, { color: colorsConstants[theme].textBlack2, }]}>{title}</Text>
                                <Text style={[styles.success_message, { color: colorsConstants[theme].success_message, }]}>{success_message}</Text>
                                <RNView style={styles.flex}>
                                    <Ionicons name="person-circle-sharp" size={51} color="black" />
                                    <Text style={[styles.name, { color: colorsConstants[theme].success_name, }]}>{name}</Text>
                                    <Text style={[styles.amount, { color: colorsConstants[theme].text, }]}>₦ {amount}</Text>
                                </RNView>
                                <RNView style={[styles.border_bottom, styles.border_width, { borderBottomColor: colorsConstants[theme].shadowText }]}></RNView>
                                <RNView style={styles.transfer_info}>
                                    <RNView style={styles.detail}>
                                        <Text style={styles.text_title}>Source:</Text>
                                        <Text style={styles.text_detail}>{source}</Text>
                                    </RNView>
                                    <RNView style={[styles.border_bottom, { borderBottomColor: colorsConstants[theme].shadowText, }]}></RNView>
                                    <RNView style={styles.detail}>
                                        <Text style={styles.text_title}>Transaction ID:</Text>
                                        <Text style={[styles.text_detail, styles.text_opacity]}>{transaction_id}</Text>
                                    </RNView>
                                    <RNView style={[styles.border_bottom, { borderBottomColor: colorsConstants[theme].shadowText, }]}></RNView>
                                    <RNView style={styles.detail}>
                                        <Text style={styles.text_title}>Reference:</Text>
                                        <Text style={[styles.text_detail, styles.text_opacity]}>{reference}</Text>
                                    </RNView>
                                    <RNView style={[styles.border_bottom, { borderBottomColor: colorsConstants[theme].shadowText, }]}></RNView>
                                    <RNView style={styles.detail}>
                                        <Text style={styles.text_title}>Date / Time:</Text>
                                        <Text style={[styles.text_detail, styles.text_opacity]}>{date}</Text>
                                    </RNView>
                                    <RNView style={[styles.border_bottom, { borderBottomColor: colorsConstants[theme].shadowText, }]}></RNView>
                                </RNView>
                            </ImageBackground>
                        </ViewShot>
                        <RNView style={styles.button}>
                            <TouchableOpacity style={{
                                width: '100%',
                            }}
                                onPress={shareImage}>
                                <RNView style={[styles.recharge1, { borderBottomColor: colorsConstants[theme].border_bottom, }]}>
                                    <Text style={[styles.text_title, styles.text_title2, { color: colorsConstants[theme].success_text, }]}>Download Receipt</Text>
                                    <Entypo name="download" size={24} color={colorsConstants[theme].download_icon} />
                                </RNView>
                            </TouchableOpacity>
                            {
                                <RNView style={styles.recharge}>
                                    {recharge && <>
                                        <RNView>
                                            <Text style={styles.recharge_text}>Recharge Token:</Text>
                                            <Text style={[styles.text_title1, { color: colorsConstants[theme].success_text }]}>{recharge}</Text>
                                        </RNView>
                                        <Octicons name="copy" size={20} color="#707070" />
                                    </>}

                                </RNView>
                            }

                            <DefaultButton
                                title={`Finish`}
                                containerStyle={{
                                    width: '90%',
                                    marginTop: Platform.OS === 'android' ? fontsConstants.h(2) : fontsConstants.h(30),
                                    marginHorizontal: fontsConstants.w(20)
                                  }}
                                onPress={() => {
                                    setVisible(false)
                                    if (Platform.OS == 'ios') {
                                        setTimeout(() => {
                                            navigation.navigate('App')
                                        }, 200);
                                    } else {
                                        navigation.navigate('App')
                                    }
                                }}>

                            </DefaultButton>
                        </RNView>
                    </ImageBackground>


                </RNView>
            </ScrollView>
        </Modal>
    )
}
