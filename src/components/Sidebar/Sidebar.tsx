import { useState } from 'react';
import SideBarMenus from './SidebarMenus/SidebarMenus';


const SideNavbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    

    return (
        <div>
            <div
                className={`${isExpanded ? 'w-[14vw]' : 'w-[5vw]'} h-[100vh] flex flex-col justify-between items-center gap-4] bg-[#f5f5f5] relative transition-all duration-300`}
                onMouseEnter={() => {
                    setIsExpanded(true);
                    localStorage.setItem('isExpanded', 'true');
                }}
                onMouseLeave={() => {
                    setIsExpanded(false);
                    localStorage.setItem('isExpanded', 'false');
                }}>
                <div>
                    <div>
                        <h1>Logo</h1>
                        <SideBarMenus isExpanded={isExpanded} />
                    </div>

                    <div className=' absolute bottom-2'>
                        <h1>Logout</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
