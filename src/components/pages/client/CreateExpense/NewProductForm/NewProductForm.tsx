import { IProductList } from "../../../../utils/CreateTransactionModal/CreateTransactionModal"
import { useState } from "react";
import {
	Box,
	Button,
	FormLabel,
	TextField
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import BackspaceIcon from "@mui/icons-material/Backspace";
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
	}

	const addProduct = (e: any) => {
		e.preventDefault();
		props.addProduct(newProduct)
	}

	return (
		<Box sx={{ color: "#2196F3", width: "100%", mt: 5 }}>
			<form
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
				}}
			>
				<FormLabel>New Product</FormLabel>
				<TextField variant="standard" label="Name"></TextField>
				<TextField
					variant="standard"
					label="Price"
					type="number"
				></TextField>
				<TextField
					variant="standard"
					label="Quantity"
					type="number"
				></TextField>
				<Box
					sx={{
						m: 2,
						width: "70%",
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						alignSelf: "flex-end",
					}}
				>
					<Button
						variant="outlined"
						sx={{ width: "10%", color: "red", borderColor: "red" }}
					>
						<BackspaceIcon sx={{ fontSize: 32 }} />
					</Button>
					<Button
						type='submit'
						variant="outlined"
						sx={{
							width: "10%",
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
	)
}

export default NewProductForm