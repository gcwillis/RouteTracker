import type { Color, Route, DecimalGrade, Setter } from "../utils/types"
import RouteTile from "./RouteTile"

type TileContainerProps = {
    routes: Route[]
    colors: Color[]
    grades: DecimalGrade[]
    setters: Setter[]
}

function TileContainer(props: TileContainerProps) {
    return (
        <div
            className="grid grid-cols-1 ml-auto mr-auto w-fit"
            style={{}}>
            
            {props.routes.map((route) => (
                <RouteTile 
                key={route.id} 
                grade={props.grades[route.decimalGradeId].gradeValue} 
                color={props.colors[route.colorId].hexCode}
                date={route.setDate} 
                setter={props.setters[route.setterId].name}
                location={"line " + route.wallNumber}>
                </RouteTile>
            ))}

        </div>
    )

}

export default TileContainer