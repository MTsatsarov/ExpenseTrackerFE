import {Box} from "@mui/system";
import LandingRoutes from "./landing/LandingRoutes";
const Landing = () => {
	return (
		<Box
			sx={{
				display: "flex",
				p: 0,
				m: 0,
				alignItems: "center",
				width: "100%",
				justifyContent: "space-evenly",
				flexWrap: "wrap",
			}}
		>
			<div style={{ minWidth: "50%", height: "1024px", display:"flex" }}>
				<LandingRoutes />
			</div>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					flexBasis: "50%",
					height: "1024px",
					m: 0,
					p: 0,
					background: "black",
				}}
			>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate,
				eveniet voluptas minima, molestiae ducimus quidem veritatis debitis
				placeat, deleniti aperiam amet id! Officiis nulla quidem ipsum fugit ex
				sequi perspiciatis.
			</Box>
		</Box>
	);
};

export default Landing;
