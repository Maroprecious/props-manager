import * as React from "react";
import { StyleSheet, View as RNView, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { ScrollView, Text, View } from "src/components/Themed";
import { NotificationItemCard } from "src/components/cards";
import { Avatar, Image } from 'react-native-elements'
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { DashboardSliderInfo, RecentActivitiesData, Tenancies } from "src/constants/global.constants";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationProps } from "src/types/app.types";
import { RootTabScreenProps } from "src/types/navigations.types";
import AppIntroSlider from "react-native-app-intro-slider";
import moment from "moment";
import { formatCurrency } from "src/utils/FormatNumber";
import { RentalDetailItem } from "../rent/view.screen";
import { LocationIcon } from "../rent/components";
import { useContext } from "react";
import AppThemeContext from "src/contexts/Theme.context";
import { useAppSelector } from "src/hooks/useReduxHooks";
import { PropertiesListView, RenderAddButton } from "../property/components";
import useProperty from "src/hooks/useProperties";
import { useNavigation } from "@react-navigation/native";
import useTenant from "src/hooks/useTenant";

export const RenderLatestOccupiedProperty = () => {
  const theme = useContext(AppThemeContext)
  const user = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation()
  
  const { loading, getOccupiedProperties } = useTenant();

  const [propertiesOccupied, setPropertiesOccupied] = React.useState<any>([]);

  const fetchOccupiedProperties = async () => {
    const req = await getOccupiedProperties({
      tenantId: `${user.id}`
    });
    if (req?.hasError === false) setPropertiesOccupied(req?.data?.message || [])
    else setPropertiesOccupied([]) 
  }

  React.useEffect(() => {
    fetchOccupiedProperties()
  }, [navigation])

  if (propertiesOccupied.length === 0)
    return <></>

  return (
    <View>
      <Text style={[{
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.h(12),
        color: colorsConstants[theme].screenLabel,
        marginBottom: fontsConstants.h(10)
      }]}>
        {`Tenancy Details`}
      </Text>
      <RNView style={{
        borderWidth: fontsConstants.h(1),
        borderColor: colorsConstants.colorPrimary,
        borderRadius: fontsConstants.w(20),
        padding: fontsConstants.w(10),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: fontsConstants.h(20),
      }}>
        <LocationIcon/>
        <RNView style={{
          flex: 1,
          marginLeft: fontsConstants.w(15)
        }}>
          <Text style={[styles.addressText, {
            fontSize: fontsConstants.h(12),
            color: colorsConstants[theme].darkText,
            marginBottom: fontsConstants.w(10)
          }]}>{`Tenancy Location`}</Text>
          <Text style={[styles.addressText, {
            fontSize: fontsConstants.h(11),
            color: colorsConstants[theme].darkText3,
            opacity: 0.6
          }]}>
            {propertiesOccupied[0].property_details?.propertyLocation}
          </Text>
        </RNView>
        {/* <RenderAddTenancyButton/> */}
      </RNView>
      <RNView
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {[{
          id: 1,
          label: 'Last Payment Date',
          value: moment(new Date(propertiesOccupied[0]?.tenancy?.lastPaymentDate)).format("YYYY-MM-DD"),
          color: "#3E64FF"
        }, {
          id: 2,
          label: 'Next Rent Due Date',
          value: moment(new Date(propertiesOccupied[0]?.tenancy?.lastPaymentDate)).add((propertiesOccupied[0]?.tenancy?.tenantDuration?.split(" ")[0]), "months").format("YYYY-MM-DD"),
          color: "#FE4A5E"
        }].map((item, index) => (
          <RentalDetailItem
            key={index.toString()}
            label={item.label}
            value={item.value}
            radioColor={item.color}
            labelStyle={{color: colorsConstants[theme].darkText}}
            valueStyle={{color: colorsConstants[theme].darkText3}}
            // button={index === 0 ? <RenderAddTenancyButton/> : null}
            containerStyle={{
              marginLeft: index === 1 ? fontsConstants.w(5) : 0,
              marginRight: index === 1 ? 0 : fontsConstants.w(5)
            }}
          />
        ))}
      </RNView>
      <RNView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: fontsConstants.w(10)
        }}
      >
        {[{
          id: 1,
          label: 'Next Rent Amount',
          value: `₦${formatCurrency(propertiesOccupied[0]?.unit?.unitRent)}`,
          color: "#FF9401"
        }, {
          id: 2,
          label: 'Tenancy Duration',
          value: `${propertiesOccupied[0]?.unit?.tenantDuration}`,
          color: "#633EFF"
        }].map((item, index) => (
          <RentalDetailItem
            key={index.toString()}
            label={item.label}
            value={item.value}
            radioColor={item.color}
            labelStyle={{color: colorsConstants[theme].darkText}}
            valueStyle={{color: colorsConstants[theme].darkText3}}
            containerStyle={{
              marginLeft: index === 1 ? fontsConstants.w(5) : 0,
              marginRight: index === 1 ? 0 : fontsConstants.w(5)
            }}
          />
        ))}
      </RNView>
    </View>
  )
}

