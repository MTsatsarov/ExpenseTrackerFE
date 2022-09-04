import { Routes,Route,Navigate } from 'react-router-dom';
import Login from './Login';
const LandingRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={ <Navigate replace to="/signIn" /> } />
			<Route path="/signIn" element={ <Login /> } />
		</Routes>
	)
}
export default LandingRoutes