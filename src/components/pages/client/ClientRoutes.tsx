import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import OrganizationHistory from "./History/OrganizationHistory";
import OrganizationSettings from "./OrganizationSettings/OrganizationSettings";
import UserSettings from "./Settings/Settings";
const ClientRoutes = () => {
	//var user = useAppSelector((state) => state.user);
	//return user.role === "CLIENT" ? (
	return (
		<Routes>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/history" element={<OrganizationHistory />} />
			<Route path="/myOrganization" element={<OrganizationSettings />} />
			<Route path="/settings" element={<UserSettings />} />
		</Routes>
	);
};
export default ClientRoutes;
