import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
	Menu,
	MenuItem,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
const ClientPortalNav = () => {
	return (
		<>
			<List component="nav" sx={{ display: "flex", flexDirection: "column" }}>
				<Link
					to={"/portal/user/dashboard"}
					style={{ cursor: "pointer", textDecoration: "none" }}
				>
					<ListItem>
						<ListItemIcon
							sx={{
								display: "flex",
								justifyContent: "space-around",
								alignItems: "center",
							}}
						>
							<DashboardIcon sx={{ color: "white" }} />
						</ListItemIcon>
						<ListItemText>
							<span
								style={{
									fontSize: "1.3em",
									fontWeight: 300,
									color: "white",
									textDecoration: "none",
								}}
							>
								Dashnoard
							</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />
			</List>
		</>
	);
};
export default ClientPortalNav;
