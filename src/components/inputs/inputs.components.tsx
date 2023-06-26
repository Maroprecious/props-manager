import React, { useContext, useEffect, useState } from "react"
import { TextProps, TextStyle, View, ViewStyle } from "react-native"
import { StyleProp } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Icon, Input, InputProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants"
import { countryCodes } from "src/constants/countrycodes.constants"
import fontsConstants from "src/constants/fonts.constants"
import globalConstants from "src/constants/global.constants"
import AppThemeContext from "src/contexts/Theme.context"
import { Text } from "../Themed"

export const DefaultInput = ({
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  labelStyle = {},
  ...props
} : {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
} & InputProps) => {

  const theme = useContext(AppThemeContext);

  return (
    <Input
      placeholderTextColor={colorsConstants[theme].inputPlaceHolderColor}
      inputStyle={{
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingHorizontal: fontsConstants.w(20),
        fontSize: fontsConstants.w(14)
      }}
      cursorColor={colorsConstants[theme].screenIntro}
      inputContainerStyle={{
        height: inputHeight,
        backgroundColor: colorsConstants[theme].inputBackground,
        borderRadius: fontsConstants.h(10),
        borderBottomWidth: 0
      }}
      labelStyle={[{
        color: colorsConstants[theme].screenLabel,
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.w(15),
        marginBottom: fontsConstants.h(10)
      }, labelStyle]}
      containerStyle={[{
        height: inputHeight,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: fontsConstants.w(30)
      }, containerStyle]}
      {...props}
    />
  )
}

export const DefaultPhoneInput = ({
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  onChangeNumber = () => null,
  ...props
} : {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  onChangeNumber?: Function
} & InputProps) => {

  const theme = useContext(AppThemeContext);
  const [code, setCode] = useState("+234");
  const [mobile, setMobile] = useState("");
  
  const onChangeText = (v: string) => {
    setMobile(v)
    onChangeNumber(`${code}${Number(mobile)}`)
  }

  const onChangeCode = (v: string) => {
    onChangeNumber(`${v}${Number(mobile)}`)
  }

  return (
    <Input
      leftIcon={
        <DefaultSelectInput
          items={countryCodes}
          value={code}
          setValue={setCode}
          searchable
          searchPlaceholder={`Search...`}
          onChangeValue={onChangeCode}
          itemKey="country"
          labelProps={{
            numberOfLines: 1
          }}
          containerStyle={{
            maxWidth: fontsConstants.w(80),
            marginBottom: 0
          }}
          dropDownContainerStyle={{
            minWidth: fontsConstants.w(100),
            maxHeight: fontsConstants.h(250)
          }}
          listMode="MODAL"
        />
      }
      value={mobile}
      placeholderTextColor={colorsConstants[theme].inputPlaceHolderColor}
      inputStyle={{
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingHorizontal: fontsConstants.w(20),
        fontSize: fontsConstants.w(14)
      }}
      onChangeText={onChangeText}
      inputContainerStyle={{
        height: inputHeight,
        backgroundColor: colorsConstants[theme].inputBackground,
        borderRadius: fontsConstants.h(10),
        borderBottomWidth: 0
      }}
      containerStyle={[{
        height: inputHeight,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: fontsConstants.w(30)
      }, containerStyle]}
      {...props}
    />
  )
}

export const DefaultSelectInput = ({
  items = [{
    label: "Item 1",
    value: "item 1"
  }],
  value = "item 1",
  setValue,
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  listMode,
  placeholder = "Select",
  dropDownDirection = "AUTO",
  dropDownContainerStyle,
  searchable = false,
  searchPlaceholder,
  onSelectItem = () => null,
  onChangeValue = () => null,
  itemKey = "value",
  renderListItem,
  labelProps,
  wrapperStyle,
  label,
  labelStyle,
} : {
  value: string | number
  items: {
    label: string,
    value: string | number
  }[],
  setValue?: any;
  inputHeight?: number;
  containerStyle?: StyleProp<ViewStyle>
  dropDownContainerStyle?: StyleProp<ViewStyle>
  listMode?: "MODAL" | "FLATLIST" | "SCROLLVIEW" | undefined
  placeholder?: string
  searchable?: boolean
  dropDownDirection?: "AUTO" | "BOTTOM" | "TOP" | "DEFAULT"
  searchPlaceholder?: string
  onSelectItem?: Function;
  onChangeValue?: Function;
  itemKey?: string
  renderListItem?: any
  labelProps?: TextProps
  wrapperStyle?: StyleProp<ViewStyle>
  label?: string
  labelStyle?: StyleProp<TextStyle>
}) => {

  const theme = useContext(AppThemeContext);

  const [open, setOpen] = useState(false);

  return (
    <View style={[{}, wrapperStyle]}>
      {label ? (
        <Text style={[{
          color: colorsConstants[theme].screenLabel,
          fontFamily: fontsConstants.Lora_Bold,
          fontSize: fontsConstants.w(15),
          marginBottom: fontsConstants.h(10)
        }, labelStyle]}>{label}</Text>
      ) : null}
      <DropDownPicker
        open={open}
        value={value}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={(v: any) => onSelectItem(v)}
        onChangeValue={(v: any) => onChangeValue(v)}
        placeholder={placeholder}
        listMode={listMode}
        itemKey={itemKey}
        renderListItem={renderListItem}
        dropDownDirection={dropDownDirection}
        theme={theme === "dark" ? `DARK` : `LIGHT`}
        placeholderStyle={{
          color: colorsConstants[theme].inputPlaceHolderColor
        }}
        labelProps={labelProps}
        containerStyle={[{
          height: inputHeight,
          backgroundColor: colorsConstants[theme].inputBackground,
          marginBottom: fontsConstants.w(30),
          borderRadius: fontsConstants.h(10),
          borderBottomLeftRadius: open ? fontsConstants.h(0) : undefined,
          borderBottomRightRadius:  open ? fontsConstants.h(0) : undefined,
          borderColor: open ? colorsConstants[theme].borderLine : undefined,
          borderWidth: open ? fontsConstants.h(1) : undefined
        }, containerStyle]}
        textStyle={{
          fontFamily: fontsConstants.American_Typewriter_Regular,
          fontSize: fontsConstants.w(14)
        }}
        selectedItemLabelStyle={{
          color: theme === "dark" ? 
            colorsConstants.colorWhite :
            colorsConstants[theme].darkText,
        }}
        labelStyle={{
          color: theme === "dark" ? 
            colorsConstants.colorWhite :
            colorsConstants[theme].darkText,
        }}
        style={{
          backgroundColor: "transparent",
          borderColor: "transparent",
          height: inputHeight,
        }}
        dropDownContainerStyle={[{
          borderColor: colorsConstants[theme].borderLine,
        }, dropDownContainerStyle]}
        TickIconComponent={ ({style}) =>
          <Icon
            name="checkmark"
            type="ionicon" 
            size={fontsConstants.w(13)}
          />
        }
        ArrowDownIconComponent={ ({style}) =>
          <Icon
            name='chevron-down'
            type='ionicon'
            size={fontsConstants.w(13)}
          />
        }
        ArrowUpIconComponent={ ({style}) =>
          <Icon
            name='chevron-up'
            type='ionicon'
            size={fontsConstants.w(13)}
          />
        }
      />
    </View>
  )
}