import { Routes,Route,Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Registration';
const LandingRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={ <Navigate replace to="/signIn" /> } />
			<Route path="/signIn" element={ <Login /> } />
			<Route path="/signUp" element={ <Register /> } />
		</Routes>
	)
}
export default LandingRoutes