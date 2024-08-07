import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
    mode: string;
}

const initialState: Props = {
    mode: "dark",
};

const themesSlice = createSlice({
  name: "themes",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<any>) => {
        state.mode = action.payload.mode;
    },
  },
});

export const { changeMode } = themesSlice.actions;
export default themesSlice.reducer;