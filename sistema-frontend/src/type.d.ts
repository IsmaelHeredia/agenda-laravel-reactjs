import { PaletteColor, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Palette {
        upvote?: PaletteColor;
        downvote?: PaletteColor;
        containerPrimary?: PaletteColor;
        containerSecondary?: PaletteColor;
    }
    interface PaletteOptions {
        upvote?: PaletteColor;
        downvote?: PaletteColor;
        containerPrimary?: PaletteColor;
        containerSecondary?: PaletteColor;
    }
}