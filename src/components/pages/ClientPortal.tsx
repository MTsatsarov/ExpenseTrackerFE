import { Drawer, styled, Divider, Fab, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from "@mui/system";
import ClientRoutes from "./client/ClientRoutes";
import ClientPortalNav from "./client/ClientPortalNav";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import CreateTransactionModal from "../utils/CreateTransactionModal/CreateTransactionModal";
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
	const mobileBreak = 1300
	const drawerWidth = 220;
	useEffect(() => {
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
					<Button color="inherit">Login</Button>
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
