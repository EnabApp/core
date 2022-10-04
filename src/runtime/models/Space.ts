import { Board, BoardType } from "./Board";

export type SpaceType = {
    id: string,
    name: string,
    boards: BoardType[]
    type: 'CORE' | 'BUSINESS' | 'PERSONAL' 
}

export class Space {
    id: string
    name: string
    boards: Board[]
    type: 'CORE' | 'BUSINESS' | 'PERSONAL'

    // constructor
    constructor(space: SpaceType) {
        this.id = space.id
        this.name = space.name
        this.boards = space.boards
    }
}