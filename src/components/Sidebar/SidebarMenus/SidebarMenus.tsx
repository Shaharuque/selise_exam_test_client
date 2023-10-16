import { Link, useLocation } from 'react-router-dom';
import { TMenuList, menuList } from './MenuList';

const SideBarMenus = ({ isExpanded }: { isExpanded: boolean }) => {
    const location = useLocation();
    const boxStyles = {
        boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.3rem',
        padding: '5px',
        backgroundColor: '',
        transition: 'transform 0.3s ease',
    };

    const isLinkActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div
            className='flex flex-col items-center gap-4 p-4 '>
            {menuList?.map((menu: TMenuList, index: number) => (
                <div
                    className={`${isExpanded ? 'w-[10vw]' : 'w-[2vw]'} text-black ${isLinkActive(menu?.link) ? 'bg-[#3a9ba5] text-white' : ' text-[20px]'} mt-[20px]`}
                    key={index}
                    style={boxStyles}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
                    <Link to={menu.link}>
                        <div
                            className={`${isExpanded ? 'flex justify-start' : 'flex justify-center'} `}>
                            <div
                                className={`${isLinkActive(menu?.link) ? 'white' : 'black'} `}
                            />
                            {isExpanded ? (
                                <h1
                                    className={`text-[16px] font-bold ${isLinkActive(menu?.link) ? 'white' : 'black'} flex items-center`}>
                                    {menu.text}{<menu.icon className='ml-2'></menu.icon>}
                                </h1>
                            ) : <menu.icon className='text-[20px]'></menu.icon>}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SideBarMenus;
