import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from 'src/utils/types';
import { getFeedsApi } from '@api';

type TFeedState = {
  orders: TOrder[];
  feed: { total: number; totalToday: number };
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  feed: { total: 0, totalToday: 0 },
  isLoading: false,
  error: null
};

export const getFeedsThunk = createAsyncThunk(
  'feed/getAll',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getFeed: (state) => state.feed,
    getFeedsLoading: (state) => state.isLoading,
    getFeedsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { getOrders, getFeedsLoading, getFeedsError, getFeed } =
  feedSlice.selectors;
