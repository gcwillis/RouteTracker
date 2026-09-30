import TileContainer from "../Components/TileContainer"
import NavBar from "../Components/NavBar"
import CreateRoute from "../Components/CreateRoute"
import type { RouteFilterState } from "../Components/RouteFilters"
import { useEffect, useState } from "react"
import type { Color, DecimalGrade, Route, Setter } from "../utils/types"
import { getColors, getDecimalGrades, getRoutes, getSetters } from "../utils/apiCalls"

function HomePage() {

    const [colors, setColors] = useState<Color[]>([])
    const [routes, setRoutes] = useState<Route[]>([])
    const [decimalGrades, setDecimalGrades] = useState<DecimalGrade[]>([])
    const [setters, setSetters] = useState<Setter[]>([])
    const [isCreateRouteOpen, setIsCreateRouteOpen] = useState(false)
    const [routeFilters, setRouteFilters] = useState<RouteFilterState>({
        color: "",
        grade: "",
        setter: "",
        sortOrder: "newest"
    })
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

    const displayedRoutes = routes
        .filter((route) =>
            (!routeFilters.color || route.colorId === Number(routeFilters.color)) &&
            (!routeFilters.grade || route.decimalGradeId === Number(routeFilters.grade)) &&
            (!routeFilters.setter || route.setterId === Number(routeFilters.setter))
        )
        .sort((left, right) => {
            let comparison = 0
            if (routeFilters.sortOrder === "newest") comparison = Date.parse(right.setDate) - Date.parse(left.setDate)
            if (routeFilters.sortOrder === "oldest") comparison = Date.parse(left.setDate) - Date.parse(right.setDate)
            if (routeFilters.sortOrder === "wall-ascending") comparison = left.wallNumber - right.wallNumber
            if (routeFilters.sortOrder === "wall-descending") comparison = right.wallNumber - left.wallNumber
            return comparison || left.id - right.id
        })

    return (
        <>
            <NavBar
                isCreateRouteOpen={isCreateRouteOpen}
                onToggleCreateRoute={() => setIsCreateRouteOpen((isOpen) => !isOpen)}
                filters={{
                    colors: colors.map((color) => ({ id: color.id, label: color.colorName })),
                    grades: decimalGrades.map((grade) => ({ id: grade.id, label: grade.gradeValue })),
                    setters: setters.map((setter) => ({ id: setter.id, label: setter.name })),
                    value: routeFilters,
                    onChange: setRouteFilters
                }}
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
                routes={displayedRoutes}
                colors={colors}
                grades={decimalGrades}
                setters={setters}
                onRouteChanged={handleRouteCreated}
            ></TileContainer>
        </>
    )
}

export default HomePage