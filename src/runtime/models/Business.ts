import { Space, SpaceType } from "./Space";

export type BusinessType = {
    id?: string,
    name?: string,
    spaces?: SpaceType[]
}

export class Business {
    id?: string
    name?: string
    spaces?: Space[]
    
    // constructor
    constructor(business: BusinessType) {
        this.id = business?.id
        this.name = business?.name
        this.spaces = business?.spaces
    }
}