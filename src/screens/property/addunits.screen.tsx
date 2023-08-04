import * as React from "react";
import { useContext, useState } from "react";
import { Alert, BackHandler, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView, ScrollView, Text } from "src/components/Themed";
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
import { useUnits } from "src/hooks/useProperties";
import { currencyToString, formatCurrency } from "src/utils/FormatNumber";
import { Modalize } from "react-native-modalize";
import { showToast } from "src/components/Toast";

export default function AddUnitsScreen({
  navigation,
  route
}: RootStackScreenProps<"AddUnitsScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const { loading, getTypes, createUnit, fetchingTypes } = useUnits()

  const [units, setUnits] = useState<any>([])
  const [unitTypes, setUnitTypes] = useState<any>([]);
  const [unitTypeId, setunitTypeId] = useState("")
  const [unitName, setUnitName] = useState("")
  const [unitRent, setUnitRent] = useState('0.00')
  const [unitServiceCharge, setUnitServiceCharge] = useState('0.00')
  const [unitLegalCharge, setUnitLegalCharge] = useState('0.00')
  const [unitAgreementCharge, setUnitAgreementCharge] = useState('0.00')
  const [unitCommissionCharge, setUnitCommissionCharge] = useState('0.00')
  const [totalReps, setTotalReps] = useState('1');

  const modalRef = React.useRef<Modalize>(null)

  React.useEffect(() => {
    getTypes().then((res) => {
      if(res?.hasError === false ) {
        const data = [];
        for (const type of res?.data || []) {
          data.push({
            label: type?.description,
            value: type?.id
          })
        } 
        setUnitTypes(data)
      }
    })
  }, [])

  const doAddUnit = () => {
    setUnits([
      ...units,
      {
        propertyId: route?.params?.propertyId,
        unitName,
        unitRent: Number(currencyToString(unitRent)),
        unitServiceCharge: Number(currencyToString(unitServiceCharge)),
        unitLegalCharge: Number(currencyToString(unitLegalCharge)),
        unitAgreementCharge: Number(currencyToString(unitAgreementCharge)),
        unitCommissionCharge: Number(currencyToString(unitCommissionCharge)),
        totalReps,
        unitTypeId
      }
    ])
    setUnitAgreementCharge('0.00')
    setUnitLegalCharge('0.00')
    setUnitName('')
    setUnitRent('0.00')
    setUnitServiceCharge('0.00')
    setunitTypeId('')
    setUnitCommissionCharge('0.00')
    setTotalReps('1')
  }

  const getUnitTypeLabel = (id: string) => {
    for (const type of unitTypes) {
      if (type.value === id)
        return type.label
    }
    return ""
  }

  const doCreateUnits = async () => {
    const reqUnits = [];
    for (const unit of units) {
      const totalReps = Number(unit?.totalReps || '1')
      for (let i = 0; i < totalReps; i++) {
        reqUnits.push({
          ...unit
        })
      }
    }
    const req: any = await createUnit(reqUnits)
    modalRef?.current?.close()
    if (req?.data?.hasError === false) {
      setUnits([])
      showToast({
        type: "success",
        message: req?.message || req?.message?.message?.message || "Units added successfully"
      })
    } else {
      showToast({
        title: "Add Units",
        type: "error",
        message: req?.message || req?.data?.message?.message || "Unknown error occured"
      })
    }
  }

  const removeUnit = (index: number) => {
    const _newUnits = units.splice(index, 1)
    setUnits(_newUnits)
  }

  const renderCurrency = (currency: string) => {
    return <Text style={{
      fontFamily: fontsConstants.Lora_Bold,
      fontSize: fontsConstants.h(20),
      color: colorsConstants[theme].darkText,
      marginLeft: fontsConstants.w(15),
      marginRight: fontsConstants.w(-10)
    }}>{currency}</Text>
  } 

  React.useEffect(() => {
    const backAction = () => {
      if (units.length > 0){
        Alert.alert(`Hold On!`, `You have units pending for upload.\nAre you sure you want to go back?`, [{
          text: `Cancel`,
        }, {
          text: `Yes`,
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
  }, []);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{minHeight: "100%"}}
    >
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
          title={`Add Units`}
          intro={`Add units to property: ${route?.params?.propertyDetails?.propertyName}`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
          introTextStyle={{
            marginBottom: fontsConstants.h(10)
          }}
        />
        <DefaultInput
          placeholder={`Title or Name`}
          value={unitName}
          label={`Title or Name`}
          labelStyle={styles.labelStyle}
          onChangeText={(t: string) => setUnitName(t)}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />
        <DefaultSelectInput
          value={unitTypeId}
          setValue={setunitTypeId}
          label={`Unit Type`}
          labelStyle={styles.labelStyle}
          items={unitTypes}
          listMode="MODAL"
          placeholder="Unit Type"
          searchable
          loading={fetchingTypes}
          containerStyle={[styles.inputContainerStyle, {
            marginBottom: fontsConstants.h(12)
          }]}
        />
        <DefaultInput
          leftIcon={
            renderCurrency(`₦`)
          }
          keyboardType="number-pad"
          value={unitRent}
          label={`Rent Amount`}
          labelStyle={styles.labelStyle}
          onChangeText={(v: string) => setUnitRent(v)}
          onFocus={(e: any) => {
            setUnitRent(currencyToString(unitRent))
          }}
          onBlur={(e: any) => {
            setUnitRent(formatCurrency(Number(unitRent)))
          }}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />
        <View style={{
          flexDirection: "row",
        }}>
          {[{
            value: unitServiceCharge,
            setValue: setUnitServiceCharge,
            label: `Service Charge`
          }, {
            value: unitLegalCharge,
            setValue: setUnitLegalCharge,
            label: `legal Charge`
          }].map((item, index) => (
            <DefaultInput
              key={index.toString()}
              label={item.label}
              labelStyle={styles.labelStyle}
              leftIcon={
                renderCurrency(`₦`)
              }
              keyboardType="number-pad"
              value={item.value}
              onChangeText={(v: string) => item.setValue(v)}
              onFocus={(e: any) => {
                item.setValue(currencyToString(item.value))
              }}
              onBlur={(e: any) => {
                item.setValue(formatCurrency(Number(item.value)))
              }}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={[styles.containerStyle, {
                flex: 1,
                marginLeft: index === 1 ? fontsConstants.w(5) : undefined,
                marginRight: index === 0 ? fontsConstants.w(5) : undefined
              }]}
            />
          ))}
        </View>
        <View style={{
          flexDirection: "row",
        }}>
          {[{
            value: unitAgreementCharge,
            setValue: setUnitAgreementCharge,
            label: `Agreement Charge`
          }, {
            value: unitCommissionCharge,
            setValue: setUnitCommissionCharge,
            label: `Commission Charge`
          }].map((item, index) => (
            <DefaultInput
              key={index.toString()}
              label={item.label}
              labelStyle={styles.labelStyle}
              leftIcon={
                renderCurrency(`₦`)
              }
              keyboardType="number-pad"
              value={item.value}
              onChangeText={(v: string) => item.setValue(v)}
              onFocus={(e: any) => {
                item.setValue(currencyToString(item.value))
              }}
              onBlur={(e: any) => {
                item.setValue(formatCurrency(Number(item.value)))
              }}
              inputContainerStyle={styles.inputContainerStyle}
              containerStyle={[styles.containerStyle, {
                flex: 1,
                marginLeft: index === 1 ? fontsConstants.w(5) : undefined,
                marginRight: index === 0 ? fontsConstants.w(5) : undefined
              }]}
            />
          ))}
        </View>
        <DefaultInput
          value={totalReps}
          onChangeText={(t: string) => setTotalReps(t)}
          label={`How Many?`}
          keyboardType="number-pad"
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
        />
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: fontsConstants.h(10)
        }}>
          <TouchableOpacity
            onPress={doAddUnit}
            disabled={
              unitName === ""
              || unitTypeId === ''
              || Number(unitRent) === 0
            }
            activeOpacity={layoutsConstants.activeOpacity}
            children={
              <Text style={{
                color: colorsConstants.colorSuccess,
                fontFamily: fontsConstants.American_Typewriter_Bold,
                fontSize: fontsConstants.h(15)
              }}>{`Add Unit`}</Text>
            }
          />
          {units.length > 0 && 
          <TouchableOpacity
            onPress={() => modalRef?.current?.open()}
            activeOpacity={layoutsConstants.activeOpacity}
            children={
              <Text style={{
                color: colorsConstants.colorPrimary,
                fontFamily: fontsConstants.American_Typewriter_Bold,
                fontSize: fontsConstants.h(15)
              }}>{`View Added Units`}</Text>
            }
          />}
        </View>
      </ImageBackground>
      <Modalize
        ref={modalRef}
        withReactModal
        withHandle={false}
        modalStyle={{
          minHeight: '100%',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
        flatListProps={{
          data: units,
          showsVerticalScrollIndicator: false,
          renderItem: ({ item, index }) => {
            return (
              <View key={index.toString()} style={{
                borderWidth: 1,
                borderColor: colorsConstants.colorPrimary,
                borderRadius: fontsConstants.w(5),
                padding: fontsConstants.h(10),
                marginBottom: fontsConstants.h(20)
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: fontsConstants.h(5)
                }}>
                  <Text style={{
                    fontFamily: fontsConstants.Lora_Bold,
                    fontSize: fontsConstants.h(15),
                    flex: 1,
                    marginRight: fontsConstants.w(20)
                  }}>
                    {`${item?.unitName} x ${item?.totalReps}`}
                  </Text>
                  <Text
                    style={{
                      color: colorsConstants.criticalRed,
                      fontSize: fontsConstants.h(12)
                    }}
                    onPress={() => removeUnit(index)}
                  >
                    Remove
                  </Text>
                </View>
                <Text style={styles.unitDetailTextStyle2}>
                  {`Type\n`}<Text style={styles.unitDetailTextStyle}>{getUnitTypeLabel(item?.unitTypeId)}</Text>
                </Text>
                <Text style={styles.unitDetailTextStyle2}>
                  {`Rent\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitRent)}</Text>
                </Text>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}>
                  <Text style={styles.unitDetailTextStyle2}>
                    {`Service Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitServiceCharge)}</Text>
                  </Text>
                  <Text style={styles.unitDetailTextStyle2}>
                    {`Legal Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitLegalCharge)}</Text>
                  </Text>
                </View>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly"
                }}>
                  <Text style={styles.unitDetailTextStyle2}>
                    {`Agreement Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitAgreementCharge)}</Text>
                  </Text>
                  <Text style={styles.unitDetailTextStyle2}>
                    {`Commission Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitCommissionCharge)}</Text>
                  </Text>
                </View>
              </View>
            )
          },
          ListHeaderComponent: <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(20),
            marginBottom: fontsConstants.h(20)
          }}>{`Added Units`}</Text>,
          ListFooterComponent: 
            <DefaultButton
              title={`Create Units`}
              onPress={doCreateUnits}
              loading={loading}
            />,
          contentContainerStyle: {
            paddingHorizontal: fontsConstants.w(15),
            paddingTop: fontsConstants.h(10)
          }
        }}
      >

      </Modalize>
    </ScrollView>
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
    marginBottom: fontsConstants.h(30)
  }, labelStyle: {
    fontSize: fontsConstants.h(12),
    marginBottom: fontsConstants.h(2)
  }, unitDetailTextStyle: {
    fontFamily: fontsConstants.Lora_Medium,
    fontSize: fontsConstants.h(15),
  }, unitDetailTextStyle2: {
    fontSize: fontsConstants.h(13),
    flex: 1,
    marginTop: fontsConstants.h(10)
  }
});
