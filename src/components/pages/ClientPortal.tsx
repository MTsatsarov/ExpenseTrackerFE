import { Drawer, styled, Divider } from "@mui/material";
import { Box } from "@mui/system";
import ClientRoutes from "./client/ClientRoutes";
import ClientPortalNav from "./client/ClientPortalNav";
const ClientPortal = () => {
	const DrawerHeader = styled("div")(() => ({
		display: "flex",
		alignItems: "center",
		padding: "5px",
		justifyContent: "flex-start",
	}));

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "no-wrap",
				width: "100%",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					background: "blue",
					width: "10%",
				}}
			>
				<Drawer
					sx={{
						display: { xs: "none", sm: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							backgroundColor: "#393838",
							color: "white",
							zIndex: -10,
							width: "10%",
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
			</Box>
			<Box sx={{ width: "90%" }}>
				<ClientRoutes />
			</Box>
		</Box>
	);
};

export default ClientPortal;
