import type { TileProps } from "../utils/types"

function RouteTile(props: TileProps) {
    return (
        <div className="mt-5 ml-5 box-border flex h-[5vw] w-[15vw] overflow-hidden rounded-2xl border-2 border-[#16171d] bg-gray-800 transition-colors hover:border-white">
            <div
                className="flex h-full w-[5vw] items-center justify-center rounded-r-2xl pt-1.5"
                style={{ backgroundColor: props.color }}
            >
                <h2 className="h-10 w-15 rounded-md bg-black/40 pt-1.5">{props.grade}</h2>
            </div>
            <div className="ml-3 pt-1.5 text-left text-white">
                <h3>Date - {props.date}</h3>
                <h3>Setter - {props.setter}</h3>
                <h3>Location - {props.location}</h3>
            </div>
        </div>
    )
}

export default RouteTile