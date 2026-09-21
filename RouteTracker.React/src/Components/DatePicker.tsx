type DatePickerProps = {
    value: string
    onChange: (value: string) => void
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
    return (
        <div className="bg-black/20 border-2 border-black/5 text-white h-10 rounded-md
        flex justify-center">
            <label className="pt-1.5 pl-1">Set on:</label>
            <input className="ml-2" type="date" value={value} onChange={(event) => onChange(event.target.value)}/>
        </div>
    )
}