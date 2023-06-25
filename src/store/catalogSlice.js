import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedItemId: 0,
  cartItems: [],
  totalCost: 0
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSelectedItemId(state, action) {
      state.selectedItemId = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    deleteItemFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
    },
    setTotalCost(state, action) {
      state.totalCost = state.totalCost + action.payload;
    }
  },
})

export const { setSelectedItemId, addItemToCart, deleteItemFromCart, setTotalCost } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;