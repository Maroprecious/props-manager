import * as Yup from 'yup'
const AddPropertyValidationSchema = Yup.object().shape({
    address: Yup.string().required('Property address is required'),
    status: Yup.string().required('Status is required'),
    rent: Yup.string().required('Rent amount is required'),
    landlords_name: Yup.string().required("Landlord's name is required"),
    landlords_mobile: Yup.string().required('Mobile Number is required')
  
  })
  const AddTenancyValidationSchema = Yup.object().shape({
    address: Yup.string().required('Property address is required'),
    status: Yup.string().required('Status is required'),
    property_type: Yup.string().required('Property type is required'),
    unit_type: Yup.string().required('Unit type is required'),
    block: Yup.string().required('block/flat is required'),
    duration: Yup.string().required('Tenancy duration is required'),
    rent: Yup.string().required('Rent amount is required'),
    landlords_name: Yup.string().required("Landlord's name is required"),
    landlords_mobile: Yup.string().required('Mobile Number is required')
})
export {
    AddPropertyValidationSchema,
    AddTenancyValidationSchema,
}