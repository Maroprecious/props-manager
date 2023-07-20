import { useState } from "react";
import { loginEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { LoginResponse, NetworkResponse } from "src/types/api.response.types";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(false);
  const authenticate = async (data: {
    email: string, 
    password: string
  }, cb = () => {}): Promise<LoginResponse> => {
    let response: LoginResponse;
    try {
      setLoading(true);
      const request = await makeApiRequest({
        route: `${loginEndpoint}`,
        type: 'POST',
        data,
        isDefaultAuth: true,
      });
      response = {
        ...request,
        hasError: request?.status !== 200 && request?.status !== 201
      }
      setLoading(false);
      cb();   
    } catch (e: any) {
      response = {
        message: e?.response?.data?.message || "An error occured",
        status: e?.response?.status || 400,
        hasError: true,
        statusText: e?.response?.statusText || "error"
      }
    } finally {
      setLoading(false)
    }
    return response;
  };

  const requestPasswordReset = async (data: {
    email: string, 
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${loginEndpoint}`,
      type: 'POST',
      data,
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200 && request?.status !== 201
    }
  };
  return { authenticate, loading, requestPasswordReset };
};

export default useAuthenticate;