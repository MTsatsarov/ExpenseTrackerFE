import { Box } from "@mui/material";
import ExpensesByStore from "./BottomLeft/ExpensesByStore";
import ExpensesByDay from "./TopLeft/ExpensesByDay";
import ExpensesCountByMonths from "./TopRight/ExpensesCountByMonths";

const Dashboard = () => {
	return (
		<Box
			sx={{
				display: "flex",
				background: "#1C272C",
				justifyContent: "space-evenly",
				width: "100%",
				height: "100%",
			}}
		>
			<Box sx={{ width: "10%", display: "flex", flexWrap: "wrap" }}></Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					background: "#1C272C",
					alignItems: "flex-end",
					flexWrap: "wrap",
					width: "80%",
				}}
			>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						justifyContent: "space-around",
						flexWrap: "wrap",
						mb: 12,
					}}
				>
					<Box
						sx={{
							width: "49%",
							height: "50%",
						}}
					>
						<ExpensesByDay />
					</Box>
					<Box sx={{ width: "49%", height: "50%" }}>
						<ExpensesCountByMonths />
					</Box>
				</Box>

				<Box
					sx={{
						display: "flex",
						width: "100%",
						justifyContent: "space-evenly",
					}}
				>
					<Box sx={{ width: "50%", height: "50%" }}>
						<ExpensesByStore />
					</Box>
					<Box sx={{ width: "50%", height: "50%" }}>neshto si 2 </Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
