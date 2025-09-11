import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string | null,
  token: string | null,
}

const initialState: UserState = {
  email: null,
  token: null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload
    },
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { editEmail, updateToken } = userSlice.actions

export default userSlice.reducer