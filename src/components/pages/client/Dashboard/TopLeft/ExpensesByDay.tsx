import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Box } from "@mui/material";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const ExpensesByDay = () => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
				padding: "0px",
				backgroundColor: "white",
			},
			title: {
				display: true,
				text: "Moqt test ",
			},
		},
	};

	const labels = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24",
		"25",
		"26",
		"27",
		"28",
		"29",
		"30",
		"31",
	];

	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
			},
		],
	};

	return (
		<Box>
			<Bar style={{ color: "white" }} options={options} data={data} />
		</Box>
	);
};

export default ExpensesByDay;
