import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { IVehicleInfo } from '../../components/form/vehicle.interface';

type parkedVehicleType = {
	cars: number;
	microbuses: number;
	trucks: number;
};

const DashboardPage = () => {
	const [vehicleList, setVehicleList] = useState<IVehicleInfo[]>([]);
	const [dateWiseData, setDateWiseData] = useState<IVehicleInfo[]>([]);
	const [vehicleTypeCounts, setVehicleTypeCounts] = useState({} as any);
	const [parkedLonger, setParkedLonger] = useState<IVehicleInfo[]>([]);

	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

	const handleDateChange = (e: any) => {
		setSelectedDate(e.target.value);
	};


	useEffect(() => {
		const filteredData = vehicleList.filter(vehicle => {
			const entryDate = vehicle.entryDateTime?.split('T')[0];
			return entryDate === selectedDate && vehicle.status === 'in';
		});
		setDateWiseData(filteredData);

		// Calculate the count of each vehicleType
		const vehicleTypeCounts = filteredData.reduce((counts, vehicle) => {
			const vehicleType = vehicle.vehicleType;
			counts[vehicleType] = (counts[vehicleType] || 0) + 1;
			return counts;
		}, {});

		setVehicleTypeCounts(vehicleTypeCounts);


		// Find vehicles parked for more than 2 hours on the selected date
		const vehiclesParkedForMoreThan2Hours = filteredData.filter(vehicle => {
			const entryTime = new Date(vehicle.entryDateTime);
			const exitTime = new Date(vehicle.exitDateTime);
			const timeDifferenceInHours = (exitTime - entryTime) / (1000 * 60 * 60); // Convert milliseconds to hours

			return timeDifferenceInHours > 2;
		});

		console.log('parked more then 2 hours', vehiclesParkedForMoreThan2Hours);
		setParkedLonger(vehiclesParkedForMoreThan2Hours)
	}, [selectedDate, vehicleList]);

	console.log('selected date', selectedDate)
	console.log('filteredData', dateWiseData)
	console.log('vehicleTypeCounts', vehicleTypeCounts)

	useEffect(() => {
		const fetchVehicleList = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vehicles`);
				if (response?.data && response?.data.length > 0) {
					setVehicleList(response?.data);
				}
			} catch (error) {
				console.log('Error', error);
			}
		};
		fetchVehicleList();
	}, []);


	return (
		<div className=" text-black p-4">
			<div >
				<div className="px-12 my-5">
					<div className="flex items-center gap-2">
						<label
							htmlFor="dateFilter"
							className="block text-gray-700 font-bold mb-2"
						>
							Filter by date
						</label>
						<input
							required
							value={selectedDate}
							onChange={handleDateChange}
							type="date"
							id="dateFilter"
							className="border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
				</div>
				<div>
					<div className='flex items-center gap-2 '>Total parked cars: <p className='font-bold'>{dateWiseData?.length}</p></div>
					<div className='flex items-center gap-2 '>Total empty slots: <p className='font-bold'>{10 - dateWiseData?.length}</p></div>
					<div className='flex items-center gap-2 '>Total parked Microbus: <p className='font-bold'>{vehicleTypeCounts?.microbus || 0}</p></div>
					<div className='flex items-center gap-2 '>Total parked Car: <p className='font-bold'>{vehicleTypeCounts?.car || 0}</p></div>
					<div className='flex items-center gap-2 '>Total parked Truck: <p className='font-bold'>{vehicleTypeCounts?.truck || 0}</p></div>
				</div>

				{/* Card To Show Which Are parked more then 2 hours */}
				{
					parkedLonger && parkedLonger.length > 0 ? <div className='mt-5 flex flex-col items-center'>
						<h1 className='font-bold text-center'>Vehicles list parked for more than 2 hours</h1>
						{
							parkedLonger?.map((vehicle: IVehicleInfo, index: number) => {
								return (
									<div key={index} className='gap-2 mt-5 border bg-gray-200 p-2 w-[50%]'><p>License No: {vehicle?.licenseNumber}</p>
										<p>Owner Name: {vehicle?.ownerName}</p>
										<p>Status: {vehicle?.status?.toUpperCase()}</p>
										<p>Vahicle Type: {vehicle?.vehicleType?.toUpperCase()}</p>
										<p>Entry Time: {moment(vehicle?.entryDateTime, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY hh:mm A")}</p>
										<p>Exit time: {vehicle?.exitDateTime ? moment(vehicle?.exitDateTime, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY hh:mm A") : 'Not Exit Yet'}</p>
									</div>
								)
							})
						}
					</div> : <div className='flex flex-col gap-2 mt-5'>
						<p className='font-bold text-lg text-center'>No Vehicle parked more then 2 hours</p>
					</div>
				}
			</div>
		</div>
	);
};

export default DashboardPage;
