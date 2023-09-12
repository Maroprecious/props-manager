import * as React from "react";
import { useState, useEffect } from "react";
import { Text } from "src/components/Themed";
import { StyleSheet, View as RNView, TouchableOpacity, } from "react-native";
import Layout from "src/components/layout/layout";
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import colorsConstants from 'src/constants/colors.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import { Select } from "src/components/select/select";
import { DefaultInput } from "src/components/inputs/inputs.components";
import { DefaultButton } from "src/components/buttons/buttons.components";
import { useAppSelector } from "src/hooks/useReduxHooks";
import useAuthenticate from "src/hooks/useAuthentication";
import usePayments from "src/hooks/usePayments";
import { showToast } from "src/components/Toast";


const billers = [
    {
        label: 'FirstBank',
        value: '1'
    },
    {
        label: 'GTB',
        value: '2'
    },
    {
        label: 'Union Bank',
        value: '3'
    },
    {
        label: 'Zenith Bank',
        value: '4'
    },
    {
        label: 'EcoBank',
        value: '5'
    },
]

export default function BankDetailsScreen({
    navigation,
    route
}: RootStackScreenProps<"BankDetailsScreen">) {
    const theme = useColorScheme()
    const user = useAppSelector((state) => state.auth.user)
    const { loading, requestPasswordReset } = useAuthenticate();
    const { getBankList, getNameEnquiry, createBankDetails, loading: isLoading, getUserBankDetails, editBankDetails } = usePayments()
    const [bankList, setBankList] = useState<any>([])
    const [selectedBank, setSelectedBank] = useState<{
        label: string,
        value: string
    }>({ label: '', value: '' })
    const [accountNumber, setAccountNumber] = useState<string>('')
    const [accountName, setAccountName] = useState<string>('')
    const [actionType, setActionType] = useState<'edit' | 'submit'>('submit')

    const getBanks = async () => {
        const banks = await getBankList()
        if (!banks?.hasError) {
            const allBanks = banks.data.message.map((elem: {
                bankName: string,
                bankCode: string
            }) => {
                return {
                    label: elem.bankName,
                    value: elem.bankCode
                }
            })
            setBankList(allBanks)
            getUserDetails(allBanks)
        }

    }
    const getAccountName = async () => {
        const names = await getNameEnquiry({
            accountNumber,
            bankCode: selectedBank.value
        })
        if (!names?.hasError) {
            const accountName = names.data?.data?.account_name
            setAccountName(accountName)
        }

    }
    const handleVerify = async () => {
        if (route.params.isEmailVerified) {
            switch (actionType) {
                case 'edit':
                    const req = await editBankDetails({
                        "userId": user.id,
                        "accountNumber": accountNumber,
                        "accountName": accountName,
                        "financialInstitution": selectedBank.label
                    })
                    if (!req?.hasError)
                        showToast({
                            title: "Add Account Details",
                            type: "success",
                            message: "Account added successfully"
                        })
                    break;
                case 'submit':
                    const request = await createBankDetails({
                        "userId": user.id,
                        "accountNumber": accountNumber,
                        "accountName": accountName,
                        "financialInstitution": selectedBank.label
                    })
                    if (!request?.hasError)
                        showToast({
                            title: "Add Account Details",
                            type: "success",
                            message: "Account added successfully"
                        })
                    navigation.goBack()
                    break
                default: null
            }
        } else {
            const req = await requestPasswordReset({
                email: user.email,
            });
            if (!req?.hasError)
                navigation.navigate('OTPScreen', {
                    type: 'add-bank-account',
                    email: user.email
                })
        }

    }
    const getUserDetails = async (data: { label: '', value: '' }[]) => {
        const details = await getUserBankDetails({
            userId: user.id
        })
        if (!details?.hasError) {
            const {
                accountName = '',
                accountNumber = '',
                financialInstitution = ''
            } = details.data.message || {}
            setAccountNumber(accountNumber)
            setAccountName(accountName)
            const bank = data.find((elem: {
                label: string
            }) => elem.label === financialInstitution) || { label: '', value: '' }
            setSelectedBank(bank)
            if (accountName && accountNumber) {
                setActionType('edit')
            }
        }


    }
    useEffect(() => {
        getBanks()
    }, [navigation])

    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank?.value) {
            getAccountName()
        }
    }, [accountNumber, selectedBank])
    return (
        <Layout goback={true} title='Account Details'>
            <RNView style={styles.container}>
                <Select
                    options={bankList}
                    placeholder='Kindly select your bank'
                    onChange={(e) => setSelectedBank(e)}
                    textstyle={{ color: colorsConstants[theme].darkText3 }}
                    dynamicPlaceholder="Select bank"
                    defaultValue={selectedBank?.value || ''}
                />
                <DefaultInput
                    placeholder="Account Number"
                    placeholderTextColor={colorsConstants[theme].success_message}
                    keyboardType='number-pad'
                    onChangeText={(e) => setAccountNumber(e)}
                    value={accountNumber}
                    maxLength={10}
                    containerStyle={{ borderColor: colorsConstants[theme].borderLine, borderWidth: .6, borderRadius: 10, marginTop: 15, paddingBottom: 13, }}
                />
                <DefaultInput
                    placeholder="Account Name"
                    placeholderTextColor={colorsConstants[theme].success_message}
                    keyboardType='number-pad'
                    value={accountName}
                    editable={false}
                    containerStyle={{ borderColor: colorsConstants[theme].borderLine, borderWidth: .6, borderRadius: 10, marginTop: 1, paddingBottom: 13, }}
                />
                <RNView style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <DefaultButton
                        title={`${route.params.isEmailVerified ? actionType === 'submit' ? 'Submit' : 'Edit' : 'Verify OTP'}`}
                        type="solid"
                        loading={isLoading}
                        onPress={() => handleVerify()}
                        titleStyle={{
                            color: colorsConstants[theme].background
                        }}
                        buttonStyle={{
                            borderColor: colorsConstants.colorPrimary,
                        }}
                        containerStyle={{
                            marginBottom: fontsConstants.h(30)
                        }}
                    />
                </RNView>
            </RNView>
        </Layout>
    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        height: '78%'
    },
    text_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 25
    },
    text: {
        fontFamily: fontsConstants.Lora_Regular,
        fontSize: 16
    }
})