import { StyleSheet } from "react-native";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";

const styles = StyleSheet.create({

    container: {
      width: '94%',
      // height: '100%',
      paddingBottom: 60,
      textAlign: 'center',
      alignSelf: 'center',
    },
    title: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 27,
      paddingTop: 30,
  
    },
    input: {
      alignSelf: 'center',
      width: '100%',
      height: 70
    },
    input2: {
      alignSelf: 'center',
      width: '100%',
      height: 70,
      marginTop: 20
    },
    select_Container: {
      marginTop: 60
    },
    select_Container1: {
      marginTop: 2,
    },
    selectOption: {
      marginTop: -20,
    },
    selectDate: {
      marginTop: -2,
      width: '94%',
      alignSelf: 'center',
      borderRadius: 12
    },
    selectDate1: {
      marginTop: 17,
      width: '94%',
      alignSelf: 'center',
      borderRadius: 12
    },
    text_input: {
      marginLeft: 20,
      backgroundColor: colorsConstants.light.lighterGrey,
      alignSelf: 'center',
      fontFamily: fontsConstants.Lora_Regular
    },
    back_button:{
        marginTop: 80,
    }
  })
  export default styles;