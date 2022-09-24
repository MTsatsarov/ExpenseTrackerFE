import { Modal, Fade, Box, Typography, TextField, FormGroup, ButtonGroup, Button } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
interface ChangePasswordModalProps {
	show: boolean
	onClose: Function
}
interface UserChangePassword {
	oldPass: string,
	newPass: string,
	confirmNewPass: string
	oldPassValid: boolean,
	newPassValid: boolean,
	confirmNewPassValid: boolean,
	oldPassTouched: boolean,
	newPassTouched: boolean,
	confirmNewPassTouched: boolean
}
const ChangePasswordModal = (props: ChangePasswordModalProps) => {

	const [model, setModel] = useState<UserChangePassword>({
		oldPass: '',
		newPass: '',
		confirmNewPass: '',
		oldPassValid: false,
		newPassValid: false,
		confirmNewPassValid: false,
		oldPassTouched: false,
		newPassTouched: false,
		confirmNewPassTouched: false
	})
	const [modelValid, setModelValid] = useState<boolean>(false)

	useEffect(() => {
		validateForm();
	}, [model])
	const onInputChange = (e: any) => {
		const { name, value } = e.target
		var oldPass = model.oldPass;
		var newPass = model.newPass;
		var confirmNewPass = model.confirmNewPass;
		var oldPassValid = model.oldPassValid;
		var newPassValid = model.newPassValid;
		var confirmNewPassValid = model.confirmNewPassValid;
		var oldPassTouched = model.oldPassTouched;
		var newPassTouched = model.newPassTouched;
		var confirmNewPassTouched = model.confirmNewPassTouched;

		switch (name) {
			case 'oldPass':
				oldPassValid = value.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i) ? true : false;
				oldPassTouched = true;
				oldPass = value
				break;
			case 'newPass':
				newPass = value
				newPassValid = value.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i) ? true : false;
				newPassTouched = true;
				break;
			case 'confirmPass':
				confirmNewPass = value
				confirmNewPassValid = value.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i) ? true : false;
				confirmNewPassTouched = true;
				break;
			default:
				break;
		}
		setModel(prevState => ({
			...prevState,
			oldPass: oldPass,
			newPass: newPass,
			confirmNewPass: confirmNewPass,
			oldPassValid: oldPassValid,
			newPassValid: newPassValid,
			confirmNewPassValid: confirmNewPassValid,
			oldPassTouched: oldPassTouched,
			newPassTouched: newPassTouched,
			confirmNewPassTouched: confirmNewPassTouched
		}))
		validateForm();
	}
const onCancelClick = () => {
	props.onClose();
}
	const validateForm = () => {
		var valid = model.oldPassValid &&
			model.newPassValid &&
			model.confirmNewPassValid &&
			model.newPass === model.confirmNewPass
		setModelValid(valid)
	}
	return (
		<Modal open={props.show}
			onClose={(e: any) => props.onClose(e)}
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
			}}>
			<Fade in={true} timeout={500}>
				<Box
					sx={{
						width: "40%",
						height: "40%",
						background: "rgba(255,255,255,1)",
						borderRadius: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						overflowY: "scroll",
						boxShadow: " 0px 0px 67px 9px rgba(0,0,0,0.85)",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						overflow: 'hidden',
						p: 4
					}}>
					<Box className="w-100">
						<Typography color="primary" sx={{ textAlign: 'center' }} variant="h4">Change Password</Typography>
						<form className="m-1 p-2">
							<FormGroup className="p-2" sx={{ width: '100%' }}>
								<TextField
									name="oldPass"
									type='password'
									label="Old Password"
									onChange={onInputChange}
									error={!model.oldPassValid && model.oldPassTouched}
									color={
										model.oldPassValid && model.oldPassTouched
											? "success"
											: "primary"
									}
									focused={
										model.oldPassValid && model.oldPassTouched ? true : false
									} />
							</FormGroup>
							<FormGroup className="p-2">
								<TextField
									name="newPass"
									type='password'
									label="New Password"
									onChange={onInputChange}
									error={!model.newPassValid && model.newPassTouched}
									color={
										model.newPassValid && model.newPassTouched
											? "success"
											: "primary"
									}
									focused={
										model.newPassValid && model.newPassTouched ? true : false
									} />
							</FormGroup>
							<FormGroup className="p-2">
								<TextField
									name="confirmPass"
									type='password'
									label="Confirm New Password"
									onChange={onInputChange}
									error={!model.confirmNewPassValid && model.confirmNewPassTouched}
									color={
										model.confirmNewPassValid && model.confirmNewPassTouched
											? "success"
											: "primary"
									}
									focused={
										model.confirmNewPassValid && model.confirmNewPassTouched ? true : false
									} />
							</FormGroup>
							<ButtonGroup className="p-2" sx={{ display: 'flex', justifyContent: "flex-end",flexWrap:'wrap' }}>
								<Button sx={{ marginRight: '10px' }} disabled={!modelValid} variant='contained' color="success"><CheckIcon ></CheckIcon> Submit</Button>
								<Button onClick ={onCancelClick} variant='contained' color='error'><CancelIcon ></CancelIcon> Cancel</Button>
							</ButtonGroup>
						</form>
					</Box>
				</Box>
			</Fade>
		</Modal >
	)
}

export default ChangePasswordModal