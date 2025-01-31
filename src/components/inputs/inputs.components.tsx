import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, TextProps, TextStyle, View, ViewStyle } from "react-native"
import { StyleProp } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Icon, Input, InputProps } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants"
import { countryCodes } from "src/constants/countrycodes.constants"
import fontsConstants from "src/constants/fonts.constants"
import globalConstants from "src/constants/global.constants"
import AppThemeContext from "src/contexts/Theme.context"
import { Text } from "../Themed"

const defaultErrorMessageStyle = {
  marginTop: fontsConstants.h(0),
  fontFamily: fontsConstants.space_mono,
  fontSize: fontsConstants.h(12),
  color: colorsConstants.colorDanger
}

export type defaultInputProps = {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  secureTextEntry?: boolean
} & InputProps

export const DefaultInput = ({
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  labelStyle = {},
  secureTextEntry = false,
  errorMessage,
  inputContainerStyle = {},
  inputStyle = {},
  ...props
} : defaultInputProps) => {

  const theme = useContext(AppThemeContext);
  const [showEntry, setShowEntry] = useState(secureTextEntry);

  return (
    <Input
      placeholderTextColor={colorsConstants[theme].inputPlaceHolderColor}
      inputStyle={[{
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingHorizontal: fontsConstants.w(20),
        fontSize: fontsConstants.w(14),
        color: colorsConstants[theme].darkText
      }, inputStyle]}
      cursorColor={colorsConstants[theme].screenIntro}
      inputContainerStyle={[{
        height: inputHeight,
        backgroundColor: colorsConstants[theme].inputBackground,
        borderRadius: fontsConstants.h(10),
        borderBottomWidth: errorMessage ? fontsConstants.h(1) : 0,
        borderColor: errorMessage ? colorsConstants.colorDanger : undefined,
        borderWidth: errorMessage ? fontsConstants.h(1) : undefined
      }, inputContainerStyle]}
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
      rightIcon={ secureTextEntry ? (
        <Icon
          name={showEntry ? `eye-off` : `eye`}
          type="ionicon"
          onPress={() => setShowEntry(!showEntry)}
          size={fontsConstants.h(20)}
          color={showEntry ? colorsConstants[theme].inputPlaceHolderColor : colorsConstants[theme].darkText}
          containerStyle={{
            marginRight: fontsConstants.w(10)
          }}
        />
      ) : undefined}
      {...props}
      errorMessage={errorMessage}
      secureTextEntry={showEntry}
      errorStyle={defaultErrorMessageStyle}
    />
  )
}

export const DefaultPhoneInput = ({
  inputHeight = globalConstants.componentHeight,
  containerStyle = {},
  labelStyle = {},
  onChangeNumber = () => null,
  errorMessage,
  selectedCode,
  value,
  ...props
} : {
  inputHeight?: number
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onChangeNumber?: Function
  selectedCode?: string
  value?: string
} & InputProps) => {

  const theme = useContext(AppThemeContext);
  const [code, setCode] = useState(selectedCode || "+234");
  const [mobile, setMobile] = useState(value || "");
  
  const onChangeText = (v: string) => {
    setMobile(v)
    onChangeNumber(`${code}(0)${Number(v)}`)
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
          showErrorMessage={false}
        />
      }
      value={mobile}
      placeholderTextColor={colorsConstants[theme].inputPlaceHolderColor}
      inputStyle={{
        fontFamily: fontsConstants.American_Typewriter_Regular,
        paddingHorizontal: fontsConstants.w(20),
        fontSize: fontsConstants.w(14),
        color: colorsConstants[theme].darkText
      }}
      onChangeText={onChangeText}
      inputContainerStyle={{
        height: inputHeight,
        backgroundColor: colorsConstants[theme].inputBackground,
        borderRadius: fontsConstants.h(10),
        borderBottomWidth: errorMessage ? fontsConstants.h(1) : 0,
        borderColor: errorMessage ? colorsConstants.colorDanger : undefined,
        borderWidth: errorMessage ? fontsConstants.h(1) : undefined
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
      keyboardType="number-pad"
      errorMessage={errorMessage}
      errorStyle={defaultErrorMessageStyle}
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
  errorMessage,
  showErrorMessage = true,
  loading = false,
  errorMessageStyle = {},
  disabled = false,
  disabledItemLabelStyle = {}
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
  errorMessage?: string
  showErrorMessage?: boolean
  loading?: boolean
  errorMessageStyle?: StyleProp<TextStyle>
  disabledItemLabelStyle?: StyleProp<TextStyle>
  disabled?: boolean
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
        activityIndicatorColor={colorsConstants.colorPrimary}
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
          borderColor: open ? colorsConstants[theme].borderLine : errorMessage && showErrorMessage ? colorsConstants.colorDanger : undefined,
          borderWidth: open || (errorMessage && showErrorMessage) ? fontsConstants.h(1) : undefined
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
        disabledItemLabelStyle={[{
          opacity: 0.5
        }, disabledItemLabelStyle]}
        TickIconComponent={ ({style}) =>
          <Icon
            name="checkmark"
            type="ionicon" 
            size={fontsConstants.w(13)}
          />
        }
        ArrowDownIconComponent={ ({style}) =>
          !loading ? 
          <Icon
            name='chevron-down'
            type='ionicon'
            size={fontsConstants.w(13)}
          /> : <ActivityIndicator
            color={colorsConstants.colorPrimary}
            size={fontsConstants.h(20)}
          />
        }
        ArrowUpIconComponent={ ({style}) =>
          !loading ? 
          <Icon
            name='chevron-up'
            type='ionicon'
            size={fontsConstants.w(13)}
          /> : <ActivityIndicator
            color={colorsConstants.colorPrimary}
            size={fontsConstants.h(20)}
          />
        }
        disabled={disabled}
      />
      {errorMessage && showErrorMessage && <Text style={[defaultErrorMessageStyle, {
        marginTop: fontsConstants.h(-20),
        marginBottom: fontsConstants.h(3)
      }, errorMessageStyle]}>
        {errorMessage}
      </Text>}
    </View>
  )
}