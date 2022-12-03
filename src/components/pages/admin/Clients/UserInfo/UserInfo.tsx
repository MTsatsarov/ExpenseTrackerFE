import { Box, Button, FormControl, FormGroup, Modal, Switch, TextField, Typography } from "@mui/material"
import { useAppSelector } from "../../../../../app/hooks"
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import instance from "../../../../../axios/axios";
import { apiRoutes, apiUrl } from "../../../../../apiConfig";
import Toaster from "../../../../utils/Toaster/Toaster";
import Loader from "../../../../utils/Loader/Loader";

interface IUserInfoProps {
	id: string,
	onClose: Function
}

interface IUserInfo {
	userId: string,
	userName: string,
	email: string,
	firstName: string,
	phoneNumber: string,
	lastName: string,
	currencySymbol: string,
	organization: string,
	emailConfirmed: boolean,
	registrationDate: string,

}

const UserInfo = (props: IUserInfoProps) => {

	let mode = useAppSelector(store => store.user.themeMode)

	const [userInfo, setUserInfo] = useState<IUserInfo>({} as IUserInfo)
	const [defaultUserInfo, setDefaultUserInfo] = useState<IUserInfo>({} as IUserInfo)
	const [loading, setLoading] = useState<boolean>(false);
	const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);
	const [isValidForm, setIsValidForm] = useState<boolean>(false)
	const [validation, setValidations] = useState<any>({
		userNameValid: true,
		userNameTouched: false,
		firstNameValid: true,
		firstNameTouched: false,
		lastNameValid: true,
		lastNameTouched: false,
		emailValid: true,
		emailTouched: false,
		phoneNumberValid: true,
		phoneNumberTouched: false,
		isFormTouched: false
	})
	useEffect(() => {
		const getUser = async () => {
			setLoading(true);
			await instance.get(`${apiUrl}/${apiRoutes.getClient}?userId=${props.id}`).then((response) => {
				if (response.status === 200 || response.status === 201) {
					var user = response.data as IUserInfo
					setUserInfo(user);
					setDefaultUserInfo(user)
					setEmailConfirmed(user.emailConfirmed)

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
			}).finally(() => {
				setLoading(false);
			});
		}
		getUser();

	}, [])

	useEffect(() => {
		validate()
	}, [validation])

	const resetForm = () => {
		setUserInfo(defaultUserInfo);
	}
	const confirmEmail = async () => {
		var userId = props.id
		setLoading(true)
		await instance.post(`${apiUrl}/${apiRoutes.confirmUserMail}`, userId).then((response) => {
			if (response.status === 200 || response.status === 201) {
				setEmailConfirmed(true)
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
		}).finally(() => {
			setLoading(false)
		});
	}

	const onChange = (e: any) => {
		let fieldName = e.target.name;
		let value = e.target.value

		let userName = userInfo.userName;
		let email = userInfo.email;
		let firstName = userInfo.firstName;
		let phoneNumber = userInfo.phoneNumber;
		let lastName = userInfo.lastName;
		let validUserName = validation.userNameValid;
		let touchedUserName = validation.userNameTouched;
		let firstNameValid = validation.firstNameValid
		let firstNameTouched = validation.firstNameTouched
		let lastNameValid = validation.lastNameValid
		let lastNameTouched = validation.lastNameTouched
		let emailValid = validation.emailValid
		let emailTouched = validation.emailTouched
		let phoneNumberValid = validation.emailValid
		let phoneNumberTouched = validation.emailTouched

		switch (fieldName) {

			case "userName":
				validUserName = value.length > 5 && value.length <= 20 ? true:false;
				userName = value;
				touchedUserName = true;
				break;
			case "firstName":
				firstNameValid = value.length >= 2 && value.length <= 20?true:false;
				firstName = value;
				firstNameTouched = true;
				break;
			case "lastName":
				lastNameValid = value.length >= 2 && value.length <= 20?true:false;
				lastName = value;
				lastNameTouched = true;
				break;
			case "email":
				emailValid = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
					? true
					: false;
				email = value;
				emailTouched = true;
				break;
			case "phoneNumber":
				phoneNumberValid = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm) || value.length === 0 ? true : false
				phoneNumber = value;
				phoneNumberTouched = true;
				break;
		}

		setUserInfo(prevState => ({
			...prevState,
			userName: userName,
			firstName: firstName,
			lastName: lastName,
			email: email,
			phoneNumber: phoneNumber
		}))

		setValidations((prevState: any) => ({
			...prevState,
			userNameValid: validUserName,
			userNameTouched: touchedUserName,
			firstNameValid: firstNameValid,
			firstNameTouched: firstNameTouched,
			lastNameValid: lastNameValid,
			lastNameTouched: lastNameTouched,
			emailValid: emailValid,
			emailTouched: emailTouched,
			phoneNumberValid: phoneNumberValid,
			phoneNumberTouched: phoneNumberTouched,
			isFormTouched: true
		}))


	}
	const validate = () => {
		let isValid =
			validation.validUserName &&
			validation.firstNameValid &&
			validation.lastNameValid &&
			validation.emailValid;
		setIsValidForm(isValid);
	}
	const update = async () => {
		validate()
		setLoading(true)
		await instance.post(`${apiUrl}/${apiRoutes.updateUser}`, userInfo).then((response) => {
			if (response.status === 200 || response.status === 201) {
				setEmailConfirmed(true)
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
		}).finally(() => {
			setLoading(false)
		});
	}
	return (
		<Modal open={true}
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
			}}>
			<Box sx={{
				width: "40%",
				height: "90%",
				backgroundColor: `${mode === 'dark' ? 'black' : "white"}`,
				borderRadius: "12px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				boxShadow: " 0px 0px 67px 9px rgba(0,0,0,0.85)",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}>
				<Box
					sx={{
						position: "absolute",
						top: "0%",
						right: "0%",
						p: 2,
						cursor: "pointer",
					}}
					onClick={() => props.onClose()}
				>
					<CloseIcon />
				</Box>
				{loading && <Loader />}
				<form style={{ width: '80%', marginTop: "2rem" }}>

					<Typography variant="h4">User Info</Typography>
					<FormGroup sx={{ mt: 1, }}>

						<FormControl sx={{ p: 1 }}>
							<TextField
								variant="outlined"
								name='userName'
								label="UserName"
								value={userInfo.userName}
								onChange={onChange}
								onBlur={onChange}
								error={!validation.userNameValid && validation.userNameTouched}
								color={
									validation.userNameValid && validation.userNameTouched ? "success" : "primary"
								}
								focused={validation.userNameValid && validation.userNameTouched ? true : false}
								helperText={!validation.userNameValid && validation.userNameTouched && 'Username must be maximum 20 characters long and minimum 5 characters long.'}
							/>
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField
								variant="outlined"
								name='email'
								label="Email"
								value={userInfo.email} onChange={onChange} onBlur={onChange}
								error={!validation.emailValid && validation.emailTouched}
								color={
									validation.emailValid && validation.emailTouched ? "success" : "primary"
								}
								focused={validation.emailValid && validation.emailTouched ? true : false}
								helperText={!validation.emailValid && validation.emailTouched && 'The provided email is invalid.'}
							/>
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField
								variant="outlined"
								name='firstName'
								label="First Name"
								value={userInfo.firstName}
								onChange={onChange}
								onBlur={onChange}
								error={!validation.firstNameValid && validation.firstNameTouched}
								color={
									validation.firstNameValid && validation.firstNameTouched ? "success" : "primary"
								}
								focused={validation.firstNameValid && validation.firstNameTouched ? true : false}
								helperText={!validation.firstNameValid && validation.firstNameTouched && 'First name must be maximum 20 characters long and minimum 2 characters long.'}
							/>
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField
								variant="outlined"
								name='lastName'
								label="Last Name"
								value={userInfo.lastName}
								onChange={onChange}
								onBlur={onChange}
								error={!validation.lastNameValid && validation.lastNameTouched}
								color={
									validation.lastNameValid && validation.lastNameTouched ? "success" : "primary"
								}
								focused={validation.lastNameValid && validation.lastNameTouched ? true : false} 
								helperText={!validation.lastNameValid && validation.lastNameTouched && 'Last name must be maximum 20 characters long and minimum 2 characters long.'}
								/>
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField
								variant="outlined"
								name='phoneNumber'
								label="Phone Number"
								value={userInfo.phoneNumber}
								onChange={onChange}
								onBlur={onChange}
								error={!validation.phoneNumberValid && validation.phoneNumberTouched}
								color={
									validation.phoneNumberValid && validation.phoneNumberTouched ? "success" : "primary"
								}
								focused={validation.phoneNumberValid && validation.phoneNumberTouched ? true : false}
							/>
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField disabled variant="outlined" name='organization' label="Organization" value={userInfo.organization} />
						</FormControl>

						<FormControl sx={{ p: 1 }}>
							<TextField disabled variant="outlined" name='createdOn' label="Registration date" value={userInfo.registrationDate} />
						</FormControl>
					</FormGroup>
				</form>

				<Box sx={{ display: "flex", width: '80%', flexDirection: "column" }}>
					<Box sx={{ alignSelf: "flex-end", mt: 2 }}>
						<Switch disabled={emailConfirmed && true} checked={emailConfirmed && true} onChange={confirmEmail} />
						<Typography fontSize={16} color='primary' variant="caption">Email confirmed</Typography>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: "flex-end", mt: 2, width: '100%' }}>
						<Button sx={{ mx: 4 }} color="error" variant="contained" onClick={resetForm} >Reset</Button>
						<Button disabled={!isValidForm || !validation.isFormTouched} variant="contained" onClick={update} >Update</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	)

}

export default UserInfo