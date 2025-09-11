import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// TODO: add types
export interface AnalysisState {
  analysis: any,
  groups: any,
}

const initialState: AnalysisState = {
  analysis: null,
  groups: null
}

export const analysisSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editAnalysis: (state, action: PayloadAction<any>) => {
      state.analysis = action.payload
    },
    updateGroups: (state, action: PayloadAction<any>) => {
      state.groups = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { editAnalysis, updateGroups } = analysisSlice.actions

export default analysisSlice.reducer