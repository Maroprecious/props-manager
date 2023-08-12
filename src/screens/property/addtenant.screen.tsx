import * as React from "react";
import { useContext, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "src/components/Themed";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import globalConstants, { screenBG } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import colorsConstants from "src/constants/colors.constants";
import { DefaultInput } from "src/components/inputs/inputs.components";
import DefaultSlider from "src/components/inputs/slider.component";
import DefaultDatePicker from "src/components/inputs/dateinput.component";
import useTenant from "src/hooks/useTenant";
import moment from "moment";
import { showToast } from "src/components/Toast";

export default function AddTenantScreen({
  navigation,
  route
}: RootStackScreenProps<"AddTenantScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const { loading, addTenantToUnit } = useTenant()

  const [tenantEmail, setTenantEmail] = useState("")
  const [tenantDuration, setTenantDuration] = useState(12);
  const [moveInDate, setMoveInDate] = useState<any>(new Date());
  const [lastPaymentDate, setLastPaymentDate] = useState<any>(new Date());

  
  const doAddTenant = async () => {
    const req = await addTenantToUnit({
      unitId: route.params.data.unit.id,
      tenantDuration: `${tenantDuration} months`,
      tenantEmail,
      moveInDate: `${moment(moveInDate).format("MMM, YYYY")}`,
      lastPaymentDate: `${moment(lastPaymentDate).format("YY-MM-DD")}`
    })
    if (req?.data?.hasError === false) {
      showToast({
        title: "Tenant",
        type: "success",
        message: req?.message || "Tenant added successfully"
      })
    } else {
      showToast({
        title: "Tenant",
        type: "error",
        message: req?.message || "Unknown error occured"
      })
    }
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
          title={`Add Tenant to Unit`}
          intro={route?.params?.data?.unit?.unitName || ""}
          introTextStyle={{marginBottom: 0}}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <DefaultInput
          placeholder={`Tenant Email`}
          value={tenantEmail}
          label={`Tenant Email`}
          labelStyle={styles.labelStyle}
          onChangeText={(t: string) => setTenantEmail(t)}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          keyboardType="email-address"
        />
        <DefaultDatePicker
          value={moveInDate}
          onChange={(e: any) => {
            setMoveInDate(new Date(e.nativeEvent.timestamp))
          }}
          label={`Move in Date`}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          calendarIconProps={{
            color: colorsConstants.colorPrimary,
            name: 'calendar-outline',
            type: 'ionicon'
          }}
        />
        <DefaultDatePicker
          value={lastPaymentDate}
          onChange={(e: any) => {
            setLastPaymentDate(new Date(e.nativeEvent.timestamp))
          }}
          label={`Last Payment Date`}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          calendarIconProps={{
            color: colorsConstants.colorPrimary,
            name: 'calendar-outline',
            type: 'ionicon'
          }}
        />
        <DefaultSlider
          value={tenantDuration}
          maxValue={24}
          minValue={6}
          step={3}
          onValueChange={setTenantDuration}
          allowTouchTrack
          label={`Duration (months)`}
          labelStyle={styles.labelStyle}
        />
        <DefaultButton
          title={`Add Tenant`}
          onPress={doAddTenant}
          loading={loading}
          disabled={tenantEmail === "" || tenantDuration < 3}
        />
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
    marginBottom: fontsConstants.h(30)
  }, labelStyle: {
    fontSize: fontsConstants.h(12),
    marginBottom: fontsConstants.h(2)
  }
});
