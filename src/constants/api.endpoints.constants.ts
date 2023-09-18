export const loginEndpoint = `/auth/login`;
export const signUpEndpoint = `/accounts/create-user`;
export const completeSignUpEndpoint = `/accounts/complete-profile`;
export const requestOTPEndpoint = `/auth/token/generate-otp`;
export const verifyOTPEndpoint = `/auth/token/verify-otp`;
export const resetPasswordEndpoint = `/accounts/forgot-password`;
export const updateProfileEndpoint = `/accounts/update-account`;
export const updatePasswordEndpoint = `/accounts/change-password`;


//properties
export const createPropertEndpoint = `/properties/create-property`;
export const editPropertyEndpoint = `/properties/update-property`;
export const createPropertyEndpoint = `/properties/create-property`;
export const createUnitEndpoint = `/properties/create-property-unit`;
export const editeUnitEndpoint = `/properties/update-unit`;
export const getUnitsTypesEndpoint = `/properties/unit-management/get-all-unit-type`;
export const getPropertiesEndpoint = `/properties/get-owner-based-property`;
export const getUnitsEndpoint = `/properties/get-property-units`;
export const getOnePropertyEndpoint = `/properties/get-property-details`;
export const getPropertyOccupantsEndpoint = `/properties/get-tenant-in-a-property`;



//tenant
export const addTenantToPropertyEndpoint = `/properties/tenancy/create-tenancy`;
export const getOccupiedPropertiesEndpoint = `/properties/tenancy/get-tenant-occupied-details`;
export const endTenancyEndpoint = `/properties/tenancy/remove-tenancy`;
export const getTenantInUnitEndpoint = `/properties/get-tenant-in-a-unit`


//transactions
export const getTnxHistoryEndpoint = `/transactions/get-transaction-history`;
export const initiatePaymentEndpoint = `/transactions/initiate-rent-payment`;
export const getBankListEndpoint = '/accounts/banks/get-banks';
export const getNameEnquiryEndpoint = `/accounts/banks/name-enquiry`
export const getUserBankDetailsEndpoint = `/accounts/banks/fetch-user-bank-details`
export const createBankDetailsEndpoint = `accounts/banks/create-bank-details`
export const editBankDetailsEndpoint = `/accounts/banks/update-bank-details`
export const getFinancialsEndpoint = `/transactions/get-financials`;
