import { AuthUserType } from "./app.types";

export type NetworkResponse = {
  status: number,
  statusText?: string,
  hasError?: boolean,
  errorType?: string,
  message?: string,
  error?: string
}

export type LoginResponse =  NetworkResponse & {
  data?: {
    token?: string
  } & AuthUserType
};
