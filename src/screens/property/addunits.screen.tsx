import * as React from "react";
import { useContext, useState } from "react";
import { Alert, BackHandler, ImageBackground, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { useUnit } from "src/contexts/unit.context";
import { useProperties } from "src/contexts/property.context";
import { Icon } from "react-native-elements";
import { showConfirm } from "src/components/modals/confirm.modals";

export default function AddUnitsScreen({
  navigation,
  route
}: RootStackScreenProps<"AddUnitsScreen">) {
  const theme = useContext(AppThemeContext);
  const { oneUnit, setOneUnit } = useUnit()
  const { property } = useProperties()

  const user = useAppSelector((state) => state.auth.user)
  const { loading, getTypes, createUnit, newCreateUnit, fetchingTypes, editUnit } = useUnits()

  const [hasPendingItem, setHasPendingItem] = useState(false);
  const [units, setUnits] = useState<any>([])
  const [unitTypes, setUnitTypes] = useState<any>([]);
  const [unitTypeId, setunitTypeId] = useState("")
  const [unitName, setUnitName] = useState("")
  const [unitRent, setUnitRent] = useState('0.00')
  const [unitServiceCharge, setUnitServiceCharge] = useState('0.00')
  const [unitLegalFee, setUnitLegalFee] = useState('0.00')
  const [unitAgreementCharge, setUnitAgreementCharge] = useState('0.00')
  const [unitCommissionCharge, setUnitCommissionCharge] = useState('0.00')
  const [unitOtherCharges, setUnitOtherCharges] = useState('0.00')
  const [totalReps, setTotalReps] = useState('1');
  const [fieldErros, setFieldErrors] = useState({
    unitName: "",
    unitTypeId: "",
    unitRent: "",
  });

  const [expandedUnit, setExpandedUnit] = useState(-1);

  const modalRef = React.useRef<Modalize>(null)

  React.useEffect(() => {
    getTypes().then((res) => {
      if (res?.hasError === false) {
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

  const getErrors = () => {
    if (unitName === "")
      setFieldErrors({...fieldErros, unitName: "Enter Unit Title"})
    else if (unitTypeId === "")
      setFieldErrors({...fieldErros, unitTypeId: "Select Unit Type"})
    else if (Number(unitRent) < 1)
      setFieldErrors({...fieldErros, unitRent: "Enter Unit Rent Fee"})
    
    if (unitName === "" || (Number(unitRent) < 1) || unitTypeId === "")
      return true
    else
      return false
  }

  React.useEffect(() => {
    setFieldErrors({
      unitName: "",
      unitTypeId: "",
      unitRent: "",
    })
  }, [unitName, unitRent, unitTypeId])

  const doAddUnit = () => {
    if (!getErrors()){
      try {
        setUnits([
          ...units,
          {
            propertyId: route?.params?.propertyId,
            unitName,
            unitRent: Number(currencyToString(unitRent)),
            unitServiceCharge: Number(currencyToString(unitServiceCharge)),
            unitLegalFee: Number(currencyToString(unitLegalFee)),
            unitAgreementCharge: Number(currencyToString(unitAgreementCharge)),
            unitCommissionCharge: Number(currencyToString(unitCommissionCharge)),
            unitOtherCharges: Number(currencyToString(unitOtherCharges)),
            totalReps,
            unitTypeId,
            saved: false
          }
        ])
        setUnitAgreementCharge('0.00')
        setUnitLegalFee('0.00')
        setUnitName('')
        setUnitRent('0.00')
        setUnitServiceCharge('0.00')
        setunitTypeId('')
        setUnitCommissionCharge('0.00')
        setUnitOtherCharges('0.00')
        setTotalReps('1')
        setHasPendingItem(true)
      } catch (error) {
        console.log(error)
      } finally {
        showToast({
          title: `Unit`,
          message: `Unit added to list`,
          type: `info`
        })
      }
    }
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
      if (unit?.saved === false) {
        const totalReps = Number(unit?.totalReps || '1')
        for (let i = 0; i < totalReps; i++) {
          reqUnits.push({
            ...unit
          })
        }
      }
    }
    const req: any = await createUnit(reqUnits)
    modalRef?.current?.close()
    if (req?.data?.hasError === false) {
      setHasPendingItem(false)
      showToast({
        title: "Units",
        type: "success",
        message: req?.message || req?.message?.message?.message || "Units added successfully"
      })

      //retain added units 
      const _units = []
      for (const unit of units) {
        _units.push({
          ...unit,
          saved: true
        });
      }
      setUnits(_units)
    } else {
      showToast({
        title: "Add Units",
        type: "error",
        message: req?.message || req?.data?.message?.message || "Unknown error occured"
      })
    }
    if (req?.errorType === "subscription" || req?.data?.errorType === "subscription")
      showConfirm({
        message: `Your current plan is not sufficient to create additional units\nWould you like to upgrade your current plan now?`,
        title: `Oops!`,
        onConfirm: () => navigation.navigate("SubScriptionScreen"),
        type: `info`,
        cancelText: `No`,
        confirmText: `Yes`
      })
  }
  const doEditUnit = async () => {
    const req: any = await editUnit({
      unitName,
      unitRent: Number(currencyToString(unitRent)),
      unitServiceCharge: Number(currencyToString(unitServiceCharge)),
      unitAgreementCharge: Number(currencyToString(unitAgreementCharge)),
      unitCommissionCharge: Number(currencyToString(unitCommissionCharge)),
      unitLegalFee: Number(currencyToString(unitLegalFee)),
      unitOtherCharges: Number(currencyToString(unitOtherCharges)),
      propertyId: property.id,
      unitTypeId: unitTypeId.toString()
    }, oneUnit.id)
    if (req?.data?.hasError === false) {
     setOneUnit({
      unitName,
      unitRent: Number(currencyToString(unitRent)),
      unitServiceCharge: Number(currencyToString(unitServiceCharge)),
      unitAgreementCharge: Number(currencyToString(unitAgreementCharge)),
      unitCommissionCharge: Number(currencyToString(unitCommissionCharge)),
      unitLegalFee: Number(currencyToString(unitLegalFee)),
      unitOtherCharges: Number(currencyToString(unitOtherCharges)),
      id: oneUnit.id,
      unitType: {
        id: unitTypeId, 
      },
      occupyingStatus: oneUnit.occupyingStatus,
      otherCharges: oneUnit.otherCharges
     })
      showToast({
        title: "Units",
        type: "success",
        message: req?.message || req?.message?.message?.message || "Units Edited successfully"
      })
      navigation.goBack()
    } else {
      showToast({
        title: "Edit Units",
        type: "error",
        message: req?.message || req?.data?.message?.message || "Unknown error occured"
      })
    }
  }

  const removeUnit = (index: number) => {
    try {
      const _units = units.filter(function(item: any, i: number) {
        return index !== i
      });
      setUnits(_units)
    } catch (error) {
      console.log(error)
    } finally {
      showToast({
        title: `Unit`,
        message: `Unit ${units[index].unitName} removed from list`,
        type: `info`
      })
    }
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
    if (route.params.actionType === 'edit' && Object.keys(oneUnit).length) {
      setUnitName(oneUnit.unitName)
      setUnitRent(Object.is(oneUnit.unitRent, null) ? '0.00': oneUnit.unitRent.toString())
      setUnitServiceCharge(Object.is(oneUnit.unitServiceCharge, null) ? '0.00': oneUnit.unitServiceCharge.toString())
      setUnitAgreementCharge(Object.is(oneUnit.unitAgreementCharge, null) ? '0.00' : oneUnit.unitAgreementCharge?.toString() as string)
      setUnitCommissionCharge(Object.is(oneUnit.unitCommissionCharge, null) ? '0.00':  oneUnit.unitCommissionCharge?.toString() as string)
      setUnitLegalFee(Object.is(oneUnit.unitLegalFee, null) ? '0.00' : oneUnit.unitLegalFee?.toString() as string)
    }
  }, [oneUnit, route])

  const backAction = () => {
    if (units.length > 0 && hasPendingItem) {
      Alert.alert(`Hold On!`, `You have units pending for upload.\nAre you sure you want to go back?`, [{
        text: `Cancel`,
      }, {
        text: `Yes`,
        onPress: () => navigation.goBack()
      }])
      return true;
    }
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [units, hasPendingItem]);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{ minHeight: "100%" }}
      automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
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
        <HeaderBackButton 
          // onPress={backAction}
        />
        <ScreenTitle
          title={`${route.params.actionType === 'edit' ? 'Edit' : 'Add'} Units`}
          intro={`${route.params.actionType === 'edit' ? 'Edit' : 'Add'} units to property: ${route?.params?.propertyDetails?.propertyName || property.propertyName}`}
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
          label={fieldErros.unitName || `Title or Name`}
          labelStyle={[styles.labelStyle, {
            color: fieldErros.unitName !== "" ? colorsConstants.colorDanger : undefined
          }]}
          onChangeText={(t: string) => setUnitName(t)}
          inputContainerStyle={[styles.inputContainerStyle, {
            borderColor: fieldErros.unitName === "" ? colorsConstants.colorPrimary : colorsConstants.colorDanger
          }]}
          containerStyle={styles.containerStyle}
        />
        <DefaultSelectInput
          value={unitTypeId}
          setValue={setunitTypeId}
          label={fieldErros.unitTypeId || `Unit Type`}
          labelStyle={[styles.labelStyle, {
            color: fieldErros.unitTypeId !== "" ? colorsConstants.colorDanger : undefined
          }]}
          items={unitTypes}
          listMode="MODAL"
          placeholder="Unit Type"
          searchable
          loading={fetchingTypes}
          containerStyle={[styles.inputContainerStyle, {
            marginBottom: fontsConstants.h(12),
            borderColor: fieldErros.unitTypeId === "" ? colorsConstants.colorPrimary : colorsConstants.colorDanger
          }]}
        />
        <DefaultInput
          leftIcon={
            renderCurrency(`₦`)
          }
          keyboardType="number-pad"
          value={unitRent}
          label={fieldErros.unitRent || `Rent Amount`}
          labelStyle={[styles.labelStyle, {
            color: fieldErros.unitRent !== "" ? colorsConstants.colorDanger : undefined
          }]}
          onChangeText={(v: string) => setUnitRent(v)}
          onFocus={(e: any) => {
            setUnitRent(currencyToString(unitRent))
          }}
          onBlur={(e: any) => {
            setUnitRent(formatCurrency(Number(unitRent)))
          }}
          inputContainerStyle={[styles.inputContainerStyle, {
            borderColor: fieldErros.unitRent === "" ? colorsConstants.colorPrimary : colorsConstants.colorDanger
          }]}
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
            value: unitLegalFee,
            setValue: setUnitLegalFee,
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
        <View style={{
          flexDirection: "row",
        }}>
          <DefaultInput
            label={`Other Charges`}
            labelStyle={styles.labelStyle}
            leftIcon={
              renderCurrency(`₦`)
            }
            keyboardType="number-pad"
            value={unitOtherCharges}
            onChangeText={(v: string) => setUnitOtherCharges(v)}
            onFocus={(e: any) => {
              setUnitOtherCharges(currencyToString(unitOtherCharges))
            }}
            onBlur={(e: any) => {
              setUnitOtherCharges(formatCurrency(Number(unitOtherCharges)))
            }}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={[styles.containerStyle, {
              flex: 1,
              marginRight: fontsConstants.w(5)
            }]}
          />
          {route.params.actionType === "add" &&
          <DefaultInput
            value={totalReps}
            onChangeText={(t: string) => setTotalReps(t)}
            label={`How Many?`}
            keyboardType="number-pad"
            labelStyle={styles.labelStyle}
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={[styles.containerStyle, {
              flex: 1,
              marginLeft: fontsConstants.w(5)
            }]}
          />}
        </View>
        {route.params?.actionType === "edit" ? (
          <DefaultButton
            title={`Update`}
            onPress={doEditUnit}
            loading={loading}
            containerStyle={{
              marginTop: fontsConstants.h(10)
            }}
          />
        ) : (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: fontsConstants.h(10)
        }}>
          <TouchableOpacity
            onPress={doAddUnit}
            activeOpacity={layoutsConstants.activeOpacity}
            children={
              <Text style={{
                color: colorsConstants.colorSuccess,
                fontFamily: fontsConstants.American_Typewriter_Bold,
                fontSize: fontsConstants.h(15)
              }}>{`Add to List`}</Text>
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
                }}>{`View added Units`}</Text>
              }
            />}
        </View> )}
      </ImageBackground>
      <Modalize
        ref={modalRef}
        withReactModal
        withHandle={false}
        modalStyle={{
          minHeight: '100%',
          paddingTop: Platform.OS === "ios" ? fontsConstants.h(30) : undefined,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        flatListProps={{
          data: units,
          showsVerticalScrollIndicator: false,
          renderItem: ({ item, index }) => {
            return (
              <View key={index.toString()} style={{
                borderWidth: 1,
                borderColor: item?.saved ? colorsConstants.colorSuccess : colorsConstants.colorPrimary,
                borderRadius: fontsConstants.w(5),
                padding: fontsConstants.h(10),
                marginBottom: fontsConstants.h(20)
              }}>
                <TouchableOpacity style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: fontsConstants.h(5)
                }} activeOpacity={layoutsConstants.activeOpacity}
                  onPress={() => {
                    setExpandedUnit(index)
                  }}
                >
                  <Text style={{
                    fontFamily: fontsConstants.Lora_Bold,
                    fontSize: fontsConstants.h(15),
                    flex: 1,
                    marginRight: fontsConstants.w(20)
                  }}>
                    {`${item?.unitName} x ${item?.totalReps}`}
                  </Text>
                  {expandedUnit !== -1 && expandedUnit === index ? (
                    <Text
                      style={{
                        color: item?.saved ? colorsConstants.colorSuccess : colorsConstants.criticalRed,
                        fontSize: fontsConstants.h(12),
                        opacity: item?.saved ? layoutsConstants.activeOpacity : undefined
                      }}
                      onPress={() => !item?.saved ? removeUnit(index) : null}
                    >
                      {item?.saved ? 'Saved' : 'Remove'}
                    </Text>
                  ) : (
                    <Icon
                      name={expandedUnit === index ? 'chevron-up' : 'chevron-down'}
                      type='ionicon'
                      size={fontsConstants.w(13)}
                    /> 
                  )}
                </TouchableOpacity>
                {expandedUnit === index && 
                <>
                  <Text style={styles.unitDetailTextStyle2}>
                    {`Type\n`}<Text style={styles.unitDetailTextStyle}>{getUnitTypeLabel(item?.unitTypeId)}</Text>
                  </Text>
                  <View style={styles.listViewRows}>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Rent\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitRent)}</Text>
                    </Text>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Other Charges\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitOtherCharges)}</Text>
                    </Text>
                  </View>
                  <View style={styles.listViewRows}>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Service Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitServiceCharge)}</Text>
                    </Text>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Legal Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitLegalFee)}</Text>
                    </Text>
                  </View>
                  <View style={styles.listViewRows}>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Agreement Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitAgreementCharge)}</Text>
                    </Text>
                    <Text style={styles.unitDetailTextStyle2}>
                      {`Commission Charge\n`}<Text style={styles.unitDetailTextStyle}>₦{formatCurrency(item?.unitCommissionCharge)}</Text>
                    </Text>
                  </View>
                </>}
              </View>
            )
          },
          ListHeaderComponent: <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(20),
            marginBottom: fontsConstants.h(20)
          }}>{`Added Units`}</Text>,
          ListFooterComponent: 
            units.length > 0 ? <DefaultButton
              title={`Save Unit${units.length > 1 ? 's' : ''} to Property`}
              onPress={doCreateUnits}
              loading={loading}
            /> : <></>,
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
    backgroundColor: "transparent",
    borderColor: colorsConstants.colorPrimary
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
  }, listViewRows: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
