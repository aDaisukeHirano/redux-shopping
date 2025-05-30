import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { products } from "@/data";

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemCount = createSelector([selectCart], (cart) =>
  cart.items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector([selectCart], (cart) =>
  cart.items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) throw new Error("Product not found");
    return total + product.price * item.quantity;
  }, 0)
);

export const selectCartSortedItems = createSelector([selectCart], (cart) =>
  cart.items
    .toSorted((a, b) => a.id - b.id)
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) throw new Error("Product not found");
      return {
        ...item,
        name: product.name,
        price: product.price,
      };
    })
);
