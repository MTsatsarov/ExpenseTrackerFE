import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, styled, Switch, Toolbar, Typography } from "@mui/material"
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MenuIcon from '@mui/icons-material/Menu';
import { useState,useEffect } from "react";
import { apiRoutes, apiUrl } from "../../../apiConfig";
import instance from "../../../axios/axios";
import Toaster from "../../utils/Toaster/Toaster";
import { logOutUser, setCurrentUser } from "../../../features/User/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useNavigate } from "react-router-dom";
import AdminPortalNav from "./AdminPortalNav";
import AdminRoutes from "./AdminRoutes";
import AppDivider from "../../guidlines/divider/AppDivider";

interface IAdminPortalProps {
	getTheme: Function
}
const AdminPortal = (props: IAdminPortalProps) => {
	var mode = useAppSelector(store=>store.user.themeMode);
	const [toggleSideNav, setToggleSideNav] = useState<boolean>(false)
	const [theme, setTheme] = useState<string>()
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEL] = useState<any>()
	const [displaySideNav, setDisplaySideNav] = useState<boolean>(false)
	const [sectionName, setSectionName] = useState<string>(mode)

	var dispatch = useAppDispatch();
	var navigate = useNavigate();

	const mobileBreak = 1300;
	const drawerWidth = 220;

	const DrawerHeader = styled("div")(() => ({
		display: "flex",
		alignItems: "center",
		padding: "5px",
		justifyContent: "flex-start",
	}));

	useEffect(() => {
		getCurrentUser();
		window.addEventListener('resize', handleResize)
		return function cleanUp() {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const toggle = () => {
		setToggleSideNav(!toggleSideNav)
	}

	const toggleMenu = (e: any) => {
		setShowMenu(!showMenu)
		setAnchorEL(e.target);
	}

	const handleResize = () => {
		setDisplaySideNav(window.innerWidth < mobileBreak ? true : false)
	}

	const changeTheme = async () => {
		var newMode = theme === 'light' ? 'dark' : 'light'

		await instance.post(`${apiUrl}/${apiRoutes.changeThemeMode}`, newMode).then((response) => {
			if (response.status === 200 || response.status === 201) {
				props.getTheme(newMode)
				getCurrentUser();
				setTheme(newMode)

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

	const changeSection = (section: string) => {
		setSectionName(section)
	}


	const getCurrentUser = async () => {
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
				setTheme(response.data.mode)
				props.getTheme(response.data.mode)
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
	const logoutUser = () => {
		instance.post(`${apiUrl}/${apiRoutes.logOut}`).then((response) => {
			if (response.status === 200 || response.status === 201) {
				dispatch(logOutUser(null))
				navigate("/signIn", { replace: true });
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
	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position="fixed" color="secondary"
				sx={{
					ml: { sm: `${drawerWidth}px` },
				}}
			>

				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => toggle()}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{sectionName}
					</Typography>

					<div style={{ marginRight: '2rem', display: 'flex', alignItems: 'flex-start' }}>
						<Switch checked={theme === 'dark' && true} onChange={changeTheme} />
						<IconButton color="inherit">
							{theme === 'dark' ? <DarkModeTwoToneIcon sx={{ color: '#F7FB07' }} /> : <LightModeTwoToneIcon sx={{ color: '#F7FB07' }} />}
						</IconButton>
					</div>


					<div>
						<IconButton sx={{ color: 'white', fontSize: '14px', border: '2px' }} onClick={toggleMenu}>
							<AccountBoxIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={showMenu}
							onClose={toggleMenu}
						>
							<MenuItem onClick={logoutUser} >Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					sx={{
						display: { xs: "none", sm: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							backgroundColor: "#393838",
							color: "white",
							width: `${drawerWidth}px`
						},
					}}
					anchor="left"
					variant="permanent"
					open={true}
				>
					<DrawerHeader>MY logo will be here</DrawerHeader>
					<AppDivider style={{ background: "#A2A0A0" }} />
					<AdminPortalNav changeSection={changeSection} />
				</Drawer>
				{
					displaySideNav &&
					<Drawer
						container={window.document.body}
						variant="temporary"
						open={toggleSideNav}
						onClose={toggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'block', md: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box', width: `${drawerWidth}px`, backgroundColor: "#393838",
								color: "white",

							},
						}}
					>
						<DrawerHeader>MY logo will be here</DrawerHeader>

						<AppDivider style={{ background: "#A2A0A0" }} />
						<AdminPortalNav changeSection={changeSection} />

					</Drawer>
				}
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					pt: 5,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					minHeight: '1080px',
				}}
			>
				{<AdminRoutes/>}

			</Box>
		</Box>
	)
}

export default AdminPortal