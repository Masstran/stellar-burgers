import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from 'src/utils/types';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

type TOrderState = {
  orderModalData: TOrder | null;
  viewOrderModalData: TOrder | null;
  isOrderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  viewOrderModalData: null,
  isOrderRequest: false,
  error: null
};

export const putOrderThunk = createAsyncThunk(
  'order/put',
  async (ids: string[]) => await orderBurgerApi(ids)
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrderModalData: (state) => state.orderModalData,
    getIsOrderRequest: (state) => state.isOrderRequest,
    getViewOrderModalData: (state) => state.viewOrderModalData,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(putOrderThunk.pending, (state) => {
        state.error = null;
        state.isOrderRequest = true;
      })
      .addCase(putOrderThunk.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.orderModalData = { ...action.payload.order, ingredients: [] };
      })
      .addCase(putOrderThunk.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.error = null;
        state.viewOrderModalData = null;
        state.isOrderRequest = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.viewOrderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;

export const {
  getViewOrderModalData,
  getOrderModalData,
  getOrderError,
  getIsOrderRequest
} = orderSlice.selectors;
