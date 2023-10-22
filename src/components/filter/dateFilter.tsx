type DateFilterProps = {
	onChange: (date: Date) => void;
};

const DateFilter = ({ onChange }: DateFilterProps) => {
	return (
		<>
			<label
				htmlFor="dateFilter"
				className="block text-gray-700 font-bold mb-2">
				Filter by date
			</label>
			<input
				required
				defaultValue={new Date().toISOString()}
				onChange={(e) => onChange(new Date(e.target.value))}
				type="datetime-local"
				id="dateFilter"
				className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
			/>
		</>
	);
};

export default DateFilter;
