import { useState } from "react";
import { createBankDetailsEndpoint, editBankDetailsEndpoint, getBankListEndpoint, getNameEnquiryEndpoint, getTnxHistoryEndpoint, getUserBankDetailsEndpoint, initiatePaymentEndpoint, getFinancialsEndpoint } from "src/constants/api.endpoints.constants";
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

  const getBankList = async (
    cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getBankListEndpoint}`,
      type: 'GET',
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const getNameEnquiry = async (data: {
    accountNumber: string,
    bankCode: string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getNameEnquiryEndpoint}/${data.accountNumber}/${data.bankCode}`,
      type: 'GET',
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const createBankDetails = async (data: {
    userId: string | null,
    accountNumber: string,
    accountName: string,
    financialInstitution: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${createBankDetailsEndpoint}`,
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
  const editBankDetails = async (data: {
    userId: string | null,
    accountNumber: string,
    accountName: string,
    financialInstitution: string
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${editBankDetailsEndpoint}`,
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
  const getUserBankDetails = async (data: {
    userId: null | string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getUserBankDetailsEndpoint}/${data.userId}`,
      type: 'GET',
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };

  const getFinancials = async (data: {
    userId: null | string,
  }, cb = () => { }): Promise<NetworkResponse> => {
    setLoading(true);
    const request = await makeApiRequest({
      route: `${getFinancialsEndpoint}/${data.userId}`,
      type: 'GET',
    });
    setLoading(false);
    cb();
    return {
      ...request,
      hasError: request?.status !== 200
    }
  };
  
  return { loading, initiatePayment, getBankList, getNameEnquiry, createBankDetails,editBankDetails, getUserBankDetails, getFinancials };
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