import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
interface ThemeState {
	mode: PaletteMode
}
const initialState:ThemeState = {
	mode: 'light'
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setMode: (state, action) => {
			state.mode = action.payload as PaletteMode
		},
	},

});

export const { setMode} = themeSlice.actions;

export default themeSlice.reducer;