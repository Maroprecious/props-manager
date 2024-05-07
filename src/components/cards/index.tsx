import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Card, CardProps, Icon, Image } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { Text } from "src/components/Themed";
import moment from "moment";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationProps, NotificationType } from "src/types/app.types";
import { ImageSourcePropType } from "react-native";

export const DefaultCard = ({
  children = <></>,
  containerStyle = {},
  ...props
} : {
  children?: ReactElement<{}, string | JSXElementConstructor<any>>;
  containerStyle?: StyleProp<ViewStyle>
} & CardProps) => {
  const theme = useContext(AppThemeContext);
  return (
    <Card
      {...props}
      containerStyle={[{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: fontsConstants.w(14),
        paddingVertical: fontsConstants.h(5),
        backgroundColor: colorsConstants[theme].cardBg,
        // borderColor: colorsConstants[theme].borderLine,
        // elevation: 5,
      }, containerStyle]}
    >
      {children}
    </Card>
  )
}

export const NotificationItemCard = ({
  date = "2023-04-26",
  items = [{
    title: "",
    type: "settings",
    text: "",
    id: 1
  }],
  onMenuPress = () => null,
  onNotificationItemPress = () => null,
  containerStyle = {},
  showMenuButton = true,
  ...props
} : {
  onMenuPress?: Function
  onNotificationItemPress?: Function
  containerStyle?: StyleProp<ViewStyle>
  showMenuButton?: boolean
} & NotificationProps & CardProps) => {
  const theme = useContext(AppThemeContext);
  return (
    <Card
      {...props}
      containerStyle={[{
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        // paddingHorizontal: fontsConstants.w(18),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colorsConstants[theme].cardBg,
        borderRadius: fontsConstants.w(20),
        borderWidth: 0,
        // borderColor: colorsConstants[theme].borderLine,
        elevation: 5,
      }, containerStyle]}
    >
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        minHeight: fontsConstants.h(100),
        paddingHorizontal: fontsConstants.w(15),
      }}>
        <View style={{
          alignItems: "center",
        }}>
          <Text style={{
            color: colorsConstants[theme].dateMonthColor,
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(12)
          }}>{typeof date === "string" ? moment(date).format("MMM") : date?.month}</Text>
          <Text style={{
            color: colorsConstants[theme].darkText,
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(18)
          }}>{typeof date === "string" ? moment(date).format("DD") : date?.day}</Text>
          <Text style={{
            color: colorsConstants[theme].dateMonthColor,
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(10)
          }}>{typeof date === "string" ? moment(date).format("YYYY") : date?.year}</Text>
        </View>
        <Line
          color="#0000001A"
          height={fontsConstants.h(40) + (items.length * 50)}
          width={fontsConstants.w(1)}
          containerStyle={{
            marginHorizontal: fontsConstants.w(12),
          }}
        />
        <View style={{
          flex: 1,
          flexDirection: "row",
          // paddingLeft: fontsConstants.w(5),
          paddingTop: fontsConstants.h(0),
        }}>
          <View style={{
            flex: 1,
            marginRight: showMenuButton ? fontsConstants.w(30) : fontsConstants.w(40),
          }}>
            {items.map((item, index) => (
              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: fontsConstants.h(0)
              }} key={index.toString()}
                activeOpacity={layoutsConstants.activeOpacity}
                onPress={() => onNotificationItemPress(item)}
              >
                <RenderNotificationItemIcon
                  type={item.type}
                />
                <View 
                  style={{
                    marginLeft: fontsConstants.w(15)
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{
                      color: theme === "light" ? "#212524" : colorsConstants[theme].screenLabel,
                      fontFamily: fontsConstants.Lora_Bold,
                      fontSize: fontsConstants.h(12),
                      marginRight: fontsConstants.w(10)
                    }}
                  >{item.title}</Text>
                  <Text
                    style={{
                      color: colorsConstants[theme].dateMonthColor,
                      fontFamily: fontsConstants.Lora_Regular,
                      lineHeight: fontsConstants.h(15),
                      marginTop: fontsConstants.h(4),
                      fontSize: fontsConstants.h(12)
                    }}
                  >{item.text}</Text>
                  {item.status ? (
                    <Text style={{
                      color: item?.status === "success" ? 
                        colorsConstants.colorSuccess
                        : colorsConstants.criticalRed,
                      fontFamily: fontsConstants.Lora_Regular,
                      fontSize: fontsConstants.h(8),
                      marginTop: fontsConstants.h(3)
                    }}>
                      {`Payment ${item.status === "success" ? "Successful" : "Failed"}`}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {showMenuButton ? (
            <Icon
              name="ellipsis-vertical"
              type="ionicon"
              color={colorsConstants[theme].dateMonthColor}
              size={fontsConstants.h(20)}
              onPress={() => onMenuPress()}
              activeOpacity={layoutsConstants.activeOpacity}
            />
          ) : <></>}          
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          // marginHorizontal: fontsConstants.w(-18),
          position: "absolute",
          width: "100%",
          height: (items.length * 10) + fontsConstants.h(15),
          bottom: fontsConstants.h(0)
        }}
      >
        {[require("src/assets/images/icons/card-ellipse-left.png"), require("src/assets/images/icons/card-ellipse-right.png")].map((dot, index) => (
          <Image
            key={index.toFixed()}
            style={{
              height: fontsConstants.h(10),
              width: fontsConstants.h(10)
            }}
            source={dot}
          />
        ))}
      </View>
    </Card>
  )
}

