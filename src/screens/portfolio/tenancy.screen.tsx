import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";
import { Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { DefaultDocuments, Tenancies } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { RenderAddTenancyButton } from "../hometab";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { LocationIcon } from "../rent/components";
import { Entypo } from "@expo/vector-icons";
import Layout from "src/components/layout/layout";

export default function TenancyScreen({
    navigation,
    route
}: RootStackScreenProps<"TenancyScreen">) {
    const theme = useContext(AppThemeContext);

    const [selected, setSelected] = useState<any>({ id: -1 })

    return (
        <ScrollView>

        <Layout title="Tenancy" goback={true}>
                <View style={styles.container}>
                <View style={{
                }}>
                    <Text style={{
                        fontFamily: fontsConstants.Lora_Bold,
                        fontSize: fontsConstants.h(13.5),
                        color: colorsConstants[theme].screenLabel,
                        marginBottom: fontsConstants.h(10),
                        marginTop: 30,

                    }}>
                        {`Listed Properties`}
                    </Text>
                    <View style={{
                        borderWidth: fontsConstants.h(1),
                        borderColor: colorsConstants.colorPrimary,
                        padding: fontsConstants.w(13.7),
                        marginBottom: fontsConstants.h(20),
                        height: 250,
                        borderRadius: 33,
                        justifyContent: 'space-between'
                    }}>
                        {Tenancies.map((item, index) => (
                            <React.Fragment key={item.id.toString()}>
                                <View
                                    
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginBottom: fontsConstants.h(10)
                                    }}
                                >
                                    <LocationIcon
                                        imageSize={fontsConstants.w(27)}
                                        containerStyle={{
                                            height: fontsConstants.w(47),
                                            width: fontsConstants.w(47),
                                        }}
                                    />
                                    <View style={{
                                        marginHorizontal: fontsConstants.w(10),
                                        flex: 1
                                    }}>
                                        <Text style={{
                                            fontFamily: fontsConstants.Lora_Bold,
                                            fontSize: fontsConstants.h(14),
                                            color: colorsConstants[theme].screenLabel,
                                        }}>
                                            {`Property Location`}
                                        </Text>
                                        <Text style={{
                                            fontFamily: fontsConstants.Lora_Regular,
                                            fontSize: fontsConstants.h(11.4),
                                            color: colorsConstants[theme].address,
                                        }}>
                                            {item.address}
                                        </Text>
                                    </View>
                                    <DefaultRadiobox
                                        checked={selected?.id === item.id}
                                        checkedColor={colorsConstants.radioBoxActive}
                                        size={fontsConstants.w(20)}
                                        label={`Select`}
                                        onPress={() => setSelected(item)}
                                    />
                                </View>
                                <View style={{ borderBottomColor: colorsConstants[theme].dropShadow, borderWidth: .4, opacity: 0.13 }}></View>
                            </React.Fragment>
                        ))}
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: fontsConstants.h(20),
                        }}>
                            <Text style={{
                                fontFamily: fontsConstants.Lora_Regular,
                                fontSize: fontsConstants.h(13),
                                color: colorsConstants[theme].address,

                            }}>
                                {`No additional property record found`}
                            </Text>
                            <RenderAddTenancyButton />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{
                        fontFamily: fontsConstants.Lora_Bold,
                        fontSize: fontsConstants.h(14),
                        color: colorsConstants[theme].screenLabel,
                        marginBottom: fontsConstants.h(10),
                        marginTop: 5
                    }}>
                        {`Tenancy Records`}
                    </Text>
                    <View style={{
                        backgroundColor: colorsConstants[theme]["grey0.13"],
                        padding: fontsConstants.w(14),
                        borderRadius: fontsConstants.h(10)
                    }}>
                        {[{
                            id: 1,
                            label: 'Property ID:',
                            value: `MPM-VI-00946`,
                            valueTextOpacity: selected?.propertyId ? 1 : 0.3
                        }, {
                            id: 2,
                            label: 'Property Type:',
                            value: 'Block of flats',
                            valueTextOpacity: 1
                        }, {
                            id: 3,
                            label: 'Number of Units:',
                            value: `6`,
                            valueTextOpacity: 1
                        }, {
                            id: 4,
                            label: 'Number of Tenants:',
                            value: `3`,
                            valueTextOpacity: 1
                        }, {
                            id: 5,
                            label: 'Rent Amount per Unit:',
                            value: `₦ 1,350,000. 00`,
                            valueTextOpacity: 1
                        }, {
                            id: 6,
                            label: 'Total Rent Expected:',
                            value: `₦ 8,100,000. 00`,
                            valueTextOpacity: 1
                        }].map((item, index) => (
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
                                     borderBottomWidth:  item.id === 6 ?  0 : 1, opacity: 0.4 }}></View>
                            </View>
                        ))}
                    </View>

                </View>
                <DefaultButton
                    title={`View Tenants`}
                    onPress={() => navigation.navigate("ViewTenancyScreen")}
                    containerStyle={{
                        marginHorizontal: fontsConstants.w(30),
                        marginTop: 40
                    }}
                />
                </View>

        </Layout>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        height: '100%',
        paddingBottom: 80,
    },
});
