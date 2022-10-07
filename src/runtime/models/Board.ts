import { Unit, UnitType } from './Unit'

export type ResposnivesType = {
    mobile?: UnitType[],
    tablet?: UnitType[],
    desktop: UnitType[],
}

export type BoardType = {
    id?: string,
    name?: string,
    units?: ResposnivesType
}

export class Board {
    id?: string
    name?: string
    units?: ResposnivesType

    // constructor
    constructor(board: BoardType) {
        this.id = board?.id
        this.name = board?.name
        this.units = board?.units
    }
}