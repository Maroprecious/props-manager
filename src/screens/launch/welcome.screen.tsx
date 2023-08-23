import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from 'react-native-elements';
import AppIntroSlider from "react-native-app-intro-slider";
import { SafeAreaView, Text } from "src/components/Themed";
import { DefaultButton, HeaderBackButton } from "src/components/buttons/buttons.components";
import colorsConstants from "src/constants/colors.constants";
import fontsConstants from "src/constants/fonts.constants";
import { SliderData } from "src/constants/global.constants";
import AppThemeContext from "src/contexts/Theme.context";
import { RootStackScreenProps } from "src/types/navigations.types";
import layoutsConstants from "src/constants/layouts.constants";
import SecureStoreManager from "src/utils/SecureStoreManager";

export default function WelcomeScreen({
  navigation,
  route
}: RootStackScreenProps<"WelcomeScreen">) {
  const theme = useContext(AppThemeContext);
  const [index, setIndex] = useState(0);
  const slideRef = useRef<AppIntroSlider>(null);

  useEffect(() => {
    let slide = index;
    const interval = setInterval(function() {
      if (slide < SliderData.length - 1)
        slide++
      else
        slide = 0;
      setIndex(slide)
    }, 5000);

    return () => 
      clearInterval(interval)
  }, [index])

  useEffect(() => {
    slideRef?.current?.goToSlide(index)
  }, [index])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: fontsConstants.w(21),
        marginBottom: fontsConstants.h(10)
      }}>
        <View>
          {index > 0 ? (
            <HeaderBackButton
              onPress={() => setIndex(index - 1)}
            />
          ) : null }
        </View>
        <View>
          {index < SliderData.length - 1 ? (
            <Text style={{
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(14),
              textDecorationLine: "underline",
              color: colorsConstants.criticalRed
            }}
              onPress={() => setIndex(index + 1)}
            >
              {`Skip`}
            </Text>
          ) : null}
        </View>
      </View>
      <AppIntroSlider
        data={SliderData}
        renderItem={({item, index}) => (
          <View style={{
            paddingBottom: fontsConstants.h(20)
          }} key={index.toString()}>
            <View style={{
              height: fontsConstants.h(373),
              width: "100%"
            }}>
              <Image
                source={item.image}
                style={{
                  height: "100%",
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={{
              fontFamily: fontsConstants.American_Typewriter_Bold,
              fontSize: fontsConstants.h(28),
              marginTop: fontsConstants.h(23),
              marginLeft: layoutsConstants.mainViewHorizontalPadding,
              lineHeight: fontsConstants.h(35),
              marginBottom: fontsConstants.h(5)
            }}>
              {item.header}
            </Text>
            <Text style={{
              fontFamily: fontsConstants.Lora_Regular,
              fontSize: fontsConstants.h(14),
              marginLeft: layoutsConstants.mainViewHorizontalPadding,
              lineHeight: fontsConstants.h(18)
            }}>
              {item.subtext}
            </Text>
            <DefaultButton
              title={`Get Started`}
              onPress={() => {
                SecureStoreManager.setInitialRouteName("LoginScreen")
                navigation.navigate("LoginScreen")
              }}
              containerStyle={{
                marginHorizontal: layoutsConstants.mainViewHorizontalPadding,
                marginTop: fontsConstants.h(23)
              }}
            />
          </View>
        )}
        ref={slideRef}
        showNextButton={false}
        showPrevButton={false}
        showDoneButton={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.dotStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: fontsConstants.h(45),
  }, dotStyle: {
    width: 0,
    height: 0
  }
});
