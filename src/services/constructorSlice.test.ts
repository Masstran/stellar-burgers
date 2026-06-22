import { expect, test, describe, beforeEach, afterEach } from '@jest/globals';

import { nanoid } from '@reduxjs/toolkit';
import {
  addConstructorIngredient,
  clearConstructor,
  constructorSlice,
  constructorSliceReducer,
  initialState,
  moveConstructorIngredient,
  removeConstructorIngredient,
  TConstructorState
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const withId = (ingredient: TIngredient): TConstructorIngredient => ({
  ...ingredient,
  id: ingredient._id
});

const bun: TIngredient = {
  _id: '1',
  name: 'bun',
  type: 'bun',
  fat: 0,
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  price: 0,
  image_mobile: '',
  image_large: '',
  image: ''
};
const bunWithId = withId(bun);

const main: TIngredient = {
  _id: '2',
  name: 'main',
  type: 'main',
  fat: 0,
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  price: 0,
  image_mobile: '',
  image_large: '',
  image: ''
};
const mainWithId = withId(main);

const sauce: TIngredient = {
  _id: '3',
  name: 'sauce',
  type: 'sauce',
  fat: 0,
  calories: 0,
  proteins: 0,
  carbohydrates: 0,
  price: 0,
  image_mobile: '',
  image_large: '',
  image: ''
};
const sauceWithId = withId(sauce);

const bunOnlyState: TConstructorState = {
  ...initialState,
  bun: bunWithId
};

const ingredientState: TConstructorState = {
  ...initialState,
  ingredients: [mainWithId]
};

const ingredientsState: TConstructorState = {
  ...initialState,
  ingredients: [mainWithId, sauceWithId]
};

const fullState: TConstructorState = {
  ...initialState,
  bun: bunWithId,
  ingredients: [mainWithId, sauceWithId]
};

const sortedState: TConstructorState = {
  ...initialState,
  bun: bunWithId,
  ingredients: [sauceWithId, mainWithId]
};

describe('constructor reducers test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('When adding bun, should set bun', () => {
    const action = { type: addConstructorIngredient.type, payload: bunWithId };
    const newState = constructorSliceReducer(initialState, action);
    expect(newState).toEqual(bunOnlyState);
  });

  test('When adding ingredients, should set ingredients in correct order', () => {
    const action = {
      type: addConstructorIngredient.type,
      payload: mainWithId
    };
    const newState = constructorSliceReducer(initialState, action);
    expect(newState).toEqual(ingredientState);
    action.payload = sauceWithId;
    const newestState = constructorSliceReducer(newState, action);
    expect(newestState).toEqual(ingredientsState);
  });

  test('When removing bun should remove bun', () => {
    const action = {
      type: removeConstructorIngredient.type,
      payload: bunWithId
    };
    const newState = constructorSliceReducer(fullState, action);
    expect(newState).toEqual(ingredientsState);
  });

  test('When removing ingredient should remove it', () => {
    const action = {
      type: removeConstructorIngredient.type,
      payload: sauceWithId
    };
    const newState = constructorSliceReducer(ingredientsState, action);
    expect(newState).toEqual(ingredientState);
  });

  test("When removing absent ingredient shouldn't change", () => {
    const action = {
      type: removeConstructorIngredient.type,
      payload: sauceWithId
    };
    const newState = constructorSliceReducer(ingredientState, action);
    expect(newState).toEqual(ingredientState);
  });

  test('When clearing should return to initial state', () => {
    const action = {
      type: clearConstructor.type
    };
    const newState = constructorSliceReducer(fullState, action);
    expect(newState).toEqual(initialState);
  });

  test('When moving, should swap ingredients', () => {
    const action = {
      type: moveConstructorIngredient.type,
      payload: {
        ingredient: sauceWithId,
        direction: 'up'
      }
    };
    const newState = constructorSliceReducer(fullState, action);
    expect(newState).toEqual(sortedState);
    action.payload.direction = 'down';
    const newestState = constructorSliceReducer(newState, action);
    expect(newestState).toEqual(fullState);
  });

  test('Should return initialState on undefined state and unknown action', () => {
    const action = { type: 'Unknown' };
    const newState = constructorSliceReducer(undefined, action);
    expect(newState).toBe(initialState);
  });
});
