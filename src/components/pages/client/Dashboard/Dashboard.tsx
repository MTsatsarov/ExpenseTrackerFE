import { Box, Slide } from "@mui/material";
import ExpensesByStore from "./BottomLeft/ExpensesByStore";
import ExpensesByDay from "./TopLeft/ExpensesByDay";
import ExpensesCountByMonths from "./TopRight/ExpensesCountByMonths";
import instance from "../../../../axios/axios";
import { apiUrl, apiRoutes } from "../../../../apiConfig";
import Toaster from "../../../utils/Toaster/Toaster";
import { useState, useEffect } from "react";
import Loader from "../../../utils/Loader/Loader";
export interface StoreTransactions {
	name: string,
	count: number
}
export interface DailyTransactions {
	name: string,
	sum: number,
}
interface MappedTransactions {
	name: string,
	count: number,
	fill: string
}
export interface TransactonsByMonth {
	month: string,
	sum: number
}
const colors = {
	red: '#FF1C1C',
	blue: '#1373FD',
	green: '#12FF16',
	yellow: '#648400',
	purple: '#FF12C6'
}

const Dashboard = () => {

	const [loading, setLoading] = useState<boolean>(false);
	const [transactionsByStore, setTransactionsByStore] = useState<Array<StoreTransactions>>([])
	const [dailyTransactions, setDailyTransactions] = useState<Array<DailyTransactions>>([])
	const [monthlyTransactions, setMonthlyTransactions] = useState<Array<TransactonsByMonth>>([])


	useEffect(() => {
		const getDashboard = async () => {

			await instance.get(`${apiUrl}/${apiRoutes.getDashboard}`).then((response) => {
				var data = response.data
				console.log(data.transactionsByMonth)
				var arr: Array<MappedTransactions> = []
				data.transactionsByStore.map((x: StoreTransactions, y: number) => convertTransactions(arr, x, y))
				setTransactionsByStore(arr)
				setDailyTransactions(data.currentMonthTransactions)
				setMonthlyTransactions(data.lastYearTransactions)
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
		setLoading(true)
		getDashboard();
		setLoading(false)
	}, [])

	const convertTransactions = (newTransactions: Array<MappedTransactions>, transaction: StoreTransactions, index: number) => {

		switch (index) {
			case 0:
				newTransactions.push({ name: transaction.name, count: transaction.count, fill: colors.red })
				break;
			case 1:
				newTransactions.push({ name: transaction.name, count: transaction.count, fill: colors.blue })
				break;
			case 2:
				newTransactions.push({ name: transaction.name, count: transaction.count, fill: colors.green })
				break;
			case 3:
				newTransactions.push({ name: transaction.name, count: transaction.count, fill: colors.yellow })
				break;
			case 4:
				newTransactions.push({ name: transaction.name, count: transaction.count, fill: colors.purple })
				break;

		}

	}

	return (
		<>{
			loading &&
			<Loader />
		}
			<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-evenly",
						height: '100%',
					}}
				>
					<Box sx={{ width: "10%", display: "flex", flexWrap: "wrap" }}></Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-end",
							flexWrap: "wrap",
							width: "100%",
						}}
					>
						<Box
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "space-around",
								flexWrap: "wrap",
								mb: 6,
								mt: 12
							}}
						>
							<Box
								sx={{
									width: "100%",
									height: "50%",

								}}
							>
								<ExpensesByDay transactions={dailyTransactions} />
							</Box>
						</Box>

						<Box
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "space-evenly",
							}}
						>
							<Box sx={{ width: "50%", }}>
								<ExpensesByStore transactions={transactionsByStore} />
							</Box>
							<Box sx={{ width: "50%", m: 4 }}><ExpensesCountByMonths transactions={monthlyTransactions} /> </Box>
						</Box>
					</Box>

				</Box>
			</Slide>
		</>
	);
};

export default Dashboard;
