import * as React from 'react';
import Layout from 'src/components/layout/layout';
import { Text, View, ScrollView, } from 'src/components/Themed';
import colorsConstants from 'src/constants/colors.constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { RootStackScreenProps } from "src/types/navigations.types";
import { InputAddress } from 'src/components/inputs/address-input';
import { Select } from 'src/components/select/select';
import { optionProps } from 'src/components/select/select';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { AddPropertyValidationSchema } from 'src/utils/schema';
import styles from './styles/add-property.styles';
import fontsConstants from 'src/constants/fonts.constants';
import { View as RNView} from 'react-native';

const options: optionProps[] = [
  {
    label: 'Occupying as tenant',
    value: '2'
  },
  {
    label: 'Registering as owner',
    value: '3'
  },
  {
    label: 'Registering as manager or caretaker',
    value: '4'
  }
]


export default function AddProperty({
    navigation,
    route
  }: RootStackScreenProps<"AddProperty">)  {

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    initialValues: {
      address: '',
      status: '',
      rent: '',
      landlords_name: '',
      landlords_mobile: '',
    },
    validationSchema: AddPropertyValidationSchema,
    onSubmit: async (values) => {

    },
  });
  return (
    <Layout goback={true} title='Add Property'>
      <RNView style={styles.container}>
        <RNView style={styles.input}>
          <InputAddress
            onChange={handleChange("address")}
            onBlur={handleBlur("address")}
            placeholder='Enter Property Address'
            err={!!errors.address && touched.address}
            errMsg={errors.address}
          />
        </RNView>
        <RNView style={styles.select_Container}>
          <Select
            options={options}
            placeholder='Select Occupational Status'
            onChange={(e) => {
              // setFieldValue('status', e.value)
              if (e.value === '2') {
                navigation.navigate('AddTenancyDetails')
              }
            }}
            err={!!errors.status && touched.status}
            errMsg={errors.status}
            containerWidth='94%'
            fontFamily={fontsConstants.Lora_Regular}
            bgColor='rgba(200, 200, 201, 0.4)'
          />
        </RNView>
      </RNView>
    </Layout>
  )
}