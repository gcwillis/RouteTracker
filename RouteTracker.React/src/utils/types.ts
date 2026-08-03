export interface Route {
    id: number;
    wallNumber: number;
    color: Color;
    colorId: number;
    decimalGrade: DecimalGrade;
    decimalGradeId: number;
    setDate: string;
}

export interface Boulder {
    id: number;
    section: number;
    color: any;
    colorId: number;
    vermGrade: any;
    verGradeId: number;
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

export interface Color {
    id: number
    name: string
    hexCode: string
}

export interface DecimalGrade {
    id: number
    value: string
} 

export interface VermGrade {
    id: number
    value: string
}