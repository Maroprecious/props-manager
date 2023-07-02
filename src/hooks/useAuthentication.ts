import { useState } from "react";
import { loginEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/Request";
import { LoginResponse } from "src/types/api.response.types";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(false);
  const authenticate = async (data: {
    username: string, 
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
      response = request?.data
      setLoading(false);
      cb();   
    } catch (e: any) {
      response = {
        message: e?.response?.data?.message || "An error occured",
        status: e?.response?.status || 400,
        statusText: "error",
        data: e?.response?.data?.data || undefined
      }
    } finally {
      setLoading(false)
    }
    return response;
  };
  return { authenticate, loading };
};

export default useAuthenticate;