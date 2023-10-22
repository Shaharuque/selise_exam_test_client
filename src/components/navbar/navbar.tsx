import { Outlet } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<nav className="bg-gray-800 p-4 h-15">
				<div className="container mx-auto flex justify-end items-center">
					<ul className="flex space-x-4">
						<a href="/">
							<li className="text-white">Home</li>
						</a>
						<a href="/vehicles">
							<li className="text-white">Vehicles</li>
						</a>
						<a href="/dashboard">
							<li className="text-white">Dashboard</li>
						</a>
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
