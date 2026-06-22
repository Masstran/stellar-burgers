import { expect, test, describe } from '@jest/globals';
import {
  getIngredientsThunk,
  ingredientsSliceReducer,
  initialState,
  TIngredientsState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const errorState: TIngredientsState = {
  ...initialState,
  error: 'Previous error'
};

const loadingState: TIngredientsState = {
  ...initialState,
  isLoading: true
};

describe('ingredients reducers test', () => {
  test('When pending should set isLoading and reset error', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const newState: TIngredientsState = ingredientsSliceReducer(
      errorState,
      action
    );
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBe(null);
  });

  test('When rejected should reset isLoading and set error', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'Some error' }
    };
    const newState: TIngredientsState = ingredientsSliceReducer(
      loadingState,
      action
    );
    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe('Some error');
  });

  test('When fulfilled should reset isLoading and set ingredients', () => {
    const ingredients: TIngredient[] = [
      {
        _id: 'a',
        name: 'test',
        type: 'bun',
        fat: 1,
        calories: 1,
        carbohydrates: 1,
        proteins: 1,
        image: 'img',
        image_large: 'img',
        image_mobile: 'img',
        price: 1
      }
    ];
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: ingredients
    };
    const newState = ingredientsSliceReducer(loadingState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual(ingredients);
  });

  test('Should return initialState on undefined state and unknown action', () => {
    const action = { type: 'Unknown' };
    const newState = ingredientsSliceReducer(undefined, action);
    expect(newState).toBe(initialState);
  });
});