export const Line = ({
  color = "#0000001A",
  height,
  width,
  containerStyle
} : {
  color?: string,
  height?: number | string,
  width?: number | string,
  containerStyle?: StyleProp<ViewStyle>
}) => {
  return (
    <View style={[containerStyle, {
      height: height,
    }]}>
      <View style={{
        height: height,
        width: width,
        backgroundColor: color
      }}>

      </View>
    </View>
  )
}

export const RenderNotificationItemIcon = ({
  type = "settings"
} : {
  type: NotificationType
}) => {
  return (
    <View style={{
      height: fontsConstants.h(40),
      width: fontsConstants.h(40),
      borderRadius: fontsConstants.h(12),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: type === "bill" || type === "invoice" || type === "award" ? 
        "#18573A"
        : type === "settings" || type === "location" ?
        "#D88D85"
        : "#CD9250"
    }}>
      <Image
        source={type === "bill" ? 
          require("src/assets/images/icons/dollar-symbol.png")
          : type === "settings" ? 
          require("src/assets/images/icons/settings.png") 
          : type === "location" ?
          require("src/assets/images/icons/location.png")
          : type === "invoice" ? 
          require("src/assets/images/icons/file-invoice.png") 
          : type === "award" ? 
          require("src/assets/images/icons/award.png")
          : type === "mail" ?
          require("src/assets/images/icons/email.png")
          : require("src/assets/images/icons/dollar.png")
        }
        style={{
          height: fontsConstants.h(20),
          width: fontsConstants.h(20)
        }}
      />
    </View>
  )
}

export const MenuItemCard = ({
  onItemPress = () => null,
  label = "Item",
  containerStyle = {},
  labelStyle = {},
  icon = require("src/assets/images/icons/buy-airtime.png"),
  ...props
} : {
  label: string
  labelStyle?: StyleProp<TextStyle>
  onItemPress?: Function
  icon?: ImageSourcePropType
  containerStyle?: StyleProp<ViewStyle>
} & CardProps ) => {
  const theme = useContext(AppThemeContext);
  return  (
    <Card
      containerStyle={[{
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colorsConstants[theme].cardBg,
        borderRadius: fontsConstants.w(15),
        borderWidth: 0,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        height: fontsConstants.w(90),
        width: fontsConstants.w(90),
        marginBottom: fontsConstants.h(20),
        marginLeft: fontsConstants.w(10),
        marginRight: fontsConstants.w(10)
      }, containerStyle]
      }
      {...props}
    >
      <TouchableOpacity
        onPress={() => onItemPress()}
        activeOpacity={layoutsConstants.activeOpacity}
        style={{
          alignItems: "center"
        }}
      >
        <Image
          source={icon}
          style={{
            height: fontsConstants.w(25),
            width: fontsConstants.w(25),
            marginBottom: fontsConstants.h(5),
          }}
        />
        <Text style={[{
          color: colorsConstants[theme].darkText,
          fontFamily: fontsConstants.Lora_Regular,
          fontSize: fontsConstants.h(12),
          lineHeight: fontsConstants.h(15),
          textAlign: "center"
        }, labelStyle]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Card>
  )
}

export const NoPropertiesCard = () => {
  const theme = useContext(AppThemeContext);
  return (
    <Card
      containerStyle={[{
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: colorsConstants[theme].cardBg,
        borderRadius: fontsConstants.w(15),
        borderWidth: 0,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        height: fontsConstants.h(180),
        marginLeft: fontsConstants.w(10),
        marginRight: fontsConstants.w(10)
      }]
      }
    >
      <Text style={{
        fontFamily: fontsConstants.Lora_Medium,
        fontSize: fontsConstants.h(20),
        color: colorsConstants[theme].grey3,
        marginBottom: fontsConstants.h(10)
      }}>
        {`No owned properties found`}
      </Text>
      <Text style={{
        textAlign: "center",
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: fontsConstants.h(12),
        color: colorsConstants[theme].grey3,
      }}>
        {`Kindly add your owned property to effectively\nmanage them on your porfolio`}
      </Text>
    </Card>
  )
}