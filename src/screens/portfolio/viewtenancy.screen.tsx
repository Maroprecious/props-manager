import React, { useContext, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Platform
} from "react-native";
import { Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { DefaultDocuments, TenantInfo } from "src/constants/global.constants";
import colorsConstants from "src/constants/colors.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { LocationIcon } from "../rent/components";
import Layout from "src/components/layout/layout";
import { object } from "yup";

export default function ViewTenancyScreen({
    navigation,
    route
}: RootStackScreenProps<"ViewTenancyScreen">) {
    const theme = useContext(AppThemeContext);
    const [selected, setSelected] = useState<any>({ id: -1 })
    return (

        <Layout title="View Tenants" goback={true}>
            <ScrollView
            showsVerticalScrollIndicator={false}
                style={styles.container}
            >
                <View style={{
                }}>

                    <View style={{
                        borderWidth: fontsConstants.h(1),
                        borderColor: colorsConstants.colorPrimary,
                        padding: fontsConstants.w(14),
                        marginBottom: fontsConstants.h(20),
                        marginTop: 20,
                        height: 110,
                        borderRadius: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>

                        <LocationIcon
                            imageSize={fontsConstants.w(25)}
                            containerStyle={{
                                height: fontsConstants.w(48),
                                width: fontsConstants.w(48),
                            }}
                        />
                        <View style={{
                            marginHorizontal: fontsConstants.w(10),
                            flex: 1,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: fontsConstants.h(14),
                                color: colorsConstants[theme].modalBg,
                            }}>
                                Property ID: MPM-VI-00946
                            </Text>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: fontsConstants.h(12),
                                color: colorsConstants[theme].address,
                            }}>
                                10 Alake Street, Victoria Island. Lagos
                            </Text>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: Platform.OS === 'android' ? 10 : 12,
                                color: colorsConstants[theme].modalBg,
                            }}>
                                Property Manager: Stanley Olaoye - 07039095620                            </Text>
                        </View>

                    </View>


                </View>
                {
                    TenantInfo.map((elem) => (
                        <TouchableOpacity activeOpacity={.6} key={elem.id} style={styles.item_container}>
                            <View style={[styles.icon_container, { backgroundColor: colorsConstants[theme].grey2 }]} >
                                <Image source={elem.icon} style={styles.icon} />
                            </View>
                            <View style={styles.content}>
                                <Text style={[styles.label, { color: colorsConstants[theme].modalBg }]}>{elem.label}</Text>
                                <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Occupant: {elem.occupant} - {elem.phone}</Text>
                                <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Rent Status: {elem.amount} - <Text style={{ color: elem.rent_status === 'Unpaid' ? colorsConstants.criticalRed : colorsConstants.colorSuccess, fontFamily: fontsConstants.Lora_Regular, fontSize: 12 }}>{elem.rent_status}</Text></Text>
                            </View>
                            <View>
                                <DefaultRadiobox
                                    checked={selected?.id === elem.id}
                                    checkedColor={colorsConstants.radioBoxActive}
                                    size={fontsConstants.w(20)}
                                    onPress={() => setSelected(elem)} />
                            </View>
                        </TouchableOpacity>
                    ))
                }
                <DefaultButton
                    title={(Object.keys(selected).length > 1 ? `View Tenant Details` : `Add Tenant`)}
                    titleStyle={{ fontSize: 20 }}
                    onPress={() => navigation.navigate("ViewTenant")}
                    disabled={!(Object.keys(selected).length > 1)}
                    containerStyle={{
                        marginHorizontal: fontsConstants.w(30),
                        marginTop: 50,
                        marginBottom: 50
                    }}
                />
            </ScrollView>

        </Layout >


    );
}

const styles = StyleSheet.create({
    container: {
        width: '92%',
        alignSelf: 'center',
        height: '100%',
        paddingBottom: 0,
    },
    icon: {
        width: 20,
        height: 20,
    },
    item_container: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon_container: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '78%'
    },
    label: {
        fontSize: 15,
        fontFamily: fontsConstants.Lora_Bold
    },
    occupant: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: Platform.OS === 'android' ? 11 : 13
    }
});
