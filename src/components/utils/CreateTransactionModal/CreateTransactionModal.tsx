import {
	Modal,
	Box,
	Typography,
	Paper,
	TableContainer,
	TableRow,
	TableBody,
	Table,
	TableHead,
	TableCell,
	Tooltip,
	IconButton,
	Button,
	TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState, useEffect } from "react";
import instance from "../../../axios/axios";

import NewProductForm from "../../pages/client/CreateExpense/NewProductForm/NewProductForm";
import { apiRoutes, apiUrl } from "../../../apiConfig";
import Toaster from "../Toaster/Toaster";

interface ICreateTransactionModalProps {
	showModal: boolean;
	handleClose: any;
}
export interface IProductList {
	name: string;
	quantity: number;
	price: number;
	total: number;
}

const CreateTransactionModal = (props: ICreateTransactionModalProps) => {
	const [products, setProducts] = useState<Array<IProductList>>([]);
	const [showProductForm, setShowProductForm] = useState<boolean>(false);
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [store, setStore] = useState<string>('')

	const addProduct = (product: IProductList) => {
		var total = 0;
		products.map(p => total += (p.price * p.quantity))
		total += (product.price * product.quantity)
		setProducts(products.concat(product))
		setTotalPrice(total)
	};

	const createExpense = async () => {
		if (products.length > 0 && store.length > 0) {
			await instance.post(`${apiUrl}/${apiRoutes.createExpense}`, { products: products, storeName: store }).then((response) => {
				if (response.status === 200 || response.status === 201) {
					Toaster.show("success", "", response.data);
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
	}
	const onStoreChange = (e: any) => {
		setStore(e.target.value)
	}
	return (
		<Modal
			open={props.showModal}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
			sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				boxShadow: " 0px 0px 67px 9px rgba(0,0,0,0.85)",
				borderRadius: "12px",
				border: "2px solid black",
				width: "70%",
				height: "70%",
			}}
		>
			<Box
				sx={{
					width: "100%",
					height: "100%",
					background: "rgba(255,255,255,1)",
					borderRadius: "12px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					overflowY: "scroll",
				}}
			>
				<Typography sx={{ p: 1 }} variant="h3">
					Create new transaction
				</Typography>
				<Box
					sx={{
						position: "absolute",
						top: "0%",
						right: "0%",
						p: 2,
						cursor: "pointer",
					}}
					onClick={props.handleClose}
				>
					<CloseIcon />
				</Box>
				<Box>
					<TextField onChange={onStoreChange} value={store} label="Store" variant="filled"></TextField>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						width: "90%",
						p: 3,
					}}
				>
					<Box sx={{ width: "20%" }}>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "space-around",
							}}
						>
							<Box>
								<Tooltip title="Upload your receipt.">
									<IconButton sx={{ border: 1, color: "#2196F3" }}>
										<FileUploadIcon sx={{ fontSize: 32 }} />
									</IconButton>
								</Tooltip>
							</Box>
							<Box>
								<Tooltip title="Add product" sx={{}}>
									<IconButton
										sx={{ border: 1, color: "#2196F3" }}
										onClick={() => {
											setShowProductForm(!showProductForm);
										}}
									>
										<AddIcon sx={{ fontSize: 32 }} />
									</IconButton>
								</Tooltip>
							</Box>
						</Box>
						{showProductForm && (
							<NewProductForm addProduct={addProduct} />
						)}
					</Box>
					<Box sx={{ width: "70%", display: 'flex', flexDirection: 'column' }}>
						<TableContainer component={Paper}>
							<Table
								sx={{ width: 600, overflow: "hidden" }}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell>Product Name</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Price</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody sx={{ overflow: "hidden" }}>
									{products.map((row, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.quantity}</TableCell>
											<TableCell align="right">{row.price}</TableCell>
											<TableCell align="right">{row.total}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box sx={{ mt: 3, alignSelf: 'flex-end' }}><strong>Total price of the transaction is: ${totalPrice}</strong></Box>
						<Button onClick={createExpense} disabled={products.length === 0} variant="contained" sx={{ width: '50%', alignSelf: "center", mt: 5 }}>Create expense</Button>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default CreateTransactionModal;
