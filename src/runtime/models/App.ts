import Widget from "./Widget";

import Plan from "./Plan";

export default class App {
    id: number;
    // Component name
    name: string;

    title: string;
    icon: string;
    minimized: boolean;
    maximized: boolean;
    // maximizable: boolean;
    // resizeable: boolean;
    running: boolean;
    booting: boolean;
    // locked: boolean;
    owned: boolean;
    size: string;
    minWidth: number;
    minHeight: number;
    zIndex: string;
    core: boolean;
    points: number;
    plans: Plan[];
    constructor(args) {
        this.id = args?.id
        this.name = args?.name

        this.title = args?.title
        this.icon = args?.icon
        this.minimized = args.minimized ?? false
        this.maximized = args.maximized ?? false
        this.running = args.running ?? false
        this.zIndex = args.zIndex ?? 20

        this.owned = args.users_apps && args.users_apps.length > 0

        this.core = args.core ?? false

        this.size = args.size ?? "w-2xl h-lg"
        this.minWidth = args.minWidth ?? 100
        this.minHeight = args.minHeight ?? 100

        this.points = args.points ?? 0

  
        this.plans = args.apps_plans?.map(plan => new Plan(plan))

    }


    // Actions - Toggles
    open(){
        if (!this.running) this.booting = true
        this.running = true
        this.minimized = false
    }
    toggleRunning(){
        this.running = !this.running
        this.minimized = false
        // if (!this.running)
            // this.subApps.forEach(app => app.running = false)
    }



    toggleMinimize() {
        this.minimized = !this.minimized
    }


    toggleMaximize() {
        // if (this.maximizable)
        this.maximized = !this.maximized
    }


    // Getters
   
    // getWidget(id: number){
    //     return this.widgets.find(widget => widget.id === id)
    // }

    // getSubApp(id: number){
    //     return this.subApps.find(app => app.id === id)
    // }

    // Utilities
    // isSubAppsRunning(){
    //     return this.subApps.some(app => app.running)
    // }

}
