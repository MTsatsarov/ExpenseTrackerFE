import {createSlice } from '@reduxjs/toolkit';
const initialState = {
	id: '',
	userName: '',
	role:'',
	email: '',
	subscription:'',
	remainingFreeAttempts: 0 
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setTokens: (state,action) => {
			localStorage.setItem("access_token",action.payload.token)
			localStorage.setItem("refresh_token",action.payload.refreshToken)
		},
		setCurrentUser: (state,action) => {
			console.log(action.payload)
			state.id = action.payload.userId;
			state.userName = action.payload.userName;
			state.role = action.payload.role;
			state.email = action.payload.email;
			state.subscription = action.payload.subscription;
			state.remainingFreeAttempts = action.payload.remainingFreeAttempts;
		},
		logOutUser: (state,action) => {
			localStorage.clear();
			state.id = '';
			state.userName = '';
			state.role = '';
			state.email = '';
		},
		getUser: (state,action) => {
			return  state;
		},
	},

});

export const { setTokens,setCurrentUser: getCurrentUser,getUser,logOutUser } = userSlice.actions;

export default userSlice.reducer;