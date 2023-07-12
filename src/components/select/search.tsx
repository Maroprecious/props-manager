import React, { useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Text } from "../Themed";
import useColorScheme from "src/hooks/useColorScheme";
import fontsConstants from "src/constants/fonts.constants";
import {
    StyleSheet,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
// import { IText } from "../Text";
import colorsConstants from "src/constants/colors.constants";


export type optionProps = {
    label: string;
    value: string;
};

type selectProps = {
    options: optionProps[];
    search?: boolean;
    err?: boolean;
    errMsg?: string;
    extraStyles?: StyleProp<ViewStyle>;
    textstyle?: StyleProp<TextStyle>
    placestyle?: StyleProp<TextStyle>
    placeholder?: string;
    searchPlaceholder?: string;
    onChange: (e: optionProps) => void;
};

export const SelectBar = ({
    
    options,
    search = false,
    onChange,
    err,
    errMsg,
    placeholder,
    extraStyles,
    textstyle,
    searchPlaceholder,
    placestyle

}: selectProps) => {
    const [value, setValue] = useState<any>(null);
    const [isFocus, setIsFocus] = useState(false);
    const theme = useColorScheme();
    const [selected, setSelected] = useState([]);

    const renderItem = (item:optionProps) => {
        console.log(item)
        return (
          <View style={{marginVertical: 17, }}>
            <Text style={styles.selectedTextStyle}>{item?.label}</Text>
          </View>
        );
      };

    return (
        <View style={[{ width: "100%", marginBottom: 20, }, extraStyles]}>
         <Dropdown
        style={
          [styles.dropdown, {borderColor: colorsConstants[theme].border_bottom,}]
        }
        placeholderStyle={[styles.placeholderStyle, placestyle, {color: colorsConstants[theme].darkText}]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={[styles.inputSearchStyle, {borderColor: colorsConstants[theme].background, borderBottomColor: colorsConstants[theme].border_bottom}]}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={{backgroundColor: colorsConstants[theme].opaqueWhite}}
        data={options}
        maxHeight={300}
        search={true}
        labelField="label"
        valueField="value"
        placeholder={ placeholder}
        searchPlaceholder={searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setValue(item.value);
        }}
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
        backgroundColor: 'transparent',
    },
    dropdown: {
        height: 55,
        borderBottomWidth: 0.5,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
    },
    icon: {
        marginRight: 5,
    },

    placeholderStyle: {
        fontSize: 12,
        fontFamily: fontsConstants.Lora_Regular,
        paddingLeft: 10,
        
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: fontsConstants.Lora_Bold,
        color: '#061825',
        paddingLeft: 12,
        borderBottomWidth: 0.5,
        marginTop: -8,
        borderColor: colorsConstants.light.background,
    },
    itemTextStyle:{
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 12
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
        fontFamily: fontsConstants.Lora_Regular,
        borderBottomWidth: 0.5,
    },
    label_tag: {
        // color: colors.black,
        fontSize: 12,
        paddingBottom: 5,

        // marginTop: 20,
    },
    flex: {
        flexDirection: "row",
        // justifyContent: 'center',
        // alignItems: 'center'
    },
});