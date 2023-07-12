import { StyleSheet, Platform, Dimensions } from "react-native";
import colorsConstants from "src/constants/colors.constants";
import useColorScheme from "src/hooks/useColorScheme";
import fontsConstants from "src/constants/fonts.constants";

const styles = StyleSheet.create({
    border_bottom: {
        width: '100%',
        borderBottomWidth: 0.5,
        opacity: 0.20,
        
        paddingTop: -2
    },
    // border_bottom1: {
    //     width: '100%',
    //     borderBottomWidth: 0.5,
    //     opacity: 1,
    //     lineHeight: 2,
    //     borderBottomColor: colorsConstants.light.shadowText,

    // },
    container: {
        width: '100%',
        alignSelf: 'center',
        height: Dimensions.get('window').height,
        alignItems: 'center',
    },
    title: {
        fontSize: Platform.OS === 'android' ? 25 : 27,
        paddingTop: Platform.OS === 'android' ? 60 : 100,
        fontFamily: fontsConstants.Lora_Bold,
        textAlign: 'center',
    },
    success_message: {
        fontSize: Platform.OS === 'android' ? 13 : 15,
        
        textAlign: 'center',
        marginTop: 30,
        fontFamily: fontsConstants.Lora_Regular,
        marginBottom: 10
    },
    flex: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        
        fontSize: 18,
        fontFamily: fontsConstants.Roboto_Medium,
    },
    amount: {
        
        fontSize: 25,
        fontFamily: fontsConstants.Roboto_Medium,
        paddingVertical: 15,
    },
    transfer_info: {
        width: '80%',
        alignSelf: 'center',
    },
    detail: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: Platform.OS === 'android' ? 14 : 18,
    },
    recharge: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '80%',
        paddingBottom: 27
    },
    recharge1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        paddingVertical: 19,
        width: '81%',
        alignSelf: 'center',
        
        borderBottomWidth: .3
    },
    detail1: {
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    text_title: {
        fontFamily: fontsConstants.Roboto_Light,

        
        fontSize: Platform.OS === 'android' ? 15 : 18,
    },
    text_title1: {
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: Platform.OS === 'android' ? 15 : 18,
    },
    text_detail: {
        color: colorsConstants.light.textBlack,
        fontSize: Platform.OS === 'android' ? 12 : 14,
        fontFamily: fontsConstants.Roboto_Medium
    },
    text_opacity: {
        opacity: 0.60
    },
    border_width: {
        width: '80%'
    },
    button: {
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center'
    },
    text_title2: {
        // paddingBottom: 4
    },
    recharge_text: {
        fontSize: 14,
        fontFamily: fontsConstants.Roboto_Light
    }
})
export default styles;