import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addConstructorIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeConstructorIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      if (state.bun && state.bun.id === ingredient.id) {
        state.bun = null;
      } else {
        state.ingredients = state.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
      }
    },
    clearConstructor: () => initialState,
    moveConstructorIngredient: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        direction: 'up' | 'down';
      }>
    ) => {
      const ingredient = action.payload.ingredient;
      const index = state.ingredients.findIndex((i) => i.id === ingredient.id);
      state.ingredients.splice(index, 1);
      const newIndex =
        action.payload.direction === 'up' ? index - 1 : index + 1;
      state.ingredients.splice(newIndex, 0, ingredient);
    }
  },
  selectors: {
    getConstructorIngredients: (state) => state.ingredients,
    getConstructorBun: (state) => state.bun,
    getConstructorItems: (state) => state
  }
});

export const {
  removeConstructorIngredient,
  addConstructorIngredient,
  clearConstructor,
  moveConstructorIngredient
} = constructorSlice.actions;

export const constructorSliceReducer = constructorSlice.reducer;

export const {
  getConstructorIngredients,
  getConstructorItems,
  getConstructorBun
} = constructorSlice.selectors;
