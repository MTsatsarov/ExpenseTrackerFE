import { useEffect, useState } from "react"
import { apiRoutes, apiUrl } from "../../../../../apiConfig"
import instance from "../../../../../axios/axios"
import Toaster from "../../../../utils/Toaster/Toaster"
import { IProductResponse } from "../OrganizationHistory"
import { Modal, Fade, Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"
import { appTheme } from "../../../../utils/AppTheme/AppTheme"
import Loader from "../../../../utils/Loader/Loader"
import { useAppSelector } from "../../../../../app/hooks"
import CloseIcon from "@mui/icons-material/Close";

interface IDetailsProps {
	id: string,
	totalPrice: number,
	date: Date,
	show: boolean,
	onClose: Function,
	user: string
}
interface IDetailsState {
	id: string,
	totalPrice: number,
	date: Date,
	store: string,
	products: Array<IProductResponse>
}
const Details = (props: IDetailsProps) => {
	const [details, setDetails] = useState<IDetailsState>({
		id: props.id,
		totalPrice: props.totalPrice,
		date: props.date,
		store: "",
		products: []
	})
	var mode = useAppSelector(store => store.user.themeMode)
	const [loading, setLoading] = useState<boolean>(false)
	var user = useAppSelector((state) => state.user);

	useEffect(() => {
		setLoading(true)
		instance.get(`${apiUrl}/${apiRoutes.getTransactionDetails}/${props.id}`).then((response) => {
			var data = response.data;
			setDetails(prevState => ({
				...prevState,
				products: data.products,
				store: data.store
			}))
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
	}, [props.id])

	return (
		<Modal open={props.show}
			onClose={(e: any) => props.onClose(e)}
			sx={{
				position: "absolute",
				width: "100%",
				height: "100%",
			}}>
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
					<Box
						sx={{
							position: "absolute",
							top: "0%",
							right: "0%",
							p: 2,
							cursor: "pointer",
						}}
						onClick={(e)=>props.onClose(e)}
					>
						<CloseIcon />
					</Box>
					<Box sx={{ p: 4, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
						<div className="mt-5 p-2" style={{ width: '35%' }}>
							<h3 style={{ textAlign: 'center' }}>Main Details</h3>

							<TableContainer component={Paper} sx={{
								border: "1px solid rgba(128,128,128,0.4)",
								borderRadius: 2, marginLeft: "auto",
								marginRight: "auto",
							}}>
								<Table aria-label="simple table" className="mt-1">
									<TableBody >
										<TableRow className="hover-table" sx={{ '&:last0child td, &:last-child th': { border: 0 } }}>
											<TableCell style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }} align='left'>Total Price</TableCell>
											<TableCell align='left'>{props.totalPrice} {user.currencySymbol}</TableCell>
										</TableRow>
										<TableRow className="hover-table" sx={{ '&:last0child td, &:last-child th': { border: 0 } }}>
											<TableCell style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }} align='left'>Store</TableCell>
											<TableCell align='left'>{details.store} </TableCell>
										</TableRow>
										<TableRow className="hover-table" sx={{ '&:last0child td, &:last-child th': { border: 0 } }}>
											<TableCell style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }} align='left'>Date</TableCell>
											<TableCell align='left'>{props.date.toString()}</TableCell>
										</TableRow>
										<TableRow className="hover-table" sx={{ '&:last0child td, &:last-child th': { border: 0 } }}>
											<TableCell style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }} align='left'>Added By</TableCell>
											<TableCell align='left'>{props.user.toString()}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</div>
						<div className="mt-5 p-2" style={{ width: '65%' }}>
							<h3 style={{ textAlign: 'center' }}>Products</h3>
							<TableContainer component={Paper} sx={{
								border: "1px solid rgba(128,128,128,0.4)",
								marginLeft: "auto",
								marginRight: "auto",
								borderRadius: 2,
							}} >
								<Table aria-label="simple table">
									<TableHead >
										<TableRow>
											<TableCell style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }}>Product Name</TableCell>
											<TableCell align='left' style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }}>Price</TableCell>
											<TableCell align='left' style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }}>Quantity</TableCell>
											<TableCell align='left' style={{ color: appTheme.palette.primary.main, textTransform: 'uppercase' }}>Total</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{
											details.products.length > 0 &&
											details.products.map(p =>
												<TableRow className="hover-table" key={p.productId} sx={{ '&:last0child td, &:last-child th': { border: 0 } }}>
													<TableCell align="left">{p.name}</TableCell>
													<TableCell align="left">{p.price}</TableCell>
													<TableCell align="left">{p.quantity}</TableCell>
													<TableCell align="left">{(p.price * p.quantity).toFixed(2)}</TableCell>
												</TableRow>)
										}
									</TableBody>
								</Table>
							</TableContainer>
						</div>
					</Box>
					{
						loading &&
						<Loader />
					}
				</Box>
			</Fade>
		</Modal >
	)
}

export default Details