import { Box, Button, Dialog, Modal, PaletteMode, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import { apiRoutes, apiUrl } from "../../../apiConfig";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import instance from "../../../axios/axios";
import { IBaseRegistrationFields } from "../../landing/Registration";
import Loader from "../Loader/Loader";
import Toaster from "../Toaster/Toaster";

interface INewEmployeeFormProps {
	onCloseModal: any,
}

const NewEmployeeForm = (props: INewEmployeeFormProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [canRegister, setCanRegister] = useState<boolean>(false);
	const [fields, setFields] = useState<IBaseRegistrationFields>({
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		isValidUsername: false,
		isValidFirstName: false,
		isValidLastName: false,
		isValidPassword: false,
		isValidEmail: false,
		isValidConfirmPassword: false,
		isTouchedUsername: false,
		isTouchedFirstName: false,
		isTouchedLastName: false,
		isTouchedPassword: false,
		isTouchedEmail: false,
		isTouchedConfirmPassword: false,
	});
	var dispatch = useAppDispatch()
	var mode = useAppSelector(x=>x.theme.mode)
	console.log(mode);
	
	useEffect(() => {
		validateForm();
	}, [fields]);

	const handleChange = (event: any) => {
		let { name, value } = event.target;
		validateField(name, value);
	};
	const validateField = (field: any, value: string) => {
		var validUsername = fields.isValidUsername;
		var validFirstName = fields.isValidFirstName;
		var validLastName = fields.isValidLastName;
		var validEmail = fields.isValidEmail;
		var ValidPassword = fields.isValidPassword;
		var validConfirmPassword = fields.isValidConfirmPassword;
		var username = fields.username;
		var firstName = fields.firstName;
		var lastName = fields.lastName;
		var email = fields.email;
		var password = fields.password;
		var confirmPassword = fields.confirmPassword;
		var isTouchedUsername = fields.isTouchedUsername;
		var isTouchedFirstName = fields.isTouchedFirstName;
		var isTouchedLastName = fields.isTouchedLastName;
		var isTouchedPassword = fields.isTouchedPassword;
		var isTouchedEmail = fields.isTouchedEmail;
		var isTouchedConfirmPassword = fields.isTouchedConfirmPassword;
		switch (field) {
			case "username":
				validUsername = value.length > 0 && value.length <= 20;
				username = value;
				isTouchedUsername = true;
				break;
			case "firstName":
				validFirstName = value.length > 0 && value.length <= 20;
				firstName = value;
				isTouchedFirstName = true;
				break;
			case "lastName":
				validLastName = value.length > 0 && value.length <= 20;
				lastName = value;
				isTouchedLastName = true;
				break;
			case "email":
				validEmail = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)
					? true
					: false;
				email = value;
				isTouchedEmail = true;
				break;
			case "password":
				ValidPassword = value.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
				)
					? true
					: false;
				password = value;
				isTouchedPassword = true;
				break;
			case "confirmPassword":
				validConfirmPassword = value.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
				)
					? true
					: false;
				confirmPassword = value;
				isTouchedConfirmPassword = true;
				break;
			default:
				break;
		}
		setFields((oldState) => ({
			...oldState,
			isValidUsername: validUsername,
			isValidFirstName: validFirstName,
			isValidLastName: validLastName,
			isValidEmail: validEmail,
			isValidPassword: ValidPassword,
			isValidConfirmPassword: validConfirmPassword,
			username: username,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
			isTouchedUsername: isTouchedUsername,
			isTouchedFirstName: isTouchedFirstName,
			isTouchedLastName: isTouchedLastName,
			isTouchedEmail: isTouchedEmail,
			isTouchedPassword: isTouchedPassword,
			isTouchedConfirmPassword: isTouchedConfirmPassword,
		}));

		validateForm();
	};
	const validateForm = () => {
		var isValidForm =
			fields.isValidUsername &&
			fields.isValidFirstName &&
			fields.isValidLastName &&
			fields.isValidEmail &&
			fields.isValidPassword &&
			fields.isValidConfirmPassword &&
			fields.isTouchedUsername &&
			fields.isTouchedFirstName &&
			fields.isTouchedLastName &&
			fields.isTouchedEmail &&
			fields.isTouchedPassword &&
			fields.isTouchedConfirmPassword &&
			fields.password === fields.confirmPassword &&
			fields.password.length >= 8;
		setCanRegister(isValidForm);
	};
	async function onSubmit(e: any) {
		e.preventDefault();
		setLoading(true);
		validateForm();
		if (canRegister) {
			await instance
				.post(`${apiUrl}/${apiRoutes.addEmployee}`, {
					firstName: fields.firstName,
					userName: fields.username,
					lastName: fields.lastName,
					email: fields.email,
					password: fields.password,
				})
				.then((response) => {
					Toaster.show("success", "", "Succesfully added new employee.");
				})
				.catch(function (error) {
					if (error.response) {
						var errors =
							error.response &&
							(error.response.data.message ||
								error.response.data ||
								error.response.statusText);
						errors.split(/\r?\n/).forEach((message: string) => {
							setLoading(false);
							Toaster.show("error", "", message);
						});
					}
				})
				.finally(() => {
					setLoading(false);
					props.onCloseModal(true);
				});
		}
	}
	return (
		<Modal
			open={true}
			onClose={props.onCloseModal}
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
			}}>
			<Box
				sx={{
					width: "40%",
					height: "60%",
					borderRadius: "12px",
					backgroundColor: `${mode === 'dark' ? 'black' : "white"}`,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					boxShadow: " 0px 0px 67px 9px rgba(0,0,0,0.85)",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<Typography className="mb-4 mt-4" variant="h4">Create new employee</Typography>
				<form
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						margin: "0px auto",
						width: "70%",
					}}
					onSubmit={onSubmit}
				>
					<TextField
						type="text"
						name="username"
						label="Username"
						sx={{ m: 1 }}
						error={!fields.isValidUsername && fields.isTouchedUsername}
						color={
							fields.isValidUsername && fields.isTouchedUsername
								? "success"
								: "primary"
						}
						focused={
							fields.isValidUsername && fields.isTouchedUsername ? true : false
						}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					<TextField
						type="text"
						name="firstName"
						label="FirstName"
						sx={{ m: 1 }}
						error={!fields.isValidFirstName && fields.isTouchedFirstName}
						color={
							fields.isValidFirstName && fields.isTouchedFirstName
								? "success"
								: "primary"
						}
						focused={
							fields.isValidFirstName && fields.isTouchedFirstName ? true : false
						}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					<TextField
						type="text"
						name="lastName"
						label="LastName"
						sx={{ m: 1 }}
						error={!fields.isValidLastName && fields.isTouchedLastName}
						color={
							fields.isValidLastName && fields.isTouchedLastName
								? "success"
								: "primary"
						}
						focused={
							fields.isValidLastName && fields.isTouchedLastName ? true : false
						}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					<TextField
						type="email"
						name="email"
						label="Email"
						sx={{ m: 1 }}
						error={!fields.isValidEmail && fields.isTouchedEmail}
						color={
							fields.isValidEmail && fields.isTouchedEmail ? "success" : "primary"
						}
						focused={fields.isValidEmail && fields.isTouchedEmail ? true : false}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					<TextField
						type="password"
						name="password"
						label="Password"
						sx={{ m: 1 }}
						error={!fields.isValidPassword && fields.isTouchedPassword}
						color={
							fields.isValidPassword && fields.isTouchedPassword
								? "success"
								: "primary"
						}
						focused={
							fields.isValidPassword && fields.isTouchedPassword ? true : false
						}
						onChange={handleChange}
						onBlur={handleChange}
					/>
					<TextField
						type="password"
						name="confirmPassword"
						label="ConfirmPassword"
						sx={{ m: 1 }}
						error={
							!fields.isValidConfirmPassword && fields.isTouchedConfirmPassword
						}
						color={
							fields.isValidConfirmPassword && fields.isTouchedConfirmPassword
								? "success"
								: "primary"
						}
						focused={
							fields.isValidConfirmPassword && fields.isTouchedConfirmPassword
								? true
								: false
						}
						onChange={handleChange}
						onBlur={handleChange}
					/>

					<Button
						type="submit"
						disabled={!canRegister}
						sx={{ m: 1, borderRadius: "14px", fontSize: "18px" }}
						variant="outlined"
					>
						Submit
					</Button>

				</form>
				{
					loading &&
					<Loader />
				}
			</Box>
		</Modal>
	)
}

export default NewEmployeeForm