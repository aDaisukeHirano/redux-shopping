import { cartReducer } from "@/features/cart/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";

import { useSelector as useReduxSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
