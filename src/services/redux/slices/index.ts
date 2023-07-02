import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';

const reducers = {
  auth: authReducer
};


export default combineReducers(reducers);