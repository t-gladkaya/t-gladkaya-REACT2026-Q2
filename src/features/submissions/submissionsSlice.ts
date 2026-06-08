import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Submission } from "../../types/types";
import { countries } from "../forms/formSchema"

type SubmissionsState = {
  items: Submission[];
  countries: string[];
};

const initialState: SubmissionsState = {
  items: [],
  countries: countries,
}

const submissionsSlice = createSlice ({
  name: "submissions",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.items.push(action.payload);
    },
    clearSubmissions: (state) => {
      state.items = [];
    },
  },
});

export const { addSubmission, clearSubmissions } = submissionsSlice.actions;
export const selectSubmissions = (state: RootState) => state.submissions.items;
export const selectCountries = (state: RootState) => state.submissions.countries;
export const submissionsReducer = submissionsSlice.reducer;
