import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string
}

const initialState: UserState = {
  email: "some@some",
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { editEmail } = userSlice.actions

export default userSlice.reducer