import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
    category_page: number;
    note_page: number;
}

const initialState: Props = {
    category_page: 1,
    note_page: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changeCategoryPage: (state, action: PayloadAction<any>) => {
        state.category_page = action.payload.page;
    },
    changeNotePage: (state, action: PayloadAction<any>) => {
        state.note_page = action.payload.page;
    },    
  },
});

export const { changeCategoryPage, changeNotePage } = paginationSlice.actions;
export default paginationSlice.reducer;