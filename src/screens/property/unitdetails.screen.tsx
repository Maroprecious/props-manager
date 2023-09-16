import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { DefaultButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import colorsConstants from "src/constants/colors.constants";
import { LocationIcon } from "../rent/components";
import useProperty from "src/hooks/useProperties";
import Layout from "src/components/layout/layout";
import { useProperties } from "src/contexts/property.context";
import { useUnit } from "src/contexts/unit.context";
import { formatCurrency } from "src/utils/FormatNumber";
import { currencySymbol } from "src/constants/currencies.constants";
import { AntDesign } from '@expo/vector-icons';
import useAuthenticate from "src/hooks/useAuthentication";


export default function UnitDetailsScreen({
    navigation,
    route
}: RootStackScreenProps<"UnitDetailsScreen">) {
    const theme = useContext(AppThemeContext);

    const user = useAppSelector((state) => state.auth.user)
    const { loading, createProperty, created } = useProperty()
    const { property } = useProperties()
    const { oneUnit } = useUnit()
    const { requestPasswordReset } = useAuthenticate();

    const doAddTenant = () => {
        navigation.navigate("AddTenantScreen", {
            data: {
                unit: oneUnit
            },
            from: "unit-screen"
        })
    }

    return (
        <>
            <TouchableOpacity style={styles.goBack} onPress={() => {
                
                navigation.navigate("ViewUnitsScreen")
            }}>
                <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Layout title="Unit Details" goback={false} textstyle={{ marginTop: 95 }}>

                <View style={styles.container}>
                    <View style={styles.location}>
                        <LocationIcon
                            containerStyle={{
                                height: fontsConstants.w(50),
                                width: fontsConstants.w(50)
                            }} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{oneUnit.unitName}</Text>
                            <Text style={styles.address}>{oneUnit.unitType.description}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('AddUnitsScreen', {
                        actionType: 'edit',
                        propertyId: property.id
                    })}>
                        <Text style={styles.edit}>Edit Unit</Text>
                    </TouchableOpacity>
                    <View>
                        <View style={{
                            backgroundColor: colorsConstants[theme]["grey0.13"],
                            padding: fontsConstants.w(14),
                            borderRadius: fontsConstants.h(10),
                            marginTop: 25
                        }}>
                            {[{
                                id: 1,
                                label: 'Unit Rent:',
                                value: `${currencySymbol['ngn']}${oneUnit.unitRent === null ? '0.00' : formatCurrency(Number(oneUnit.unitRent))}`,
                                valueTextOpacity: 1
                            }, {
                                id: 2,
                                label: 'Service Charge:',
                                value: `${currencySymbol['ngn']}${formatCurrency(Number(oneUnit.unitServiceCharge))}`,
                                valueTextOpacity: 1
                            }, {
                                id: 3,
                                label: 'Legal Fee:',
                                value: `${currencySymbol['ngn']}${oneUnit.unitLegalFee === null ? '0.00' : formatCurrency(Number(oneUnit.unitLegalFee))}`,
                                valueTextOpacity: 1
                            }, {
                                id: 4,
                                label: 'Agreement Charge:',
                                value: `${currencySymbol['ngn']}${oneUnit.unitAgreementCharge === null ? '0.00' : formatCurrency(Number(oneUnit.unitAgreementCharge))}`,
                                valueTextOpacity: 1
                            }, {
                                id: 5,
                                label: 'Commission Charge:',
                                value: `${currencySymbol['ngn']}${oneUnit.unitCommissionCharge === null ? '0.00' : formatCurrency(Number(oneUnit.unitCommissionCharge))}`,
                                valueTextOpacity: 1
                            },
                            {
                                id: 6,
                                label: 'Other Charges:',
                                value:
                                    `${currencySymbol['ngn']}${oneUnit.unitOtherCharges === null ? '0.00' : formatCurrency(Number(oneUnit.unitOtherCharges))}`,
                                valueTextOpacity: 1
                            }, {
                                id: 7,
                                label: 'Occupying Status:',
                                value:
                                    oneUnit.occupyingStatus === true ? 'Occupied' : 'Not Occupied',
                                valueTextOpacity: 1
                            }
                            ].map((item, index) => (
                                < View key={item.id.toString()} >
                                    <View style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: 'space-between',
                                        height: 50,
                                    }}>
                                        <Text style={{
                                            fontFamily: fontsConstants.Lora_Regular,
                                            fontSize: fontsConstants.w(14),
                                            color: colorsConstants[theme].darkText,
                                            width: '50%'
                                        }}>
                                            {item.label}
                                        </Text>
                                        <Text style={{
                                            fontFamily: fontsConstants.Lora_Regular,
                                            fontSize: fontsConstants.w(12),
                                            color: colorsConstants[theme].darkText,
                                            opacity: item.valueTextOpacity,
                                            flex: 2.5,
                                            justifyContent: 'flex-start',
                                            textAlign: 'justify',
                                            flexDirection: 'row'
                                        }}>
                                            {item.value}
                                        </Text>
                                    </View>
                                    <View style={{
                                        borderBottomColor: colorsConstants[theme].dropShadow,
                                        borderBottomWidth: item.id === 7 ? 0 : 1, opacity: 0.4
                                    }}></View>
                                </View>
                            ))}
                        </View>
                        <DefaultButton
                            title={`Add Tenant`}
                            disabled={oneUnit.occupyingStatus === true}
                            onPress={() => {
                                if (!user?.bankAvailable) {
                                    Alert.alert(`Hold On!`, `You have not added your bank detail.\nWant to add it now?`, [{
                                        text: `Not now`,
                                        onPress: doAddTenant
                                      }, {
                                        text: `Yes, Proceed`,
                                        onPress: () => {
                                            requestPasswordReset({
                                                email: user.email,
                                            });
                                            navigation.navigate('OTPVerifyScreen', {
                                                type: 'add-bank-account',
                                                email: user.email
                                            })
                                        }
                                      }])
                                } else doAddTenant()
                                
                            }}
                            containerStyle={{
                                marginTop: 40
                            }}
                        />
                    </View>
                </View>
            </Layout></>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center'
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colorsConstants.light.primary,
        height: 80,
        marginTop: 25,
        borderRadius: 16
    },
    details: {
        marginLeft: 20
    },
    title: {
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: 17,
        marginTop: -2,
        marginBottom: 6
    },
    address: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 16,
        color: colorsConstants.light.darkText
    },
    edit: {

        textAlign: 'right',
        textDecorationColor: colorsConstants.colorPrimary,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        color: colorsConstants.colorPrimary,
        fontFamily: fontsConstants.Lora_Regular,
        paddingTop: 30
    },
    goBack: {
        padding: 20,
        paddingTop: 60,
        position: 'absolute',
        zIndex: 1000
    }
});
