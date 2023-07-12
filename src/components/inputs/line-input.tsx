import * as React from 'react';
import { View, Text } from '../Themed';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import fontsConstants from 'src/constants/fonts.constants';
import useColorScheme from 'src/hooks/useColorScheme';

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

export const LineInput = ({otherProps, onChange, onBlur, extrastyles, err, errMsg, placeholder,textstyle, containerWidth = '82%'}: inputProps) => {
    const theme = useColorScheme()
    return(
        <View style={[styles.container,  { width: containerWidth}]}>
            <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder= {placeholder}
            style={[styles.inputField, extrastyles, textstyle, {borderBottomColor: colorsConstants[theme].border_bottom,}]}
            {...otherProps}
            />
            {err && <Text style={[styles.error, textstyle, {fontFamily: fontsConstants.Lora_Regular}]}>{errMsg}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    inputField: {
        backgroundColor: 'transparent',
        width: '98%',
        height: Platform.OS === 'android' ? 60 : 65,
        alignSelf: 'center',
        borderBottomWidth: 0.7,
        fontFamily: fontsConstants.Lora_Bold,
        position: 'relative',
        paddingLeft: 13

    },
    container: {
        alignItems: 'center',
        backgroundColor: 'transparent', 
        position: 'relative',
        alignSelf: 'center'

    },
    error:{
        color: colorsConstants.criticalRed,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 2,
        fontSize: 10
    },
})