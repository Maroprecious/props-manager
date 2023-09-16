import React, { useContext, useEffect, useState } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView, Text } from "src/components/Themed";
import { HeaderBackButton } from "src/components/buttons/buttons.components";
import fontsConstants from "src/constants/fonts.constants";
import { RootStackScreenProps } from "src/types/navigations.types";
import AppThemeContext from "src/contexts/Theme.context";
import { ScreenTitle } from "../auth/components/screentitle.component";
import layoutsConstants from "src/constants/layouts.constants";
import { NotificationProps } from "src/types/app.types";
import { NotificationItemCard } from "src/components/cards";
import { useTransactions } from "src/hooks/usePayments";
import { useAppSelector } from "src/hooks/useReduxHooks";

export default function TransactionsScreen({
  navigation,
  route
}: RootStackScreenProps<"TransactionsScreen">) {
  const theme = useContext(AppThemeContext);
  const user = useAppSelector((state) => state.auth.user)
  const { loading, getHistory } = useTransactions()

  const [transactions, setTransactions] = useState<any>([]);

  const doGetTnxHistory = async () => {
    const req = await getHistory({
      userId: `${user.id}`
    })
    if (req?.hasError === false) setTransactions(req?.data?.message || [])
  }

  useEffect(() => {
    doGetTnxHistory()
  }, [navigation])

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ImageBackground
        source={require("src/assets/images/backgrounds/background.png")}
        style={{
          flex: 1,
          paddingBottom: layoutsConstants.tabBarHeight / 2
        }}
      >
        <HeaderBackButton
          containerStyle={{
            marginTop: fontsConstants.h(40),
            paddingHorizontal: layoutsConstants.mainViewHorizontalPadding
          }}
        />
        <ScreenTitle
          title={`Transaction History`}
          containerStyle={{
            marginTop: fontsConstants.h(12),
          }}
        />
        
        <FlatList
          data={transactions}
          refreshing={loading}
          onRefresh={doGetTnxHistory}
          renderItem={({ item, index }) => {
            return (
              <NotificationItemCard
                key={index.toString()}
                date={{
                  day: item?.transactionDay,
                  month: item?.transactionMonth,
                  year: item?.transactionYear
                }}
                items={[{
                  id: item?.id,
                  text: item?.historyMessage,
                  title: item?.historyTitle,
                  type: "invoice",
                  status: item?.successful ? "success" : "failed"
                }]}
                showMenuButton={false}
                onNotificationItemPress={(notification: NotificationProps) => {
                  console.log(notification)
                }}
                containerStyle={{
                  marginBottom: fontsConstants.h(10)
                }}
              />
            )
          }}
          contentContainerStyle={{
            paddingHorizontal: fontsConstants.w(18),
            paddingTop: fontsConstants.h(30),
          }}
          ListEmptyComponent={
            <Text style={{
              alignSelf: "center",
              marginTop: fontsConstants.h(100),
              fontFamily: fontsConstants.Lora_Bold,
              fontSize: fontsConstants.h(20),
              opacity: layoutsConstants.activeOpacity
            }}>
              {`No History`}
            </Text>
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
