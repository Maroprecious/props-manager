import { useState } from "react";
import { addTenantToPropertyEndpoint, getTnxHistoryEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const usePayments = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (data: {
    userId: string,
    email: string,
    amount: number
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
  return { loading, initiatePayment };
};

export default usePayments;

export const useTransactions = () => {
  const [loading, setLoading] = useState(false);

  const getHistory = async (pathParams: {
    userId: string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getTnxHistoryEndpoint}`,
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
  return { loading, getHistory };
};