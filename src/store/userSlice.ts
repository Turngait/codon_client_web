import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  email: string | null,
  token: string | null,
  genome: any
}

const initialState: UserState = {
  email: null,
  token: null,
  genome: null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.genome = action.payload
    },
    editEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload
    },
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { editEmail, updateToken, setUserInfo } = userSlice.actions

export default userSlice.reducer