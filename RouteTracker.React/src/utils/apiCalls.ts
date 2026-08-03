import type { Route, Boulder, Color, DecimalGrade, VermGrade } from "./types.ts"

export async function getRoutes(): Promise<Route[]> {
    const res = await fetch("/api/routes")
    if (!res.ok) {
        throw new Error("error")
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
        throw new Error("error")
    } else {
        return await res.json() as Color[]
    }
}

export async function getDecimalGrades(): Promise<DecimalGrade[]> {
    const res = await fetch("/api/decimalgrades")
    if (!res.ok) {
        throw new Error("error")
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