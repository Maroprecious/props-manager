export const loginEndpoint = `/auth/login`;
export const signUpEndpoint = `/accounts/create-user`;
export const requestOTPEndpoint = `/auth/token/generate-otp`;
export const verifyOTPEndpoint = `/auth/token/verify-otp`;
export const resetPasswordEndpoint = `/accounts/forgot-password`;
export const updateProfileEndpoint = `/accounts/update-account`;
export const updatePasswordEndpoint = `/accounts/change-password`;


//properties
<<<<<<< HEAD
export const createPropertEndpoint = `/properties/create-property`;
export const editPropertyEndpoint = `/properties/update-property`;
=======
export const createPropertyEndpoint = `/properties/create-property`;
>>>>>>> 436ad7ad50a94a4451669a547f4c20104a10f144
export const createUnitEndpoint = `/properties/create-property-unit`;
export const editeUnitEndpoint = `/properties/update-unit`;
export const getUnitsTypesEndpoint = `/properties/unit-management/get-all-unit-type`;
export const getPropertiesEndpoint = `/properties/get-owner-based-property`;
export const getUnitsEndpoint = `/properties/get-property-units`;



//tenant
export const addTenantToPropertyEndpoint = `/properties/tenancy/create-tenancy`;