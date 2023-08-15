import * as React from "react";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PropertyDetailsScreen({
    navigation,
    route
}: RootStackScreenProps<"PropertyDetailsScreen">) {
    const theme = useContext(AppThemeContext);

    const user = useAppSelector((state) => state.auth.user)
    const { loading, createProperty, created } = useProperty()
    const { property } = useProperties()
    console.log(property, 'hello')
    return (
        <Layout title="Property Details" goback={true}>
            <View style={styles.container}>
                <View style={styles.location}>
                    <LocationIcon
                        containerStyle={{
                            height: fontsConstants.w(50),
                            width: fontsConstants.w(50)
                        }}
                    />
                    <View style={styles.details}>
                        <Text style={styles.title}>Property Location</Text>
                        <Text style={styles.address}>{property.propertyLocation}</Text>
                    </View>
                </View>
                <View style={[styles.flex, { marginTop: 30, marginBottom: 12 }]}>
                    <Text style={[styles.title]}>Property Record</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddPropertyScreen', {
                        actionType: 'edit'
                    })}>
                        <Text style={styles.edit}>Edit Property</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{
                        backgroundColor: colorsConstants[theme]["grey0.13"],
                        padding: fontsConstants.w(14),
                        borderRadius: fontsConstants.h(10)
                    }}>
                        {[{
                            id: 1,
                            label: 'Property ID:',
                            value: property.id,
                            valueTextOpacity: 0.3
                        }, {
                            id: 2,
                            label: 'Property Name:',
                            value: property.propertyName,
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
                                    borderBottomWidth: item.id === 2 ? 0 : 1, opacity: 0.4
                                }}></View>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity style={{marginTop: 10}} onPress={() => navigation.navigate('AddUnitsScreen', {
                        propertyId: property.id
                    })}>
                        <Text style={styles.edit}>Add Units</Text>
                    </TouchableOpacity>
                    <DefaultButton
                        title={`View Units`}
                        onPress={() => {

                            navigation.navigate("ViewUnitsScreen")
                        }}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            marginTop: 40
                        }}
                    />
                </View>
            </View>
        </Layout>
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
        fontSize: 13,
        color: colorsConstants.light.grey3
    },
    flex:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    edit:{
        fontFamily: fontsConstants.Lora_Regular,
        color: colorsConstants.light.primary,
        textDecorationStyle: 'solid',
        textDecorationColor: colorsConstants.light.primary,
        textDecorationLine: 'underline'
    }
});
