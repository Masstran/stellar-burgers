import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredientsThunk = createAsyncThunk(
  'ingredients',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsIsLoading: (state) => state.isLoading,
    getIngredientsError: (state) => state.error,
    getBuns: (state) => state.ingredients.filter((i) => i.type === 'bun'),
    getMains: (state) => state.ingredients.filter((i) => i.type === 'main'),
    getSauces: (state) => state.ingredients.filter((i) => i.type === 'sauce')
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const {} = ingredientsSlice.actions;

export const {
  getIngredients,
  getBuns,
  getMains,
  getSauces,
  getIngredientsIsLoading,
  getIngredientsError
} = ingredientsSlice.selectors;
