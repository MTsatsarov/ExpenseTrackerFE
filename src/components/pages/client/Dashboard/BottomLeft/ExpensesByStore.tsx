import { Typography } from "@mui/material";
import { RadialBarChart, Tooltip, Legend, RadialBar } from "recharts";
import { StoreTransactions } from "../Dashboard";

interface ExpenseByStoreProps {
	transactions: Array<StoreTransactions>
}


const ExpensesByStore = (props: ExpenseByStoreProps) => {

	return (

		<>
			<Typography sx={{ textAlign: 'center', mb: 3 }} variant="h5">Most transactions by store</Typography>
			<RadialBarChart
				width={700}
				height={450}
				innerRadius="10%"
				outerRadius="%"
				data={props.transactions}
				startAngle={180}
				endAngle={0}
			>
				<RadialBar label={{ fill: '#666', position: 'insideStart' }} background dataKey='count' />
				<Legend iconSize={20} width={200} height={140} layout='vertical' verticalAlign='middle' align="right" />
				<Tooltip />
			</RadialBarChart>
		</>
	);
};

export default ExpensesByStore;
