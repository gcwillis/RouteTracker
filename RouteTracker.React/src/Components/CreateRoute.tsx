import type { Color, DecimalGrade, DropdownOption, Setter } from "../utils/types"
import Dropdown from "./Dropdown"
import NavButton from "./NavButton"

type CreateProps = {
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
}

function CreateRoute(props: CreateProps) {

    const colorOptions: DropdownOption[] = props.colors.map((color) => ({
        value: color.id,
        label: color.name
    }))

    return (
        <>
           <div className="w-135 bg-gray-800 rounded-md shadow-md ml-60 mt-5">
                <div className="flex h-10">
                    <NavButton text="Back"></NavButton>
                        <div className="ml-2 w-150 flex justify-center gap-3">
                            <Dropdown options={colorOptions} placeholder="Color"></Dropdown>
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