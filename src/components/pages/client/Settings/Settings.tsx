import { Box, Slide, } from "@mui/material"
import UserSettingsForm from "./UserSettingsForm/UserSettingsForm"
import { useState } from 'react'
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal"

const UserSettings = () => {

	const [showChangePass, SetShowChangePass] = useState<boolean>(false)

	const onButtonClick = (e: any) => {
		const { name, value } = e.target;
		switch (name) {
			case 'changePass':
				SetShowChangePass(true);
				break;
			case 'submit':
				submitForm()
				break;
			default:
				break;
		}
	}

	const submitForm = () => {
		console.log("submit")
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
						p: 6,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start'
					}}
				>
					<UserSettingsForm click={onButtonClick} />
				</Box>
			</Slide>
			{showChangePass &&
				<ChangePasswordModal show={showChangePass} onClose={toggleChangePassword} />
			}
		</>

	)
}

export default UserSettings