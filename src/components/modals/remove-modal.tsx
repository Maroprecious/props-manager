import React, { useContext, useEffect, useRef, useState } from "react"
import { DeviceEventEmitter, ModalProps, View, Pressable, StyleSheet, Platform, StyleProp, TextStyle, StatusBar, Image as RNImage } from "react-native"
import { Modal } from "react-native"
import colorsConstants from "src/constants/colors.constants"
import fontsConstants from "src/constants/fonts.constants"
import layoutsConstants from "src/constants/layouts.constants"
import AppThemeContext from "src/contexts/Theme.context"
import { Text } from "../Themed"
import { DefaultButton } from "../buttons/buttons.components"

type props = {
    text1?: string;
    text2?: string;
    text3?: string;
    textStyle?: StyleProp<TextStyle>;
    page?: any;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    feedback?: React.ReactNode,
  }
  export const RemoveModal = ({
    text1,
    text2,
    text3,
    page,
    visible,
    setVisible,
    feedback,
    textStyle
  }: props) => {
    // const navigation = useNavigation();
    const animation = useRef(null);
    const theme = useContext(AppThemeContext);
  
    return (
      <Modal
        visible={visible}
        onRequestClose={() => null}
        animationType='slide'
        transparent={true}
  
      >
    <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.title, {color: colorsConstants[theme].textBlack2}]}>End Tenancy</Text>
            <View style={{borderBottomColor: colorsConstants[theme].border_bottom, borderBottomWidth: .5, opacity: .5}}></View>
            <View style={styles.image}>
              <RNImage source={require('src/assets/images/icons/delete-icon.png')}  resizeMode='contain' style={{width: '100%', height: '100%'}} />
            </View>
            <Text style={[styles.text, {color: colorsConstants[theme].textBlack}]}>Kindly confirm your tenancy removal request.</Text>
            <View style={{borderBottomColor: colorsConstants[theme].border_bottom, borderBottomWidth: .5, opacity: .5}}></View>
            <View style={styles.buttons}>
              {feedback}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
  
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 15,
      elevation: 5,
      width: '80%',
      height: Platform.OS === 'android' ? '50%' : '45%',
      alignSelf: 'center'
    },
    title:{
      fontFamily: fontsConstants.Lora_Regular,
      fontSize: Platform.OS === 'android' ? 18 : 23,
      textAlign: 'center', 
      paddingVertical: Platform.OS === 'android' ? 7 : 10,
      paddingTop: -20
    },
    image: {
      width: Platform.OS === 'android' ? 130 : 150,
      height: Platform.OS === 'android' ? 130 : 150, 
      alignSelf: 'center', 
      paddingTop: 20
    },
    text:{
      fontSize: Platform.OS === 'android' ? 14 : 17,
      fontFamily: fontsConstants.Lora_Regular,
      textAlign: 'center',
      paddingVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        
    }
  });