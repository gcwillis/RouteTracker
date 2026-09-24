import TileContainer from "../Components/TileContainer"
import NavBar from "../Components/NavBar"
import CreateRoute from "../Components/CreateRoute"
import { useEffect, useState } from "react"
import type { Color, DecimalGrade, Route, Setter } from "../utils/types"
import { getColors, getDecimalGrades, getRoutes, getSetters } from "../utils/apiCalls"

function HomePage() {

    const [colors, setColors] = useState<Color[]>([])
    const [routes, setRoutes] = useState<Route[]>([])
    const [decimalGrades, setDecimalGrades] = useState<DecimalGrade[]>([])
    const [setters, setSetters] = useState<Setter[]>([])
    const [isCreateRouteOpen, setIsCreateRouteOpen] = useState(false)
    // const [boulders, setBoulders] = useState([])
    // const [vermGrades, setVermGrades] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadRoutes = async () => {
            try {
                setRoutes(await getRoutes())
                setColors(await getColors())
                setDecimalGrades(await getDecimalGrades())
                setSetters(await getSetters())
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("an error occurred")
                }
            } finally { setLoading(false) }
        }
        loadRoutes()
    }, []);

    async function handleRouteCreated() {
        setIsCreateRouteOpen(false)
        try {
            setRoutes(await getRoutes())
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("an error occurred")
            }
        }
    }

    if (loading) return<p>Loading</p>
    if (error) return <p>{error}</p>

    return (
        <>
            <NavBar
                isCreateRouteOpen={isCreateRouteOpen}
                onToggleCreateRoute={() => setIsCreateRouteOpen((isOpen) => !isOpen)}
            ></NavBar>
            {isCreateRouteOpen ? (
                <CreateRoute
                    colors={colors}
                    grades={decimalGrades}
                    setters={setters}
                    onRouteCreated={handleRouteCreated}
                ></CreateRoute>
            ) : null}
            <TileContainer
                routes={routes}
                colors={colors}
                grades={decimalGrades}
                setters={setters}
                onRouteChanged={handleRouteCreated}
            ></TileContainer>
        </>
    )
}

export default HomePage