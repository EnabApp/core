export type UnitType = {
    id?: string,
    colSpan?: number,
    rowSpan?: number,
    componentName?: string | null,
    componentData?: any,
    order?: number,

    hideOnTablet?: boolean,
    showOnMobile?: boolean,
}

export class Unit {
    id?: string
    colSpan?: number
    rowSpan?: number
    componentName?: string | null
    componentData?: any
    order?: number

    hideOnTablet?: boolean
    showOnMobile?: boolean


    
    // constructor
    constructor(unit: UnitType) {
        this.id = unit?.id
        this.colSpan = unit.colSpan ?? 1
        this.rowSpan = unit.rowSpan ?? 1
        this.componentName = unit?.componentName
        this.order = unit?.order
        this.componentData = unit?.componentData

        this.hideOnTablet = unit?.hideOnTablet
        this.showOnMobile = unit?.showOnMobile
    }
}