import { useState } from "react";
import { createPropertyEndpoint, createUnitEndpoint, getPropertiesEndpoint, getUnitsTypesEndpoint, getUnitsEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const useProperty = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  const getProperties = async (pathParams: {
    userId: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getPropertiesEndpoint}`,
      type: 'GET',
      pathParams
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const createProperty = async (data: {
    propertyName: string,
    propertyLocation: string,
    occupationalStatus: string,
    propertyState: string,
    userId: string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setCreated(false);
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createPropertyEndpoint}`,
      type: 'POST',
      data
    });
    setLoading(false);
    cb();
    setCreated(request?.status === 200)
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  return { loading, createProperty, created, getProperties };
};

export default useProperty;

export const useUnits = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingTypes, setFetchingTypes] = useState(false);

  const getTypes = async (cb = () => { }): Promise<NetworkResponse> => {
    setFetchingTypes(true);
    const request = await makeApiRequest({
      route: `${getUnitsTypesEndpoint}`,
      type: 'GET',
    });
    setFetchingTypes(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const createUnit = async (data: {
    unitTypeId: string,
    unitName: string,
    unitRent: number,
    unitServiceCharge: number,
    unitLegalCharge: number,
    unitAgreementCharge: number,
    unitCommissionCharge: number,
    propertyId: string
  }[], cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createUnitEndpoint}`,
      type: 'POST',
      data
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  const getUnits = async (
  id: string, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getUnitsEndpoint}/${id}`,
      type: 'GET',
      
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  return { loading, getTypes, createUnit, fetchingTypes, getUnits };
}
