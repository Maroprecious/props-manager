import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Platform,
    ImageBackground,
    FlatList,
    Alert
} from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
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
import useProperties from "src/hooks/useProperties";
import layoutsConstants from "src/constants/layouts.constants";
import { TabScreenTitle } from "src/components/labels/screentitle.components";
import { ScreenTitle } from "../auth/components/screentitle.component";
import { RenderPropertyDetails } from "../property/components";
import useAuthenticate from "src/hooks/useAuthentication";
import { useAppSelector } from "src/hooks/useReduxHooks";

export default function ViewTenancyScreen({
    navigation,
    route
}: RootStackScreenProps<"ViewTenancyScreen">) {
    const theme = useContext(AppThemeContext);
    const selectedProperty = route.params?.data?.property;
    const user = useAppSelector((state) => state.auth.user)
    const { loading, getPropertyOccupants } = useProperties();

    const [selected, setSelected] = useState<any>({ id: -1 })
    const [tenants, setTenants] = useState<any>([]);
    const { requestPasswordReset } = useAuthenticate();

    const fetchOccupants = async () => {
        const req = await getPropertyOccupants({
            propertyId: selectedProperty.id
        });
        if (req.hasError === false) setTenants(req?.data?.message || [])
    }

    useEffect(() => {
        fetchOccupants()
    }, [selectedProperty?.id])
    
    const doAddTenant = () => {
        navigation.navigate("AddTenantScreen", {
            data: {
                unit: {
                    id: null
                },
                property: {
                    id: selectedProperty?.id
                },
            }, 
            from: "tenancy-screen"
        })
    }

    return (

        // <Layout title="View Tenants" goback={true}>
        //     <ScrollView
        //     showsVerticalScrollIndicator={false}
        //         style={styles.container}
        //     >
        //         <View style={{
        //         }}>

        //             <View style={{
        //                 borderWidth: fontsConstants.h(1),
        //                 borderColor: colorsConstants.colorPrimary,
        //                 padding: fontsConstants.w(14),
        //                 marginBottom: fontsConstants.h(20),
        //                 marginTop: 20,
        //                 height: 110,
        //                 borderRadius: 20,
        //                 flexDirection: 'row',
        //                 justifyContent: 'space-between'
        //             }}>

        //                 <LocationIcon
        //                     imageSize={fontsConstants.w(25)}
        //                     containerStyle={{
        //                         height: fontsConstants.w(48),
        //                         width: fontsConstants.w(48),
        //                     }}
        //                 />
        //                 <View style={{
        //                     marginHorizontal: fontsConstants.w(10),
        //                     flex: 1,
        //                     justifyContent: 'space-between'
        //                 }}>
        //                     <Text style={{
        //                         fontFamily: fontsConstants.Lora_Regular,
        //                         fontSize: fontsConstants.h(14),
        //                         color: colorsConstants[theme].modalBg,
        //                     }}>
        //                         Property ID: {selectedProperty.id}
        //                     </Text>
        //                     <Text style={{
        //                         fontFamily: fontsConstants.Lora_Regular,
        //                         fontSize: fontsConstants.h(12),
        //                         color: colorsConstants[theme].address,
        //                     }}>
        //                         {selectedProperty.propertyName}
        //                     </Text>
        //                     <Text style={{
        //                         fontFamily: fontsConstants.Lora_Regular,
        //                         fontSize: Platform.OS === 'android' ? 10 : 12,
        //                         color: colorsConstants[theme].modalBg,
        //                     }}>
        //                         {selectedProperty.propertyLocation}                            </Text>
        //                 </View>

        //             </View>


        //         </View>
        //         {tenants.map((elem: any, index: number) => (
        //             <TouchableOpacity 
        //                 activeOpacity={layoutsConstants.activeOpacity} 
        //                 key={index.toString()} 
        //                 style={styles.item_container}
        //             >
        //                 <View style={[styles.icon_container, { backgroundColor: colorsConstants[theme].grey2 }]} >
        //                     <Image source={require("src/assets/images/icons/human-icon.png")} style={styles.icon} />
        //                 </View>
        //                 <View style={styles.content}>
        //                     <Text style={[styles.label, { color: colorsConstants[theme].modalBg }]}>{elem?.unit?.unitName || ""}</Text>
        //                     <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Occupant: {elem.occupant} - {elem?.phone || ''}</Text>
        //                     {/* <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Rent Status: {elem.amount} - <Text style={{ color: elem.rent_status === 'Unpaid' ? colorsConstants.criticalRed : colorsConstants.colorSuccess, fontFamily: fontsConstants.Lora_Regular, fontSize: 12 }}>{elem.rent_status}</Text></Text> */}
        //                 </View>
        //                 <View>
        //                     <DefaultRadiobox
        //                         checked={selected?.id === elem.id}
        //                         checkedColor={colorsConstants.radioBoxActive}
        //                         size={fontsConstants.w(20)}
        //                         onPress={() => setSelected(elem)} />
        //                 </View>
        //             </TouchableOpacity>
        //         ))}
        //         <DefaultButton
        //             title={`Add New Tenant`}
        //             onPress={() => navigation.navigate("AddTenantScreen", {
        //             data: {
        //                 unit: {
        //                 id: null
        //                 },
        //                 property: {
        //                 id: selectedProperty?.id
        //                 },
        //             }, from: "tenancy-screen"
        //             })}
        //             containerStyle={{
        //             marginTop: fontsConstants.h(20)
        //             }}
        //         />
        //     </ScrollView>

        // </Layout >

        <SafeAreaView style={{
            flex: 1
        }}>
            <ImageBackground
                source={require("src/assets/images/backgrounds/background.png")}
                style={{
                flex: 1,
                paddingTop: fontsConstants.h(40),
                paddingHorizontal: fontsConstants.w(20),
                }}
            >
                <HeaderBackButton />
                <ScreenTitle
                    title={`View Tenants`}
                    containerStyle={{
                        marginTop: fontsConstants.h(12),
                        marginBottom: fontsConstants.h(35)
                    }}
                />
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
                                Property ID: {selectedProperty.id}
                            </Text>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: fontsConstants.h(12),
                                color: colorsConstants[theme].address,
                            }}>
                                {selectedProperty.propertyName}
                            </Text>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: Platform.OS === 'android' ? 10 : 12,
                                color: colorsConstants[theme].modalBg,
                            }}>
                                {selectedProperty.propertyLocation}                            </Text>
                        </View>

                    </View>
                </View>
                <FlatList
                    refreshing={loading}
                    data={tenants}
                    onRefresh={fetchOccupants}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity 
                        activeOpacity={layoutsConstants.activeOpacity} 
                        key={index.toString()} 
                        style={styles.item_container}
                    >
                        <View style={[styles.icon_container, { backgroundColor: colorsConstants[theme].grey2 }]} >
                            <Image source={require("src/assets/images/icons/human-icon.png")} style={styles.icon} />
                        </View>
                        <View style={styles.content}>
                            <Text style={[styles.label, { color: colorsConstants[theme].modalBg }]}>{item?.unit?.unitName || ""}</Text>
                            <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Occupant: {`${item?.tenant?.firstName || "NIL"} ${item?.tenant?.lastName || "NIL"}`} - {item?.tenant?.phoneNumber !== null ? item?.tenant?.phoneNumber : 'Phone'}</Text>
                            {/* <Text style={[styles.occupant, { color: colorsConstants[theme].modalBg }]}>Rent Status: {elem.amount} - <Text style={{ color: elem.rent_status === 'Unpaid' ? colorsConstants.criticalRed : colorsConstants.colorSuccess, fontFamily: fontsConstants.Lora_Regular, fontSize: 12 }}>{elem.rent_status}</Text></Text> */}
                        </View>
                        <View>
                            {/* <DefaultRadiobox
                                checked={selected?.id === item?.id}
                                checkedColor={colorsConstants.radioBoxActive}
                                size={fontsConstants.w(20)}
                                onPress={() => setSelected(item)} /> */}
                        </View>
                    </TouchableOpacity>
                    )}
                    ListFooterComponent={
                        <DefaultButton
                            title={`Add New Tenant`}
                            onPress={() => {
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
                            }}
                            containerStyle={{
                            marginTop: fontsConstants.h(20)
                            }}
                        />
                    }
                />
            </ImageBackground>
        </SafeAreaView>
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