export const RenderUserProperties = () => {
  const user = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const { loading, getProperties } = useProperty();

  const [properties, setProperties] = React.useState<any>([{}, {}]);

  const fetchProperties = async () => {
    const req = await getProperties({
      userId: `${user.id}`
    })
    if (req?.hasError === false) setProperties(req?.data?.message)
  } 

  React.useEffect(() => {
    fetchProperties()
  }, [navigation])

  return (
    <PropertiesListView
      data={properties}
      itemsLoading={loading}
      onViewPressed={(property: typeof Tenancies[0]) => {
        console.log(property)
      }}
      headerText={`My Properties`}
      itemHeaderText={`Property Details`}
      headerTextStyle={{
        marginTop: fontsConstants.h(20),
        fontSize: fontsConstants.h(12)
      }}
    />
  )
}

export default function HomeTabScreen({
  navigation,
  route
}: RootTabScreenProps<"HomeTabNavigator">) {
  const theme = useContext(AppThemeContext)
  const user = useAppSelector((state) => state.auth.user)
  
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingTop: fontsConstants.h(50),
          paddingHorizontal: fontsConstants.w(18),
          paddingBottom: layoutsConstants.tabBarHeight
        }}
      >
        <View style={{
          borderRadius: fontsConstants.w(20),
          flexDirection: "row",
          alignItems: "center",
          padding: fontsConstants.w(15),
          marginBottom: fontsConstants.h(20),
          elevation: 20,
          shadowColor: colorsConstants.colorPrimary,
          shadowRadius: fontsConstants.h(10),
          shadowOffset: {
            height: 4,
            width: 2
          }
        }}>
          <Avatar
            size={fontsConstants.w(60)}
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
          <RNView
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
            <Text style={[styles.textName, {
              color: colorsConstants[theme].screenLabel,
            }]}>User ID: {user.id}</Text>
            <Text style={[styles.textName, {
              color: colorsConstants[theme].screenLabel,
            }]}>{user.email}</Text>
          </RNView>
          <TouchableOpacity
            activeOpacity={layoutsConstants.activeOpacity}
            onPress={() => navigation.navigate("NotificationsScreen")}
            style={{
              alignItems: "center"
            }}
          >
            <Image
              source={require("src/assets/images/icons/active-notification.png")}
              style={{
                width: fontsConstants.w(25),
                height: fontsConstants.w(25)
              }}
            />
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(9),
              color: colorsConstants[theme].screenLabel
            }}>{`Notification`}</Text>
          </TouchableOpacity>
        </View>
        <AppIntroSlider
          data={DashboardSliderInfo}
          renderItem={({item, index}) => (
            <RNView style={{
              borderColor: colorsConstants.colorPrimary,
              borderWidth: fontsConstants.h(1),
              borderRadius: fontsConstants.w(16),
              paddingHorizontal: fontsConstants.w(14),
              height: fontsConstants.w(200),
              justifyContent: "center",
              marginBottom: fontsConstants.h(5),
            }} key={index.toString()}>
              <TouchableWithoutFeedback 
                onPress={() => {
                  switch (item.id) {
                    case 1:
                      navigation.navigate("InviteScreen")
                      break;
                    case 2: 
                    navigation.navigate("AddPropertyScreen")
                      break;
                    default:
                      break;
                  }
                }}
              >
                <RNView
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: fontsConstants.w(100),
                      height: fontsConstants.w(100)
                    }}
                    resizeMode="contain"
                  />
                  <RNView style={{
                    alignItems: "center",
                    marginLeft: fontsConstants.w(11),
                    flex: 1
                  }}>
                    <Text style={{
                      fontFamily: fontsConstants.Lora_Bold,
                      fontSize: fontsConstants.w(18),
                      color: colorsConstants[theme].screenLabel,
                      marginBottom: fontsConstants.h(8)
                    }}>
                      {item.title}
                    </Text>
                    <Text style={{
                      fontFamily: fontsConstants.Lora_Regular,
                      fontSize: fontsConstants.w(12),
                      lineHeight: fontsConstants.h(15),
                      color: colorsConstants[theme].screenLabel,
                      textAlign: "center"
                    }}>
                      {item.message}
                    </Text>
                    {item.hasLink ? (
                      <TouchableOpacity
                        activeOpacity={layoutsConstants.activeOpacity}
                        style={{
                          marginTop: fontsConstants.h(15),
                        }}
                        onPress={() => {
                          switch (item.id) {
                            case 1:
                              navigation.navigate("InviteScreen")
                              break;
                            case 2: 
                            navigation.navigate("AddPropertyScreen")
                              break;
                            default:
                              break;
                          }
                        }}
                      >
                        <Text style={{
                          textDecorationLine: "underline",
                          fontFamily: fontsConstants.Lora_Bold,
                          fontSize: fontsConstants.h(14),
                          color: colorsConstants[theme].screenLabel
                        }}>{item.linkLabel}</Text>
                      </TouchableOpacity>
                    ) : null}
                  </RNView>
                </RNView>
              </TouchableWithoutFeedback>
            </RNView>
          )}
          activeDotStyle={{
            ...styles.sliderDotStyle,
            backgroundColor: `rgba(0, 65, 160, 0.25)`,
          }}
          dotStyle={styles.sliderDotStyle}
          showDoneButton={false}
          showNextButton={false}
          showPrevButton={false}
          showSkipButton={false}
        />
        {user.roleType === "landlord" && <RenderUserProperties />}
        {user.roleType === "tenant" && <RenderLatestOccupiedProperty />}
        {/* <RNView>
          <Text style={{
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(14),
            color: colorsConstants[theme].screenLabel,
            marginBottom: fontsConstants.h(10),
            marginTop: fontsConstants.h(17)
          }}>
            {`Recent Activities`}
          </Text>
          {RecentActivitiesData.map((item, index) => (
            <NotificationItemCard
              key={index.toString()}
              date={item.date}
              items={item.items}
              onMenuPress={() => {
                console.log("Menu Pressed")
              }}
              onNotificationItemPress={(notification: NotificationProps) => {
                console.log(notification)
              }}
              containerStyle={{
                marginBottom: fontsConstants.h(10)
              }}
            />
          ))}
        </RNView> */}
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addressText: {
    fontFamily: fontsConstants.Lora_Regular,
  }, sliderDotStyle: {
    width: fontsConstants.w(5),
    height: fontsConstants.w(5),
    marginTop: fontsConstants.h(80),
    backgroundColor: "transparent",
    borderColor: `rgba(0, 65, 160, 0.25)`,
    borderWidth: fontsConstants.h(1)
  }, rowItemContainer: {
    borderColor: colorsConstants.colorPrimary,
    borderWidth: fontsConstants.h(1),
    borderRadius: fontsConstants.w(16),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: fontsConstants.h(10)
  }, rILabel: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(12),
    marginBottom: fontsConstants.h(10)
  }, rIValue: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(15)
  }, textName: {
    fontFamily: fontsConstants.Lora_Regular,
    fontSize: fontsConstants.h(12),
  }
});
