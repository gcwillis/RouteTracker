import NavButton from "./NavButton"
import RouteFilters, { type RouteFiltersProps } from "./RouteFilters"

type NavBarProps = {
    isCreateRouteOpen: boolean
    onToggleCreateRoute: () => void
    filters: RouteFiltersProps
}

function NavBar({ isCreateRouteOpen, onToggleCreateRoute, filters }: NavBarProps) {
    return (
        <nav className="rounded-md bg-gray-800 px-3 py-2 shadow-md shadow-black/20">
            <div className="flex flex-wrap items-center justify-center gap-2">
                <NavButton text={isCreateRouteOpen ? "Close" : "Add Route"} onClick={onToggleCreateRoute} />
                <RouteFilters {...filters} />
            </div>
        </nav>
    )
}

export default NavBar