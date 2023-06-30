import * as React from 'react';
import { View, Text } from '../Themed';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, StyleProp, ViewStyle } from 'react-native';
import colorsConstants from "src/constants/colors.constants";
import { Ionicons } from '@expo/vector-icons';
import fontsConstants from 'src/constants/fonts.constants';
import AppThemeContext from "src/contexts/Theme.context";
import { useContext } from 'react';


type inputProps = {
    otherProps?: TextInputProps;
    onChange?: (e: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    extrastyles?: StyleProp<ViewStyle>;
    err?: boolean;
    errMsg?: string;
    placeholder?: string;
}

export const InputAddress = ({
    otherProps,
    onChange,
    onBlur, extrastyles,
    err,
    errMsg,
    placeholder }: inputProps) => {

    const theme = useContext(AppThemeContext);

    return (
        <View style={styles.container}>
            <View style={[styles.iconbg, {backgroundColor: colorsConstants[theme].grey2}]}>
                <Ionicons name="location" size={35} color={colorsConstants.criticalRed} />
            </View>
            <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={colorsConstants[theme].grey3}
                style={[styles.inputField, extrastyles, {backgroundColor: colorsConstants[theme].lighterGrey, color: colorsConstants[theme].grey3 }]}
                {...otherProps}
            />
            {err && <Text style={styles.error}>{errMsg}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    inputField: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 21,
        paddingLeft: 85,
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 14,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colorsConstants.colorPrimary,
        position: 'relative'
    },
    container: {
        width: '94%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        marginTop: 20,
        position: 'relative',
    },
    error: {
        color: colorsConstants.criticalRed,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 4,
        fontSize: 12,
        fontFamily: fontsConstants.Lora_Regular,
    },
    iconbg: {
        width: 60,
        height: 60,
        borderRadius: 8,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 10,
        top: 32

    },
})