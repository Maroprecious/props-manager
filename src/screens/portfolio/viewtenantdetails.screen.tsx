import React, { useContext, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
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
import ViewTenancyScreen from "./viewtenancy.screen";
import { Success } from "src/components/modals/alert.modals";
import { RemoveModal } from "src/components/modals/remove-modal";

export default function ViewTenant({
    navigation,
    route
}: RootStackScreenProps<"ViewTenant">) {
    const theme = useContext(AppThemeContext);
    const [selected, setSelected] = useState<any>({ id: -1 })
    const [visible, setVisible] = useState(false)
    const [remove, setRemove] = useState(false)
    const [show, setShow] = useState(false)
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Layout title="View Tenant Details" goback={true}>
                {visible &&
                    <Success
                        visible={visible}
                        setVisible={setVisible}
                        textStyle={{ width: Platform.OS === 'android' ? '75%' : '70%' }}
                        text1='Tenant Details Edited'
                        text2='You have successfully edited the selected tenancy details.'
                        feedback={
                            <View style={{width: '100%'}}>
                                <DefaultButton
                                 title={`Go to Portfolio`}
                                   titleStyle={{fontSize: 24}}
                                 containerStyle={{
                                   width: '86%',
                                   alignSelf: 'center'
                                }}
                                  onPress={() => {
                                    setVisible(false)

                                    if (Platform.OS == 'ios') {
                                        setTimeout(() => {
                                            navigation.navigate('PortfolioTabScreen')
                                        }, 200);
                                    } else {
                                        navigation.navigate('PortfolioTabScreen')
                                    }
                                    

                                }}></DefaultButton>
                            </View>
                        }
                    />
                }
                <View style={styles.container}>
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
                                imageSize={fontsConstants.w(27)}
                                containerStyle={{
                                    height: fontsConstants.w(50),
                                    width: fontsConstants.w(50),
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
                                    fontSize: fontsConstants.h(10),
                                    color: colorsConstants[theme].modalBg,
                                }}>
                                    Property Manager: Stanley Olaoye - 07039095620                            </Text>
                            </View>

                        </View>


                    </View>
                    <View style={{
                        backgroundColor: colorsConstants[theme]["grey0.13"],
                        padding: fontsConstants.w(14),
                        borderRadius: fontsConstants.h(10)
                    }}>
                        {[{
                            id: 1,
                            label: "Tenant's Firstname:",
                            value: `Jackson`,
                            valueTextOpacity: 1
                        }, {
                            id: 2,
                            label: "Tenant's Lastname:",
                            value: 'Gbenga',
                            valueTextOpacity: 1
                        }, {
                            id: 3,
                            label: "Tenant's Mobile No:",
                            value: `09029040411`,
                            valueTextOpacity: 1
                        }, {
                            id: 4,
                            label: "Tenant's Email:",
                            value: `J.gbenga@gmail.com`,
                            valueTextOpacity: 1
                        }, {
                            id: 5,
                            label: 'Occupied Property Type:',
                            value: `Block of flats`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Unit Occupied:',
                            value: `Unit 5`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Rent amount:',
                            value: `₦ 1,350,000. 00`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Tenancy Duration:',
                            value: `12 months`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Last Rent Paid:',
                            value: `25/02/2023`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Next Rent Due:',
                            value: `25/02/2024`,
                            valueTextOpacity: 1
                        }].map((item, index) => (
                            < View key={index.toString()} >
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: 'space-between',
                                    height: 50,
                                }}>
                                    <Text style={{
                                        fontFamily: fontsConstants.Lora_Regular,
                                        fontSize: fontsConstants.w(13),
                                        color: colorsConstants[theme].success_name,
                                        width: '50%'
                                    }}>
                                        {item.label}
                                    </Text>
                                    <Text style={{
                                        fontFamily: fontsConstants.Roboto_Medium,
                                        fontSize: fontsConstants.w(14.5),
                                        color: colorsConstants[theme].darkText,
                                        opacity: item.valueTextOpacity,
                                        flex: 2.5,
                                        justifyContent: 'flex-end',
                                        textAlign: 'right',
                                        flexDirection: 'row'
                                    }}>
                                        {item.value}
                                    </Text>

                                </View>
                                <View style={{
                                    borderBottomColor: colorsConstants[theme].dropShadow,
                                    borderBottomWidth: item.id === 6 ? 0 : 1, opacity: 0.4
                                }}></View>

                            </View>
                        ))}

                    </View>



                    <DefaultButton
                        title={`Save Tenant`}
                        titleStyle={{ fontSize: 20 }}
                        onPress={() => setVisible(true)}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            marginTop: 50
                        }}
                    />
                    <DefaultButton
                        type="outline"
                        title={`Remove Tenant`}
                        titleStyle={{ fontSize: 20, color: colorsConstants.criticalRed }}
                        onPress={() => setRemove(true)}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            marginTop: 20
                        }}
                        buttonStyle={{ borderColor: colorsConstants.criticalRed }}

                    />
                     {remove && 
                    <RemoveModal 
                    visible={remove}
                    setVisible={setRemove}
                    feedback={
                        <View style={styles.buttons}>
                            <DefaultButton title={`Cancel`}
                             type='clear' 
                             titleStyle={{fontSize: Platform.OS === 'android' ? 18 : 20,fontFamily: fontsConstants.Lora_Bold}}
                             onPress={() => setRemove(false)}></DefaultButton>
                            <DefaultButton title={`Confirm`} 
                            type="solid"
                            titleStyle={{fontSize: Platform.OS === 'android' ? 18 : 20, fontFamily: fontsConstants.Lora_Bold}}
                            containerStyle={{ marginHorizontal: fontsConstants.w(0), width: Platform.OS === 'android' ? '60%' : '65%', height: 80}}
                            buttonStyle={{backgroundColor: colorsConstants.criticalRed, borderRadius: 12, marginTop: 7}}
                            buttonHeight={Platform.OS === 'android' ? 60 : 65}
                            
                            onPress={() => {
                                setRemove(false)
                                if (Platform.OS == 'ios') {
                                    setTimeout(() => {
                                    setShow(true)
                                    }, 200);
                                } else {
                                    setShow(true)
                                }

                            }}></DefaultButton>
                        </View>
                    }
                
                />}
                    {show && 
                        <Success
                        visible={show}
                        setVisible={setShow}
                        textStyle={{ width: Platform.OS === 'android' ? '75%' : '70%' }}
                        text1='Tenant Details Removed'
                        text2='You have successfully removed the selected tenancy details.'
                        feedback={
                            <View style={{width: '100%'}}>
                                <DefaultButton
                                 title={`Go to Portfolio`}
                                   titleStyle={{fontSize: 24}}
                                 containerStyle={{
                                   width: '86%',
                                   alignSelf: 'center'
                                }}
                                  onPress={() => {

                                    if (Platform.OS == 'ios') {
                                        setTimeout(() => {
                                            navigation.navigate('PortfolioTabScreen')
                                        }, 200);
                                    } else {
                                        navigation.navigate('PortfolioTabScreen')
                                    }
                                    

                                }}></DefaultButton>
                            </View>
                        }
                    />
                    }
                </View>

            </Layout >
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        height: '100%',
        paddingBottom: 50,
    },
    icon: {
        width: 30,
        height: 30,
    },
    item_container: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon_container: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '75%'
    },
    label: {
        fontSize: 15,
        fontFamily: fontsConstants.Lora_Bold
    },
    occupant: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 13
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginTop: Platform.OS === 'android' ? 16 : 20,
        width: '90%'

    }
});
