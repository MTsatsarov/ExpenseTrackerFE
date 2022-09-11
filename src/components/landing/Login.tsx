import { Box, Button, TextField, Typography, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRoutes, apiUrl } from "../../apiConfig";
import instance from "../../axios/axios";
import Toaster from "../utils/Toaster/Toaster";
import { setTokens } from "../../features/User/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

interface ILoginState {
	email: string;
	password: string;
	isEmailTouched: boolean;
	isPasswordTouched: boolean;
	isEmailValid: boolean;
	isPasswordValid: boolean;
}
const Login = () => {
	var dispatch = useAppDispatch();
	var navigate = useNavigate();
	const [loading, setIsLoading] = useState<boolean>(true);
	const [isValid, setIsValid] = useState<boolean>(false);
	const [model, setModel] = useState<ILoginState>({
		email: "",
		password: "",
		isEmailTouched: false,
		isPasswordTouched: false,
		isEmailValid: false,
		isPasswordValid: false,
	});

	useEffect(() => {
		validateForm();
	}, [model]);

	const onChange = (e: any) => {
		var name = e.target.name;

		var email = model.email;
		var password = model.password;
		var isEmailTouched = model.isEmailTouched;
		var isPasswordTouched = model.isPasswordTouched;
		var isEmailValid = model.isEmailValid;
		var isPasswordValid = model.isPasswordValid;

		if (name === "email") {
			email = e.target.value;
			isEmailTouched = true;
			isEmailValid = e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
		} else {
			password = e.target.value;
			isPasswordTouched = true;
			isPasswordValid = e.target.value.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i
			);
		}

		setModel((oldState) => ({
			...oldState,
			email: email,
			password: password,
			isEmailTouched: isEmailTouched,
			isPasswordTouched: isPasswordTouched,
			isEmailValid: isEmailValid,
			isPasswordValid: isPasswordValid,
		}));
		validateForm();
	};

	const validateForm = () => {
		var isValid =
			model.isEmailTouched &&
			model.isEmailValid &&
			model.isPasswordTouched &&
			model.isPasswordValid;
		setIsValid(isValid);
	};

	const onSubmit = async (e: any) => {
		e.preventDefault();
		if (isValid) {
			await instance
				.post(`${apiUrl}/${apiRoutes.signIn}`, {
					email: model.email,
					password: model.password,
				})
				.then((response) => {
					if (response.status === 200 || response.status === 201) {
						dispatch(
							setTokens({
								token: response.data.token,
								refreshToken: response.data.refreshToken,
							})
						);
						//TODO ADD GetCurrentUser

						navigate("/portal/user/dashboard", { replace: true });
					}
				})
				.catch(function (error) {
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
	};
	return (
		<Box
			sx={{
				display: "flex",
				alignSelf: "center",
				justifyContent: "center",
				justifySelf: "center",
				m: 4,
				flexBasis: "100%",
				flexDirection: "column",
			}}
		>
			<Typography  variant="h2">Login Form</Typography>
			<Fade in={true} appear>
				<form
					onSubmit={(e) => onSubmit(e)}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						marginTop: "50px",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-evenly",
							width: "100%",
						}}
					>
						<TextField
							margin="dense"
							value={model.email}
							type="text"
							name="email"
							label="Email"
							onChange={onChange}
							onBlur={onChange}
							error={!model.isEmailValid && model.isEmailTouched}
							color={
								model.isEmailTouched && model.isEmailValid
									? "success"
									: "primary"
							}
							focused={
								model.isEmailTouched && model.isEmailValid ? true : false
							}
							sx={{ width: "30%" }}
						/>

						<TextField
							margin="dense"
							value={model.password}
							type="password"
							name="password"
							label="Password"
							onChange={onChange}
							onBlur={onChange}
							error={!model.isPasswordValid && model.isPasswordTouched}
							color={
								model.isPasswordTouched && model.isPasswordValid
									? "success"
									: "primary"
							}
							focused={
								model.isPasswordTouched && model.isPasswordValid ? true : false
							}
							sx={{ width: "30%" }}
						/>
					</Box>
					<Button
						variant="outlined"
						size="large"
						color="primary"
						sx={{
							m: 3,
							borderRadius: "15px",
							minWidth: "300px",
							fontWeight: "bolder",
						}}
						type="submit"
						disabled={!isValid}
					>
						Login
					</Button>
				</form>
			</Fade>
			<Link to="/signup">Create new account</Link>
		</Box>
	);
};

export default Login;
