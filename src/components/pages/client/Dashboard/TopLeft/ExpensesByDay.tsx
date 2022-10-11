import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box,Typography } from "@mui/material";
import { DailyTransactions } from '../Dashboard';

interface ExpenseByDayProps{
transactions: Array<DailyTransactions>
}
const ExpensesByDay = (props:ExpenseByDayProps) => {

	return (
		<Box sx={{ pt: 5,maxWidth:'1200px' }}>
			<Typography sx={{ textAlign: 'center', mb: 3 }} variant="h5">Daily transactions for current month</Typography>
			<BarChart
				width={1200}
				height={300}
				data={props.transactions}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="sum" fill="#8884d8" />
			</BarChart>
			{/*</ResponsiveContainer>*/}
		</Box>
	);
};

export default ExpensesByDay;


