import { Box, Button, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "../../../app/hooks"
import Details from "../../pages/client/History/Details/Details"
import { ITransactionHistoryModel } from "../../pages/client/History/OrganizationHistory"
import Loader from "../Loader/Loader"


interface TransactionHistoryBoxProps {
	transactions: Array<ITransactionHistoryModel>,
	count: number,
	displayMenu: boolean,
	loading: boolean,
	page: number,
	handleChangeRowsPerPage: any,
	rowsPerPage: number,
	handleChangePage: any,
	toggleMenu: Function,
	toggleDetails: Function,
	handleClose: Function,
	selectedRow: any,

}
const TransactionHistoryBox = (props: TransactionHistoryBoxProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [displayDetails, setDisplayDetails] = useState<boolean>(false)

	const currencySymbol =  useAppSelector(store=> store.user.currencySymbol);

	const showDetails = (e: any) => {
		setDisplayDetails(!displayDetails)
	}

	const toggleMenu = (event: any, data: any) => {
		setAnchorEl(event.currentTarget);
		props.toggleMenu(event, data);
	}

	const toggleDetails = () => {
		setDisplayDetails(!displayDetails)
		props.toggleDetails();
	}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ minWidth: 900, mt: 5, alignSelf: 'center', overflow: 'auto' }}>
				<Typography variant='h3'>History of the transactions</Typography>

				<TableContainer className='mt-5' sx={{
					border: "1px solid rgba(128,128,128,0.4)",
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: 4,
					borderRadius: 2,
				}}>
					<Table stickyHeader={true} sx={{ minHeight: 500 }}>
						<TableHead >
							<TableRow>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Date</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Store</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>TotalPrice</TableCell>
								<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >
							{
								props.transactions.map(x => <TableRow key={x.id} >
									<TableCell scope='row'>{x.createdOn.toString()}</TableCell>
									<TableCell scope='row'>{x.store}</TableCell>
									<TableCell scope='row'>{x.totalPrice} {currencySymbol}</TableCell>
									<TableCell scope='row'><Button variant='contained' onClick={(e) => toggleMenu(e, x)}>Actions</Button></TableCell>
								</TableRow>)
							}
						</TableBody>
					</Table>
				</TableContainer>
				<Menu
					anchorEl={anchorEl}
					open={props.displayMenu}
					onClose={(e, i) => props.handleClose(e, i)}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<MenuItem disableRipple onClick={(e) => showDetails(e)}  >ShowDetails</MenuItem>
				</Menu>
			</Box>

			{displayDetails &&
				<Details
					show={displayDetails}
					onClose={toggleDetails}
					id={props.selectedRow.id}
					date={props.selectedRow.createdOn}
					totalPrice={props.selectedRow.totalPrice}
					user={props.selectedRow.user}

				/>
			}

			{
				props.loading &&
				<Loader />
			}
			{
				<TablePagination
					component="div"
					count={props.count}
					page={props.page - 1}
					onPageChange={props.handleChangePage}
					rowsPerPage={props.rowsPerPage}
					rowsPerPageOptions={[5, 10, 25]}
					onRowsPerPageChange={props.handleChangeRowsPerPage}
					style={{ marginRight: '5rem' }}
				/>

			}
		</Box>
	)
}

export default TransactionHistoryBox