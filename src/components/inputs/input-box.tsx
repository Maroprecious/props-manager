import * as React from 'react';
import { View, Text } from '../Themed';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import fontsConstants from 'src/constants/fonts.constants';

type inputProps = {
    otherProps?: TextInputProps;
    onChange?: (e: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    extrastyles?: StyleProp<TextStyle>;
    err?: boolean;
    errMsg?: string;
    placeholder?: string;
    containerWidth?: string;
    textstyle?: StyleProp<TextStyle>;
}

export const Input = ({
    otherProps,
    onChange,
    onBlur,
    extrastyles,
    err,
    errMsg,
    placeholder,
    textstyle,
    containerWidth = '82%' }: inputProps) => {
    return (
        <View style={[styles.container, { width: containerWidth }]}>
            <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                style={[styles.inputField, extrastyles, textstyle]}
                {...otherProps}
            />
            {err && <Text style={[styles.error, textstyle]}>{errMsg}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    inputField: {
        backgroundColor: colorsConstants.light.lighterGrey,
        width: '100%',
        height: Platform.OS === 'android' ? 60 : 70,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 25,
        fontFamily: fontsConstants.American_Typewriter_Regular
    },
    container: {
        width: '82%',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    error: {
        color: colorsConstants.criticalRed,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 2,
        fontSize: 10,
        fontFamily: fontsConstants.Lora_Regular
    }
})