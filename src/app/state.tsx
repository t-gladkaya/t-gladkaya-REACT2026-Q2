import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Character } from '../types/types';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import { mainApi } from '../api/api';

interface SelectedItemsState {
  items: Character[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Character>) => {
      const isAlreadySelected = state.items.some(
        (item) => item.id === action.payload.id
      );

      if (!isAlreadySelected) {
        state.items.push(action.payload);
      }
    },

    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearSelectedItems: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, clearSelectedItems } =
  selectedItemsSlice.actions;

export const createAppStore = () =>
  configureStore({
    reducer: {
      selectedItems: selectedItemsSlice.reducer,
      [mainApi.reducerPath]: mainApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mainApi.middleware),
  });

export const store = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
