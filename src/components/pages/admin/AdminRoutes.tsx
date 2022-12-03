import { Routes, Route } from "react-router-dom";
import AdminClients from "./Clients/AdminClients";

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/clients" element={<AdminClients />} />
		</Routes>
	);
};
export default AdminRoutes;
