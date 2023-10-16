import { Outlet } from 'react-router-dom';
import SideNavbar from '../Sidebar/Sidebar';

const Layout = () => {
	return (
		<div className='relative flex overflow-hidden'>
			<div className='absolute top-0 left-0'>
				<SideNavbar />
			</div>
			<div className=' bg-gray-700'> {/* Adjust the 'pl-64' as needed to match the width of your sidebar */}
				<Outlet/>
			</div>
		</div>
	);
};

export default Layout;

