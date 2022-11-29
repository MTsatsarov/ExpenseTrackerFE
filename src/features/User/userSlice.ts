import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
interface IUserProps {
	id: string,
	firstName: string,
	lastName: string,
	roles:Array<string>,
	email: string,
	currencySymbol: string,
	themeMode:PaletteMode,
}
const initialState:IUserProps = {
	id: '',
	firstName: '',
	lastName: '',
	roles:[] as Array<string>,
	email: '',
	currencySymbol: '',
	themeMode:'light'
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
			//console.log(action.payload)
			state.id = action.payload.id;
			state.lastName = action.payload.lastName;
			state.firstName = action.payload.firstName;
			state.roles = action.payload.roles;
			state.email = action.payload.email;
			state.currencySymbol = action.payload.currencySymbol;
			state.themeMode = action.payload.mode
		},
		logOutUser: (state, action) => {
			localStorage.clear();
			state.id = '';
			state.firstName = '';
			state.lastName = '';
			state.roles = [];
			state.email = '';
			state.currencySymbol = '';
			state.themeMode = 'light'
		},
		getUser: (state, action) => {
			return state;
		},
	},

});

export const { setTokens, setCurrentUser, getUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;