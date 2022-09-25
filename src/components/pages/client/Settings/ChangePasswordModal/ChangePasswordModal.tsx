import { Modal, Fade, Box, Typography, TextField, FormGroup, ButtonGroup, Button, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { apiUrl, apiRoutes } from "../../../../../apiConfig";
import instance from "../../../../../axios/axios";
import Toaster from "../../../../utils/Toaster/Toaster";
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
	const [oldPassVisible, setOldPassVisible] = useState<boolean>(false)
	const [newPassVisible, setNewPassVisible] = useState<boolean>(false)
	const [confirmPassVisible, setConfirmPassVisible] = useState<boolean>(false)
	const [showDialog, setShowDialog] = useState<boolean>(false)
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

	const submit = async () => {
		validateForm();

		if (modelValid) {
			await instance.post(`${apiUrl}/${apiRoutes.changePass}`, { oldPassword: model.oldPass, newPassword: model.newPass }).then((response) => {
				if (response.status === 200 || response.status === 201) {
					Toaster.show('success', '', response.data)
					onCancelClick();
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
	}
	const toggleDialog = () => {
		setShowDialog(!showDialog);
	}
	return (
		<>
			<Modal open={props.show}
				onClose={(e: any) => props.onClose(e)}
				sx={{
					position: "absolute",
					width: "100%",
					height: "100%",
				}}>
				<Fade in={true} timeout={500} exit={true}>
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
										type={oldPassVisible ? 'text' : 'password'}
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
										}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={() => { setOldPassVisible(!oldPassVisible) }}
													>
														{oldPassVisible ? <VisibilityIcon color="primary" /> : <VisibilityOffIcon />}
													</IconButton>
												</InputAdornment>
											)
										}} />
								</FormGroup>
								<FormGroup className="p-2">
									<TextField
										name="newPass"
										type={newPassVisible ? 'text' : 'password'}
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
										}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={() => { setNewPassVisible(!newPassVisible) }}
													>
														{newPassVisible ? <VisibilityIcon color="primary" /> : <VisibilityOffIcon />}
													</IconButton>
												</InputAdornment>
											)
										}} />
								</FormGroup>
								<FormGroup className="p-2">
									<TextField
										name="confirmPass"
										type={confirmPassVisible ? 'text' : 'password'}
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
										}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={() => { setConfirmPassVisible(!confirmPassVisible) }}
													>
														{confirmPassVisible ? <VisibilityIcon color="primary" /> : <VisibilityOffIcon />}
													</IconButton>
												</InputAdornment>
											)
										}} />
								</FormGroup>
								<ButtonGroup className="p-2" sx={{ display: 'flex', justifyContent: "flex-end", flexWrap: 'wrap' }}>
									<Button onClick={toggleDialog} sx={{ marginRight: '10px' }} disabled={!modelValid} variant='contained' color="success"><CheckIcon ></CheckIcon> Submit</Button>
									<Button onClick={onCancelClick} variant='contained' color='error'><CancelIcon ></CancelIcon> Cancel</Button>
								</ButtonGroup>
							</form>
						</Box>
					</Box>
				</Fade>
			</Modal >
			<Dialog
				open={showDialog}
				onClose={toggleDialog}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					{"Change your password ?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You are about to change your password.
						Are you sure ?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus variant="contained" color="error" onClick={toggleDialog}>
						Disagree
					</Button>
					<Button variant="contained" color="primary" onClick={submit} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default ChangePasswordModal