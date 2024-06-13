import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  nanoid
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  order: null,
  isLoading: false,
  error: null
};

export const postOrderThunk = createAsyncThunk(
  'burgerConstructor/post',
  async (array: string[]) => orderBurgerApi(array)
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.constructorItems.ingredients;
      const index = action.payload;
      arr.splice(index, 0, arr.splice(index - 1, 1)[0]);
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.constructorItems.ingredients;
      const index = action.payload;
      arr.splice(index, 0, arr.splice(index + 1, 1)[0]);
    },
    removeOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getConstructorStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.order;
        state.constructorItems = initialState.constructorItems;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  removeOrder
} = constructorSlice.actions;
export default constructorSlice.reducer;
