import { Box, TextField, Typography, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRoutes, apiUrl } from "../../apiConfig";
import instance from "../../axios/axios";
import Toaster from "../utils/Toaster/Toaster";
import { setTokens, setCurrentUser } from "../../features/User/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader/Loader"
import AppButton, { ButtonSizes } from "../guidlines/button/AppButton";

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
	const [isValid, setIsValid] = useState<boolean>(false);
	const [model, setModel] = useState<ILoginState>({
		email: "",
		password: "",
		isEmailTouched: false,
		isPasswordTouched: false,
		isEmailValid: false,
		isPasswordValid: false,
	});
	const [loading, setLoading] = useState<boolean>(false)
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
			setLoading(true)
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

						instance.get(`${apiUrl}/${apiRoutes.getCurrentUser}`).then((response) => {
							if (response.status === 200 || response.status === 201) {
								dispatch(
									setCurrentUser({
										id: response.data.userId,
										firstName: response.data.firstName,
										lastName: response.data.lastName,
										roles: response.data.roles,
										email: response.data.email,
										currencySymbol: response.data.currencySymbol,
										mode: response.data.mode
									})
								)
								var roles = response.data.roles as Array<string>
								if (roles.find(x => x === 'ADMIN')) {
									navigate("/portal/admin/clients", { replace: true });
								}
								else {
									navigate("/portal/user/dashboard", { replace: true });

								}

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
			setLoading(false)
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
			<Typography variant="h2">Login Form</Typography>
			<Fade in={true} timeout={500}  >
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
					<AppButton
						variant="outlined"
						size={ButtonSizes.Large}
						color="primary"
						className="submit-button"
						inlineCss={{
							m: 3,
							borderRadius: "8px",
							minWidth: "300px",
							fontWeight: "bolder",
						}}
						type="submit"
						disabled={!isValid}
					>
						Login
					</AppButton>
				</form>
			</Fade>
			<Link to="/signup">Create new account</Link>
			{loading &&
				<Loader />}
		</Box>
	);
};

export default Login;
