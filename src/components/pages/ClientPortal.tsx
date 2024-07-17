import { Drawer, styled, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, SpeedDial, SpeedDialAction, Switch } from "@mui/material";
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import BroadcastOnHomeIcon from '@mui/icons-material/BroadcastOnHome';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from "@mui/system";
import ClientRoutes from "./client/ClientRoutes";
import ClientPortalNav from "./client/ClientPortalNav";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import CreateTransactionModal from "../utils/CreateTransactionModal/CreateTransactionModal";
import { useDispatch } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { apiRoutes, apiUrl } from "../../apiConfig";
import Toaster from "../utils/Toaster/Toaster";
import instance from "../../axios/axios";
import { logOutUser, setCurrentUser } from "../../features/User/userSlice";
import { useNavigate } from "react-router-dom";
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import { useAppSelector } from "../../app/hooks";
import AppDivider from "../guidlines/divider/AppDivider";

interface IClientPortalProps {
	getTheme: Function
}

const ClientPortal = (props: IClientPortalProps) => {
	const DrawerHeader = styled("div")(() => ({
		display: "flex",
		alignItems: "center",
		padding: "5px",
		justifyContent: "flex-start",
	}));

	var mode = useAppSelector(x => x.user.themeMode)
	const [displayModal, setDisplayModel] = useState<boolean>(false);
	const [displaySideNav, setDisplaySideNav] = useState<boolean>(false)
	const [toggleSideNav, setToggleSideNav] = useState<boolean>(false)
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEL] = useState<any>()
	const [sectionName, setSectionName] = useState<string>(mode)
	const [theme, setTheme] = useState<string>()
	const mobileBreak = 1300
	const drawerWidth = 220;

	var dispatch = useDispatch();
	var navigate = useNavigate();
	useEffect(() => {
		getCurrentUser();
		window.addEventListener('resize', handleResize)
		return function cleanUp() {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const onCLick = () => {
		setDisplayModel(!displayModal);
	};

	const handleResize = () => {
		setDisplaySideNav(window.innerWidth < mobileBreak ? true : false)
	}
	const toggle = () => {
		setToggleSideNav(!toggleSideNav)
	}

	const toggleMenu = (e: any) => {
		setShowMenu(!showMenu)
		setAnchorEL(e.target);
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

	const changeSection = (section: string) => {
		setSectionName(section)
	}

	const actions = [
		{ icon: <LocalGroceryStoreIcon color="primary" fontSize="medium" onClick={onCLick} />, name: 'Groceries' },
		{ icon: <BroadcastOnHomeIcon color="primary" fontSize="medium" />, name: 'Services' },
	];

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
	const changeTheme = async () => {
		var newMode = theme === 'light' ? 'dark' : 'light'

		await instance.post(`${apiUrl}/${apiRoutes.changeThemeMode}`,newMode).then((response) => {
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
					<ClientPortalNav changeSection={changeSection} />
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
						<ClientPortalNav changeSection={changeSection} />

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
				{displayModal ? (
					<CreateTransactionModal
						showModal={displayModal}
						handleClose={onCLick}
					/>
				) : (
					""
				)}

				<ClientRoutes />
				<SpeedDial
					sx={{ position: "absolute", top: "80%", left: "96%" }}
					color="primary"
					ariaLabel="SpeedDial tooltip example"

					icon={<AddIcon />}>

					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen
						/>
					))}
				</SpeedDial>
			</Box>
		</Box>
	);
};

export default ClientPortal;
