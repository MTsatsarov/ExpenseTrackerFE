import { IProductList } from "../../../../utils/CreateTransactionModal/CreateTransactionModal"
import { useState, useEffect } from "react";
import {
	Box,
	Button,
	FormLabel,
	TextField,
	Fade,
	FormGroup,
	Autocomplete
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import instance from "../../../../../axios/axios";
import { apiRoutes, apiUrl } from "../../../../../apiConfig";
import Toaster from "../../../../utils/Toaster/Toaster";
interface NewProductFormInterface {
	addProduct: Function
}
interface ISuggestionProducts {
	id: string,
	name: string
}
const NewProductForm = (props: NewProductFormInterface) => {

	const [newProduct, setNewProduct] = useState<IProductList>({
		name: '',
		quantity: 0,
		price: 0,
		total: 0,
		productId: null
	})

	const [valid, setValid] = useState<boolean>(false)
	const [productList, SetProductList] = useState<Array<ISuggestionProducts>>([])

	useEffect(() => {
		instance.get(`${apiUrl}/${apiRoutes.getProducts}`).then((response) => {
			SetProductList(response.data)
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
		return () => {
			setNewProduct(prevState => ({
				...prevState,
				name: '',
				quantity: 0,
				price: 0,
				total: 0,
				productId: null
			}))
		}
	}, [])
	useEffect(() => {
		setIsValid();
	}, [newProduct])

	const onNewProductChange = (name: string, value: any) => {
		var quantity = newProduct.quantity
		var price = newProduct.price
		var productName = newProduct.name;
		var productId = newProduct.productId;
		switch (name) {
			case 'name':
				productName = value
				var existing = productList.find(x => x.name === value)
				if (existing) {
					productName = existing.name
					productId = existing.id
				}
				break;
			case 'quantity':
				quantity = value
				break;
			case 'price':
				price = value
				break;
		}
		var total = price * quantity

		setNewProduct(prevState => ({
			...prevState,
			name: productName,
			quantity: quantity,
			price: price,
			total: total,
			productId:productId
		}))
	}

	const addProduct = (e: any) => {
		e.preventDefault();

		if (valid) {
			props.addProduct(newProduct)
		}
	}

	const setIsValid = () => {
		setValid(newProduct.name.length > 0 && newProduct.price > 0 && newProduct.quantity > 0 && newProduct.total > 0)
	}

	return (
		<Fade in={true} timeout={400}>
			<Box sx={{ color: "#2196F3", width: "100%", mt: 5 }}>
				<form
					style={{
						display: "flex",
						width: "100%",
						flexDirection: "column",
					}}
				>
					<FormLabel sx={{ m: 2, alignSelf: 'center' }}>New Product</FormLabel>
					<FormGroup sx={{ mb: 2 }}>
						<Autocomplete
							freeSolo
							disableClearable
							onChange={(e: any, v: any) => onNewProductChange(e.target.name, v)}
							options={productList.map((option) => option.name)}
							renderInput={(params) =>
								<TextField
									name="name"
									variant="standard"
									label="Name"
									{...params}
									value={newProduct.name}
									onChange={(e) => onNewProductChange(e.target.name, e.target.value)}
									onBlur={(e) => onNewProductChange(e.target.name, e.target.value)} />
							} />
					</FormGroup>
					<FormGroup sx={{ mb: 2 }}>
						<TextField
							variant="standard"
							label="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={(e) => onNewProductChange(e.target.name, e.target.value)}
							onBlur={(e) => onNewProductChange(e.target.name, e.target.value)}
						></TextField>
					</FormGroup>
					<FormGroup sx={{ mb: 2 }}>
						<TextField
							variant="standard"
							label="Quantity"
							name="quantity"
							type="number"
							value={newProduct.quantity}
							onChange={(e) => onNewProductChange(e.target.name, e.target.value)}
							onBlur={(e) => onNewProductChange(e.target.name, e.target.value)}
						></TextField>
					</FormGroup>
					<Box
						sx={{
							m: 2,
							width: "100%",
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
							alignSelf: "center",
						}}
					>
						<Button
							type='submit'
							variant="outlined"
							disabled={!valid}
							sx={{
								color: "green",
								borderColor: "green",
							}}
							onClick={(e) => addProduct(e)}
						>
							<DoneIcon sx={{ fontSize: 32 }} />
						</Button>
					</Box>
				</form>
			</Box>
		</Fade>
	)
}

export default NewProductForm