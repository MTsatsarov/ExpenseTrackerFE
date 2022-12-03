import { Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PaidIcon from '@mui/icons-material/Paid';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
interface IAdminPortalNavProps {
	changeSection: Function
}
const AdminPortalNav = (props: IAdminPortalNavProps) => {

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
	}, [currSection])

	return (
		<>
			<List component="nav" sx={{ display: "flex", flexDirection: "column", p: 0 }}>
				<Link
					to={"/portal/admin/clients"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('/portal/admin/clients')}
						selected={currSection.includes('/portal/admin/clients')}
					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<PeopleAltIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Clients</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />

				<Link
					to={"/portal/admin/transactions"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('/portal/admin/transactions')}
						selected={currSection.includes('/portal/admin/transactions')}

					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<PaidIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Transactions</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />
				<Link
					to={"/portal/admin/organizations"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>
					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('/portal/admin/organizations')}
						selected={currSection.includes('/portal/admin/organizations')}

					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<CorporateFareIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Organizations</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />

				<Link
					to={"/portal/admin/stores"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>

					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('/portal/admin/stores')}
						selected={currSection.includes('/portal/admin/stores')}

					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<StoreMallDirectoryIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Stores</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />

				<Link
					to={"/portal/admin/products"}
					style={{ cursor: "pointer", textDecoration: "none", }}
				>

					<ListItem
						sx={{ alignSelf: 'flex-start', justifySelf: 'flex-end', cursor: 'pointer' }}
						button
						onClick={() => onClick('/portal/admin/products')}
						selected={currSection.includes('/portal/admin/products')}
					>
						<ListItemIcon sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
							<ShoppingCartIcon sx={{ color: 'white' }} />
						</ListItemIcon>
						<ListItemText>
							<span style={{ fontSize: '0.9em', fontWeight: 300, color: 'white' }}>Products</span>
						</ListItemText>
					</ListItem>
				</Link>

				<Divider sx={{ background: "#A2A0A0" }} />
			</List>
		</>
	)
}

export default AdminPortalNav