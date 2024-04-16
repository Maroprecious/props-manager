import * as React from "react";
import { Text } from "src/components/Themed";
import { StyleSheet, View as RNView, TouchableOpacity, } from "react-native";
import Layout from "src/components/layout/layout";
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxHooks";
import useUser from "src/hooks/useUser";
import useExpoPushToken from "src/hooks/useExpoPushToken";
import { updateUserProfileData } from "src/services/redux/slices/auth";

export default function SettingScreen({
    navigation,
    route
}: RootStackScreenProps<"SettingScreen">) {
    const theme = useColorScheme()

    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch();
    const { loading, updateProfile } = useUser();
    const pushToken = useExpoPushToken();

    const [value, setValue] = useState(user?.pushToken !== "" && user?.pushToken !== undefined)

    const setPushNotification = async (val: boolean) => {
        setValue(val)
        const req = await updateProfile({
            ...user,
            userId: user?.id || "",
            pushToken: val === true ? pushToken : ""
        })
        console.log(req, pushToken)
        if (req?.status === 200) {
            dispatch(updateUserProfileData({
                ...user,
                pushToken
            }));  
        }
    }

    return (
        <Layout goback={true} title='Settings'>
            <RNView style={styles.container}>
                <RNView>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen', {
                        email: user.email
                    })}>
                        <RNView style={styles.text_container}>
                            <Text style={[styles.text, { color: colorsConstants[theme].socialText }]}>Change Password</Text>
                            <AntDesign name="right" size={16} color={colorsConstants[theme].borderLine} />
                        </RNView>
                    </TouchableOpacity>
                    <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.3 }}></RNView>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('Setup2faScreen')}>
                        <RNView style={styles.text_container}>
                            <Text style={[styles.text, { color: colorsConstants[theme].socialText }]}>Setup 2 FA</Text>
                            <AntDesign name="right" size={16} color={colorsConstants[theme].borderLine} />
                        </RNView>
                    </TouchableOpacity> */}
                    <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.3 }}></RNView>
                    <RNView style={styles.text_container}>
                        <Text style={[styles.text, { color: colorsConstants[theme].socialText }]}>Allow Push Notifications</Text>
                        <Switch
                            value={value}
                            onValueChange={(val) => setPushNotification(val)}
                            circleSize={30}
                            innerCircleStyle={{ width: 25, height: 25, marginRight: 2, borderColor: '#00000080', borderWidth: 0.2 }}
                            renderActiveText={false}
                            renderInActiveText={false}
                            circleActiveColor={'#0FB924'}
                            backgroundActive={'rgba(15, 185, 36, 0.08)'}
                        />
                    </RNView>
                    <RNView style={{ borderBottomColor: colorsConstants[theme].borderLine, width: '100%', borderBottomWidth: 0.3 }}></RNView>
                </RNView>


            </RNView>
        </Layout>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20
    },
    text_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25
    },
    text: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 16
    }
})