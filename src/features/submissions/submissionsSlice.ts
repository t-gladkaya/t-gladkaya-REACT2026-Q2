import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Submission } from "../../types/types";

type SubmissionsState = {
  items: Submission[];
};

const initialState: SubmissionsState = {
  items: [],
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
export const submissionsReducer = submissionsSlice.reducer;
