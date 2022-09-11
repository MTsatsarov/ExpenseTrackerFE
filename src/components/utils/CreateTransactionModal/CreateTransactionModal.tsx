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
	TextField,
	Button,
	FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";

import NewProductForm from "../../pages/client/CreateExpense/NewProductForm/NewProductForm";

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
	const [products, setProducts] = useState<Array<IProductList>>([
		{
			name: "test",
			quantity: 2,
			price: 3,
			total: 6,
		},

	]);

	const [showProductForm, setShowProductForm] = useState<boolean>(false);

	const addProduct = (product: IProductList) => {
		setProducts(products.concat(product))
	};
	
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
					<Box sx={{ width: "70%" }}>
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
									{products.map((row) => (
										<TableRow
											key={row.name}
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
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};

export default CreateTransactionModal;
