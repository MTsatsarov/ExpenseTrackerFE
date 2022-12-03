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
	TextField,
	Fade,
	Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState, useEffect } from "react";
import instance from "../../../axios/axios";
import DeleteIcon from '@mui/icons-material/Delete';

import NewProductForm from "../../pages/client/CreateExpense/NewProductForm/NewProductForm";
import { apiRoutes, apiUrl } from "../../../apiConfig";
import Toaster from "../Toaster/Toaster";
import Loader from "../Loader/Loader";
import { useAppSelector } from "../../../app/hooks";
import { appTheme } from "../AppTheme/AppTheme";
import GoogleMaps from "../GoogleMap/GoogleMaps";


interface ICreateTransactionModalProps {
	showModal: boolean;
	handleClose: any;
}
export interface IProductList {
	name: string;
	quantity: number;
	price: number;
	total: number;
	productId?: string | null;
}

interface iStore {
	storeId?: string | null,
	name: string,
}

const CreateTransactionModal = (props: ICreateTransactionModalProps) => {
	const [products, setProducts] = useState<Array<IProductList>>([]);
	const [showProductForm, setShowProductForm] = useState<boolean>(false);
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [selectedStore, setSelectedStore] = useState<iStore>({ storeId: null, name: '' })
	const [storeSuggestions, setStoreSuggestions] = useState<Array<iStore>>([])
	const [loading, setLoading] = useState<boolean>(false);
	var user = useAppSelector((state) => state.user);
	var mode = useAppSelector(store => store.user.themeMode)

	useEffect(() => {
		instance.get(`${apiUrl}/${apiRoutes.getStores}`).then((response) => {
			setStoreSuggestions(response.data);
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
	}, [])
	const addProduct = (product: IProductList) => {
		var total = 0;
		products.map(p => total += (p.price * p.quantity))
		total += (product.price * product.quantity)
		setProducts(products.concat(product))
		setTotalPrice(total)
	};

	const createExpense = async () => {
		if (products.length > 0 && selectedStore.name.length > 0) {
			setLoading(true)
			await instance.post(`${apiUrl}/${apiRoutes.createExpense}`, { products: products, storeName: selectedStore.name, storeId: selectedStore.storeId, type: "product" })
				.then((response) => {
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
			setLoading(false)

		}
	}

	const onStoreChange = (storeName: string) => {
		var store = storeSuggestions.find(x => x.name === storeName.toString());
		if (store) {
			setSelectedStore(prevStore => ({
				...prevStore,
				storeId: store?.storeId,
				name: store?.name
			}))
		}
		else {
			setTimeout(() => setSelectedStore(prevStore => ({
				...prevStore,
				name: storeName.toString(),
				storeId: null
			})), 100)

			console.log(selectedStore)

		}
	}

	const removeProduct = (index: number) => {
		var newProducts = products.filter((x, y) => y !== index);
		setProducts(newProducts)
		var total = 0;
		newProducts.map(p => total += (p.price * p.quantity))
		setTotalPrice(total)
	}

	const uploadImg = (e: any) => {

		var receiptOcrEndpoint = 'https://ocr.asprise.com/api/v1/receipt';
		var imageFile = e.target.files[0]; // Modify this to use your own file if necessary

		var fd = new FormData();
		fd.append('file', imageFile, "img")
		fd.append('api_key', 'TEST')
		fd.append('recognizer', 'auto')
		setLoading(true)

		instance.post(receiptOcrEndpoint, fd).then((response) => {

			readReceiptResponse(response.data.receipts)
		}).catch(function (error) {
			if (error.response) {
				console.log(error.response) // Receipt OCR result in JSON
			}
		}).finally(() => {
			setLoading(false)
		});
	}

	const readReceiptResponse = (receipts: Array<any>) => {
		var currProducts = [] as Array<IProductList>

		receipts.forEach(x => {
			var items = x.items as Array<any>;

			console.log(items)
			items.forEach(element => {

				currProducts.push({
					name: element.description,
					quantity: element.qty,
					price: element.amount,
					total: Number(element.qty) * Number(element.amount)
				} as IProductList)
			});
		})

		currProducts = currProducts.concat(products);
		console.log(currProducts)

		setProducts(currProducts)
	}
	return (
		<Modal

			open={props.showModal}
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
			}}
		>
			<Fade in={true} timeout={500}>

				<Box
					sx={{
						width: "70%",
						height: "70%",
						backgroundColor: `${mode === 'dark' ? 'black' : "white"}`,
						borderRadius: "12px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						overflowY: "scroll",
						boxShadow: " 0px 0px 67px 9px rgba(0,0,0,0.85)",
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Typography sx={{ p: 1, my: 3 }} variant="h3">
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

					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "90%",
							p: 3,
							flexWrap: 'wrap'
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
										<IconButton sx={{ border: 1, color: "#2196F3" }} aria-label="upload picture" component="label">
											<input hidden accept="image/*" type="file" onChange={uploadImg} />
											<PhotoCamera sx={{ fontSize: 32 }} />
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
											<TableCell align="right">Actions</TableCell>
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
												<TableCell align="right">{row.total.toFixed(2)}</TableCell>
												<TableCell onClick={() => removeProduct(index)} data-index={index} align="right"><Tooltip title="Remove product"><IconButton sx={{ color: 'red' }}><DeleteIcon /></IconButton></Tooltip></TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>

							<Box sx={{ mt: 3, alignSelf: 'flex-end' }}><strong style={{ color: appTheme.palette.primary.main, marginRight: '0.5rem' }}>Total price of the transaction is:</strong> {totalPrice.toFixed(2)} {user.currencySymbol}</Box>
							<Box sx={{ display: 'flex', mt: 10, alignItems: 'center', justifyContent: 'space-between', width: "100%", height: "2.5rem" }}>
								<Autocomplete
									sx={{ width: '300px', textAlign: 'center', }}
									freeSolo
									disableClearable
									onChange={(e: any, v: any) => onStoreChange(v)}
									options={storeSuggestions.map((option) => option.name)}
									value={selectedStore.name}
									renderInput={(params) =>

										<TextField focused={selectedStore.name !== null && true} value={selectedStore.name} onChange={(e: any,) => onStoreChange(e.target.value)} {...params} label="Store" />}
								/>

								<Button onClick={createExpense} disabled={products.length === 0 || selectedStore.name.length === 0} variant="contained" sx={{ width: '50%', alignSelf: "flex-end" }}>Create expense</Button>
							</Box>

							<Box sx={{ mt: 2 }}><GoogleMaps getStore={onStoreChange} /></Box>
						</Box>
					</Box>
					{loading &&
						<Loader />}
				</Box>
			</Fade >

		</Modal>
	);
};
export default CreateTransactionModal;
