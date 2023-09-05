import { useState } from "react";
import { completeSignUpEndpoint, loginEndpoint , requestOTPEndpoint, resetPasswordEndpoint, signUpEndpoint, updatePasswordEndpoint, verifyOTPEndpoint} from "src/constants/api.endpoints.constants";
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

  const requestPasswordReset = async (pathParams: {
    email: string
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${requestOTPEndpoint}`,
      type: 'GET',
      pathParams,
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const verifyOTP = async (pathParams: {
    otp: string
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${verifyOTPEndpoint}`,
      type: 'GET',
      pathParams,
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const resetPassword = async (data: {
    email: string,
    newPassword: string
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${resetPasswordEndpoint}`,
      type: 'PUT',
      data,
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const updatePassword = async (data: {
    userId: string,
    oldPassword: string,
    newPassword: string
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${updatePasswordEndpoint}`,
      type: 'PUT',
      data,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const createAccount = async (data: {
    email: string, 
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    role: string,
    isCompleteAccountReg: boolean,
    userId?: string,
    pushToken?: string,
  }, cb = () => {}): Promise<LoginResponse> => {
    let response: LoginResponse;
    try {
      setLoading(true);
      const request = await makeApiRequest({
        route: data.isCompleteAccountReg ? `${completeSignUpEndpoint}` : `${signUpEndpoint}`,
        type: data.isCompleteAccountReg ? 'PUT' : 'POST',
        data,
        isDefaultAuth: !data?.isCompleteAccountReg,
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
  return { authenticate, loading, requestPasswordReset, createAccount, verifyOTP, resetPassword, updatePassword };
};

export default useAuthenticate;