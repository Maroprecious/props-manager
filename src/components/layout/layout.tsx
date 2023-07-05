import * as React from 'react';
import { SafeAreaView, ScrollView, View, Text } from '../Themed';
import { ImageBackground, StyleSheet, Image, TouchableOpacity, Platform, Dimensions , TextStyle, StyleProp} from 'react-native';
import { useContext } from 'react';
import AppThemeContext from "src/contexts/Theme.context";
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colorsConstants from 'src/constants/colors.constants';
import fontsConstants from "src/constants/fonts.constants";


type props = {
    children: React.ReactNode;
    goback?: boolean;
    title?: string,
    textstyle?: StyleProp<TextStyle>
}
const Layout = ({ children, goback, title, textstyle}: props) => {
    const theme = useContext(AppThemeContext);

    const navigation = useNavigation()
    return (
        <ImageBackground source={require('../../assets/images/backgrounds/background.png')} resizeMode='cover' style={styles.container}>
            {
                goback && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back_button}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
            }
            {
                title && <Text style={[styles.title, {color: colorsConstants[theme].textBlack2 }, textstyle]}>{title}</Text>
            }
            {children}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        // borderWidth: 2
    },
    back_button: {
        marginTop: Platform.OS === 'android' ? 55 : 65,
        marginLeft: 16,
        backgroundColor: 'transparent'
    },
    title: {
        textAlign: 'center',
        fontSize: 26,
        paddingTop: Platform.OS === 'android' ? 10 : 17,
        backgroundColor: 'transparent',
        fontFamily: fontsConstants.Lora_Bold
    },
})
export default Layout;