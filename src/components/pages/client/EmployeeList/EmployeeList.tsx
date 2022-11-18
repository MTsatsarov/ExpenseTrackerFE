import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slide, Modal, Dialog, Stepper, StepLabel, Step, Typography, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { appTheme } from "../../../utils/AppTheme/AppTheme"
import { useState } from "react"
import NewEmployeeForm from "../../../utils/NewEmployeeForm/NewEmployeeForm"
const EmployeeList = () => {

	const [showModal, setShowModal] = useState<boolean>(false)

	const onOpenModal = () => {
		setShowModal(true)
	}
	const onCloseModal = () => {
		setShowModal(false)
	}
	return (
		<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
			<Box sx={{
				maxWidth: '90%', width: 'auto', mt: 2, alignSelf: 'center', overflow: 'auto', marginLeft: "auto",
				marginRight: "auto",
				display: 'flex',
				flexDirection: 'column'
			}} >
				<Box className='mt-2' sx={{ alignSelf: 'flex-start' }} >
					<Button color="secondary" variant="contained" onClick={onOpenModal}>Add Employee</Button>
				</Box>
				<TableContainer className='mt-1' sx={{
					border: "1px solid rgba(128,128,128,0.4)",
					marginLeft: "auto",
					marginRight: "auto",
					borderRadius: 2,
				}}>
					<Table stickyHeader={true} sx={{ minHeight: 500 }}>
						<TableHead sx={{ "& .MuiTableCell-stickyHeader": { backgroundColor: appTheme.palette.primary.main } }}>
							<TableRow>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Employee Email</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>UserName</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Created On</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Total Transactions</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Highest Sum</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Total Sum</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Last Transactions</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >

						</TableBody>
					</Table>
				</TableContainer>
				{showModal && <NewEmployeeForm onCloseModal = {onCloseModal } />}
			</Box>
		</Slide>
	)
}

export default EmployeeList