import axios from 'axios';
import { useEffect, useState } from 'react';
import { IVehicleInfo } from '../../components/form/vehicle.interface';
import { Table } from '../../components/table/table';

const VehicleListPage = () => {
	const [vehicleList, setVehicleList] = useState<IVehicleInfo[]>([]);
	const [vehicleId,setVehicleId] = useState<number | null>();

	 //For Modal
	 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	 const showModal = (id:any) => {
		 setVehicleId(id)
		 setIsModalOpen(true);
	 };
 
	 const handleCancel = () => {
		 setIsModalOpen(false);
		 console.log('from header handleOk clicked')
	 };

	useEffect(() => {
		const fetchVehicleList = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vehicles`);
				console.log('response', response?.data);
				if (response?.data && response?.data?.length > 0) {
					setVehicleList(response?.data);
				}
			} catch (error) {
				console.log('Error', error);
			}
		};
		fetchVehicleList();
	}, [isModalOpen]);

	return (
		<div className=" text-black">
			<h2 className=" text-lg font-bold">List of vehicles</h2>

			{vehicleList && vehicleList.length > 0 ? <Table vehicleList={vehicleList} showModal={showModal} isModalOpen={isModalOpen} handleCancel={handleCancel} vehicleId={vehicleId}/> : <p>No data available!</p>}
		</div>
	);
};

export default VehicleListPage;
