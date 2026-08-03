import { useEffect, useState } from "react"
import getRoutes from "../utils/getRoutes"
import type { Route } from "../utils/types"
import RouteTile from "./RouteTile"

function TileContainer() {
    const [routes, setRoutes] = useState<Route[]>([])
    // const [boulders, setBoulders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                setRoutes(await getRoutes);
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

    return (
        <div
            className="grid grid-cols-3 ml-auto mr-auto w-fit"
            style={{}}>
            
            {routes.map((route) => (
                <RouteTile 
                key={route.id} 
                grade={route.decimalGrade} 
                color={route.color} date={route.setDate} 
                setter={""}
                location={"line " + route.wallNumber}>
                </RouteTile>
            ))}

        </div>
    )

}

export default TileContainer