import { Board, BoardType } from "./Board";

export type SpaceType = {
    id?: string,
    name?: string,
    boards?: BoardType[]
    business?: any 
}

export class Space {
    id?: string
    name?: string
    boards?: Board[]
    business?: any

    // constructor
    constructor(space: SpaceType) {
        this.id = space?.id
        this.name = space?.name
        this.boards = space?.boards
        this.business = space?.business
    }
}