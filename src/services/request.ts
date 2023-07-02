import axios from 'axios';
import { API_BEARER_TOKEN } from "@env";
import { API_BASE_URL } from 'src/constants/global.constants';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${API_BEARER_TOKEN}`;
axios.defaults.timeout = 60 * 1000;

export const buildHeader = async (isDefaultAuth?: boolean): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    // 'Accept': '*/*',
  };

  if (isDefaultAuth) {
    Object.assign(headers, {
      Authorization: `Bearer ${API_BEARER_TOKEN}`,
    });
  }
  return headers;
};

export const makeUrlKeyValuePairs = (json: {[key: string]: any}): string => {
  if (!json || Object.keys(json).length < 1) {
    return '';
  }
  const keys: string[] = Object.keys(json);
  let query = '?';
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (json[key] !== undefined && json[key] !== "undefined")
      query +=
        encodeURIComponent(key) + '=' + encodeURIComponent(json[key]) + '&';
  }
  return query.replace(/&$/g, '');
};

export const makeUrlKeyValuePaths = (json: {[key: string]: any}): string => {
  if (!json || Object.keys(json).length < 1) {
    return '';
  }
  const keys: string[] = Object.keys(json);
  let query = '/';
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (json[key] !== undefined && json[key] !== "undefined")
      query +=
        encodeURIComponent(json[key]) + '/';
  }
  return query.replace(/&$/g, '');
};

type RequestObject = {
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | "PATCH";
  isDefaultAuth?: boolean;
  queryParams?: {[key: string]: any};
  pathParams?: {[key: string]: any};
  data?: {[key: string]: any};
  route: string;
  contentType?: 'application/json' | 'multipart/form-data' | string;
  uploadCb?: Function;
};
export async function makeApiRequest({
  data,
  type = 'GET',
  queryParams,
  pathParams,
  route,
  isDefaultAuth = false,
  contentType,
  uploadCb = () => null,
}: RequestObject): Promise<any> {
  
  // Handle get request with params
  let routePlusParams = route;

  if (pathParams) {
    routePlusParams += makeUrlKeyValuePaths(pathParams);
  }

  if (queryParams) {
    routePlusParams += makeUrlKeyValuePairs(queryParams);
  }

  const headers = await buildHeader(isDefaultAuth);
  if (contentType)
    Object.assign(headers, {
      'Content-Type': contentType
    });

  console.log('✅ Making axios request', data, type, queryParams, pathParams, route, routePlusParams, isDefaultAuth);
  let reqStatus;
  try {
    const response = await axios({
      url: routePlusParams.trim(),
      method: type,
      data,
      headers,
      onUploadProgress(progressEvent) {
        uploadCb(progressEvent)
      },
    });
    reqStatus = response?.status;
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error?.response) {
      reqStatus = error?.response?.status;
      return error.response.data;
    } else if (error?.request) {
      reqStatus = 444;
      return {
        statusCode: 444,
        message: "No response from server",
        status: "error"
      }
    } else {
      reqStatus = -1;
      return {
        statusCode: -1,
        message: "Unable to set up request",
        status: "error"
      }
    }
  } finally {
    console.log(`✅ axios request ${routePlusParams.trim()} done with status ${reqStatus}`)
  }
  
}
