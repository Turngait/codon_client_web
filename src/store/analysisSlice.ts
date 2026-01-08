import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAnalyses } from '../interfaces/analysis'

// TODO: add types
export interface AnalysisState {
  analysis: any,
  groups: any,
  clinics: any
}

const initialState: AnalysisState = {
  analysis: null,
  groups: null,
  clinics: null
}

export const analysisSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    editAnalysis: (state, action: PayloadAction<IAnalyses[]>) => {
      state.analysis = action.payload
    },
    updateGroups: (state, action: PayloadAction<any>) => {
      state.groups = action.payload
    },
    updateClinics: (state, action: PayloadAction<any>) => {
      state.clinics = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { editAnalysis, updateGroups, updateClinics } = analysisSlice.actions

export default analysisSlice.reducer