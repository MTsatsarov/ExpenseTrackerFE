import { Box, Slide, } from "@mui/material"
import UserSettingsForm from "./UserSettingsForm/UserSettingsForm"
import { useState } from 'react'
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal"
import { apiUrl, apiRoutes } from "../../../../apiConfig"
import instance from "../../../../axios/axios"
import Toaster from "../../../utils/Toaster/Toaster"
const UserSettings = () => {

	const [showChangePass, SetShowChangePass] = useState<boolean>(false)
	const [model, setModel] = useState<any>({});

	const onButtonClick = (e: any) => {
		const { name, value } = e.target;
		switch (name) {
			case 'changePass':
				SetShowChangePass(true);
				break;
			case 'submitForm':
				submitForm()
				break;
			default:
				break;
		}
	}

	const submitForm = () => {
		instance.post(`${apiUrl}/${apiRoutes.updateUser}`, {firstName:model.firstName, lastName:model.lastName}).then((response) => {
			Toaster.show('success', "", response.data)
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

	const toggleChangePassword = () => {
		SetShowChangePass(!showChangePass)
	}
	return (
		<>
			<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
				<Box
					sx={{
						height: '100%',
						p: 15,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						mt: 4
					}}
				>
					<UserSettingsForm click={onButtonClick} setParent={setModel} />
				</Box>
			</Slide>
			{showChangePass &&
				<ChangePasswordModal  show={showChangePass} onClose={toggleChangePassword} />
			}
		</>

	)
}

export default UserSettings