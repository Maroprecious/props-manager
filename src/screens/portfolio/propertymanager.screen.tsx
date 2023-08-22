import React, { useContext, useState } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Platform
} from "react-native";
import { Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants, { DefaultDocuments, Tenancies } from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { LocationIcon } from "../rent/components";
import { Entypo } from "@expo/vector-icons";
import Layout from "src/components/layout/layout";
import { RemoveModal } from "src/components/modals/remove-modal";
import { Success } from "src/components/modals/alert.modals";
import { RenderAddButton } from "../property/components";

export default function PropertyManagerScreen({
    navigation,
    route
}: RootStackScreenProps<"PropertyManagerScreen">) {
    const theme = useContext(AppThemeContext);
    const [remove, setRemove] = useState(false)
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState<any>({ id: -1 })

    return (
            <Layout title="Property Manager" goback={true}>


                <View style={styles.container}>
                    <View style={{
                    }}>
                        <Text style={{
                            fontFamily: fontsConstants.Lora_Bold,
                            fontSize: fontsConstants.h(13.5),
                            color: colorsConstants[theme].screenLabel,
                            marginBottom: fontsConstants.h(10),
                            marginTop: 30,

                        }}>
                            {`Listed Properties`}
                        </Text>
                        <View style={{
                            borderWidth: fontsConstants.h(1),
                            borderColor: colorsConstants.colorPrimary,
                            padding: fontsConstants.w(14),
                            marginBottom: fontsConstants.h(20),
                            height: 235,
                            borderRadius: 33,
                            justifyContent: 'space-between'
                        }}>
                            {Tenancies.map((item, index) => (
                                <React.Fragment key={item.id.toString()}>
                                    <View

                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: fontsConstants.h(10)
                                        }}
                                    >
                                        <View style={[styles.image_container, {backgroundColor: colorsConstants[theme].grey2}]}>
                                            <Image source={require('src/assets/images/icons/human-icon.png')} />
                                        </View>
                                        <View style={{
                                            marginHorizontal: fontsConstants.w(10),
                                            flex: 1
                                        }}>
                                            <Text style={{
                                                fontFamily: fontsConstants.Lora_Bold,
                                                fontSize: fontsConstants.h(14),
                                                color: colorsConstants[theme].screenLabel,
                                            }}>
                                                {`Property Location`}
                                            </Text>
                                            <Text style={{
                                                fontFamily: fontsConstants.Lora_Regular,
                                                fontSize: fontsConstants.h(11.4),
                                                color: colorsConstants[theme].address,
                                            }}>
                                                {item.propertyLocation}
                                            </Text>
                                            <Text style={{
                                                fontFamily: fontsConstants.Lora_Regular,
                                                fontSize: fontsConstants.h(11),
                                                color: colorsConstants[theme].address,
                                            }}>
                                                No manager added
                                            </Text>
                                        </View>
                                        <DefaultRadiobox
                                            checked={selected?.id === item.id}
                                            checkedColor={colorsConstants.radioBoxActive}
                                            size={fontsConstants.w(20)}
                                            label={`Select`}
                                            onPress={() => setSelected(item)}
                                        />
                                    </View>
                                    <View style={{ borderBottomColor: colorsConstants[theme].dropShadow, borderWidth: .4, opacity: 0.13 }}></View>
                                </React.Fragment>
                            ))}
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: fontsConstants.h(20),
                            }}>
                                <Text style={{
                                    fontFamily: fontsConstants.Lora_Regular,
                                    fontSize: fontsConstants.h(13),
                                    color: colorsConstants[theme].address,

                                }}>
                                    {`No additional property record found`}
                                </Text>
                                <RenderAddButton />
                            </View>
                        </View>
                    </View>
                  
                   <View style={{width: '100%', height: '50%'}}>
                   <DefaultButton
                        title={`Assign New Manager`}
                        titleStyle={{fontSize: Platform.OS === 'android' ? 18 : 20}}
                        onPress={() => navigation.navigate("AssignPropertyManager")}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            position: 'absolute',
                            bottom: Platform.OS === 'android' ? '33%' : '25%',
                            width: '90%',
                            alignSelf: 'center'
                        }}
                    />
                      <DefaultButton
                        title={`Remove Manager`}
                        type="outline"
                        buttonStyle={{borderColor: colorsConstants.criticalRed}}
                        titleStyle={{fontSize: Platform.OS === 'android' ? 18 : 20, color: colorsConstants.criticalRed}}
                        onPress={() => setRemove(true)}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            position: 'absolute',
                            bottom: Platform.OS === 'android' ? '10%' : '1%',
                            width: '90%',
                            alignSelf: 'center'
                        }}
                    />
                    {remove && 
                    <RemoveModal 
                    visible={remove}
                    setVisible={setRemove}
                    feedback={
                        <View style={styles.buttons}>
                            <DefaultButton title={`Cancel`}
                             type='clear' 
                             titleStyle={{fontSize: 20,fontFamily: fontsConstants.Lora_Bold}}
                             onPress={() => setRemove(false)}></DefaultButton>
                            <DefaultButton title={`Confirm`} 
                            type="solid"
                            titleStyle={{fontSize: 20, fontFamily: fontsConstants.Lora_Bold}}
                            containerStyle={{ marginHorizontal: fontsConstants.w(0), width: '65%', height: 80}}
                            buttonStyle={{backgroundColor: colorsConstants.criticalRed, borderRadius: 12, marginTop: 7}}
                            buttonHeight={65}
                            
                            onPress={() => {
                                setRemove(false)
                                if (Platform.OS == 'ios') {
                                    setTimeout(() => {
                                    setShow(true)
                                    }, 200);
                                } else {
                                    setShow(true)
                                }

                            }}></DefaultButton>
                        </View>
                    }
                
                />}
                    {show && 
                        <Success
                        visible={show}
                        setVisible={setShow}
                        textStyle={{ width: Platform.OS === 'android' ? '75%' : '70%' }}
                        text1='Tenant Details Removed'
                        text2='You have successfully removed the selected tenancy details.'
                        feedback={
                            <View style={{width: '100%'}}>
                                <DefaultButton
                                 title={`Go to Portfolio`}
                                   titleStyle={{fontSize: 24}}
                                 containerStyle={{
                                   width: '86%',
                                   alignSelf: 'center'
                                }}
                                  onPress={() => {

                                    if (Platform.OS == 'ios') {
                                        setTimeout(() => {
                                            navigation.navigate('PortfolioTabScreen')
                                        }, 200);
                                    } else {
                                        navigation.navigate('PortfolioTabScreen')
                                    }
                                    

                                }}></DefaultButton>
                            </View>
                        }
                    />
                    }
                   </View>
                </View>

            </Layout >


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        height: '100%',
    },
    image_container:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', 
        marginTop: 20,
        width: '90%'

    }
});
