import { Board, BoardType } from "./Board";

export type SpaceTypes = 'CORE' | 'BUSINESS' | 'PERSONAL'

export type SpaceType = {
    id: string,
    name: string,
    boards: BoardType[]
    type: SpaceTypes,
    business: any 
}

export class Space {
    id: string
    name: string
    boards: Board[]
    type: 'CORE' | 'BUSINESS' | 'PERSONAL'
    business: any

    // constructor
    constructor(space: SpaceType) {
        this.id = space.id
        this.name = space.name
        this.boards = space.boards
        this.type = space.type
        this.business = space.business
    }
}