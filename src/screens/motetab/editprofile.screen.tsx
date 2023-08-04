import * as React from "react";
import { useContext, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { ScrollView } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import globalConstants from "src/constants/global.constants";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultInput, DefaultPhoneInput } from "src/components/inputs/inputs.components";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxHooks";
import useUser from "src/hooks/useUser";
import { showToast } from "src/components/Toast";
import { updateUserProfileData } from "src/services/redux/slices/auth";
import { splitPhoneNumber } from "src/utils/FormatNumber";

export default function EditProfileScreen({
  navigation,
  route
}: RootStackScreenProps<"EditProfileScreen">) {
  const theme = useContext(AppThemeContext);

  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch();
  const { loading, updateProfile } = useUser();

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [aliasName, setAliasName] = useState(user?.aliasName || "")
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "")
  
  const doUpdateProfile = async () => {
    const req = await updateProfile({
      userId: user?.id || "",
      firstName,
      lastName,
      aliasName,
      phoneNumber
    })
    showToast({
      title: `Profile Update`,
      type: req?.hasError ? `error` : `info`,
      message: req?.data?.message || req?.error || req?.statusText || "Unknown error occured"
    })
    if (req?.status === 200) {
      dispatch(updateUserProfileData({
        ...user,
        firstName,
        lastName,
        aliasName,
        phoneNumber
      }));  
      navigation.goBack()
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{minHeight: "100%"}}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(40),
          paddingHorizontal: globalConstants.mainViewHorizontalPadding,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton/>
        <ScreenTitle
          title={`Edit Profile`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
            marginBottom: fontsConstants.h(35)
          }}
        />
        <DefaultInput
          label={`First Name`}
          value={firstName || ""}
          onChangeText={(t: string) => setFirstName(t)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Last Name`}
          value={lastName || ""}
          onChangeText={(t: string) => setLastName(t)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Alias`}
          value={aliasName || ""}
          onChangeText={(t: string) => setAliasName(t)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultPhoneInput
          label={`Mobile`}
          value={splitPhoneNumber(phoneNumber).phone || ""}
          selectedCode={splitPhoneNumber(phoneNumber).code}
          onChangeNumber={(t: string) => setPhoneNumber(t)}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultInput
          label={`Email`}
          disabled
          value={user.email}
          containerStyle={styles.inputContainerStyle}
        />
        <DefaultButton
          title={`Update`}
          onPress={doUpdateProfile}
          loading={loading}
          disabled={firstName === "" || lastName === "" || phoneNumber === ""}
        />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainerStyle: {marginBottom: fontsConstants.h(45)}
});
