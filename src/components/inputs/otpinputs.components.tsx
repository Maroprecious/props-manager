import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  StyleProp,
  ViewStyle,
  Platform,
  TextStyle,
  TextInputProps
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import colorsConstants from 'src/constants/colors.constants';
import fontsConstants from 'src/constants/fonts.constants';
import AppThemeContext from 'src/contexts/Theme.context';

const OtpInput = ({
  value="",
  onChange, 
  label, 
  boxCount = 4,
  containerStyle = {},
  inputStyle = {},
  textStyle = {},
  otherProps= {},
  itemSpacing = 9,
  boxSize = fontsConstants.w(60)
}: {
  value: string;
  onChange?: (t: string) => void;
  label? : string;
  boxCount?: 4 | 6;
  otherProps?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  itemSpacing?: number;
  boxSize?: number;
}) => {

  const theme = useContext(AppThemeContext);

  let refs :any[ ];
  refs=[];
  let i =0;
   while(i < boxCount){
     refs.push(useRef<TextInput>(null));
     i++;
   }
  
  const [otp, setOtp] = useState<Array<string>>(
    value.split("") || Array<string>(refs.length).fill(''),
  );

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      if (onChange) {
        const otpV = otp.join('');
        onChange(otpV);
      }
    },
    [onChange],
  );

  function handleOnChange(e: string, index: number) {
    const updateOtp = [...otp];
    updateOtp[index] = e[0] || '';
    setOtp(updateOtp);
    handleOtpChange(updateOtp);
    if (index < refs.length + 1 && e) {
      const newIndex = index + 1;
      if (refs[newIndex]) {
        refs[newIndex].current?.focus();
      }
    }
  }

  function handleOnKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0 && otp[index].length === 0) {
        const newIndex = index - 1;
        refs[newIndex].current?.focus();
      }
    }
  }

  function renderBox(ref: React.RefObject<TextInput>, index: number) {
    const value = otp[index];
    return (
      <TouchableWithoutFeedback key={index} onPress={() => refs[index].current?.focus()}>
        <View
          key={index}
          style={[{
            height: boxSize,
            width: boxSize,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: fontsConstants.h(20),
            marginHorizontal: fontsConstants.w(itemSpacing),
            // backgroundColor: theme === "light" ? `rgba(0, 0, 0, 0.05)` : `rgba(255, 255, 255, 0.05)`,
            borderColor: theme === "light" ? colorsConstants.colorPrimary : colorsConstants.dark.text,
            borderWidth: fontsConstants.h(1)
          }, inputStyle]}>
          <TextInput
            ref={ref}
            value={value}
            keyboardType={Platform.OS === "android" ? "number-pad" : "name-phone-pad"}
            style={[{width: fontsConstants.w(20), textAlign: 'center', color: theme === "light" ? colorsConstants.colorPrimary : colorsConstants.colorWhite}, textStyle, {...otherProps}]}
            allowFontScaling={false}
            maxLength={1}
            selectionColor={colorsConstants.colorPrimary}
            selectTextOnFocus
            onKeyPress={(e) => handleOnKeyPress(e, index)}
            onChangeText={(t) => handleOnChange(t, index)}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={[{
      alignItems: "center"
    }, containerStyle]}>
      {label ? (
        <Text
          style={{
            fontSize: fontsConstants.w(13),
          }}>
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          marginTop: fontsConstants.h(18),
        }}>
        {refs.map((ref, index) => renderBox(ref, index))}
      </View>
    </View>
  );
};

export default OtpInput;
