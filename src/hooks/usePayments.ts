import { useState } from "react";
import { getTnxHistoryEndpoint, initiatePaymentEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const usePayments = () => {
  const [loading, setLoading] = useState(false);

  const initiatePayment = async (pathParams: {
    unitId: string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${initiatePaymentEndpoint}`,
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