import { IconType } from 'react-icons';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BiSolidHome } from 'react-icons/bi';
import { FaShippingFast } from 'react-icons/fa';
import { LuTimer } from 'react-icons/lu';
import { MdOutlinePayment } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';

export type TMenuList = {
	link: string;
	icon: IconType;
	text: string;
};

export const menuList: TMenuList[] = [
	{ link: '/', icon: BiSolidHome, text: 'Home' },
	{ link: '/dashboard', icon: RxDashboard, text: 'Dashboard' },
	{ link: '/toss', icon: FaShippingFast, text: 'Toss' },
	{ link: '/tracking', icon: LuTimer, text: 'Tracking' },
	{ link: '/payment', icon: MdOutlinePayment, text: 'Payment' },
	{ link: '/block-chain', icon: AiOutlineFileDone, text: 'Blockchain Contacts' },
];
