import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';
import feedSlice from './slices/feedSlice';
import orderSlices from './slices/orderSlice';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  order: orderSlices,
  user: userSlice
});
