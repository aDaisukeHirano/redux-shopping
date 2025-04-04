import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

interface AddItemPayload {
  id: number;
  quantity: number;
}
interface IncrementQuantityPayload {
  id: number;
}
interface DecrementQuantityPayload {
  id: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({ id, quantity });
      }
    },
    incrementQuantity: (
      state,
      action: PayloadAction<IncrementQuantityPayload>
    ) => {
      const { id } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        throw new Error("Item not found in cart");
      }
    },
    decrementQuantity: (
      state,
      action: PayloadAction<DecrementQuantityPayload>
    ) => {
      const { id } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      } else {
        throw new Error("Item not found in cart");
      }
    },
  },
});

export const { addItem, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
