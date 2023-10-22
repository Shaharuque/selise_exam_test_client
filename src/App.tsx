import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/home';
import Navbar from './components/navbar/navbar';
import DashboardPage from './pages/Dashboard/dashboard';
import VehicleListPage from './pages/List/vehicleList';

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<Navbar />}>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/vehicles"
						element={<VehicleListPage />}
					/>
					<Route
						path="/dashboard"
						element={<DashboardPage />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
