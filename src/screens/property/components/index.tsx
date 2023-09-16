import React, { useContext, useEffect, useState } from "react"
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
import { List } from 'react-content-loader/native';
import useProperty from "src/hooks/useProperties";
import { formatCurrency } from "src/utils/FormatNumber";
import { currencySymbol } from "src/constants/currencies.constants";
import moment from "moment";
import { useProperties } from "src/contexts/property.context";

export const RenderPropertyDetails = ({
  item,
  hasRightComponent = true,
  detailsMaxifierNumber = 1,
  containerStyle = {},
  selectedId,
  setSelected = () => null,
  itemHeaderText,
  selectable = false,
  onViewPressed = () => null,
  showItemId = true,
  setOpenModal = () => null,
  setViewItem = () => null,
  loading = false,
  rightIcon
} : {
  item: {
    id: string,
    propertyName?: string
    propertyLocation?: string,
  }
  hasRightComponent?: boolean
  detailsMaxifierNumber?: number
  containerStyle?: StyleProp<ViewStyle>
  selectedId?: number | string
  setSelected?: Function
  itemHeaderText?: string
  selectable?: boolean
  onViewPressed?: Function
  showItemId?: boolean
  setViewItem?: Function
  setOpenModal?: Function
  loading?: boolean
  rightIcon?: JSX.Element
}) => {
  const theme = useContext(AppThemeContext);
  
  if (loading)
    return (
      <List />
    )

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
          {item.propertyLocation}
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
      ) : rightIcon ? rightIcon : null}
    </View>
  )
}

export const PropertiesListView = ({
  data,
  selectedId,
  setSelected = () => null,
  headerText,
  itemHeaderText,
  selectable = false,
  onViewPressed = () => null,
  onOpenProperty = () => null,
  showItemId = true,
  headerTextStyle = {},
  itemsLoading = false
} : {
  data: typeof Tenancies,
  selectedId?: number | string
  setSelected?: Function
  headerText?: string
  itemHeaderText?: string
  selectable?: boolean
  onViewPressed?: Function
  onOpenProperty?: Function
  showItemId?: boolean
  headerTextStyle?: StyleProp<TextStyle>
  itemsLoading?: boolean
}) => {
  const theme = useContext(AppThemeContext);
  const navigation = useNavigation()
  const { setProperty } = useProperties()
  const { loading: loadingData, getOneProperty } = useProperty()

  const [viewItem, setViewItem] = useState<typeof Tenancies[0] | undefined | any>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<any>({

  })

  useEffect(() => {
    if (viewItem?.id !== undefined)
      getOneProperty({
        propertId: viewItem?.id || "-1"
      }).then((res) => {
        if (res?.hasError === false) {
          setSelectedDetails({
            ...res?.data?.message,
            ...res?.data?.additionalDetail
          })
        }
      })
  }, [viewItem])
  
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
        {data.map((item: any, index) => (
          <RenderPropertyDetails
            item={item}
            key={index.toString()}
            selectedId={selectedId}
            itemHeaderText={`${item.propertyName}`}
            onViewPressed={onViewPressed}
            setViewItem={setViewItem}
            setOpenModal={setOpenModal}
            selectable={selectable}
            setSelected={setSelected}
            showItemId={showItemId}
            loading={itemsLoading}
          />
        ))}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: fontsConstants.h(0)
        }}>
          {data.length > 0 ? (
            <TouchableOpacity style={{
              marginTop: fontsConstants.h(0)
            }}
              activeOpacity={layoutsConstants.activeOpacity}
              onPress={() => navigation.navigate("PropertiesScreen")}
            >
              <Text style={{
                fontFamily: fontsConstants.Lora_Regular,
                fontSize: fontsConstants.h(14),
                color: colorsConstants[theme].darkText3
              }}>
                {`View More...`}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={{
              fontFamily: fontsConstants.Lora_Regular,
              fontSize: fontsConstants.h(14),
              color: colorsConstants[theme].darkText3
            }}>
              {`No property record found`}
            </Text>
          )}
          <RenderAddButton
            onPress={() => navigation.navigate("AddPropertyScreen")}
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
            <RenderPropertyDetails
              item={viewItem}
              itemHeaderText={`${viewItem?.propertyName}`}
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
              label: 'Expected Rent',
              value: `${currencySymbol['ngn']}${formatCurrency(selectedDetails?.expectedRentChargeSum || 0)}`,
              color: colorsConstants.colorPrimary
            }, {
              id: 2,
              label: 'Total Tenants',
              value: `${selectedDetails?.numberOfTenants || 0}`,
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
                loading={loadingData}
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
              value: `${(selectedDetails?.numberOfOccupiedUnits || 0) + (selectedDetails?.numberOfUnoccupiedUnits || 0)}`,
              color: "#FF9401"
            }, {
              id: 2,
              label: 'Created At',
              value: `${moment(new Date(selectedDetails?.created_at)).format("YYYY-MM-DD")}`,
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
                loading={loadingData}
              />
            ))}
          </View>
          <DefaultButton
            title={`Open Property`}
            onPress={() => {
              onOpenProperty(selectedDetails)
              setProperty(viewItem)
              navigation.navigate("PropertyDetailsScreen")
              setOpenModal(false)
            }}
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

export const RenderAddButton = ({
  onPress = () => null
} : {
  onPress?: any
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
      onPress={onPress}
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