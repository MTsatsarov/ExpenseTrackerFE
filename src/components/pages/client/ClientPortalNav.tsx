import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSection } from "../../../features/ClientSideNav/clientSideSlice";
import { appTheme } from "../../utils/AppTheme/AppTheme";
const ClientPortalNav = () => {

	var dispatch = useDispatch();
	var section = useSelector<any>((state) => state.clientSideNav.selectedSection);
	const onClick = (section: string) => {
		dispatch(setSection(section))
	}

	return (
		<>
			<List component="nav" sx={{ display: "flex", flexDirection: "column", p: 0 }}>
				<Link
					to={"/portal/user/dashboard"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('dashboard')}
						selected={section === 'dashboard'}
					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<DashboardIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Dashboard</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />

				<Link to={'/portal/user/history'} style={{ textDecoration: 'none' }}>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('history')}
						selected={section === 'history'}
					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<HistoryIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>History</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />
			</List>
		</>
	);
};
export default ClientPortalNav;
