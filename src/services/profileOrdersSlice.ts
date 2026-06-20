import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from 'src/utils/types';
import { getOrdersApi } from '@api';

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const getProfileFeed = createAsyncThunk(
  'profileOrders/get',
  async () => await getOrdersApi()
);

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (state) => state.orders,
    getProfileOrdersLoading: (state) => state.isLoading,
    getProfileOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileFeed.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProfileFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const {
  getProfileOrders,
  getProfileOrdersLoading,
  getProfileOrdersError
} = profileOrdersSlice.selectors;
