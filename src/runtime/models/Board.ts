import { Unit, UnitType } from './Unit'

export type BoardType = {
    id: string,
    name: string,
    units: UnitType[]
}

export class Board {
    id: string
    name: string
    units: Unit[]
    // constructor
    constructor(board: BoardType) {
        this.id = board.id
        this.name = board.name
        this.units = board.units
    }
}