import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, ScrollView, Image, FlatList, Dimensions, Platform, TouchableOpacity } from "react-native";
import { Text } from "src/components/Themed";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import colorsConstants from "src/constants/colors.constants";
import Layout from "src/components/layout/layout";
import { FontAwesome5 } from '@expo/vector-icons';
import Tab from "src/components/tabs/tab";
import usePayments from "src/hooks/usePayments";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { formatCurrency } from "src/utils/FormatNumber";
import { FinancialData } from "src/types/app.types";
import { useProperties } from "src/contexts/property.context";


export default function YourFinancialsScreen({
    navigation,
    route
}: RootStackScreenProps<"YourFinancialsScreen">) {
    const user = useAppSelector((state) => state.auth.user)
    const { loading, getFinancials } = usePayments()
    const [show, setShow] = useState(false)
   const { financials ,setFinancials} = useProperties()


    const getUserFinancials = async () => {
        const details = await getFinancials({
            userId: user.id
        })
        if (!details?.hasError) {
            setFinancials(details.data)
        }
    }
    useEffect(() => {
        getUserFinancials()
    }, [navigation])


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
                                </View>
                                <Text style={styles.balance}>MPM Account Balance</Text>
                                <View style={styles.amount}>
                                    <Text style={{ fontFamily: fontsConstants.Lora_Bold, fontSize: Platform.OS === 'android' ? 27 : 31, color: colorsConstants.light.background }}>₦</Text>
                                    {show ?<Text style={{ fontFamily: fontsConstants.Rubik_Medium, fontSize: 28, color: colorsConstants.light.background, marginRight: 10 }}> {formatCurrency(financials.walletBalance)}</Text> : <Text style={{ fontFamily: fontsConstants.Rubik_Medium, fontSize: 28, color: colorsConstants.light.background, marginRight: 10 }}> ******</Text> }
                                    
                                    <TouchableOpacity onPress={() => setShow(!show)}>
                                        <FontAwesome5 name={show ? "eye" : 'eye-slash'} size={15} color={colorsConstants.light.background} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.flex, { marginTop: Platform.OS === 'android' ? 10 : 15 }]}>
                                    <Text style={styles.balance}>MPM Account ID</Text>
                                    <Text style={styles.date}>{user.id}</Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                </View>
                <View style={{ marginTop: 20, height: Dimensions.get('window').height }}>
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
