import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredientsSlice';
import { constructorSlice } from './constructorSlice';
import { userSlice } from './userSlice';
import { feedSlice } from './feedSlice';
import { orderSlice } from './orderSlice';
import { profileOrdersSlice } from './profileOrdersSlice';

export const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice,
  feedSlice,
  orderSlice,
  profileOrdersSlice
);
