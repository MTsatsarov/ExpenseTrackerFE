import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	selectedSection: 'dashboard'
};


export const clientSideSlice = createSlice({
	name: 'clientNav',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {

		setSection: (state, action) => {
			state.selectedSection = action.payload
		}
	}

});

export const { setSection } = clientSideSlice.actions;

export default clientSideSlice.reducer;