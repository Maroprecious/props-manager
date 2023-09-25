import * as React from "react";
import { useContext, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { Text } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import fontsConstants from "src/constants/fonts.constants";
import colorsConstants from "src/constants/colors.constants";
import Layout from "src/components/layout/layout";
import { useUnits } from "src/hooks/useProperties";
import { useProperties } from "src/contexts/property.context";
import { FontAwesome } from '@expo/vector-icons';
import { useUnit } from "src/contexts/unit.context";
import { useFocusEffect } from '@react-navigation/native';



export default function ViewUnitsScreen({
    navigation,
    route
}: RootStackScreenProps<"ViewUnitsScreen">) {
    const theme = useContext(AppThemeContext);
    const [units, setUnits] = useState([])
    const { setOneUnit } = useUnit()
    const user = useAppSelector((state) => state.auth.user)
    const { loading, getUnits } = useUnits()

    const { property } = useProperties()

    const fetchUnits = async () => {
        const req = await getUnits(property.id)
        if (req?.hasError === false) setUnits(req?.data?.message)
    }

    // useEffect(() => {
    //     fetchUnits()
    // }, [navigation])

    useFocusEffect(
        useCallback(() => {
            fetchUnits()
        }, [navigation])
      );

    const Item = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => {
                setOneUnit(item)
                navigation.navigate('UnitDetailsScreen')
            }}>
                <View style={styles.details}>
                    <View>
                        <Text style={[styles.title, { color: colorsConstants[theme].darkText }]}>{item.unitName}</Text>
                        <Text style={[styles.label, { color: colorsConstants[theme].grey3 }]}>{item.unitType.description}</Text>
                    </View>
                    <FontAwesome name="angle-right" size={20} color="black" />
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Layout title="Units" goback={true}>
            <View style={styles.container}>
                <FlatList
                    refreshing={loading}
                    onRefresh={fetchUnits}
                    data={units}
                    contentContainerStyle={{ width: '98%', alignSelf: 'center', marginTop: 20 }}
                    renderItem={({ item }) => <Item item={item} />}
                    ListEmptyComponent={() => !loading ?
                        <View style={styles.center}>
                            <Text style={{ fontFamily: fontsConstants.Lora_Regular, fontSize: 15 }}>No Units,</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('AddUnitsScreen', {
                                propertyId: property.id
                            })}>
                                <Text style={styles.link}> Add Units</Text>
                            </TouchableOpacity>
                        </View> : null}
                />
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        height: '100%'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },
    title: {
        fontSize: 19,
        fontFamily: fontsConstants.Lora_Bold,
    },
    label: {
        fontSize: 14,
        fontFamily: fontsConstants.Lora_Regular,
        marginTop: 3,

    },
    center: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        alignItems: 'center',
        paddingTop: '80%'
    },
    link: {
        fontSize: 19,
        color: colorsConstants.light.primary,
        fontFamily: fontsConstants.Lora_Bold
    }
});
