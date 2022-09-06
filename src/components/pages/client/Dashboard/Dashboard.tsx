import { Box } from "@mui/material";
import ExpensesByStore from "./BottomLeft/ExpensesByStore";
import ExpensesByDay from "./TopLeft/ExpensesByDay";
import ExpensesCountByMonths from "./TopRight/ExpensesCountByMonths";

const Dashboard = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				background: "#1C272C",
				alignItems: "flex-end",
				justifyContent: "space-evenly",
				height: "100%",
				p: 5,
			}}
		>
			<Box
				sx={{
					display: "flex",
					height: "100%",
					width: "90%",
					justifyContent:"space-around",
					mb:15
				}}
			>
				<Box sx={{ width: "49%", height: "50%" }}>
					<ExpensesByDay />
				</Box>
				<Box sx={{ width: "49%", height: "50%" }}>
					<ExpensesCountByMonths />
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					height: "100%",
					width: "90%",
					justifyContent: "space-evenly",
				}}
			>
				<Box sx={{ width: "50%", height: "50%" }}>
					<ExpensesByStore />
				</Box>
				<Box sx={{ width: "50%", height: "50%" }}>neshto si 2 </Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
