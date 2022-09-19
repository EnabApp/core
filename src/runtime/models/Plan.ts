export default class Plan {
  id: number
  type: number
  description: string
  points: number

  constructor(args) {
    this.id = args?.id
    this.type = args?.type
    this.description = args?.description
    this.points = args?.points
  }
}
