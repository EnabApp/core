import { UnitType } from '../models/Unit'
import { ResposnivesType } from '../models/Board'

export const fillUnits = (units: ResposnivesType) => {
    const devices = ['desktop', 'tablet', 'mobile']
    devices.map((device => {
        units[device] = fillRest(units[device] || [], device)
    }))
    return units;
}

const fillRest = (units: UnitType[], device: string) => {
    return [
        ...units,
        ...[...Array((device == 'desktop' ? 28 : device == 'tablet' ? 24 : 8) - units.length)].map((_, index) => { return { id: index, colSpan: 1, rowSpan: 1 } }) 
    ]
}
