import { useState } from "react"
import type { Color, DecimalGrade, DropdownOption, Setter } from "../utils/types"
import { createRoute } from "../utils/apiCalls"
import Dropdown from "./Dropdown"
import NavButton from "./NavButton"
import DatePicker from "./DatePicker"

type CreateProps = {
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
    onRouteCreated: () => Promise<void>
}

function CreateRoute(props: CreateProps) {

    const [selectedColor, setSelectedColor] = useState<string>("")
    const [selectedGrade, setSelectedGrade] = useState<string>("")
    const [selectedSetter, setSelectedSetter] = useState<string>("")
    const [wallNumber, setWallNumber] = useState<string>("")
    const [setDate, setSetDate] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const colorOptions: DropdownOption[] = props.colors.map((color) => ({
        value: color.id,
        label: (color as any).name ?? (color as any).colorName ?? (color as any).ColorName ?? String((color as any).id)
    }))
    const gradeOptions: DropdownOption[] = props.grades.map((grade) => ({
        value: grade.id,
        label: grade.gradeValue
    }))
    const setterOptions: DropdownOption[] = props.setters.map((setter) => ({
        value: setter.id,
        label: setter.name
    }))

    async function handleSave() {
        if (!wallNumber.trim() || !selectedColor || !selectedGrade || !selectedSetter || !setDate) {
            setError("Wall, color, grade, setter, and date are required")
            return
        }

        const parsedWallNumber = Number(wallNumber)
        if (!Number.isInteger(parsedWallNumber) || parsedWallNumber < 1 || parsedWallNumber > 52) {
            setError("Wall must be a number from 1 to 52")
            return
        }

        try {
            setError(null)
            await createRoute({
                wallNumber: parsedWallNumber,
                colorId: Number(selectedColor),
                decimalGradeId: Number(selectedGrade),
                setterId: Number(selectedSetter),
                setDate
            })
            await props.onRouteCreated()
        } catch (error) {
            setError(error instanceof Error ? error.message : "failed to create route")
        }
    }

    return (
        <>
           <div className="w-fit max-w-full bg-gray-800 rounded-md shadow-md ml-auto mr-auto mt-5 p-3">
                <div className="flex flex-wrap items-center justify-center gap-3">
                        <Dropdown value={selectedColor} onChange={setSelectedColor} options={colorOptions} placeholder="Color"></Dropdown>
                        <Dropdown value={selectedGrade} onChange={setSelectedGrade} options={gradeOptions} placeholder="Grade"></Dropdown>
                        <Dropdown value={selectedSetter} onChange={setSelectedSetter} options={setterOptions} placeholder="Setter"></Dropdown>
                        <DatePicker value={setDate} onChange={setSetDate}></DatePicker>
                    <div className="bg-black/20 border-2 border-black/5 text-white h-10 rounded-md flex justify-center">
                        <label htmlFor="wall-number" className="pt-1.5 pl-1 whitespace-nowrap">Wall#:</label>
                        <input
                            id="wall-number"
                            className="ml-2 w-10 bg-transparent text-white p-1"
                            type="number"
                            min="1"
                            max="52"
                            value={wallNumber}
                            onChange={(event) => setWallNumber(event.target.value)}
                        />
                    </div>
                    <NavButton text="Save" onClick={handleSave}></NavButton>
                </div>
            </div>
            {error ? <p className="pt-1 px-3 pb-2 text-sm text-red-400">{error}</p> : null}
        </>
    )
}

export default CreateRoute