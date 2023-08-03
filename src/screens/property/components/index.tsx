import React, { useContext, useState } from "react"
import { Modal, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { Text } from "src/components/Themed";
import { Tenancies } from "src/constants/global.constants";
import { LocationIcon } from "src/screens/rent/components";
import { DefaultRadiobox } from "src/components/inputs/checkbox.components";
import layoutsConstants from "src/constants/layouts.constants";
import { DefaultButton } from "src/components/buttons/buttons.components";
import { Icon } from "react-native-elements";
import { RentalDetailItem } from "src/screens/rent/view.screen";
import { useNavigation } from "@react-navigation/native";

export const PropertiesListView = ({
  data,
  selectedId,
  setSelected = () => null,
  headerText,
  itemHeaderText,
  selectable = false,
  onViewPressed = () => null,
  showItemId = true,
  headerTextStyle = {}
} : {
  data: typeof Tenancies,
  selectedId?: number
  setSelected?: Function
  headerText?: string
  itemHeaderText?: string
  selectable?: boolean
  onViewPressed?: Function
  showItemId?: boolean
  headerTextStyle?: StyleProp<TextStyle>
}) => {
  const theme = useContext(AppThemeContext);

  const [viewItem, setViewItem] = useState<typeof Tenancies[0] | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);

  const RenderDetails = ({
    item,
    hasRightComponent = true,
    detailsMaxifierNumber = 1,
    containerStyle = {}
  } : {
    item: any
    hasRightComponent?: boolean
    detailsMaxifierNumber?: number
    containerStyle?: StyleProp<ViewStyle>
  }) => {
    return (
      <View
        style={[{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: fontsConstants.h(10)
        }, containerStyle]}
      >
        <LocationIcon
          imageSize={fontsConstants.w(20) * Math.pow(detailsMaxifierNumber, 2)}
          containerStyle={{
            height: fontsConstants.w(45) * detailsMaxifierNumber,
            width: fontsConstants.w(45) * detailsMaxifierNumber,
          }}
        />
        <View style={{
          marginHorizontal: fontsConstants.w(10),
          flex: 1
        }}>
          <Text style={{
            fontFamily: fontsConstants.Lora_Bold,
            fontSize: fontsConstants.h(15) * detailsMaxifierNumber,
            color: colorsConstants[theme].screenLabel,
          }}>
            {itemHeaderText}
          </Text>
          {showItemId && <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(12),
            color: colorsConstants[theme].darkText3,
          }}>
            {`Propery ID: ${item.id}`}
          </Text>}
          <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(12),
            color: colorsConstants[theme].darkText3,
          }}>
            {item.address}
          </Text>
        </View>
        {selectable && hasRightComponent ? (
          <DefaultRadiobox
            checked={selectedId === item.id}
            checkedColor={colorsConstants.radioBoxActive}
            size={fontsConstants.w(20)}
            label={`Select`}
            onPress={() => setSelected(item)}
          />
        ) : onViewPressed && hasRightComponent ? (
          <TouchableOpacity 
            activeOpacity={layoutsConstants.activeOpacity}
            onPress={() => {
              setViewItem(item)
              setOpenModal(true)
              onViewPressed(item)
            }}
          >
            <Icon
              name="eye-outline"
              color={colorsConstants[theme].darkText3}
              type="ionicon"
              size={fontsConstants.h(12)}
            />
            <Text style={{
              fontFamily: fontsConstants.Lora_Regular,
              fontSize: fontsConstants.h(12),
              color: colorsConstants[theme].darkText3,
            }}>{`View`}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  return (
    <View>
      <Text style={[{
        fontFamily: fontsConstants.Lora_Bold,
        fontSize: fontsConstants.h(15),
        color: colorsConstants[theme].screenLabel,
        marginBottom: fontsConstants.h(10)
      }, headerTextStyle]}>
        {headerText}
      </Text>
      <View style={{
        borderWidth: fontsConstants.h(1),
        borderColor: colorsConstants.colorPrimary,
        borderRadius: fontsConstants.w(20),
        padding: fontsConstants.w(14),
        marginBottom: fontsConstants.h(20)
      }}>
        {data.map((item, index) => (
          <RenderDetails
            item={item}
            key={index.toString()}
          />
        ))}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: fontsConstants.h(24)
        }}>
          <Text style={{
            fontFamily: fontsConstants.Lora_Regular,
            fontSize: fontsConstants.h(14),
            color: colorsConstants[theme].darkText3
          }}>
            {`No additional property record found`}
          </Text>
          <RenderAddTenancyButton

          />
        </View>
      </View>

      <Modal 
        visible={openModal}
        animationType="fade"
        presentationStyle="fullScreen"
        statusBarTranslucent
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colorsConstants[theme].modalBg,
        }}>
          <View style={{
            minHeight: fontsConstants.h(400),
            marginHorizontal: layoutsConstants.mainViewHorizontalPadding - 15,
            borderRadius: fontsConstants.w(20),
            backgroundColor: colorsConstants[theme].cardBg,
            paddingTop: fontsConstants.h(15),
            paddingHorizontal: fontsConstants.w(20),
            paddingBottom: fontsConstants.h(30)
          }}>
            <RenderDetails
              item={viewItem}
              hasRightComponent={false}
              detailsMaxifierNumber={1.3}
              containerStyle={{
                marginBottom: fontsConstants.h(20),
                paddingHorizontal: fontsConstants.w(10)
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: fontsConstants.w(10)
              }}
            >
            {[{
              id: 1,
              label: 'Rental Status',
              value: `Rented Out`,
              color: colorsConstants.colorPrimary
            }, {
              id: 2,
              label: 'Property Type',
              value: `Block of Units`,
              color: colorsConstants.criticalRed
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: fontsConstants.w(10)
            }}
          >
            {[{
              id: 1,
              label: 'Number of Units',
              value: `6`,
              color: "#FF9401"
            }, {
              id: 2,
              label: 'Tenancy Duration',
              value: `12 months`,
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
          </View>
          <DefaultButton
            title={`Open Property`}
            containerStyle={{
              marginTop: fontsConstants.h(40),
              marginHorizontal: fontsConstants.w(10)
            }}
          />
          <DefaultButton
            title={`Close`}
            type="outline"
            onPress={() => setOpenModal(false)}
            titleStyle={{
              color: colorsConstants.criticalRed
            }}
            buttonStyle={{
              borderColor: colorsConstants.criticalRed,
            }}
            containerStyle={{
              marginTop: fontsConstants.h(30),
              marginHorizontal: fontsConstants.w(10)
            }}
          />
          </View>  
        </View>
      </Modal>
    </View>
  )
}

export const RenderAddTenancyButton = ({

} : {

}) => {
  const navigation = useNavigation();
  const theme = useContext(AppThemeContext)
  return (
    <TouchableOpacity
      activeOpacity={layoutsConstants.activeOpacity}
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Icon
        name="playlist-add"
        size={fontsConstants.w(20)}
        color={colorsConstants[theme].darkText}
      />
      <Text style={{
        fontFamily: fontsConstants.Avenir_Medium,
        fontSize: fontsConstants.h(10),
        color: colorsConstants[theme].darkText
      }}>
        {`Add`}
      </Text>
    </TouchableOpacity>
  )
}