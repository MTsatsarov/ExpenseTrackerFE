import { Tab, Tabs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState} from 'react'
import EmployeeList from "../EmployeeList/EmployeeList"

const OrganizationSettings = () => {
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
				<Tab label="Employee" />
			</Tabs>
			{tabIndex === 0 &&
				<h2>1111111111111</h2>}
			{tabIndex === 1 && <EmployeeList />}

		</Box>

	)
}

export default OrganizationSettings