import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
interface ClientPortalNav {
	changeSection: Function
}
const ClientPortalNav = (props: ClientPortalNav) => {

	const [currSection, SetCurrSection] = useState<string>(window.location.pathname)
	const onClick = (newSection: string) => {
		SetCurrSection(newSection);
		var newSectionName = newSection.split("/").pop()
		var sectionName = newSectionName && newSectionName?.charAt(0).toUpperCase() + newSectionName?.slice(1)
		props.changeSection(sectionName)
	}

	useEffect(() => {
		var section = window.location.pathname
		onClick(section)
	}, [])


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
						onClick={() => onClick('/portal/user/dashboard')}
						selected={currSection === '/portal/user/dashboard'}
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

						onClick={() => onClick('/portal/user/history')}
						selected={currSection === '/portal/user/history'}
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

				<Link to={'/portal/user/settings'} style={{ textDecoration: 'none' }}>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button

						onClick={() => onClick('/portal/user/settings')}
						selected={currSection === '/portal/user/settings'}
					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<ManageAccountsIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Settings</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />
			</List>
		</>
	);
};
export default ClientPortalNav;
