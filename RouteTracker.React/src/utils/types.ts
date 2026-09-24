export interface Route {
    id: number;
    wallNumber: number;
    color: Color;
    colorId: number;
    decimalGrade: DecimalGrade;
    decimalGradeId: number;
    setDate: string;
    setterId: number;
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
    id: number
    wallNumber: number
    colorId: number
    decimalGradeId: number
    setterId: number
    grade: string
    color: string
    date: string
    setter: string
    location: string
}

export interface Color {
    id: number
    colorName: string
    hexCode: string
}

export interface DecimalGrade {
    id: number
    gradeValue: string
} 

export interface VermGrade {
    id: number
    gradeValue: string
}

export interface Setter {
    id: number
    name: string
}

export type DropdownOption = {
    value: number
    label: string
}