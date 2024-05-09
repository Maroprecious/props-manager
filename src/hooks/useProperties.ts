import { useState } from "react";
import {
  createPropertyEndpoint,
  createUnitEndpoint,
  getPropertiesEndpoint,
  getUnitsTypesEndpoint,
  getUnitsEndpoint,
  editPropertyEndpoint,
  editeUnitEndpoint,
  getOnePropertyEndpoint,
  getPropertyOccupantsEndpoint,
  getUnocuppiedUnitsEndpoint,
  deleteUnitEndpoint,
  deletePropertyEndpoint,
  newGetAllProperties,
  newGetAllUnitTypes,
} from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const useProperty = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const getProperties = async (
    pathParams: {
      userId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${newGetAllProperties}/${pathParams.userId}`,
      type: "GET",
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const getOneProperty = async (
    pathParams: {
      propertId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getOnePropertyEndpoint}`,
      type: "GET",
      pathParams,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const getPropertyOccupants = async (
    pathParams: {
      propertyId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getPropertyOccupantsEndpoint}`,
      type: "GET",
      pathParams,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const createProperty = async (
    data: {
      propertyName: string;
      propertyLocation: string;
      occupationalStatus: string;
      propertyState: string;
      userId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setCreated(false);
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createPropertyEndpoint}`,
      type: "POST",
      data,
    });
    setLoading(false);
    cb();
    setCreated(request?.status === 200);
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const newCreateProperty = async (
    data: {
      propertyName: string;
      propertyLocation: string;
      occupationalStatus: string;
      propertyState: string;
      email: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setCreated(false);
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createPropertyEndpoint}`,
      type: "POST",
      data,
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    setCreated(request?.data?.statusMessage === 'Successful');
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const editProperty = async (
    data: {
      propertyName: string;
      propertyLocation: string;
      occupationalStatus: string;
      propertyState: string;
      propertyId: string;
      email: string
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setCreated(false);
    setLoading(true);
    const request = await makeApiRequest({
      route: `${editPropertyEndpoint}`,
      type: "POST",
      data,
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    setCreated(request?.status === 200);
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const deleteOneProperty = async (
    pathParams: {
      propertId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${deletePropertyEndpoint}`,
      type: "DELETE",
      pathParams,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  return {
    loading,
    deleteOneProperty,
    newCreateProperty,
    createProperty,
    created,
    getProperties,
    editProperty,
    getOneProperty,
    getPropertyOccupants,
  };
};

export default useProperty;

export const useUnits = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(false);

  const getTypes = async (cb = () => {}): Promise<NetworkResponse> => {
    setFetchingTypes(true);
    const request = await makeApiRequest({
      route: `${newGetAllUnitTypes}`,
      type: "GET",
      isDefaultAuth: true
    });
    setFetchingTypes(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const createUnit = async (
    propertyUnits: {
      unitTypeId: string;
      unitName: string;
      unitRent: number;
      unitServiceCharge: number;
      unitLegalFee: number;
      unitAgreementCharge: number;
      unitCommissionCharge: number;
      propertyId: string;
    }[],
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createUnitEndpoint}`,
      type: "POST",
      data: propertyUnits,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  const newCreateUnit = async (
    propertyUnits: {
      unitTypeId: string;
      unitName: string;
      unitRent: number;
      unitServiceCharge: number;
      unitLegalFee: number;
      unitAgreementCharge: number;
      unitCommissionCharge: number;
      propertyId: string;
    }[],
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    console.log(propertyUnits, 'propertyUnits')
    const request = await makeApiRequest({
      route: `${createUnitEndpoint}`,
      type: "POST",
      data: {
        propertyUnits
      },
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };
  const getUnits = async (
    id: string,
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getUnitsEndpoint}/${id}`,
      type: "GET",
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  const editUnit = async (
    data: {
      unitTypeId: string;
      unitName: string;
      unitRent: number;
      unitServiceCharge: number;
      unitLegalFee: number;
      unitAgreementCharge: number;
      unitCommissionCharge: number;
      propertyId: string;
      unitOtherCharges: number;
    },
    id: string,
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${editeUnitEndpoint}/${id}`,
      type: "PUT",
      data: data,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  const getUnocuppiedUnits = async (
    id: string,
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getUnocuppiedUnitsEndpoint}/${id}`,
      type: "GET",
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };

  const deleteOneUnit = async (
    pathParams: {
      unitId: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${deleteUnitEndpoint}`,
      type: "DELETE",
      pathParams,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  return {
    loading,
    deleteOneUnit,
    getTypes,
    createUnit,
    fetchingTypes,
    newCreateUnit,
    getUnits,
    editUnit,
    getUnocuppiedUnits,
  };
};
