import { useState, useEffect, } from 'react'
import { apiRoutes, apiUrl } from '../../../../apiConfig'
import instance from '../../../../axios/axios'
import Toaster from '../../../utils/Toaster/Toaster'
import { Box, Typography, Slide, TableContainer, TableHead, TableCell, Table, TableRow, TableBody, Button, Menu, MenuItem, Paper, TablePagination } from "@mui/material"
import { appTheme } from "../../../utils/AppTheme/AppTheme";
import Details from './Details/Details'
import Loader from '../../../utils/Loader/Loader'
import RuleFolderOutlinedIcon from '@mui/icons-material/RuleFolderOutlined';

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
	createdOn: string,
	user: string
}
const OrganizationHistory = () => {

	const [transactions, setTransactiosn] = useState<Array<ITransactionState>>([])
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedRow, SetSelectedRow] = useState<any>({})
	const [displayDetails, setDisplayDetails] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [count, setCount] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const getProducts = async (page: number, itemsPerPage: number) => {
		await instance.get(`${apiUrl}/${apiRoutes.getTransactions}?page=${page}&itemsPerPage=${itemsPerPage}`).then((response) => {
			if (response.status === 200 || response.status === 201) {
				var transactions = response.data.transactions as Array<ITransactionState>;
				setTransactiosn(transactions);
				setCount(response.data.count)
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

	useEffect(() => {

		setLoading(true)
		getProducts(page, rowsPerPage)
		setLoading(false)
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

	const handleChangePage = async (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage + 1);
		await getProducts(newPage + 1, rowsPerPage)
	};

	const handleChangeRowsPerPage = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value,));
		await getProducts(1, parseInt(event.target.value,))
		setPage(1);
	};

	return (
		<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ minWidth: 900, mt: 10, alignSelf: 'center', overflow: 'auto' }}>
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
									transactions.length > 0 ?
										transactions.map(x => <TableRow key={x.id} >
											<TableCell scope='row'>{x.createdOn.toString()}</TableCell>
											<TableCell scope='row'>{x.store}</TableCell>
											<TableCell scope='row'>{x.totalPrice}</TableCell>
											<TableCell scope='row'><Button variant='contained' onClick={(e) => toggleMenu(e, x)}>Actions</Button></TableCell>
										</TableRow>) :
										<TableRow >
											<Box >
												<RuleFolderOutlinedIcon fontSize='large' sx={{ fontSize: '200px' }} />
											</Box>
										</TableRow>
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
					<Details show={displayDetails} onClose={toggleDetails} id={selectedRow.id} date={selectedRow.createdOn} totalPrice={selectedRow.totalPrice} user={selectedRow.user} />
				}

				{
					loading &&
					<Loader />
				}
				<TablePagination
					component="div"
					count={count}
					page={page - 1}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[5, 10, 25]}
					onRowsPerPageChange={handleChangeRowsPerPage}
					sx={{ mr: '10rem' }}
				/>
			</Box>

		</Slide >
	)
}

export default OrganizationHistory