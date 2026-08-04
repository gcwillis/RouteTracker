import { useEffect, useState } from "react"
import { getColors, getRoutes, getDecimalGrades } from "../utils/apiCalls"
import type { Color, Route, DecimalGrade } from "../utils/types"
import RouteTile from "./RouteTile"

function TileContainer() {
    const [colors, setColors] = useState<Color[]>([])
    const [routes, setRoutes] = useState<Route[]>([])
    const [decimalGrades, setDecimalGrades] = useState<DecimalGrade[]>([])
    // const [boulders, setBoulders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                setRoutes(await getRoutes())
                setColors(await getColors())
                setDecimalGrades(await getDecimalGrades())
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("an error occurred")
                }
            } finally { setLoading(false)}
        }
        loadRoutes()
    }, []);

    if (loading) return<p>Loading</p>
    if (error) return <p>{error}</p>

    console.log(decimalGrades)

    return (
        <div
            className="grid grid-cols-1 ml-auto mr-auto w-fit"
            style={{}}>
            
            {routes.map((route) => (
                <RouteTile 
                key={route.id} 
                grade={decimalGrades[route.decimalGradeId].gradeValue} 
                color={colors[route.colorId].hexCode}
                date={route.setDate} 
                setter={""}
                location={"line " + route.wallNumber}>
                </RouteTile>
            ))}

        </div>
    )

}

export default TileContainer