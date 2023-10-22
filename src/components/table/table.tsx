import { useState } from 'react';
import { IVehicleInfo } from '../form/vehicle.interface';
import EditModal from '../modal/EditModal';
import moment from 'moment';

type TableProps = {
	vehicleList: IVehicleInfo[];
    vehicleId: number | null | undefined;
    isModalOpen: boolean;
    showModal: (id:any) => void;
    handleCancel: () => void;
};

export const Table = ({ vehicleList, vehicleId, isModalOpen,showModal ,handleCancel}: TableProps) => {
    
	console.log('vehicle list', vehicleList);
	
    // const handleEdit = (id:any) => {
    //     console.log('edit button clicked',id);
    // }

   

	return (
		<div className="mt-4 text-center">
			<table className="border-collapse mx-auto">
				<thead>
					<tr>
						<th className="px-4 py-2 border">Owner name</th>
						<th className="px-4 py-2 border">Vehicle type</th>
						<th className="px-4 py-2 border">License no</th>
						<th className="px-4 py-2 border">Entry time</th>
						<th className="px-4 py-2 border">Exit time</th>
						<th className="px-4 py-2 border">Status</th>
						<th className="px-4 py-2 border">Edit</th>
					</tr>
				</thead>
				<tbody>
					{vehicleList.map((entry, index) => (
						<tr
							key={index}
							className="odd:bg-slate-50">
							<td className="px-4 py-2 border">{entry.ownerName}</td>
							<td className="px-4 py-2 border">{entry.vehicleType}</td>
							<td className="px-4 py-2 border">{entry.licenseNumber}</td>
							<td className="px-4 py-2 border">{moment(entry.entryDateTime, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY hh:mm A")}</td>
							<td className="px-4 py-2 border">{moment(entry.exitDateTime, "YYYY-MM-DDTHH:mm").format("DD-MM-YYYY hh:mm A")}</td>
							<td className="px-4 py-2 border">{entry.status}</td>
							<td onClick={()=>showModal(entry?.id)} className="px-4 py-2 border cursor-pointer">button</td>
						</tr>
					))}
				</tbody>
			</table>

            {isModalOpen && <EditModal id={vehicleId} isModalOpen={isModalOpen} handleCancel={handleCancel} ></EditModal>}
		</div>
	);
};
