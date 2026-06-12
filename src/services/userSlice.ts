import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const result = await loginUserApi(data);
    if (result.success) {
      setCookie(ACCESS_TOKEN, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN, result.refreshToken);
    }
    return result;
  }
);

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const result = await registerUserApi(data);
    if (result.success) {
      setCookie(ACCESS_TOKEN, result.accessToken);
      localStorage.setItem(REFRESH_TOKEN, result.refreshToken);
    }
    return result;
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    const result = await logoutApi();
    if (result.success) {
      localStorage.removeItem(REFRESH_TOKEN);
      deleteCookie(ACCESS_TOKEN);
      dispatch(userLogout());
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkUser',
  async () => await getUserApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(checkUserAuthThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuthThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(checkUserAuthThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { userLogout, authChecked } = userSlice.actions;

export const { getUser, getUserError, getIsAuthChecked } = userSlice.selectors;
