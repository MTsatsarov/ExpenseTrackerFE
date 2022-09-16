import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import Dashboard from "./Dashboard/Dashboard";
import ClientHistory from "./History/ClientHistory";
const ClientRoutes = () => {
	//var user = useAppSelector((state) => state.user);
	//return user.role === "CLIENT" ? (
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/history" element={<ClientHistory />} />
		</Routes>
	);

	//) : (
	//	""
	//);
};
export default ClientRoutes;
