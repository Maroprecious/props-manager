import * as React from 'react';
import { StyleSheet } from 'react-native';
import colorsConstants from 'src/constants/colors.constants';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      color: "red",
      fontSize: 30,
    },
    loginBg: {
    },
    overlay: {
      height: '90%',
      backgroundColor: colorsConstants.light.background,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      alignItems: 'center',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
  
    },
    header: {
      alignItems: 'center',
      marginTop: 30
    },
    headerText: {
      fontSize: 25,
      fontWeight: '600',
      color: colorsConstants.light.textBlack2
    },
    subtext: {
      color: colorsConstants.light.textLightGrey,
      fontSize: 14,
      lineHeight: 25
  
    },
    inputContainer: {
      alignItems: 'center',
      paddingBottom: 60,
    },
    terms: {
      color: colorsConstants.light.textBlack2,
      lineHeight: 20,
      marginTop: 20
    },
    term: {
      color: colorsConstants.light.textBlack2,
      lineHeight: 20,
    },
    underline: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: colorsConstants.light.darkText
    },
    button: {
      width: '80%',
      marginTop: 25
    },
    sign: {
      textAlign: 'left',
      marginLeft: -88,
      marginTop: 15,
      fontSize: 15,
      color: colorsConstants.light.darkText
    },
    underlined: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: colorsConstants.light.darkText,
      fontWeight: '900'
    },
    login: {
      color: colorsConstants.light.textLightGrey,
      lineHeight: 80,
    },
    socials: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%'
    },
    social: {
      width: '47%',
      height: 54,
      backgroundColor: colorsConstants.light.greyWhite,
      borderRadius: 10,
      shadowOpacity: 1,
      shadowColor: colorsConstants.light.shadow,
      shadowOffset: {
        height: 2,
        width: 2
      },
      shadowRadius: 7,
      elevation: 10,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icon:{
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: colorsConstants.light.greyWhite
  
    },
    socialText:{
        marginLeft: 6,
        color: colorsConstants.light.black,
        letterSpacing: .7,
        fontWeight: '200',
        opacity: .85,
        fontSize: 14
    }
  
  });
  export default styles;