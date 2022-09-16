import { IProductList } from "../../../../utils/CreateTransactionModal/CreateTransactionModal"
import { useState, useEffect } from "react";
import {
	Box,
	Button,
	FormLabel,
	TextField,
	Fade,
	FormGroup
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
interface NewProductFormInterface {
	addProduct: Function
}
const NewProductForm = (props: NewProductFormInterface) => {

	const [newProduct, setNewProduct] = useState<IProductList>({
		name: '',
		quantity: 0,
		price: 0,
		total: 0,

	})

	const [valid, setValid] = useState<boolean>(false)

	useEffect(() => {
		return () => {
			setNewProduct(prevState => ({
				...prevState,
				name: '',
				quantity: 0,
				price: 0,
				total: 0,
			}))
		}
	}, [])

	const onNewProductChange = (e: any) => {
		var name = newProduct.name
		var quantity = newProduct.quantity
		var price = newProduct.price

		switch (e.target.name) {
			case 'name':
				name = e.target.value
				break;
			case 'quantity':
				quantity = e.target.value
				break;
			case 'price':
				price = e.target.value
				break;
		}
		var total = price * quantity
		setNewProduct(prevState => ({
			...prevState,
			name: name,
			quantity: quantity,
			price: price,
			total: total,
		}))
		setIsValid();
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
					<FormGroup sx={{mb:2}}>
						<TextField
							name="name"
							variant="standard"
							label="Name"
							value={newProduct.name}
							onChange={onNewProductChange}
							onBlur={onNewProductChange}>

						</TextField>
					</FormGroup>
					<FormGroup  sx={{mb:2}}>
						<TextField
							variant="standard"
							label="Price"
							name="price"
							type="number"
							value={newProduct.price}
							onChange={onNewProductChange} onBlur={onNewProductChange}
						></TextField>
					</FormGroup>
					<FormGroup  sx={{mb:2}}>
						<TextField
							variant="standard"
							label="Quantity"
							name="quantity"
							type="number"
							value={newProduct.quantity}
							onChange={onNewProductChange} onBlur={onNewProductChange}
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