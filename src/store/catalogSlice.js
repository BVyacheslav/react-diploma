import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedItemId: 0,
  cartItems: [],
  totalCost: 0,
  searchValue: '',
  searchQuery: '',
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSelectedItemId(state, action) {
      state.selectedItemId = action.payload;
    },
    addItemToCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].itemCount = state.cartItems[itemIndex].itemCount + action.payload.itemCount
      } else {
        state.cartItems.push(action.payload);
      }
    },
    deleteItemFromCart(state, action) {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize);
      state.cartItems.splice(itemIndex, 1);
    },
    setTotalCost(state, action) {
      state.totalCost = state.totalCost + action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
})

export const { setSelectedItemId, addItemToCart, deleteItemFromCart, setTotalCost, setSearchValue, setSearchQuery } = catalogSlice.actions;
export const catalogReducer = catalogSlice.reducer;