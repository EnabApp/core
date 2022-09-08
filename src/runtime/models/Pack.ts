import Widget from "./Widget";
import Service from "./Service";
import App from "./App";

export default class Pack {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: number;
  discount: number;
  apps: App[];

  constructor(args){
    this.id = args?.id
    this.title = args?.title
    this.description = args?.description
    this.icon = args?.icon
    this.points = args?.points
    this.discount = args?.discount

    this.apps = args.apps?.map(app => new App(app))
  }
}
