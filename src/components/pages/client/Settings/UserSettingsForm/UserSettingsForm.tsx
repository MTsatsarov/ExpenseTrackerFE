import { Box, Typography, FormGroup, Button, ButtonGroup, TextField } from "@mui/material"
import { useState, useEffect } from "react";
import { apiUrl, apiRoutes } from "../../../../../apiConfig";
import instance from "../../../../../axios/axios"
import Toaster from "../../../../utils/Toaster/Toaster";

interface UserSettingsFormProps {
	click: Function
}
interface ResponseSettings {
	email: string,
	firstName: string,
	lastName: string,
	userName: string,
}

const UserSettingsForm = (props: UserSettingsFormProps) => {
	const [user, setUser] = useState<ResponseSettings>({
		email: '',
		firstName: '',
		lastName: '',
		userName: ''
	})

	useEffect(() => {
		const getUser = async () => {
			await instance.get(`${apiUrl}/${apiRoutes.getCurrentUser}`).then((response) => {
				if (response.status === 200 || response.status === 201) {
					var userData = response.data as ResponseSettings
					setUser(userData)
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
	},[])

	return (
		<Box className="mt-10" sx={{minWidth: '35%' }} >
			<Typography sx={{ mb: 4 }} variant='h4'>User Settings</Typography>
			<form style={{ color: 'white' }}>
				<FormGroup sx={{ mb: 3 }} >
					<TextField label='email' disabled sx={{ color: 'white' }} variant='standard' value={user.email} />
				</FormGroup>
				<FormGroup sx={{ mb: 3 }}>
					<TextField label='First Name' sx={{ color: 'white' }} variant='standard' value={user.firstName} />
				</FormGroup>
				<FormGroup sx={{ mb: 3 }} >
					<TextField label='Last Name' sx={{ color: 'white' }} variant='standard' value={user.lastName} />
				</FormGroup>
				<ButtonGroup sx={{ display: 'flex', justifyContent: 'space-around',width:'100%',flexWrap:'wrap' }}>
					<Button name="changePass" onClick={(e) => props.click(e)} variant="contained" sx={{ minWidth: "45%" }} >Change Password</Button>
					<Button name="submitForm" onClick={(e) => props.click(e)} variant="contained" sx={{ minWidth: "20%" }} color="success">Submit</Button>
					<Button name="cancel" onClick={(e) => props.click(e)} variant="contained" sx={{ minWidth: "20%" }} color="error">Cancel</Button>
				</ButtonGroup>
			</form>
		</Box>
	)
}
export default UserSettingsForm