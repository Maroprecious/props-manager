import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_BEARER_TOKEN } from "@env";
import { produce } from 'immer';
import { ReduxAuthState } from 'src/types/app.types';

const initialAuthState: ReduxAuthState = {
  token: API_BEARER_TOKEN,
  user: {
    id: null,
    completed: false,
    email: "",
    firstName: "",
    lastName: "",
    roles: [],
    username: "",
    verified: false
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    populateUserData: (state, action) => {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload?.token}`;
      state = produce(state, draft => {
        draft.token = action?.payload?.token || state.token
        draft.user = action?.payload?.user || state.user
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
        draft.user.id = null
      })
      return state;
    }
  },
})

// Action creators are generated for each case reducer function
export const { populateUserData, logout, updateUserProfileData } = authSlice.actions

export default authSlice.reducer