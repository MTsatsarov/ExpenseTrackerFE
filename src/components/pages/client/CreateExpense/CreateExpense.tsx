import { Modal, Box } from "@mui/material";

const CreateExpense = () => {
	return (
		<Modal
			open={true}
			aria-labelledby="parent-modal-title"
			aria-describedby="parent-modal-description"
			sx={{
				width:'50%',
				height:'50%',
				top: "50%",
				left: "50%",
				position: "absolute",
				background: "red",
				transform: "translate(-50% -50%)",
			}}
		>
			<Box></Box>
		</Modal>
	);
};
export default CreateExpense;
