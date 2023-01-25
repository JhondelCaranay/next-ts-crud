import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ToggleFormState {
  visible: boolean;
  formId: string;
  deleteId: string | null;
}

const initialState: ToggleFormState = {
  visible: false,
  formId: "",
  deleteId: "",
};

export const togleFormSlice = createSlice({
  name: "toggleForm",
  initialState,
  reducers: {
    toggleForm: (state) => {
      state.visible = !state.visible;
    },
    updateAction: (state, action: PayloadAction<string>) => {
      state.formId = action.payload;
    },
    deleteAction: (state, action: PayloadAction<string | null>) => {
      state.deleteId = action.payload;
    },
    clear: (state) => {
      state.deleteId = "";
      state.formId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleForm, updateAction, deleteAction } = togleFormSlice.actions;

export default togleFormSlice.reducer;
