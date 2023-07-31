import * as React from 'react';
import { View, Text } from '../Themed';
import { useState, useContext } from 'react';
import { StyleSheet, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import fontsConstants from 'src/constants/fonts.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import AppThemeContext from 'src/contexts/Theme.context';

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
        const theme = useContext(AppThemeContext)
    return (
        <View style={[styles.container, { width: containerWidth }]}>
            <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={colorsConstants[theme].success_message}
                style={[styles.inputField, extrastyles, {color: colorsConstants[theme].textBlack}]}
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
type props = {
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

export const InputBox = ({
    otherProps,
    onChange,
    onBlur,
    extrastyles,
    err,
    errMsg,
    placeholder,
    textstyle,
    containerWidth = '82%' }: props) => {
    const theme = useColorScheme();
    return (
        <View style={[styles.container, { width: containerWidth }]}>
            <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                style={[styled.inputField, extrastyles, textstyle, {backgroundColor: colorsConstants[theme].opaqueWhite,}]}
                {...otherProps}
            />
            {err && <Text style={[styled.error, textstyle, { fontFamily: fontsConstants.Lora_Regular }]} >{errMsg}</Text>}

            <Text style={[styled.naira, { color: colorsConstants[theme].naira }]}>₦</Text>
        </View>
    )
}
const styled = StyleSheet.create({
    inputField: {
        width: '82%',
        height: Platform.OS === 'android' ? 60 : 65,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1B2A3B1A',
        paddingLeft: 35,
        fontFamily: fontsConstants.American_Typewriter_Regular,
        position: 'relative'

    },
    container: {
        width: '82%',
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'relative'

    },
    error: {
        color: colorsConstants.light.red,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 2,
        fontSize: 10,
        marginLeft: '10%'
    },
    naira: {
        position: 'absolute',
        top: '50%',
        left: '12%',
        fontSize: 16,

    }
})