import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import Dashboard from "./Dashboard/Dashboard";
const ClientRoutes = () => {
	//var user = useAppSelector((state) => state.user);
	//return user.role === "CLIENT" ? (
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);

	//) : (
	//	""
	//);
};
export default ClientRoutes;
