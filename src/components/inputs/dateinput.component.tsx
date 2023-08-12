import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import React, { useState } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import fontsConstants from "src/constants/fonts.constants"
import { DefaultInput, defaultInputProps } from "./inputs.components"
import moment from "moment"
import { Icon, IconProps } from "react-native-elements"

const DefaultDatePicker = ({
  value = new Date(),
  mode = "date",
  labelStyle = {},
  errorMessage,
  inputStyle = {},
  inputContainerStyle,
  containerStyle,
  calendarIconProps,
  onChange = () => null,
  label
} : defaultInputProps & {
  value: any,
  onChange?: any,
  calendarIconProps?: IconProps
  mode?: "countdown" | "date" | "time" | "datetime",
}) => {

  const [open, setOpen] = useState(false);
  
  return (
    <>
      <DefaultInput
        value={`${moment(value).format("DD-MM-YYYY")}`}
        editable={false}
        inputContainerStyle={inputContainerStyle}
        containerStyle={containerStyle}
        labelStyle={labelStyle}
        errorMessage={errorMessage}
        inputStyle={inputStyle}
        label={label}
        rightIcon={
          <Icon
            name=""
            {...calendarIconProps}
            onPress={() => setOpen(!open)}
          />
        }
      />
      {open && 
        <DateTimePicker
          value={value}
          mode={mode}
          onChange={(e: DateTimePickerEvent) => {
            setOpen(false)
            onChange(e)
          }}
        />
      }
    </>
  )
}

export default DefaultDatePicker