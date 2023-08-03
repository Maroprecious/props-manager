import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, View, ScrollView, Image, FlatList, Dimensions, Platform } from "react-native";
import { Text } from "src/components/Themed";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import colorsConstants from "src/constants/colors.constants";
import Layout from "src/components/layout/layout";
import { FontAwesome5 } from '@expo/vector-icons';
import Tab from "src/components/tabs/tab";



export default function YourFinancialsScreen({
    navigation,
    route
}: RootStackScreenProps<"YourFinancialsScreen">) {


    return (

            <Layout title="Your Financials" goback={true}>
                <View style={styles.container}>
                    <View style={{
                        borderRadius: 18, marginTop: 20, overflow: 'hidden',
                    }}>

                        <ImageBackground alt="" source={require('src/assets/images/icons/financial2.png')} resizeMode='cover' style={{ height: Platform.OS === 'android' ? 190 : 210, borderRadius: 40, width: '100%' }}>
                            <View style={styles.image_container}>
                                <View style={{ width: '100%' }}>
                                    <View style={styles.flex}>
                                        <Image source={require('src/assets/images/coin.png')} alt="" resizeMode="contain" style={{ width: Platform.OS === 'android' ? 115 : 135, height: Platform.OS === 'android' ? 115 : 135 }} />
                                        <Text style={styles.date}>05/06/2023</Text>
                                    </View>
                                    <Text style={styles.balance}>MPM Account Balance</Text>
                                    <View style={styles.amount}>
                                        <Text style={{ fontFamily: fontsConstants.Lora_Bold, fontSize: Platform.OS === 'android' ? 27 : 31, color: colorsConstants.light.background }}>₦</Text>
                                        <Text style={{ fontFamily: fontsConstants.Rubik_Medium, fontSize: 28, color: colorsConstants.light.background, marginRight: 10 }}> *******</Text>
                                        <FontAwesome5 name="eye-slash" size={15} color={colorsConstants.light.background} />
                                    </View>
                                    <View style={[styles.flex, { marginTop: Platform.OS === 'android' ? 10 : 15}]}>
                                        <Text style={styles.balance}>MPM Account ID</Text>
                                        <Text style={styles.date}>**** 4908</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>

                    </View>
                    <View style={{ marginTop: 20, height: Dimensions.get('window').height}}>
                        <Tab />
                    </View>
                </View>

            </Layout>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        height: '100%',
    },
    image_container: {
        width: '92%',
        alignSelf: 'center',
        height: '95%',
        flexDirection: 'row'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: -7
    },
    balance: {
        marginTop: -12,
        fontFamily: fontsConstants.Inter_Medium,
        fontSize: 11,
        marginLeft: 10,
        color: colorsConstants.light.background
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: Platform.OS === 'android' ? 4 : 8
    },
    date: {
        fontFamily: fontsConstants.Rubik_Regular,
        color: colorsConstants.light.background,
        fontSize: Platform.OS === 'android' ? 14 : 16,
        marginTop: -12

    }
});
