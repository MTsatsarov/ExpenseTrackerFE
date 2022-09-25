import { Box, Typography, FormGroup, Button, ButtonGroup, TextField } from "@mui/material"
import { useState, useEffect } from "react";
import { apiUrl, apiRoutes } from "../../../../../apiConfig";
import instance from "../../../../../axios/axios"
import Toaster from "../../../../utils/Toaster/Toaster";

interface UserSettingsFormProps {
	click: Function,
	setParent: Function
}
interface ResponseSettings {
	email: string,
	firstName: string,
	lastName: string,
	firstNameValid: boolean,
	lastNameValid: boolean,
	firstNameTouched: boolean,
	lastNameTouched: boolean
}

const UserSettingsForm = (props: UserSettingsFormProps) => {
	const [user, setUser] = useState<ResponseSettings>({
		email: '',
		firstName: '',
		lastName: '',
		firstNameValid: true,
		lastNameValid: true,
		firstNameTouched: false,
		lastNameTouched: false
	})
	const [userValid, setUserValid] = useState<boolean>(false)
	useEffect(() => {
		const getUser = async () => {
			await instance.get(`${apiUrl}/${apiRoutes.getCurrentUser}`).then((response) => {
				if (response.status === 200 || response.status === 201) {
					var userData = response.data as ResponseSettings
					setUser(prevState => ({
						...prevState,
						email: userData.email,
						firstName: userData.firstName,
						lastName: userData.lastName,
					}))
				}
			}).catch(function (error) {
				if (error.response) {
					var errors =
						error.response &&
						(error.response.data.message ||
							error.response.data ||
							error.response.statusText);
					errors.split(/\r?\n/).forEach((message: string) => {
						Toaster.show("error", "", message);
					});
				}
			});
		}
		getUser()
	}, [])
	useEffect(() => {
		validateForm();
		props.setParent(user)
	}, [user])
	const onChange = (e: any) => {
		const { name, value } = e.target;
		let firstName = user.firstName
		let lastName = user.lastName
		let firstNameValid = user.firstNameValid
		let lastNameValid = user.lastNameValid
		let firstNameTouched = user.firstNameTouched
		let lastNameTouched = user.lastNameTouched

		switch (name) {
			case 'firstName':
				firstNameValid = value.length > 0 ? true : false
				firstNameTouched = true
				firstName = value
				break;
			case 'lastName':
				lastNameValid = value.length > 0 ? true : false
				lastNameTouched = true
				lastName = value
				break;
		}
		setUser(prevState => ({
			...prevState,
			firstName: firstName,
			lastName: lastName,
			firstNameValid: firstNameValid,
			lastNameValid: lastNameValid,
			firstNameTouched: firstNameTouched,
			lastNameTouched: lastNameTouched
		}));

		validateForm();
	}
	const validateForm = () => {
		var valid = user.firstNameValid && user.lastNameValid && (user.firstNameTouched || user.lastNameTouched)
		setUserValid(valid);
	}
	return (
		<Box className="mt-10" sx={{ minWidth: '35%' }} >
			<Typography sx={{ mb: 4 }} variant='h4'>User Settings</Typography>
			<form style={{ color: 'white' }}>
				<FormGroup sx={{ mb: 3 }} >
					<TextField label='email' disabled sx={{ color: 'white' }} variant='standard' value={user.email} />
				</FormGroup>
				<FormGroup sx={{ mb: 3 }}>
					<TextField name="firstName" label='First Name' sx={{ color: 'white' }} variant='standard' value={user.firstName} onChange={onChange} onBlur={onChange} />
				</FormGroup>
				<FormGroup sx={{ mb: 3 }} >
					<TextField name="lastName" label='Last Name' sx={{ color: 'white' }} variant='standard' value={user.lastName} onChange={onChange} onBlur={onChange} />
				</FormGroup>
				<ButtonGroup sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', flexWrap: 'wrap' }}>
					<Button name="changePass" onClick={(e) => props.click(e)} variant="contained" sx={{ minWidth: "45%" }} >Change Password</Button>
					<Button name="submitForm" onClick={(e) => props.click(e)} variant="contained" sx={{ minWidth: "40%" }} color="success" disabled={!userValid}>Submit</Button>
				</ButtonGroup>
			</form>
		</Box>
	)
}
export default UserSettingsForm