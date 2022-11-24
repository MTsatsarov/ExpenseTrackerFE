import { createSlice } from '@reduxjs/toolkit';
interface IUserProps {
	id: string,
	firstName: string,
	lastName: string,
	roles:Array<string>,
	email: string,
	currencySymbol: string,
}
const initialState:IUserProps = {
	id: '',
	firstName: '',
	lastName: '',
	roles:[] as Array<string>,
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
			state.roles = action.payload.roles;
			state.email = action.payload.email;
			state.currencySymbol = action.payload.currencySymbol;
		},
		logOutUser: (state, action) => {
			localStorage.clear();
			state.id = '';
			state.firstName = '';
			state.lastName = '';
			state.roles = [];
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