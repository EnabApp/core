export type UnitType = {
    id: string,
    colSpan?: number,
    rowSpan?: number,
}

export class Unit {
    id: string
    colSpan?: number
    rowSpan?: number
    
    // constructor
    constructor(unit: UnitType) {
        this.id = unit.id
        this.colSpan = unit?.colSpan ?? 1
        this.rowSpan = unit?.rowSpan ?? 1
    }
}