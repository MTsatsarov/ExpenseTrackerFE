import { Drawer, styled, Divider, Fab } from "@mui/material";
import { Box } from "@mui/system";
import ClientRoutes from "./client/ClientRoutes";
import ClientPortalNav from "./client/ClientPortalNav";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import CreateTransactionModal from "../utils/CreateTransactionModal/CreateTransactionModal";
const ClientPortal = () => {
	const DrawerHeader = styled("div")(() => ({
		display: "flex",
		alignItems: "center",
		padding: "5px",
		justifyContent: "flex-start",
	}));
	const [displayModal, setDisplayModel] = useState<boolean>(false);

	const onCLick = () => {
		setDisplayModel(!displayModal);
	};
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "row",
				flexWrap: "no-wrap",
				width: "100%",
				height: "100%",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flexWrap: "wrap",
					width: "220px",
				}}
			>
				<Drawer
					sx={{
						display: { xs: "none", sm: "none", md: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							backgroundColor: "#393838",
							color: "white",
							width: "220px",
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
			<Box sx={{ width: "90%", height: "100%" }}>
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
