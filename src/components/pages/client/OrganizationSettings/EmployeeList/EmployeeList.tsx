import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slide, Menu, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import { appTheme } from "../../../../utils/AppTheme/AppTheme"
import { useState, useEffect } from "react"
import NewEmployeeForm from "../../../../utils/NewEmployeeForm/NewEmployeeForm"
import instance from "../../../../../axios/axios"
import { apiRoutes, apiUrl } from "../../../../../apiConfig"
import Toaster from "../../../../utils/Toaster/Toaster"
import Loader from "../../../../utils/Loader/Loader"
import { useAppSelector } from "../../../../../app/hooks"

interface EmployeeList {
	id: string,
	email: string,
	userName: string,
	createdOn: string,
	totalTransactions: number,
	highestSum: number,
	totalSum: number,
	lastTransaction: string
}
const EmployeeList = () => {

	const [showModal, setShowModal] = useState<boolean>(false)
	const [employees, setEmployees] = useState<Array<EmployeeList>>([])
	const [loading, setLoading] = useState<boolean>(false);
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = useState<any>()
	const [selectedRow, setSelectedRow] = useState<number>(-1)

	var user = useAppSelector((state) => state.user);


	const changeRow = (e: any, i: number) => {
		setSelectedRow(i)
	}
	const toggleMenu = (event: any, data: any) => {
		setAnchorEl(event.currentTarget);
		setDisplayMenu(!displayMenu)

	}
	const handleClose = () => {
		setAnchorEl(null);
		setDisplayMenu(!displayMenu)
	};

	const onOpenModal = () => {
		setShowModal(true)
	}
	const onCloseModal = () => {
		setShowModal(false)
	}
	useEffect(() => {
		const getUsers = async () => {
			setLoading(true);
			await instance
				.get(`${apiUrl}/${apiRoutes.getEmployees}`)
				.then((response) => {
					var users = response.data as Array<EmployeeList>
					setEmployees(users);
				})
				.catch(function (error) {
					if (error.response) {
						var errors =
							error.response &&
							(error.response.data.message ||
								error.response.data ||
								error.response.statusText);
						errors.split(/\r?\n/).forEach((message: string) => {

							Toaster.show("error", "", message);
						});
					}
				}).finally(() => {
					setLoading(false);
				})
		}
		getUsers();
	}, [])
	return (
		<>
			{loading && <Loader />}
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
								{employees.map((x, i) =>
									<TableRow key={x.id} selected={selectedRow === i ? true : false} onClick={(e) => changeRow(e, i)} hover >
										<TableCell scope='row'>{x.email}</TableCell>
										<TableCell scope='row'>{x.userName}</TableCell>
										<TableCell scope='row'>{x.createdOn}</TableCell>
										<TableCell scope='row'>{x.totalTransactions}</TableCell>
										<TableCell scope='row'>{x.highestSum}</TableCell>
										<TableCell scope='row'>{x.totalSum}</TableCell>
										<TableCell scope='row'>{x.lastTransaction}</TableCell>
										<TableCell scope='row'>
											<Button disabled ={user.role !== "OWNER"} variant='contained' onClick={(e) => toggleMenu(e, x)}>Actions</Button>
										</TableCell>
									</TableRow>)}
							</TableBody>
						</Table>
					</TableContainer>
					<Menu
						anchorEl={anchorEl}

						open={displayMenu}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
					>
						<MenuItem disableRipple >ShowDetails</MenuItem>
					</Menu>
					{showModal && <NewEmployeeForm onCloseModal={onCloseModal} />}
				</Box>
			</Slide>
		</>
	)
}

export default EmployeeList