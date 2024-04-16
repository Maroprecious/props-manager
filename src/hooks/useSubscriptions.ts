import { useState } from "react";
import { getSubscriptionPlansEndpoint, initiateSubscriptionPaymentEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const useSubscriptions = () => {
  const [loading, setLoading] = useState(false);
  
  const useGetPlans = async (cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getSubscriptionPlansEndpoint}`,
      type: 'GET',
      isDefaultAuth: true
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  const useInitiatePayment = async (pathParams: {
    userId: string,
    subscriptionMethodId: string | number,
    paymentMethod: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${initiateSubscriptionPaymentEndpoint}/${pathParams.userId}/${pathParams.subscriptionMethodId}/${pathParams.paymentMethod}`,
      type: 'GET',
      // isDefaultAuth: true
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  return { loading, useGetPlans, useInitiatePayment };
};

export default useSubscriptions;