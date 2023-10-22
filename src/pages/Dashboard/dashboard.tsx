import axios from 'axios';
import { useState, useEffect } from 'react';
import DateFilter from '../../components/filter/dateFilter';
import { IVehicleInfo } from '../../components/form/vehicle.interface';

type parkedVehicleType = {
	cars: number;
	microbuses: number;
	trucks: number;
};

const DashboardPage = () => {
	const [vehicleList, setVehicleList] = useState<IVehicleInfo[]>([]);
	const [parkedVehicles, setParkedVehicles] = useState<parkedVehicleType>({ cars: 0, microbuses: 0, trucks: 0 });
	const [vehiclesParkedLonger, setVehiclesParkedLonger] = useState<IVehicleInfo[]>([]);
	const [filterDate, setFilterDate] = useState(new Date());

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

	useEffect(() => {
		const parkedToday = vehicleList.filter((vehicle: IVehicleInfo) => filterDate >= new Date(vehicle?.entryDateTime) && filterDate <= new Date(vehicle?.exitDateTime));

		const parkedCars = parkedToday.filter((vehicle: IVehicleInfo) => vehicle.vehicleType === 'car');
		const parkedMicrobuses = parkedToday.filter((vehicle: IVehicleInfo) => vehicle.vehicleType === 'microbus');
		const parkedTrucks = parkedToday.filter((vehicle: IVehicleInfo) => vehicle.vehicleType === 'truck');

		const parkedVehicles = { cars: parkedCars.length, microbuses: parkedMicrobuses.length, trucks: parkedTrucks.length };
		setParkedVehicles(parkedVehicles);
		const parkedLonger = vehicleList.filter((vehicle: IVehicleInfo) => {
			const entryTime = new Date(vehicle.entryDateTime).getTime();
			const exitTime = new Date(vehicle.exitDateTime).getTime();
			const duration = (exitTime - entryTime) / (1000 * 60 * 60);
			return duration > 1;
		});
		setVehiclesParkedLonger(parkedLonger);
	}, [vehicleList, filterDate]);

	const handleDateFilter = (date: Date) => {
		setFilterDate(date);
	};

	return (
		<div className=" text-black">
			<div className=" flex">
				<div>
					<DateFilter onChange={handleDateFilter} />
				</div>
				<div>
					<div>Total parked vehicles: {parkedVehicles.cars + parkedVehicles.microbuses + parkedVehicles.trucks}</div>
					<div>Total parked cars: {parkedVehicles.cars}</div>
					<div>Total parked microbuses: {parkedVehicles.microbuses}</div>
					<div>Total parked trucks: {parkedVehicles.trucks}</div>
				</div>
				<div>
					{vehiclesParkedLonger.length > 0 &&
						vehiclesParkedLonger?.map((vehicle: IVehicleInfo) => (
							<div>
								<p>{vehicle?.licenseNumber}</p>
								<p>{vehicle?.vehicleType}</p>
								<p>{new Date(vehicle?.entryDateTime).toDateString()}</p>
								<p>{new Date(vehicle?.exitDateTime).toDateString()}</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;
