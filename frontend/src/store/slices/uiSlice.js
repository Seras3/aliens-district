import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  postCard: {
    height: 360,
    width: 400,
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
})

export default uiSlice.reducer;