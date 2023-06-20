import React, { JSXElementConstructor, ReactElement, useContext } from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { Card, CardProps, Icon, Image } from "react-native-elements"
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { Text } from "src/components/Themed";
import moment from "moment";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationProps, NotificationType } from "src/types/app.types";

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
    text: ""
  }],
  onMenuPress = () => null,
  onNotificationItemPress = () => null,
  containerStyle = {},
  ...props
} : {
  onMenuPress?: Function
  onNotificationItemPress?: Function
  containerStyle?: StyleProp<ViewStyle>
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
        minHeight: fontsConstants.h(128),
        paddingHorizontal: fontsConstants.w(15),
      }}>
        <View style={{
          alignItems: "center",
        }}>
          <Text style={{
            color: colorsConstants[theme].dateMonthColor,
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(14)
          }}>{moment(date).format("MMM")}</Text>
          <Text style={{
            color: colorsConstants[theme].darkText,
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(24)
          }}>{moment(date).format("DD")}</Text>
          <Text style={{
            color: colorsConstants[theme].dateMonthColor,
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(13)
          }}>{moment(date).format("YYYY")}</Text>
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
          paddingTop: fontsConstants.h(20)
        }}>
          <View style={{
            flex: 1,
            marginRight: fontsConstants.w(30)
          }}>
            {items.map((item, index) => (
              <TouchableOpacity style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: fontsConstants.h(20)
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
                    style={{
                      color: theme === "light" ? "#212524" : colorsConstants[theme].screenLabel,
                      fontFamily: fontsConstants.Lora_Bold,
                      fontSize: fontsConstants.h(12)
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
          <Icon
            name="ellipsis-vertical"
            type="ionicon"
            color={colorsConstants[theme].dateMonthColor}
            size={fontsConstants.h(20)}
            onPress={() => onMenuPress()}
            activeOpacity={layoutsConstants.activeOpacity}
          />
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