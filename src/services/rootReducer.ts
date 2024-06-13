import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice/burgerConstructorSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import orderSlices from './slices/orderSlice/orderSlice';
import userSlice from './slices/userSlice/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  order: orderSlices,
  user: userSlice
});
