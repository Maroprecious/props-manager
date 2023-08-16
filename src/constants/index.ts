import { API_DEV_URL, API_PROD_URL } from "@env";

export const API_BASE_URL =  __DEV__ ? `${API_DEV_URL}` : `${API_PROD_URL}`;

export const PAYMENT_OPTIONS: any = ['card', 'ussd']