export interface RootState {
    themes: {
        mode: string;
    },
    auth: {
        token: string;
        username: string;
    },
    filters: {
        category_name: string;
        note_name: string;
        note_categories: any;
        note_favorite: number;
    }
}