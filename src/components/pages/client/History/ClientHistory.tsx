import { useState, useEffect } from 'react'
import { apiRoutes, apiUrl } from '../../../../apiConfig'
import instance from '../../../../axios/axios'
import Toaster from '../../../utils/Toaster/Toaster'
import { Box, Typography, Slide } from "@mui/material"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { appTheme } from "../../../utils/AppTheme/AppTheme";
interface IProductResponse {
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
	const columns: GridColDef[] = [
		{ field: 'store', headerName: 'Store', width: 150, },
		{ field: 'createdOn', headerName: 'Date of Creation', width: 200 },
		{ field: 'totalPrice', headerName: 'Total Price', width: 150 },
		{ field: 'ac', headerName: 'Actions' },
	]
	return (
		<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
			<Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', background: appTheme.palette.primary.dark }}>
				<Box sx={{ minWidth: '40%', mt: 10, height: 400, alignSelf: 'center', color: 'white' }}>
					<Typography variant='h3'>History of the transactions</Typography>

					<DataGrid
						sx={{ textAlign: 'center', mt: 2, color: 'white' }}
						rows={transactions}
						columns={columns}
						disableSelectionOnClick
					/>
				</Box>
			</Box>
		</Slide>
	)
}

export default ClientHistory