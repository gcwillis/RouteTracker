import type { Route, Boulder, Color, DecimalGrade, VermGrade, Setter } from "./types.ts"

export type CreateRouteRequest = {
    wallNumber: number
    colorId: number
    decimalGradeId: number
    setterId: number
    setDate: string
}

export async function getRoutes(): Promise<Route[]> {
    const res = await fetch("/api/routes")
    if (!res.ok) {
        throw new Error("failed to retrieve routes")
    } else {
        return await res.json() as Route[]
    }
}

export async function getBoulders(): Promise<Boulder[]> {
    const res = await fetch("/api/boulders")
    if (!res.ok) {
        throw new Error("error")
    } else {
        return await res.json() as Boulder[]
    }
}

export async function getColors(): Promise<Color[]> {
    const res = await fetch("/api/colors")
    if (!res.ok) {
        throw new Error("failed to retrieve colors")
    } else {
        return await res.json() as Color[]
    }
}

export async function getDecimalGrades(): Promise<DecimalGrade[]> {
    const res = await fetch("/api/decimalgrades")
    if (!res.ok) {
        throw new Error("failed to retrieve grades")
    } else {
        return await res.json() as DecimalGrade[]
    }
}

export async function getVermGrades(): Promise<VermGrade[]> {
    const res = await fetch("/api/vermgrades")
    if (!res.ok) {
        throw new Error("error")
    } else {
        return await res.json() as VermGrade[]
    }
}

export async function getSetters(): Promise<Setter[]> {
    const res = await fetch("/api/setters")
    if (!res.ok) {
        throw new Error("failed to retrive setters")
    } else {
        return await res.json() as Setter[]
    }
}

export async function createRoute(route: CreateRouteRequest): Promise<Route> {
    const res = await fetch("/api/routes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(route)
    })

    if (!res.ok) {
        throw new Error("failed to create route")
    }

    return await res.json() as Route
}