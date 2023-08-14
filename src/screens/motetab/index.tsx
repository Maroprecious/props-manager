import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Icon, Image } from "react-native-elements";
import { ScrollView, Text } from "src/components/Themed";
import { DefaultCard } from "src/components/cards";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import { TabScreenTitle } from "src/components/labels/screentitle.components";
import { showConfirm } from "src/components/modals/confirm.modals";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { MenuItems } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppDispatch, useAppSelector } from "src/hooks/useReduxHooks";
import { logout } from "src/services/redux/slices/auth";
import { RootTabScreenProps } from "src/types/navigations.types";

export default function MoreTabScreen({
  navigation,
  route
}: RootTabScreenProps<"MoreTabNavigator">) {
  const theme = useContext(AppThemeContext);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user)

  const doLogout = () => {
    dispatch(logout());
  }

  return (
    <ScrollView style={styles.container}>
      <TabScreenTitle
        title={`More`}
      />
      <DefaultCard
        containerStyle={{
          borderRadius: fontsConstants.h(20),
          marginBottom: fontsConstants.h(5)
        }}
      >
        <>
          <View style={[styles.cardItemContainer, {
            borderBottomColor: colorsConstants[theme].borderLine,
          }]}>
            <Avatar
              size={fontsConstants.w(70)}
              title={`${user?.firstName?.substring(0,1) || ''}${user?.lastName?.substring(0,1) || ''}`}
              rounded
              titleStyle={{
                color: colorsConstants[theme].screenLabel,
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(28)
              }}
              containerStyle={{
                borderWidth: fontsConstants.h(1),
                borderColor: colorsConstants.colorPrimary,
                backgroundColor: colorsConstants.avatarBg,
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: fontsConstants.w(14),
                marginRight: fontsConstants.w(10),
                marginTop: fontsConstants.h(10)
              }}
            >
              <Text style={{
                fontFamily: fontsConstants.Lora_Bold,
                fontSize: fontsConstants.h(16),
                color: colorsConstants[theme].screenLabel,
                marginBottom: fontsConstants.h(4),
              }}>{`${user?.firstName || 'John'} ${user?.lastName || 'Doe'}`}</Text>
              <Text style={{
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(12),
                color: colorsConstants[theme].screenLabel,
              }}>User ID: {user.id}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={layoutsConstants.activeOpacity}
              onPress={() => navigation.navigate("EditProfileScreen")}
            >
              <Text style={{
                fontFamily: fontsConstants.Roboto_Light,
                fontSize: fontsConstants.h(12),
                textDecorationLine: "underline",
                marginTop: fontsConstants.h(26),
                color: colorsConstants[theme].screenLabel
              }}
              >
                {`Edit Details`}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.cardItemContainer, {
            // borderBottomColor: colorsConstants[theme].borderLine,
            borderBottomWidth: 0,
            paddingHorizontal: fontsConstants.w(5)
          }]}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1
            }}>
              <Image
                source={require("src/assets/images/icons/home.png")}
                style={{
                  width: fontsConstants.w(40),
                  height: fontsConstants.w(40)
                }}
              />
              <View style={{
                flex: 1,
                marginLeft: fontsConstants.w(10)
              }}>
                <Text style={{
                  fontFamily: fontsConstants.Lora_Regular,
                  fontSize: fontsConstants.h(14),
                  color: colorsConstants[theme].text
                }}>
                  {`Tenant Account`}
                </Text>
                <Text style={[styles.addressTextStyle, {
                  color: colorsConstants[theme].screenLabel,
                }]}>
                  {`T0038`}
                </Text>
                <Text style={[styles.addressTextStyle, {
                  color: colorsConstants[theme].screenLabel,
                }]}>
                  {`10 Olubayo Street, Lekki Ph 1. Lagos`}
                </Text>
              </View>
            </View>
            <View style={{
              alignItems: "center"
            }}>
              <Text style={{
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(10),
                color: colorsConstants[theme].screenLabel
              }}>{`Active`}</Text>
              <DefaultRadiobox
                checked
                containerStyle={{
                  marginTop: fontsConstants.h(10)
                }}
              />
            </View>
          </View>
          {/* <View style={[styles.cardItemContainer, {
            paddingHorizontal: fontsConstants.w(5)
          }]}>

          </View> */}
        </>
      </DefaultCard>
      {MenuItems.map((menu: any, index) => (
        <TouchableOpacity
          activeOpacity={layoutsConstants.activeOpacity}
          onPress={() => {
            switch (menu.label.toLocaleLowerCase()) {
              case "logout":
                showConfirm({
                  title: "Logout",
                  type: "info",
                  message: "Are you sure you want to logout",
                  onConfirm: doLogout
                })
                break;
            
              default:
                navigation.navigate(menu.screen)
                break;
            }
          }}
          key={index.toString()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: fontsConstants.h(20),
            borderBottomWidth: fontsConstants.h(1),
            borderBottomColor: colorsConstants[theme].borderLine
          }}
        >
          <Image
            source={menu.icon}
            style={{
              height: fontsConstants.w(25),
              width: fontsConstants.w(25)
            }}
          />
          <Text style={{
            flex: 1,
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(15),
            marginLeft: fontsConstants.w(20),
            color: menu.label.toLocaleLowerCase() !== 'logout' ? 
              colorsConstants[theme].darkText
              : colorsConstants.criticalRed
          }}>
            {menu.label}
          </Text>
          <Icon
            name="chevron-forward"
            type="ionicon"
            size={fontsConstants.h(15)}
            color={colorsConstants[theme].borderLine}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: fontsConstants.w(20),
    paddingBottom: layoutsConstants.tabBarHeight,
  }, cardItemContainer: {
    flexDirection: "row",
    borderBottomWidth: fontsConstants.h(1),
    paddingVertical: fontsConstants.h(10)
  }, addressTextStyle: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(10),
    opacity: 0.5
  }
});
