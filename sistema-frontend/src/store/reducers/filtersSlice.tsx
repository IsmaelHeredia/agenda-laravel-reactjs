import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
    category_name: string;
    note_name: string;
    note_categories: [];
    note_categories_id: [];
    note_favorite: boolean;
}

const initialState: Props = {
    category_name: "",
    note_name: "",
    note_categories: [],
    note_categories_id: [],
    note_favorite: false
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFiltersCategory: (state, action: PayloadAction<any>) => {
        state.category_name = action.payload.name;
    },
    changeFiltersNote: (state, action: PayloadAction<any>) => {
        state.note_name = action.payload.name;
        state.note_categories = action.payload.categories;
        state.note_categories_id = action.payload.categories_id;
        state.note_favorite = action.payload.favorite;
    },    
  },
});

export const { changeFiltersCategory, changeFiltersNote } = filtersSlice.actions;
export default filtersSlice.reducer;