import { API_DEV_URL, API_PROD_URL } from "@env";

export const API_BASE_URL = 'https://8610-102-88-68-67.ngrok-free.app/api/v1' //__DEV__ ? `${API_DEV_URL}` : `${API_PROD_URL}`;

export const PAYMENT_OPTIONS: any = ['card', 'ussd']

export const PLAY_STORE_APP_URI = `https://play.google.com/store/apps/details?id=com.supersoft.mypropsmanagermobile`