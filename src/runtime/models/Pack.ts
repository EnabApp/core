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
  owned: boolean;

  apps: App[];


  constructor(args){
    this.id = args?.id
    this.title = args?.title
    this.description = args?.description
    this.icon = args?.icon
    this.points = args?.points
    this.discount = args?.discount
    if(args?.users_packs?.length > 0) this.owned = true
    this.apps = args?.packs_apps?.map(pack_app => new App(pack_app.app))
  }
}
