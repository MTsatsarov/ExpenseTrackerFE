import { Box,Slide } from "@mui/material";
import ExpensesByStore from "./BottomLeft/ExpensesByStore";
import ExpensesByDay from "./TopLeft/ExpensesByDay";
import ExpensesCountByMonths from "./TopRight/ExpensesCountByMonths";

const Dashboard = () => {
	return (
		<Slide direction="left" in mountOnEnter unmountOnExit timeout={400} >
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					background: "#1C272C",
					height: '100%'

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
		</Slide>
	);
};

export default Dashboard;
