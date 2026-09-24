import { useState } from "react"
import type { Color, DecimalGrade, Setter, TileProps } from "../utils/types"
import { deleteRoute, updateRoute } from "../utils/apiCalls"
import Dropdown from "./Dropdown"
import DatePicker from "./DatePicker"

type RouteTileProps = TileProps & {
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
    onRouteChanged: () => Promise<void>
}

function RouteTile(props: RouteTileProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [wallNumber, setWallNumber] = useState(String(props.wallNumber))
    const [selectedColor, setSelectedColor] = useState(String(props.colorId))
    const [selectedGrade, setSelectedGrade] = useState(String(props.decimalGradeId))
    const [selectedSetter, setSelectedSetter] = useState(String(props.setterId))
    const [setDate, setSetDate] = useState(props.date)
    const [error, setError] = useState<string | null>(null)

    const colorOptions = props.colors.map((color) => ({ value: color.id, label: color.colorName }))
    const gradeOptions = props.grades.map((grade) => ({ value: grade.id, label: grade.gradeValue }))
    const setterOptions = props.setters.map((setter) => ({ value: setter.id, label: setter.name }))

    async function handleDelete() {
        if (!window.confirm("Delete this route?")) return

        try {
            setIsOpen(false)
            setError(null)
            await deleteRoute(props.id)
            await props.onRouteChanged()
        } catch (error) {
            setError(error instanceof Error ? error.message : "failed to delete route")
        }
    }

    async function handleUpdate() {
        const parsedWallNumber = Number(wallNumber)
        if (!Number.isInteger(parsedWallNumber) || parsedWallNumber < 1 || parsedWallNumber > 52 || !selectedColor || !selectedGrade || !selectedSetter || !setDate) {
            setError("Wall, color, grade, setter, and date are required")
            return
        }

        try {
            setError(null)
            await updateRoute(props.id, {
                wallNumber: parsedWallNumber,
                colorId: Number(selectedColor),
                decimalGradeId: Number(selectedGrade),
                setterId: Number(selectedSetter),
                setDate
            })
            setIsEditing(false)
            await props.onRouteChanged()
        } catch (error) {
            setError(error instanceof Error ? error.message : "failed to update route")
        }
    }

    return (
        <div className={`relative mt-5 ml-5 w-150 max-w-[calc(100vw-2rem)] ${isOpen || isEditing ? "z-50" : "z-0"}`}>
        <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="box-border flex h-10 w-full overflow-hidden rounded-md select-none border-2 border-black/20 bg-gray-800 text-left shadow-md shadow-black/20 transition-colors hover:border-blue-900 active:border-white">
            <div
                className="flex h-full w-[5vw] items-center justify-center rounded-r-sm pt-1.5"
                style={{ backgroundColor: props.color }}
            >
                <h2 className="flex h-10 w-15 items-center justify-center rounded-md bg-black/40">{props.grade}</h2>
            </div>
            <div className="ml-3 flex gap-4 text-left text-white">
                <h3 className="bg-black/20 w-40 rounded-sm p-1.5"><b>Location</b> - {props.location}</h3>
                <h3 className="bg-black/20 w-40 rounded-sm p-1.5"><b>Set by</b> - {props.setter}</h3>
                <h3 className="bg-black/20 w-40 rounded-sm p-1.5"><b>Set on</b> - {props.date}</h3>
            </div>
        </button>
        {isOpen ? (
            <div className="absolute left-full top-0 z-50 ml-2 min-w-max rounded-md border border-black/20 bg-gray-900 text-left text-white shadow-lg">
                <div className="flex gap-2">
                    <button type="button" onClick={() => { setIsEditing(true); setIsOpen(false) }} className="rounded-md bg-blue-700/70 px-3 hover:bg-blue-700">Edit</button>
                    <button type="button" onClick={handleDelete} className="rounded-md bg-red-700/70 px-3 py-2 hover:bg-red-700">Delete</button>
                </div>
            </div>
        ) : null}
        {isEditing ? (
            <div className="relative left-1/2 mt-2 w-max max-w-none -translate-x-1/2 rounded-md border border-gray-700 bg-gray-900 p-3 text-left text-white">
                <div className="flex flex-nowrap items-center gap-3">
                    <Dropdown value={selectedColor} onChange={setSelectedColor} options={colorOptions} placeholder="Color" />
                    <Dropdown value={selectedGrade} onChange={setSelectedGrade} options={gradeOptions} placeholder="Grade" />
                    <Dropdown value={selectedSetter} onChange={setSelectedSetter} options={setterOptions} placeholder="Setter" />
                    <DatePicker value={setDate} onChange={setSetDate} />
                    <label className="flex h-10 items-center rounded-md border-2 border-black/5 bg-black/20 px-1 text-sm">
                        Wall#:
                        <input className="ml-2 w-10 bg-transparent p-1" type="number" min="1" max="52" value={wallNumber} onChange={(event) => setWallNumber(event.target.value)} />
                    </label>
                    <button type="button" onClick={handleUpdate} className="h-10 rounded-md bg-blue-800 px-3 hover:bg-blue-700">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="h-10 rounded-md bg-gray-700 px-3 hover:bg-gray-600">Cancel</button>
                </div>
                {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
            </div>
        ) : null}
        </div>
    )
}

export default RouteTile