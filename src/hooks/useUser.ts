import { useState } from "react";
import { getNotificationsEndpoint, getProfileEndpoint, updateProfileEndpoint } from "src/constants/api.endpoints.constants";
import { makeApiRequest } from "src/services/request";
import { NetworkResponse } from "src/types/api.response.types";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  
  const updateProfile = async (data: {
    userId: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
    aliasName?: string,
    pushToken?: string,
  }, cb = () => {}): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${updateProfileEndpoint}`,
      type: 'PUT',
      data
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const useGetProfile = async (userId: string, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getProfileEndpoint}/${userId}`,
      type: 'GET'
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  
  const useGetNotifications = async (userId: string, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getNotificationsEndpoint}/${userId}`,
      type: 'GET'
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  return { loading, updateProfile, useGetProfile, useGetNotifications };
};

export default useUser;