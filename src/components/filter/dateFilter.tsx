type DateFilterProps = {
	onChange: (date: Date) => void;
};

const DateFilter = ({ onChange }: DateFilterProps) => {
	return (
		<div className="px-12 my-5">
			<div className="flex items-center gap-2">
				<label
					htmlFor="dateFilter"
					className="block text-gray-700 font-bold mb-2">
					Filter by date
				</label>
				<input
					required
					defaultValue={new Date().toISOString()}
					onChange={(e) => onChange(new Date(e.target.value))}
					type="date"
					id="dateFilter"
					className=" border p-2 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
		</div>
	);
};

export default DateFilter;
