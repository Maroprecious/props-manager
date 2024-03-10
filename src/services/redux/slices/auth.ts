import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { API_BEARER_TOKEN } from "@env";
import { produce } from 'immer';
import { ReduxAuthState, roleTypes } from 'src/types/app.types';
import SecureStoreManager from 'src/utils/SecureStoreManager';

const API_BEARER_TOKEN = process.env.EXPO_PUBLIC_API_BEARER_TOKEN;

const initialAuthState: ReduxAuthState = {
  token: API_BEARER_TOKEN,
  user: {
    id: null,
    completed: false,
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
    aliasName: "",
    verified: false,
    phoneNumber: "",
    roleType: null,
    pushToken: "",
    currentSubscriptionMethodDetails: {
      id: -1,
      creationDate: new Date(),
      subscriptionMethodName: "Basic",
      subscriptionPrice: 0.0,
      lowerBound: 1,
      upperBound: 4,
    }
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    populateUserData: (state, action) => {
      const user = action?.payload?.user
      if (!user?.completed) SecureStoreManager.setInitialRouteName("CompleteAccountCreationScreen")
      else if (!user?.verified) SecureStoreManager.setInitialRouteName("VerifyEmailScreen")
      
      const roleType: roleTypes = user.roles.length === 1 && user.roles[0] === "ROLE_TENANT" 
        ? "tenant"
        : user.roles.length === 1 && user.roles[0] === "ROLE_LANDLORD"
        ? "landlord"
        : "property-manager"
      
      user['roleType'] = roleType
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload?.token}`;
      state = produce(state, draft => {
        draft.token = action?.payload?.token || state.token
        draft.user = user || state.user
      })
      return state;
    },
    updateUserProfileData: (state, action) => {   
      state = produce(state, draft => {
        draft.user = action?.payload || state.user
      })   
      return state;
    },
    logout: (state) => {
      state = produce(state, draft => {
        draft.token = null,
        draft.user.id = null,
        draft.user.email = ''
      })
      return state;
    }
  },
})

// Action creators are generated for each case reducer function
export const { populateUserData, logout, updateUserProfileData } = authSlice.actions

export default authSlice.reducer