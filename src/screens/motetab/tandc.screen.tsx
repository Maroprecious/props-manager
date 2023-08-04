import * as React from 'react';
import Layout from "src/components/layout/layout";
import { StyleSheet, View as RNView, Image, ScrollView } from 'react-native';
import { Text } from 'src/components/Themed';
import { RootStackScreenProps } from 'src/types/navigations.types';
import fontsConstants from 'src/constants/fonts.constants';
import useColorScheme from 'src/hooks/useColorScheme';
import colorsConstants from 'src/constants/colors.constants';
import { Terms } from 'src/components/terms-conditions/terms-condition';

export default function TermsAndConditionScreen({
    navigation,
    route
}: RootStackScreenProps<"TermsAndConditionScreen">) {
    const theme = useColorScheme();

    return (
        <ScrollView>
            <Layout goback={true} title='Terms and Conditions'>
                <RNView style={styles.container}>
                    <Terms
                        title='Terms and Conditions for Use of Mypropsmanger Application'
                        text1='These Terms and Conditions ("Terms") govern your access to and use of the Mypropsmanager Application ("Application"), provided by [SuperSoft Technology] ("Company"). By using the Application, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Application.'
                    />
                    <RNView style={styles.content}>
                        <Terms
                            title='1. Account Creation and Access'
                            text1='1.1. You must create an account to use the Application. You agree to provide accurate and complete information during the account creation process'
                            text2='1.2. You are solely responsible for maintaining the confidentiality of your account credentials and for any activities or actions taken under your account. You must notify the Company immediately of any unauthorised use or suspected breach of security.'
                            text3='1.3. The Company reserves the right to suspend or terminate your account if any information provided by you is found to be false, misleading, or violates these Terms.'

                        />
                    </RNView>
                    <RNView>
                        <Terms
                            title='2. Use of the Application'
                            text1='2.1. The Application is designed to facilitate property management and payment transactions between landlords, tenants, and property managers. You may use the Application solely for lawful purposes and in accordance with these Terms.'
                            text2="2.2. You agree not to use the Application in any manner that could disable, damage, or impair the functionality or security of the Application or interfere with other users’ use of the Application."
                            text3='2.3. You are responsible for maintaining the accuracy and completeness of any information you provide through the Application. The Company is not responsible for any errors, omissions, or inaccuracies in the information you provide.'
                            text4='2.4. The Company may update, modify, or add new features to the Application from time to time, without prior notice.'
                        />
                    </RNView>
                    <RNView>
                        <Terms
                            title='3. Intellectual Property'
                            text1='3.1. The Application and its content, including but not limited to text, graphics, images, logos, and software, are the property of the Company and are protected by intellectual property laws. You may not copy, reproduce, distribute, modify, or create derivative works of the Application or its content without the Company’s prior written consent.'
                        />
                    </RNView>

                    <RNView style={styles.content}>
                        <Terms
                            title='4. Payments and Financial Transactions'
                            text1='4.1. The Application may enable you to make payments and conduct financial transactions. You acknowledge and agree that the Company is not a financial institution, and any transactions conducted through the Application are solely between you and the other party involved. '
                            text2='4.2. The Company is not responsible for any disputes, issues, or liabilities arising from financial transactions conducted through the Application. You agree to resolve any disputes directly with the other party involved and hold the Company harmless from any claims or damages related to such disputes. '
                        />
                    </RNView>
                </RNView>
            </Layout>
        </ScrollView>

    )

}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        paddingTop: 4,
        paddingBottom: 30
    },
    content: {
        marginTop: -23
    }
})