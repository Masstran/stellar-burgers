import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slicers/ingredientsSlice';
import { constructorSlice } from '../slicers/constructorSlice';
import { userSlice } from '../slicers/userSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice
);
