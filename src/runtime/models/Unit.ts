export type UnitType = {
    id: string,
    colSpan?: number,
    rowSpan?: number,
    componentName?: string | null,
    componentData?: any,
    order?: number,
}

export class Unit {
    id: string
    colSpan?: number
    rowSpan?: number
    componentName?: string | null
    componentData?: any
    order?: number
    
    // constructor
    constructor(unit: UnitType) {
        this.id = unit.id
        this.colSpan = unit.colSpan ?? 1
        this.rowSpan = unit.rowSpan ?? 1
        this.componentName = unit?.componentName
        this.order = unit?.order
        this.componentData = unit?.componentData
    }
}