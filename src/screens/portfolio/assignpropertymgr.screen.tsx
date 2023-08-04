import React, { useContext, useState, useEffect } from "react";
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
import colorsConstants from "src/constants/colors.constants";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import Layout from "src/components/layout/layout";
import { Input } from "src/components/inputs/input-box";
import { useFormik } from "formik";
import { AssignManagerSchema } from "src/utils/schema";
import * as Yup from 'yup';
import { Success } from "src/components/modals/alert.modals";
import { Select } from "src/components/select/select";
import { RenderAddTenancyButton } from "../property/components";



const roles = [
    {
        label: 'Manager',
        value: "2"
    },
    {
        label: 'Owner',
        value: "3"
    },
]
export default function AssignPropertyManager({
    navigation,
    route
}: RootStackScreenProps<"AssignPropertyManager">) {
    const theme = useContext(AppThemeContext);

    const [selected, setSelected] = useState<any>({ id: -1 })
    const [visible, setVisible] = useState<boolean>(false)

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        errors,
        touched,
        setFieldValue,
        isValid
    } = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            mobile: '',
            email_id: '',
            role: ""
        },
        validationSchema: AssignManagerSchema,
        onSubmit: async (values) => {
            setVisible(true)
        },
    });

console.log(errors)
    return (
        <ScrollView>

            <Layout title="Assign Property Manager" goback={true}>
            {visible &&
                    <Success
                        visible={visible}
                        setVisible={setVisible}
                        textStyle={{ width: Platform.OS === 'android' ? '75%' : '70%' }}
                        text1='Manager Record Saved'
                        text2='You have successfully updated property manager’s record.'
                        feedback={
                            <View style={{width: '100%'}}>
                                <DefaultButton
                                 title={`Go to Portfolio`}
                                   titleStyle={{fontSize: Platform.OS === 'android' ? 20 : 24}}
                                 containerStyle={{
                                   width: '83%',
                                   alignSelf: 'center'
                                }}
                                  onPress={() => {
                                    setVisible(false)

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
                            height: 250,
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
                                        <View style={[styles.image_container, { backgroundColor: colorsConstants[theme].grey2 }]}>
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
                                                {item.address}
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
                                <RenderAddTenancyButton />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.manager_info, { backgroundColor: colorsConstants[theme].inputBackground }]}>
                        <View style={styles.input_text}>
                            <Text style={[styles.label, {color: colorsConstants[theme].modalBg}]}>Manager’s First Name:</Text>
                            <View style={styles.input_container}>
                                <Input
                                    onChange={handleChange("firstname")}
                                    onBlur={handleBlur("firstname")}
                                    placeholder="Enter first name"
                                    containerWidth='100%'
                                    extrastyles={{ alignSelf: 'flex-end', backgroundColor: 'transparent', height: 27, fontFamily: fontsConstants.Lora_Regular }}
                                //  textstyle={styles.error} 
                                />
                            </View>
                        </View>

                        <View style={styles.input_text}>
                            <Text style={[styles.label, {color: colorsConstants[theme].modalBg}]}>Manager’s Last Name:</Text>
                            <View style={styles.input_container}>
                                <Input
                                    onChange={handleChange("lastname")}
                                    onBlur={handleBlur("lastname")}
                                    placeholder="Enter last name"
                                    containerWidth='100%'
                                    extrastyles={{ alignSelf: 'flex-end', backgroundColor: 'transparent', height: 27, fontFamily: fontsConstants.Lora_Regular }}
                                //  textstyle={styles.error} 
                                />
                            </View>
                        </View>
                        <View style={styles.input_text}>
                            <Text style={[styles.label, {color: colorsConstants[theme].modalBg}]}>Manager’s Mobile:</Text>
                            <View style={styles.input_container}>
                                <Input
                                    onChange={handleChange("mobile")}
                                    onBlur={handleBlur("mobile")}
                                    placeholder="Enter mobile number"
                                    containerWidth='100%'
                                    otherProps={{keyboardType: 'number-pad'}}
                                    extrastyles={{ alignSelf: 'flex-end', backgroundColor: 'transparent', height: 27, fontFamily: fontsConstants.Lora_Regular }}
                                //  textstyle={styles.error} 
                                />
                            </View>
                        </View>
                        <View style={styles.input_text}>
                            <Text style={[styles.label, {color: colorsConstants[theme].modalBg}]}>Manager’s Email ID:</Text>
                            <View style={styles.input_container}>
                                <Input
                                    onChange={handleChange("email_id")}
                                    onBlur={handleBlur("email_id")}
                                    placeholder="Enter manager's email ID"
                                    containerWidth='100%'
                                    extrastyles={{ alignSelf: 'flex-end', backgroundColor: 'transparent', height: 27, fontFamily: fontsConstants.Lora_Regular }}
                                 textstyle={{marginLeft: 10}} 
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: '90%', paddingVertical: -10 }}>
                            <Text style={[styles.label, {color: colorsConstants[theme].modalBg, marginTop: -12}]}>Manager's Role: </Text>
                            <Select
                                options={roles}
                                placeholder='Kindly select your role'
                                dynamicPlaceholder="Kindly select your role"
                                onChange={(e) => setFieldValue('role', e.value)}
                                containerStyles={{ backgroundColor: 'transparent', marginTop: 3 }}
                                textstyle={{ marginBottom: -3, marginLeft: 10 }}
                                extraStyles={{ width: '67%', alignSelf: 'flex-end' }}
                            />
                        </View>
                    </View>
                    <DefaultButton
                        title={`Save Manager`}
                        titleStyle={{ fontSize: Platform.OS === 'android' ? 20 : 20 }}
                        onPress={() => handleSubmit()}
                        containerStyle={{
                            marginHorizontal: fontsConstants.w(30),
                            marginTop: 40
                        }}
                    />
                </View>

            </Layout>
        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '92%',
        alignSelf: 'center',
        height: '100%',
        paddingBottom: 100,
    },
    image_container: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10

    },
    manager_info: {
        paddingVertical: 10,
        width: '100%',
        alignSelf: 'center',
        height: 300,
        justifyContent: 'space-between'

    },
    input_container: {
        justifyContent: 'flex-end',
        width: '60%',
        alignSelf: 'flex-end',
        height: 25
    },
    input_text: {
        flexDirection: 'row',
         justifyContent: 'space-between', 
         alignItems: 'center', 
         width: '90%', 
         alignSelf: 'center',
         borderBottomColor: colorsConstants.light.border_bottom,
         borderBottomWidth: .17,
         paddingVertical: 15
    },
    label:{
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 14
    }
});
