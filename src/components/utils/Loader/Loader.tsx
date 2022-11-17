import PropagateLoader from "react-spinners/PropagateLoader";
import { Modal, Box } from "@mui/material";
import { useState } from "react";
const Loader = () => {
	return (
		<Modal open={true} sx={{ width: '100%', height: '100%', position: 'absolute' }}>
			<Box sx={{
				alignItems: "center",
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}>
				<PropagateLoader
					color="#2196F3"
					cssOverride={{ margin: '25% auto' }}
					size={15}
					speedMultiplier={1.2}

				/>
			</Box>
		</Modal>
	)
}

export default Loader