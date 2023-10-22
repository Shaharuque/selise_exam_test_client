export interface IVehicleInfo {
	licenseNumber: string;
	vehicleType: 'microbus' | 'car' | 'truck';
	ownerName: string;
	ownerPhone: string;
	status: 'in' | 'out';
	ownerAddress: string;
	entryDateTime: Date;
	exitDateTime: Date;
	parkingCharge: number;
	id?: number;
}
