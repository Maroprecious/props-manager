import { useState } from "react";
import { addTenantToPropertyEndpoint } from "src/constants/api.endpoints.constants";
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
  return { loading, addTenantToUnit };
};

export default useTenant;

