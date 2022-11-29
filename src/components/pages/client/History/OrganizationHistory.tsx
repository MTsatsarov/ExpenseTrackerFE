import { Box, Slide } from '@mui/material'
import React from 'react'
import { useState, useEffect, } from 'react'
import { apiRoutes, apiUrl } from '../../../../apiConfig'
import instance from '../../../../axios/axios'
import Toaster from '../../../utils/Toaster/Toaster'
import TransactionHistoryBox from '../../../utils/TrsansactionHistoryBox/TransactionHistoryBox'

export interface IProductResponse {
	productId: string,
	name: string,
	price: number,
	quantity: number,
}
export interface ITransactionHistoryModel {
	id: string,
	store: string,
	totalPrice: number,
	createdOn: string,
	user: string
}
const OrganizationHistory = () => {

	const [transactions, setTransactiosn] = useState<Array<ITransactionHistoryModel>>([])
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)
	const [selectedRow, SetSelectedRow] = useState<any>({})
	const [loading, setLoading] = useState<boolean>(false)
	const [count, setCount] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const getProducts = async (page: number, itemsPerPage: number) => {
		await instance.get(`${apiUrl}/${apiRoutes.getTransactions}?page=${page}&itemsPerPage=${itemsPerPage}`).then((response) => {
			if (response.status === 200 || response.status === 201) {
				var transactions = response.data.transactions as Array<ITransactionHistoryModel>;
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
		setDisplayMenu(!displayMenu)
		SetSelectedRow(data)

	}
	
	const handleClose = () => {
		setDisplayMenu(!displayMenu)
	};


	const toggleDetails = () => {
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
				<Box>
					<TransactionHistoryBox
						handleChangeRowsPerPage={handleChangeRowsPerPage}
						page={page}
						count={count}
						rowsPerPage={rowsPerPage}
						loading={loading}
						displayMenu={displayMenu}
						transactions={transactions}
						handleChangePage={handleChangePage}
						toggleMenu={toggleMenu}
						toggleDetails={toggleDetails}
						handleClose={handleClose}
						selectedRow={selectedRow}
					/>
				</Box>
		</Slide >
	)
}

export default OrganizationHistory