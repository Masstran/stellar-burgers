import { expect, test, describe } from '@jest/globals';
import {
  getIngredientsThunk,
  ingredientsSliceReducer,
  initialState,
  TIngredientsState
} from './ingredientsSlice';

const errorState: TIngredientsState = {
  ...initialState,
  error: 'Previous error'
};

const loadingState: TIngredientsState = {
  ...initialState,
  isLoading: true
};

describe('ingredients reducers test', () => {
  test('success', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const newState: TIngredientsState = ingredientsSliceReducer(
      errorState,
      action
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });
});
