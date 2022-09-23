import { useState, useEffect, } from 'react'
import { apiRoutes, apiUrl } from '../../../../apiConfig'
import instance from '../../../../axios/axios'
import Toaster from '../../../utils/Toaster/Toaster'
import { Box, Typography, Slide, TableContainer, TableHead, TableCell, Table, TableRow, TableBody, Button, Menu, MenuItem, Paper } from "@mui/material"
import { appTheme } from "../../../utils/AppTheme/AppTheme";
import Details from './Details/Details'
export interface IProductResponse {
	productId: string,
	name: string,
	price: number,
	quantity: number,
}
interface ITransactionState {
	id: string,
	store: string,
	totalPrice: number,
	createdOn: Date
}
const ClientHistory = () => {

	const [transactions, setTransactiosn] = useState<Array<ITransactionState>>([])
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedRow, SetSelectedRow] = useState<any>({})
	const [displayDetails, setDisplayDetails] = useState<boolean>(false)
	useEffect(() => {
		const getProducts = async () => {
			await instance.get(`${apiUrl}/${apiRoutes.getTransactions}`).then((response) => {
				if (response.status === 200 || response.status === 201) {
					var transactions = response.data as Array<ITransactionState>;
					setTransactiosn(transactions);
				}
			}).catch(function (error) {
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
			});
		}
		getProducts()

	}, [])


	const toggleMenu = (event: any, data: any) => {
		setAnchorEl(event.currentTarget);
		setDisplayMenu(!displayMenu)
		SetSelectedRow(data)

	}
	const handleClose = () => {
		setAnchorEl(null);
		setDisplayMenu(!displayMenu)
	};

	const showDetails = (e: any) => {
		setDisplayDetails(!displayDetails)
	}
	const toggleDetails = () => {
		setDisplayDetails(!displayDetails)
		setDisplayMenu(!displayMenu)
	}

	return (
		<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
			<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', background: appTheme.palette.primary.dark }}>
				<Box sx={{ minWidth: 900, mt: 10, minHeight: 500, alignSelf: 'center', color: 'white' }}>
					<Typography variant='h3'>History of the transactions</Typography>
					<TableContainer className='mt-5' sx={{
						border: "1px solid rgba(128,128,128,0.4)",
						marginLeft: "auto",
						marginRight: "auto",
						marginTop: 4,
						borderRadius: 2,
					}}>
						<Table stickyHeader={true}>
							<TableHead sx={{ "& .MuiTableCell-stickyHeader": { backgroundColor: appTheme.palette.primary.main } }}>
								<TableRow>
									<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Date</TableCell>
									<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Store</TableCell>
									<TableCell scope='head' variant='head' sx={{ color: 'white' }}>TotalPrice</TableCell>
									<TableCell scope='head' variant='head' sx={{ color: 'white' }}>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									transactions.map(x => <TableRow key={x.id} >
										<TableCell scope='row' sx={{ color: 'white' }}>{x.createdOn.toString()}</TableCell>
										<TableCell scope='row' sx={{ color: 'white' }}>{x.store}</TableCell>
										<TableCell scope='row' sx={{ color: 'white' }}>{x.totalPrice}</TableCell>
										<TableCell scope='row'><Button variant='contained' onClick={(e) => toggleMenu(e, x)}>Actions</Button></TableCell>
									</TableRow>)
								}
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
						<MenuItem disableRipple onClick={(e) => showDetails(e)}  >ShowDetails</MenuItem>
					</Menu>
				</Box>

				{displayDetails &&
					<Details show={displayDetails} onClose={toggleDetails} id={selectedRow.id} date={selectedRow.createdOn} totalPrice={selectedRow.totalPrice} />
				}
			</Box>
		</Slide >
	)
}

export default ClientHistory