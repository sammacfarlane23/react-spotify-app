import {
  AUTHENTICATE_USER,
  STORE_USER_DATA,
  STORE_ACCESS_TOKEN,
  REMOVE_ACCESS_TOKEN,
  SIGN_OUT_USER,
} from "./constants";

export const authenticateUser = () => ({
  type: AUTHENTICATE_USER,
  isAuthenticated: true,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
  isAuthenticated: false,
});

export const storeUserData = (state) => ({
  type: STORE_USER_DATA,
  userData: state,
});

export const storeAccessToken = (state) => ({
  type: STORE_ACCESS_TOKEN,
  accessToken: state,
});

export const removeAccessToken = () => ({
  type: REMOVE_ACCESS_TOKEN,
  accessToken: "",
});
