export type RouteFilterOption = {
    id: number
    label: string
}

export type RouteSortOrder = "newest" | "oldest" | "wall-ascending" | "wall-descending"

export type RouteFilterState = {
    color: string
    grade: string
    setter: string
    sortOrder: RouteSortOrder
}

export type RouteFiltersProps = {
    colors: RouteFilterOption[]
    grades: RouteFilterOption[]
    setters: RouteFilterOption[]
    value: RouteFilterState
    onChange: (value: RouteFilterState) => void
}

function RouteFilters({ colors, grades, setters, value, onChange }: RouteFiltersProps) {
    function updateFilter(filter: keyof RouteFilterState, nextValue: string) {
        onChange({ ...value, [filter]: nextValue })
    }

    function clearFilters() {
        onChange({ ...value, color: "", grade: "", setter: "" })
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-2">
            <label className="flex h-10 items-center gap-2 rounded-sm bg-black/20 px-2 text-sm text-white">
                Color
                <select aria-label="Filter by color" value={value.color} onChange={(event) => updateFilter("color", event.target.value)} className="h-8 max-w-32 bg-gray-800 text-white">
                    <option value="">All</option>
                    {colors.map((color) => <option key={color.id} value={color.id}>{color.label}</option>)}
                </select>
            </label>
            <label className="flex h-10 items-center gap-2 rounded-sm bg-black/20 px-2 text-sm text-white">
                Grade
                <select aria-label="Filter by grade" value={value.grade} onChange={(event) => updateFilter("grade", event.target.value)} className="h-8 max-w-32 bg-gray-800 text-white">
                    <option value="">All</option>
                    {grades.map((grade) => <option key={grade.id} value={grade.id}>{grade.label}</option>)}
                </select>
            </label>
            <label className="flex h-10 items-center gap-2 rounded-sm bg-black/20 px-2 text-sm text-white">
                Setter
                <select aria-label="Filter by setter" value={value.setter} onChange={(event) => updateFilter("setter", event.target.value)} className="h-8 max-w-32 bg-gray-800 text-white">
                    <option value="">All</option>
                    {setters.map((setter) => <option key={setter.id} value={setter.id}>{setter.label}</option>)}
                </select>
            </label>
            <label className="flex h-10 items-center gap-2 rounded-sm bg-black/20 px-2 text-sm text-white">
                Sort
                <select aria-label="Sort routes" value={value.sortOrder} onChange={(event) => updateFilter("sortOrder", event.target.value)} className="h-8 max-w-40 bg-gray-800 text-white">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="wall-ascending">Wall number: low to high</option>
                    <option value="wall-descending">Wall number: high to low</option>
                </select>
            </label>
            {value.color || value.grade || value.setter ? (
                <button type="button" onClick={clearFilters} className="h-10 rounded-sm px-2 text-sm text-white hover:bg-black/20">
                    Clear filters
                </button>
            ) : null}
        </div>
    )
}

export default RouteFilters