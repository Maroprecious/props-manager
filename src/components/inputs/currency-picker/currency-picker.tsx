import * as React from 'react';
import { View, Text } from 'src/components/Themed';
import { StyleSheet, TextInput, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData, StyleProp, ViewStyle } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';
import { FontAwesome } from '@expo/vector-icons';
import fontsConstants from 'src/constants/fonts.constants';
import useColorScheme from 'src/hooks/useColorScheme';


type inputProps = {
    otherProps?: TextInputProps;
    onChange?: (e: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    extrastyles?: StyleProp<ViewStyle>;
    err?: boolean;
    errMsg?: string;
    placeholder?: string;
}


export const CurrencyPicker = ({
    otherProps,
    onChange,
    onBlur,
    extrastyles,
    err,
    errMsg,
    placeholder }: inputProps) => {

    const theme = useColorScheme()
    return (
        <View style={styles.container}>
            <View style={styles.iconbg}>
                <Text style={styles.iconbgText}>₦ (NGN)</Text>
                <FontAwesome name="angle-down" style={styles.arrow} size={18} color={colorsConstants[theme].textblackopacity} />
            </View>
            <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={colorsConstants.light.grey3}
                style={[styles.inputField, extrastyles]}
                {...otherProps}
            />
            {err && <Text style={styles.error}>{errMsg}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    inputField: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        paddingLeft: 115,
        fontFamily: fontsConstants.Lora_Regular,
        color: colorsConstants.light.grey3,
        fontSize: 14,
        alignSelf: 'center',
        position: 'relative',
        backgroundColor: colorsConstants.light.lighterGrey,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        marginTop: 2,
        position: 'relative',
    },
    error: {
        color: colorsConstants.light.red,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 4,
        fontSize: 12,
        fontFamily: fontsConstants.Lora_Regular
    },
    iconbg: {
        width: 110,
        height: 70,
        backgroundColor: colorsConstants.light.grey2,
        borderRadius: 12,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        flexDirection: 'row'
    },
    iconbgText: {
        color: colorsConstants.light.darkText,
        fontSize: 15,
        fontFamily: fontsConstants.Lora_Regular
    },
    arrow: {
        marginLeft: 5
    }
})