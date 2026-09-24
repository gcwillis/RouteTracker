import type { Color, Route, DecimalGrade, Setter } from "../utils/types"
import RouteTile from "./RouteTile"

type TileContainerProps = {
    routes: Route[]
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
    onRouteChanged: () => Promise<void>
}

function TileContainer(props: TileContainerProps) {
    return (
        <div
            className="grid grid-cols-1 ml-auto mr-auto w-fit"
            style={{}}>
            
            {props.routes.map((route) => {
                const color = props.colors.find((item) => item.id === route.colorId)
                const grade = props.grades.find((item) => item.id === route.decimalGradeId)
                const setter = props.setters.find((item) => item.id === route.setterId)

                return (
                    <RouteTile
                        key={route.id}
                        grade={grade?.gradeValue ?? "Unknown"}
                        color={color?.hexCode ?? "transparent"}
                        date={route.setDate}
                        setter={setter?.name ?? "Unknown"}
                        location={"line " + route.wallNumber}
                        id={route.id}
                        wallNumber={route.wallNumber}
                        colorId={route.colorId}
                        decimalGradeId={route.decimalGradeId}
                        setterId={route.setterId}
                        colors={props.colors}
                        grades={props.grades}
                        setters={props.setters}
                        onRouteChanged={props.onRouteChanged}>
                    </RouteTile>
                )
            })}

        </div>
    )

}

export default TileContainer