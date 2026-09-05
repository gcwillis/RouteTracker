import { useState } from "react"
import type { Color, DecimalGrade, DropdownOption, Setter } from "../utils/types"
import Dropdown from "./Dropdown"
import NavButton from "./NavButton"

type CreateProps = {
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
}

function CreateRoute(props: CreateProps) {

    const [selectedColor, setSelectedColor] = useState<string>("")

    const colorOptions: DropdownOption[] = props.colors.map((color) => ({
        value: color.id,
        label: (color as any).name ?? (color as any).colorName ?? (color as any).ColorName ?? String((color as any).id)
    }))

    return (
        <>
           <div className="w-135 bg-gray-800 rounded-md shadow-md ml-60 mt-5">
                <div className="flex h-10">
                    <NavButton text="Back"></NavButton>
                        <div className="ml-2 w-150 flex justify-center gap-3">
                            <Dropdown value={selectedColor} onChange={setSelectedColor} options={colorOptions} placeholder="Color"></Dropdown>
                            <Dropdown options={[]} placeholder="Grade"></Dropdown>
                            <Dropdown options={[]} placeholder="Setter"></Dropdown>
                        </div>
                    <NavButton text="Save"></NavButton>
                </div>
            </div>
        </>
    )
}

export default CreateRoute