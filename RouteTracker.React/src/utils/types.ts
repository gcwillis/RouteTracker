export interface Route {
    id: number;
    wallNumber: number;
    color: any;
    colorId: number;
    decimalGrade: any;
    decimalGradeId: number;
    setDate: string;
}

export type TileProps = {
    key: number
    grade: string
    color: string
    date: string
    setter: string
    location: string
}