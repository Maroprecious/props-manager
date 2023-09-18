import { useState } from "react";
import { addTenantToPropertyEndpoint, endTenancyEndpoint, getOccupiedPropertiesEndpoint, getTenantInUnitEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const useTenant = () => {
  const [loading, setLoading] = useState(false);

  const addTenantToUnit = async (data: {
    tenantEmail: string,
    unitId: string,
    tenantDuration: string,
    lastPaymentDate: string,
    moveInDate: string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${addTenantToPropertyEndpoint}`,
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

  const getOccupiedProperties = async (pathParams: {
    tenantId: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getOccupiedPropertiesEndpoint}`,
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

  const endTenancy = async (pathParams: {
    tenancyId: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${endTenancyEndpoint}`,
      type: 'DELETE',
      pathParams
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  const getTenant = async (data: {
    unitId: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getTenantInUnitEndpoint}/${data.unitId}`,
      type: 'GET',
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  }
  return { loading, addTenantToUnit, getOccupiedProperties, endTenancy, getTenant };
};

export default useTenant;

