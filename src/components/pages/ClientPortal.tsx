import { Drawer, styled, Divider, Fab, AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from "@mui/system";
import ClientRoutes from "./client/ClientRoutes";
import ClientPortalNav from "./client/ClientPortalNav";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import CreateTransactionModal from "../utils/CreateTransactionModal/CreateTransactionModal";
import { useSelector, useDispatch } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { apiRoutes, apiUrl } from "../../apiConfig";
import Toaster from "../utils/Toaster/Toaster";
import instance from "../../axios/axios";
import { logOutUser } from "../../features/User/userSlice";
import { useNavigate } from "react-router-dom";
const ClientPortal = () => {
	const DrawerHeader = styled("div")(() => ({
		display: "flex",
		alignItems: "center",
		padding: "5px",
		justifyContent: "flex-start",
	}));
	const [displayModal, setDisplayModel] = useState<boolean>(false);
	const [displaySideNav, setDisplaySideNav] = useState<boolean>(false)
	const [toggleSideNav, setToggleSideNav] = useState<boolean>(false)
	const [user, setUser] = useState<any>({})
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEL] = useState<any>()

	const mobileBreak = 1300
	const drawerWidth = 220;

	var stateUser = useSelector<any>((state) => state.user);
	var dispatch = useDispatch();
	var navigate = useNavigate();
	useEffect(() => {
		window.addEventListener('resize', handleResize)
		setUser(stateUser)
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
						News
					</Typography>

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
					<Divider sx={{ background: "#A2A0A0" }} />
					<ClientPortalNav />
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

						<Divider sx={{ background: "#A2A0A0" }} />
						<ClientPortalNav />

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
				<Fab
					sx={{ position: "absolute", top: "80%", left: "96%" }}
					color="primary"
					aria-label="add"

					onClick={onCLick}
				>
					<AddIcon />
				</Fab>
			</Box>
		</Box>
	);
};

export default ClientPortal;
