import { API_DEV_URL, API_PROD_URL } from "@env";

export const API_BASE_URL = 'https://c8cb-102-88-68-186.ngrok-free.app/api/v1' //__DEV__ ? `${API_DEV_URL}` : `${API_PROD_URL}`;

export const PAYMENT_OPTIONS: any = ['card', 'ussd']

export const PLAY_STORE_APP_URI = `https://play.google.com/store/apps/details?id=com.supersoft.mypropsmanagermobile`