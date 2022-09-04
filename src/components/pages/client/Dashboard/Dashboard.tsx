import { Box } from "@mui/material";

const Dashboard = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				background: "red",
			}}
		>
			<Box sx={{ display: "flex", height: "528px" }}>
				<Box sx={{ width: "50%" }}>Budget</Box>
				<Box sx={{ width: "50%" }}>Expenses</Box>
			</Box>

			<Box sx={{ display: "flex" }}>
				<Box sx={{ width: "50%" }}>neshto si</Box>
				<Box sx={{ width: "50%" }}>neshto si 2 </Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
