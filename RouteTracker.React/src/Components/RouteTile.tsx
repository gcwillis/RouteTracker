import type { TileProps } from "../utils/types"

function RouteTile(props: TileProps) {
    return (
        <div 
            className="mt-5 ml-5 box-border flex h-10 w-fit overflow-hidden rounded-md select-none shadow-md shadow-black/20
            border-2 border-black/20 bg-gray-800 transition-colors hover:border-blue-900 active:border-white">
            <div
                className="flex h-full w-[5vw] items-center justify-center rounded-r-sm pt-1.5"
                style={{ backgroundColor: props.color }}
            >
                <h2 className="h-10 w-15 rounded-md bg-black/40 pt-1.5">{props.grade}</h2>
            </div>
            <div className="ml-3 flex gap-4 text-left text-white">
                <h3 className="bg-black/20 rounded-sm p-1.5"><b>Location</b> - {props.location}</h3>
                <h3 className="bg-black/20 rounded-sm p-1.5"><b>Set by</b> - {props.setter}</h3>
                <h3 className="bg-black/20 rounded-sm p-1.5"><b>Set on</b> - {props.date}</h3>
            </div>
        </div>
    )
}

export default RouteTile