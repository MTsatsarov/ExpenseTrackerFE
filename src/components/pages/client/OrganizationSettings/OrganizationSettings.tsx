import { Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from 'react'
import { useAppSelector } from "../../../../app/hooks"
import BasicInfo from "./BasicInfo/BasicInfo"
import EmployeeList from "./EmployeeList/EmployeeList"

const OrganizationSettings = () => {
	var user = useAppSelector((state) => state.user);
	const [tabIndex, setTabIndex] = useState<number>(0)

	const onTabChange = (e: any, i: number) => {
		setTabIndex(i)
	}
	return (
		<Box>
			<Typography sx={{ mt: 12 }} variant='h3'>My Organization</Typography>
			<Tabs sx={{ ml: 4, mt: 1 }} variant="fullWidth" value={tabIndex} onChange={onTabChange}>
				<Tab label="Basic" />
				<Tab label="Employee List" />
				<Tab disabled={!user.roles.includes("OWNER") && true} label="Employee management" />
			</Tabs>
			{tabIndex === 0 &&
				<BasicInfo />}
			{tabIndex === 1 && <EmployeeList />}
			{tabIndex === 2 && <h2>Under Construction </h2>}

		</Box>

	)
}

export default OrganizationSettings