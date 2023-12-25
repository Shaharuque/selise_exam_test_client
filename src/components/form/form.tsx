import { SubmitHandler, useForm } from 'react-hook-form';
import { IVehicleInfo } from './vehicle.interface';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { isParkingSlotAvailable } from '../../utils/overLapCheck';

const defaultValues: IVehicleInfo = {
	licenseNumber: '',
	vehicleType: 'microbus',
	ownerName: '',
	ownerPhone: '',
	status: 'in',
	ownerAddress: '',
	entryDateTime: new Date(),
	exitDateTime: '',
	parkingCharge: 0,
};

const Form = () => {
	const { handleSubmit, register, reset } = useForm<IVehicleInfo>({ defaultValues });
	const [vehicleList, setVehicleList] = useState<IVehicleInfo[]>([])

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
	}, []);

	console.log('vehicles list in form', vehicleList)


	const onSubmit: SubmitHandler<IVehicleInfo> = async (data) => {
		// const isAvailable = isParkingSlotAvailable(data?.entryDateTime, data?.exitDateTime, vehicleList);
		// console.log('isAvailable', isAvailable);
		// if(isAvailable){
		// 	try {
		// 		const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/vehicles`, data);
		// 		console.log('response', response);
		// 		if (response?.status === 201) {
		// 			toast.success("successfully filled up the form", {
		// 				position: "top-right",
		// 				autoClose: 5000,
		// 				hideProgressBar: false,
		// 				theme: "dark",
		// 				style: { fontSize: "15px" },
		// 			});
		// 			reset(defaultValues);
		// 		}
		// 	} catch (error) {
		// 		console.log('Error', error);
		// 	}
		// }else{
		// 	toast.error("Parking slot is not available", {
		// 		position: "top-right",
		// 		autoClose: 5000,
		// 		hideProgressBar: false,
		// 		theme: "dark",
		// 		style: { fontSize: "15px" },
		// 	});
		// }

		// try {
		// 	// Define your headers
		// 	const headers = {
		//         "Host": "misterloo.seliselocal.com"
		// 	};

		// 	const postData = {
		// 		grant_type: 'password_username',
		// 		username: 'zaberahmed',
		// 		password: '1234ABcd!!',
		// 	}

		// 	// Define the URL for your POST request
		// 	const url = 'http://127.0.0.1:5000/user/auth';

		// 	// Make a POST request with custom headers using Axios
		// 	const response = await axios.post(url, postData, { headers });

		// 	// Handle the response data
		// 	console.log(response.data);
		// 	localStorage.setItem('token', response.data.access_token);
		//   } catch (error) {
		// 	// Handle errors
		// 	console.error('Error:', error);
		//   }


		//   try {
		// 	// Define your headers
		// 	const headers = {
		//         "Host": "misterloo.seliselocal.com",
		// 		"Origin":"http://misterloo.seliselocal.com",
		// 		"Referer":"http://misterloo.seliselocal.com/login",
		// 		"Authorization": `Bearer ${localStorage.getItem('token')}`
		// 	};
		// 	// Define the URL for your POST request
		// 	const url = 'http://misterloo.seliselocal.com/api/identity/v20/identity/Authentication/GetLoggedInUser';

		// 	// Make a POST request with custom headers using Axios
		// 	const response = await axios.get(url, { headers });

		// 	// Handle the response data
		// 	console.log(response.data);
		//   } catch (error) {
		// 	// Handle errors
		// 	console.error('Error:', error);
		//   }


		//   

		try {
			const fileId = "4f23068f-cceb-43e7-b9ae-eb129fbe66d0"
			// const parsedUrl=await getImageUrl(fileId)
			// console.log(parsedUrl)
			const formData = {
				"fileId": fileId
			}
			// Define your headers
			const headers = {
				"token": `Bearer ${localStorage.getItem('token')}`,
				"Content-Type": "application/json",
				"Content-Length":"<calculated when request is sent>",
				"Host": "<calculated when request is sent>",
			};
			// Define the URL for your POST request
			const url = 'http://127.0.0.1:5000/storage/url/parser';

			// Make a POST request with custom headers using Axios
			const response = await axios.post(url,formData, { headers });

			// Handle the response data
			console.log(response.data);
		} catch (error) {
			// Handle errors
			console.error('Error:', error);
		}
	};

	return (
		<div className="container mx-auto mt-8">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
				<div className=" flex items-center  gap-10 mb-4">
					<div>
						<label
							htmlFor="licenseNumber"
							className="block text-gray-700 font-bold mb-2">
							License Number
						</label>
						<input
							required
							type="text"
							id="licenseNumber"
							{...register('licenseNumber')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="vehicleType"
							className="block text-gray-700 font-bold mb-2">
							Vehicle Type
						</label>
						<select
							required
							id="vehicleType"
							{...register('vehicleType')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
							<option value="microbus">Microbus</option>
							<option value="car">Car</option>
							<option value="truck">Truck</option>
						</select>
					</div>
				</div>
				<div className=" flex items-center gap-10 mb-4">
					<div>
						<label
							htmlFor="ownerName"
							className="block text-gray-700 font-bold mb-2">
							Owner Name
						</label>
						<input
							required
							type="text"
							id="ownerName"
							{...register('ownerName')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="ownerPhone"
							className="block text-gray-700 font-bold mb-2">
							Owner Phone
						</label>
						<input
							required
							type="text"
							id="ownerName"
							{...register('ownerPhone')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
				</div>

				<div className=" mb-4">
					<label
						htmlFor="ownerAddress"
						className="block text-gray-700 font-bold mb-2">
						Owner Address
					</label>
					<input
						required
						type="text"
						id="ownerAddress"
						{...register('ownerAddress')}
						className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
					/>
				</div>

				<div className="flex items-center gap-10 mb-4">
					<div>
						<label
							htmlFor="entryDateTime"
							className="block text-gray-700 font-bold mb-2">
							Entry Date and Time
						</label>
						<input
							required
							min={new Date().toISOString()}
							type="datetime-local"
							id="entryDateTime"
							{...register('entryDateTime')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="status"
							className="block text-gray-700 font-bold mb-2">
							Status
						</label>
						<select
							required
							id="status"
							{...register('status')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500">
							<option value="in">In</option>
							<option value="out">Out</option>
						</select>
					</div>
				</div>
				<div className="flex items-center gap-10 mb-4">
					<div>
						<label
							htmlFor="exitDateTime"
							className="block text-gray-700 font-bold mb-2">
							Exit Date and Time
						</label>
						<input
							// required
							// min={new Date().toISOString()}
							type="datetime-local"
							id="exitDateTime"
							{...register('exitDateTime')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="parkingCharge"
							className="block text-gray-700 font-bold mb-2">
							Parking Charge
						</label>
						<input
							required
							type="number"
							id="parkingCharge"
							{...register('parkingCharge')}
							className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
