import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
    note_page: number;
}

const initialState: Props = {
    note_page: 1
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changeNotePage: (state, action: PayloadAction<any>) => {
        state.note_page = action.payload.page;
    },    
  },
});

export const { changeNotePage } = paginationSlice.actions;
export default paginationSlice.reducer;