import * as React from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View, StyleProp, ViewStyle, TextStyle, Platform } from "react-native";
import useColorScheme from "src/hooks/useColorScheme";
import { Text } from "../Themed";
import colorsConstants from "src/constants/colors.constants";
import { string } from "yup";
import AppThemeContext from "src/contexts/Theme.context";
import { useEffect, useState, useContext } from "react";
import fontsConstants from "src/constants/fonts.constants";

export type optionProps = {
    label: string;
    // item?: {label:string} | undefined
    value: string;
};

type selectProps = {
    options: optionProps[];
    search?: boolean;
    onChange: (e: optionProps) => void;
    err?: boolean;
    errMsg?: string;
    extraStyles?: StyleProp<ViewStyle>;
    containerStyles?: StyleProp<ViewStyle>;
    placeholder?: string;
    containerWidth?: string;
    fontFamily?: string;
    bgColor?: string,
    defaultValue?: string | null;
    textstyle?: StyleProp<TextStyle>;
    dynamicPlaceholder?: string
};

export const Select = ({
    options,
    search = false,
    onChange,
    err,
    errMsg,
    extraStyles,
    placeholder,
    containerWidth,
    fontFamily,
    bgColor,
    defaultValue = '',
    textstyle,
    containerStyles,
    dynamicPlaceholder,
}: selectProps) => {
    const [value, setValue] = useState<string | null>(defaultValue);
    const [isFocus, setIsFocus] = useState(false);
    const renderItem = (item: optionProps) => {
        console.log(item)
        return (
            <View style={{ marginVertical: 17, }}>
                <Text style={[styles.selectedTextStyle, { fontFamily: fontsConstants.American_Typewriter_Regular, color: colorsConstants[theme].grey3 }]}>{item?.label}</Text>
            </View>
        );
    };
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue)
        }
    }, [defaultValue])
    const theme = useColorScheme()

    return (
        <View style={[{ width: "100%", marginBottom: 20 }, extraStyles]}>
            <Dropdown
                style={[styles.dropdown, {backgroundColor: colorsConstants[theme].inputBackground},{ width: containerWidth }, isFocus && { borderColor: colorsConstants[theme].grey }, containerStyles]}
                placeholderStyle={[styles.placeholderStyle, { fontFamily: fontsConstants.American_Typewriter_Regular, color: colorsConstants[theme].success_message}, textstyle]}
                selectedTextStyle={[styles.selectedTextStyle, { fontFamily: fontsConstants.American_Typewriter_Regular, color: colorsConstants[theme].textBlack } ]}
                data={options}
                maxHeight={300}
                search={search}

                labelField={'label'}
                valueField={'value'}
                itemContainerStyle={[{ backgroundColor: colorsConstants[theme].inputBackground}, containerStyles]}
                placeholder={
                    !isFocus ? (placeholder ? placeholder : "Select Status") : dynamicPlaceholder
                }
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    onChange(item);
                    setValue(item.value);
                    setIsFocus(false);
                }}
                
                iconStyle={styles.iconStyle}

                renderItem={renderItem}

            />
            {err && (
                <Text style={[{ color: colorsConstants.criticalRed, fontSize: 10, paddingLeft: '10%', marginTop: -2 }, textstyle]}>
                    {errMsg}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 30,
    },
    dropdown: {
        width: '82%',
        height: Platform.OS === 'android' ? 60 : 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10,
        paddingLeft: 10,
        borderColor: colorsConstants.light.borderLine,
        borderWidth: .6,
        fontFamily: fontsConstants.American_Typewriter_Regular,
        alignSelf: 'center',

        // marginBottom: 20,
    },
    iconStyle: {
        marginRight: 20,
        paddingRight: 30,
    },
    label: {
        position: "absolute",
        // backgroundColor: colorsConstants[theme].background,
        borderWidth: 2,
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 19,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingLeft: 25,
        opacity: 0.80,
    },
    selectedTextStyle: {
        fontSize: 18,
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingLeft: 20,
        letterSpacing: .5
    },
    icon: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
    label_tag: {
        color: colorsConstants.light.darkText,
        fontSize: 12,
        paddingBottom: 5,
    },
});