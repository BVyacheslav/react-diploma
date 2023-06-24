import { createSlice } from '@reduxjs/toolkit'

const initialState = { selectedItemId: 66 }

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSelectedItemId(state, action) {
      state.selectedItemId = action.payload;
    },
  },
})

export const { setSelectedItemId } = catalogSlice.actions;
export const catalogSliceReducer = catalogSlice.reducer;