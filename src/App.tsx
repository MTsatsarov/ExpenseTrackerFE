import './App.css';
import { Routes,Route} from 'react-router-dom';
import Landing from './components/Landing';
function App() {
  return (
    <div className="App">
     <Routes>
				{/*<Route path="/portal/user/*" element={ <ClientPortal /> } />*/}
				<Route path="/*" element={ <Landing /> } />
			</Routes>
    </div>
  );
}

export default App;
