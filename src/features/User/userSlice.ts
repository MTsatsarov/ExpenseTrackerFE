import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	id: '',
	firstName: '',
	lastName: '',
	role: '',
	email: '',
	currencySymbol: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setTokens: (state, action) => {
			localStorage.setItem("access_token", action.payload.token)
			localStorage.setItem("refresh_token", action.payload.refreshToken)
		},
		setCurrentUser: (state, action) => {
			state.id = action.payload.userId;
			state.lastName = action.payload.lastName;
			state.firstName = action.payload.firstName;
			state.role = action.payload.role;
			state.email = action.payload.email;
			state.currencySymbol = action.payload.currencySymbol;
		},
		logOutUser: (state, action) => {
			localStorage.clear();
			state.id = '';
			state.firstName = '';
			state.lastName = '';
			state.role = '';
			state.email = '';
			state.currencySymbol = '';

		},
		getUser: (state, action) => {
			return state;
		},
	},

});

export const { setTokens, setCurrentUser, getUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;