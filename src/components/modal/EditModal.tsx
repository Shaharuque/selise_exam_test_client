import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import ModalBack from './modalBack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IVehicleInfo } from '../form/vehicle.interface';
import axios from 'axios';
import { toast } from 'react-toastify';


interface ModalInfoProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    id: number | null | undefined;
}

const defaultValues: IVehicleInfo = {
    licenseNumber: "",
    vehicleType: 'microbus',
    ownerName: '',
    ownerPhone: '',
    status: 'in',
    ownerAddress: '',
    entryDateTime: new Date(),
    exitDateTime: new Date(),
    parkingCharge: 0,
};


const EditModal: React.FC<ModalInfoProps> = ({ isModalOpen, handleCancel, id }) => {

    const { register, handleSubmit, reset } = useForm();
    const [vehicleData, setVehicleData] = useState<IVehicleInfo>();



    const onSubmit: SubmitHandler<IVehicleInfo> = async (data) => {
        console.log('data', data);
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/vehicles/${id}`, data);
            console.log('response', response);
            if (response?.status === 200) {
                handleCancel();
                toast.success("successfully deleted from cart", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    theme: "dark",
                    style: { fontSize: "15px" },
                  });
                reset(defaultValues);
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    useEffect(() => {
        const fetchVehicleList = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/vehicles/${id}`);
                console.log('response', response?.data);
                setVehicleData(response?.data);

            } catch (error) {
                console.log('Error', error);
            }
        }
        fetchVehicleList();
    }, [isModalOpen]);

    // Editable value
    useEffect(() => {
        // you can do async server request and fill up form
        setTimeout(() => {
            reset({
                licenseNumber: vehicleData?.licenseNumber,
                vehicleType: vehicleData?.vehicleType,
                ownerName: vehicleData?.ownerName,
                ownerPhone: vehicleData?.ownerPhone,
                status: vehicleData?.status,
                ownerAddress: vehicleData?.ownerAddress,
                entryDateTime: vehicleData?.entryDateTime,
                exitDateTime: vehicleData?.exitDateTime,
                parkingCharge: vehicleData?.parkingCharge,
            });
        }, 100);
    }, [reset, vehicleData?.licenseNumber]);

    console.log('vehicle data', vehicleData)


    return (
        <>
            <Modal footer={false}
                closable={false}
                open={isModalOpen}

                style={{ top: 20 }}>
                <ModalBack handleCancel={handleCancel}></ModalBack>

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
                                required
                                min={new Date().toISOString()}
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
            </Modal>
        </>
    );
};

export default EditModal;