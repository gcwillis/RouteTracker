import type { DropdownOption } from "../utils/types"

type DropdownProps = {
    label?: string
    name?: string
    value?: string
    options: DropdownOption[]
    placeholder?: string
    onChange?: (value: string) => void
    className?: string
}

function Dropdown({
    label,
    name,
    value = "",
    options,
    placeholder,
    onChange,
    className = ""
}: DropdownProps) {
    return (
        <label className={`flex flex-col gap-1 text-sm text-gray-200 ${className}`}>
            {label ? <span>{label}</span> : null}
            <select
                name={name}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                className="rounded-md border h-10 border-gray-800 bg-black/20 text-2xl text-white transition focus:border-blue-500"
            >
                {placeholder ? (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                ) : null}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default Dropdown
