import { useState } from "react";
import {
  authEmailEndpoint,
  authPasswordEndpoint,
  completeSignUpEndpoint,
  generateOtp,
  loginEndpoint,
  newSignUpEndpoint,
  newUpdatePasswordEndpoint,
  newVerifyOtp,
  requestOTPEndpoint,
  resetPasswordEndpoint,
  signUpEndpoint,
  updatePasswordEndpoint,
  verifyOTPEndpoint,
} from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { LoginResponse, NetworkResponse } from "src/types/api.response.types";

const useAuthenticate = () => {
  const [loading, setLoading] = useState(false);
  const authenticate = async (
    data: {
      email: string;
      password: string;
    },
    cb = () => {}
  ): Promise<LoginResponse> => {
    let response: LoginResponse;
    try {
      setLoading(true);
      const request = await makeApiRequest({
        route: `${loginEndpoint}`,
        type: "POST",
        data,
        isDefaultAuth: true,
      });
      response = {
        ...request,
        hasError: request?.status !== 200 && request?.status !== 201,
      };
      setLoading(false);
      cb();
    } catch (e: any) {
      response = {
        message: e?.response?.data?.message || "An error occured",
        status: e?.response?.status || 400,
        hasError: true,
        statusText: e?.response?.statusText || "error",
      };
    } finally {
      setLoading(false);
    }
    return response;
  };

  const requestPasswordReset = async (
    pathParams: {
      email: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${generateOtp}/${pathParams.email}`,
      type: "GET",

      // isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const verifyOTP = async (
    pathParams: {
      otp: string;
      username: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${newVerifyOtp}/${pathParams.username}/${pathParams.otp}`,
      type: "GET",
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const authEmail = async (
    pathParams: {
      email: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${authEmailEndpoint}/${pathParams.email}`,
      type: "GET",

      // isDefaultAuth: true,
    });
    setLoading(false);
    console.log(request);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const authPassword = async (
    pathParams: {
      password: string;
      code: number;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${authPasswordEndpoint}`,
      type: "GET",
      pathParams,
    });
    setLoading(false);
    console.log(request);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const resetPassword = async (
    data: {
      email: string;
      newPassword: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${resetPasswordEndpoint}`,
      type: "PUT",
      data,
      isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  const newResetPassword = async (
    data: {
      email: string;
      newPassword: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${resetPasswordEndpoint}`,
      type: "POST",
      data,
      // isDefaultAuth: true,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };
  const updatePassword = async (
    data: {
      userId: string;
      oldPassword: string;
      newPassword: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${updatePasswordEndpoint}`,
      type: "PUT",
      data,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200,
    };
  };
  const newUpdatePassword = async (
    data: {
      email: string;
      oldPassword: string;
      newPassword: string;
    },
    cb = () => {}
  ): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${updatePasswordEndpoint}`,
      type: "POST",
      data,
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.data?.statusMessage === "Failed",
    };
  };

  const createAccount = async (
    data: {
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      password: string;
      // role: string;
      isCompleteAccountReg: boolean;
      // userId?: string;
      // pushToken?: string;
    },
    cb = () => {}
  ): Promise<LoginResponse> => {
    let response: LoginResponse;
    try {
      setLoading(true);
      const request = await makeApiRequest({
        route: data.isCompleteAccountReg
          ? `${completeSignUpEndpoint}`
          : `${newSignUpEndpoint}`,
        type: data.isCompleteAccountReg ? "POST" : "POST",
        data,
        isDefaultAuth: !data?.isCompleteAccountReg,
      });
      response = {
        ...request,
        hasError: request?.data?.statusMessage === "Failed",
      };
      setLoading(false);
      cb();
    } catch (e: any) {
      response = {
        message: e?.response?.data?.message || "An error occured",
        status: e?.response?.status || 400,
        hasError: true,
        statusText: e?.response?.statusText || "error",
      };
    } finally {
      setLoading(false);
    }
    return response;
  };
  return {
    authenticate,
    loading,
    authEmail,
    authPassword,
    requestPasswordReset,
    createAccount,
    verifyOTP,
    resetPassword,
    updatePassword,
    newUpdatePassword,
    newResetPassword,
  };
};

export default useAuthenticate;
