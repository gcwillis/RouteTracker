import type { Route } from "./types.ts"

async function getRoutes(): Promise<Route[]> {
    const res = await fetch("/api/routes")
    if (!res.ok) {
        throw new Error("error")
    } else {
        return await res.json() as Route[]
    }
}
 export default getRoutes()