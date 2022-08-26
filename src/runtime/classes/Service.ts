export default class Service {
    id: number;
    app_id: number;

    title: string;
    description: string;
    icon: string;

    owned: boolean;

    points: number;

    constructor(args) {
        this.id = args?.id
        this.app_id = args?.app_id

        this.title = args?.title
        this.icon = args?.icon

        this.owned = args.users_services && args.users_services.length > 0

        // this.core = args.core ?? false

        this.points = args.points ?? 0
    }
}