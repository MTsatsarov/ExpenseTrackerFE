import { Box, Modal, Slide } from "@mui/material";
import ExpensesByStore from "./BottomLeft/ExpensesByStore";
import ExpensesByDay from "./TopLeft/ExpensesByDay";
import ExpensesCountByMonths from "./TopRight/ExpensesCountByMonths";
import instance from "../../../../axios/axios";
import { apiUrl, apiRoutes } from "../../../../apiConfig";
import Toaster from "../../../utils/Toaster/Toaster";
import { useState, useEffect } from "react";
import Loader from "../../../utils/Loader/Loader";
import styles from "./Dashboard.module.css"
import TransactionHistoryBox from "../../../utils/TrsansactionHistoryBox/TransactionHistoryBox";
import { ITransactionHistoryModel } from "../History/OrganizationHistory";
import { useAppSelector } from "../../../../app/hooks";
import CloseIcon from "@mui/icons-material/Close";

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
	const [showDailyTransactionModal, setShowDailyTransactionModal] = useState<boolean>(false);
	const [dailyTransactionsHistory, setDailyTransactionsHistory] = useState<Array<ITransactionHistoryModel>>([]);
	const [count, setCount] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [day, setDay] = useState<string>('')
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)
	const [selectedRow, SetSelectedRow] = useState<any>({})
	let mode = useAppSelector(store => store.user.themeMode)
	useEffect(() => {
		const getDashboard = async () => {

			await instance.get(`${apiUrl}/${apiRoutes.getDashboard}`).then((response) => {
				var data = response.data
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

	const getTransactionWrapper = (e: any) => {
		setDay(e);
		currentDateTransactions(e, page, rowsPerPage)
	}
	const currentDateTransactions = async (e: any, page: number, itemsPerPage: number) => {
		await instance.get(`${apiUrl}/${apiRoutes.getTransactions}?page=${page}&itemsPerPage=${itemsPerPage}&day=${e.name}`).then((response) => {
			setShowDailyTransactionModal(true);
			setCount(response.data.count)
			setDailyTransactionsHistory(response.data.transactions)

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

	const handleChangeRowsPerPage = async (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value,));
		await currentDateTransactions(day, page, parseInt(event.target.value,))
		setPage(1);
	};

	const handleChangePage = async (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage + 1);
		await currentDateTransactions(day, newPage + 1, rowsPerPage)
	};

	const toggleMenu = (event: any, data: any) => {
		setDisplayMenu(!displayMenu)
		SetSelectedRow(data)

	}

	const toggleDetails = () => {
		setDisplayMenu(!displayMenu)
	}

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

	const handleClose = () => {
		setDisplayMenu(!displayMenu)
	};
	return (
		<>{
			loading &&
			<Loader />
		}
			<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
				<Box className={styles.box}
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
								<ExpensesByDay onClick={getTransactionWrapper} transactions={dailyTransactions} />
							</Box>
						</Box>

						<Box className={styles.box}
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "space-evenly",
							}}
						>
							<Box sx={{ width: "50%", p: 0 }}>
								<ExpensesByStore transactions={transactionsByStore} />
							</Box>
							<Box sx={{ width: "50%", m: 4 }}><ExpensesCountByMonths transactions={monthlyTransactions} /> </Box>
						</Box>
					</Box>
					{
						showDailyTransactionModal &&
						<Modal
							open={true}
							onClose={() => setShowDailyTransactionModal(false)}
							sx={{
								position: "absolute",
								width: "100%",
								height: "100%",
							}}>
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
									onClick={() => setShowDailyTransactionModal(false)}
								>
									<CloseIcon />
								</Box>
								<TransactionHistoryBox
									handleChangeRowsPerPage={handleChangeRowsPerPage}
									page={page}
									count={count}
									rowsPerPage={rowsPerPage}
									loading={loading}
									displayMenu={displayMenu}
									transactions={dailyTransactionsHistory}
									handleChangePage={handleChangePage}
									toggleMenu={toggleMenu}
									toggleDetails={toggleDetails}
									handleClose={handleClose}
									selectedRow={selectedRow}
								/>
							</Box>
						</Modal>
					}
				</Box>

			</Slide>
		</>
	);
};

export default Dashboard;
