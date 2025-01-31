import * as React from "react";
import { useContext, useState } from "react";
import { View, ImageBackground, StyleSheet, TouchableOpacity, BackHandler, Alert } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants, { screenBG } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import { DefaultInput, DefaultSelectInput } from "src/components/inputs/inputs.components";
import { LocationIcon } from "../rent/components";
import { NigerisStates } from "src/constants/nigerianstates.constants";
import useProperty from "src/hooks/useProperties";
import { showToast } from "src/components/Toast";

export default function PropertyScreen({
  navigation,
  route
}: RootStackScreenProps<"PropertyScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const { loading, createProperty, newCreateProperty, created } = useProperty()

  const [propertyAddress, setProperyAddress] = useState("")
  const [propertyName, setPropertyName] = useState("")
  const [propertyState, setPropertyState] = useState("")
  const [showAddNewBtn, setShowAddNewBtn] = useState(true)
  const [propertyId, setPropertyId] = useState("")

  React.useEffect(() => {
    if (created) {
      setShowAddNewBtn(false)
    } 
  }, [created])

  React.useEffect(() => {
    const backAction = () => {
      if (!showAddNewBtn){
        Alert.alert(`Hold On!`, `You haven't added any unit to created property`, [{
          text: `Cancel`,
        }, {
          text: `Yes, Go back`,
          onPress: () => navigation.goBack()
        }]) 
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showAddNewBtn]);
  
  const doCreateProperty = async () => {
    const req = await newCreateProperty({
      occupationalStatus: '',
      propertyLocation: propertyAddress,
      propertyName,
      propertyState,
      email: `${user.email}`
    })
    if (req?.hasError === false) {
      showToast({
        title: "Add Property",
        type: "success",
        message: req?.data?.message?.message || "Property created successfully"
      })
      setPropertyId(req?.data?.message?.propertyId || "")
  console.log(propertyId, 'idd')

    } else showToast({
      type: "error",
      title: "Add Property",
      message: req?.message || req?.statusText || "Unknown error has occured"
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={screenBG}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding / 2,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Add Property`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <DefaultInput
          placeholder={`Location`}
          value={propertyAddress}
          onChangeText={(t: string) => setProperyAddress(t)}
          leftIcon={
            <LocationIcon
              imageSize={fontsConstants.h(20)}
              containerStyle={{
                height: fontsConstants.h(40),
                width: fontsConstants.h(40),
                marginLeft: fontsConstants.w(10)
              }}
            />
          }
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={{marginLeft: fontsConstants.w(-15)}}
          containerStyle={styles.containerStyle}
        />
        <DefaultInput
          placeholder={`Title or Name`}
          value={propertyName}
          onChangeText={(t: string) => setPropertyName(t)}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />
        <DefaultSelectInput
          value={propertyState}
          items={NigerisStates}
          placeholder="State"
          setValue={setPropertyState}
          listMode="MODAL"
          searchable
          containerStyle={styles.inputContainerStyle}
        />
        {showAddNewBtn && <DefaultButton
          title={`Create`}
          onPress={doCreateProperty}
          loading={loading}
          disabled={propertyAddress === "" || propertyName === ""}
        />}
        {!showAddNewBtn && created && (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: fontsConstants.h(10)
          }}>
            {[{
              label: 'Add Units',
              color: colorsConstants.colorSuccess,
              onPress: () => {
                const propertyDetails = {
                  propertyAddress,
                  propertyName
                }
                setShowAddNewBtn(true)
                setPropertyName("")
                setProperyAddress("")
                setPropertyState("")
                navigation.navigate("AddUnitsScreen", {
                  propertyId,
                  propertyDetails
                })
              }
            }, {
              label: 'Create New Propery',
              color: colorsConstants.colorPrimary,
              onPress: () => {
                setShowAddNewBtn(true)
                setProperyAddress('')
                setPropertyName('')
                setPropertyState('')
              }
            }].map((item, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={item.onPress}
                activeOpacity={layoutsConstants.activeOpacity}
                children={
                  <Text style={{
                    color: item.color,
                    fontFamily: fontsConstants.American_Typewriter_Bold,
                    fontSize: fontsConstants.h(15)
                  }}>{item.label}</Text>
                }
              />
            ))}
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, inputContainerStyle: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colorsConstants.colorPrimary,
    backgroundColor: "transparent",
  }, containerStyle: {
    marginBottom: fontsConstants.h(20)
  }
});
