import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<nav className="bg-gray-800 p-4 h-15">
				<div className="container mx-auto flex justify-end items-center">
					<ul className="flex space-x-4">
						<Link to="/">
							<li className="text-white">Home</li>
						</Link>
						<Link to="/vehicles">
							<li className="text-white">Vehicles</li>
						</Link>
						<Link to="/dashboard">
							<li className="text-white">Dashboard</li>
						</Link>
					</ul>
				</div>
			</nav>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Navbar;
