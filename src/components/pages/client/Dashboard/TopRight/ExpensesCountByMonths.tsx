import { Typography } from "@mui/material";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, Line } from "recharts";
import { TransactonsByMonth } from "../Dashboard";

interface ExpensesCountByMonthsInterface {
transactions:Array<TransactonsByMonth>
}
const ExpensesCountByMonths = (props:ExpensesCountByMonthsInterface) => {


	return (
		<>
		<Typography sx={{textAlign:'center',mb:3}} variant="h5">Transactions for current year.</Typography>
		<LineChart width={730} height={250} data={props.transactions}
			margin={{ top: 5, right: 30, left:10, bottom: 5 }}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="sum" stroke="#8884d8" />
		</LineChart>
		</>
	)
};

export default ExpensesCountByMonths;
