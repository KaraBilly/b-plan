import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, OrderItem } from '../types';

interface CartState {
  items: OrderItem[];
  itemCounts: { [key: number]: number };
}

const initialState: CartState = {
  items: [],
  itemCounts: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<MenuItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.itemCounts[item.id] = (state.itemCounts[item.id] || 0) + 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }

      if (state.itemCounts[itemId]) {
        state.itemCounts[itemId] = Math.max(state.itemCounts[itemId] - 1, 0);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      delete state.itemCounts[itemId];
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;