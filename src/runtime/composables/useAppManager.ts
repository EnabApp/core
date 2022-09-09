import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../models/App"
import Widget from "../models/Widget"
import Service from "../models/Service"
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'
import Conversation from "../models/Conversation";

export const useAppManager = defineStore("app-manager", {
    state: () => ({
        focused: "",
        apps: [],
        developmentApps: [],
        appLayers: [], // Focusing and ordering of apps windows
        unSolvedConversations: [],
        solvedConversations: [],

    }),

    getters: {
        // Apps
        getApps: state => state.apps,
        getOwned: (state) => state.apps.filter(app => app.owned && !app.core),
        getCoreApps: state => state.apps.filter(app => app.core),
        // isRunning: (state) => (app) => state.all.find(a => a.title === app.title).running,
        getApp: state => id => state.apps.find(app => app.id === id),
        getAppByName: state => (name: String) => state.apps.find(app => app.name === name),
        getRunningApps: (state) => state.apps.filter(app => app.running),
        getFocused: (state) => state.apps.find(app => app.id == state.focused),
        getDevelopmentApps: state => state.developmentApps,

        // Services
        getServices: state => state.apps.filter(app => app.services?.length > 0).map(app => app.services).flat(1),
        getServiceById() {
            return (id: number) => this.getServices.find(service => service.id === id)
        },
        getOwnedServices() {
            return this.getServices.filter(service => service.owned)
        },
        getUnownedServices() {
            return this.getServices.filter(service => !service.owned)
        },

        // Extra
        anyRunningIsMaximized: (state) => state.apps.some(app => app.maximized && app.running && !app.minimized),

        // Conversations
        getunSolvedConversations: state => state.unSolvedConversations,
        getsolvedConversations: state => state.solvedConversations,
    },

    actions: {
        // Fetching Data
        async fetch() {
            // const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            let { data: apps, error } = await supabase
                .from('apps')
                .select(`
                        *,
                        users_apps(id),
                        apps_services(
                            id, app_id, title, points, icon, description, users_services(id)
                        )
                    `)
            if (error) { console.log('حدث خطأ اثناء تحميل التطبيقات'); return false }
            this.apps = apps.map(app => new App(app))
            this.apps.push(...this.developmentApps)
        },

        // Set Focus to an App
        async setFocus(id) {
            this.appLayers = this.appLayers.filter(app_id => app_id !== id)
            this.appLayers.push(id)
            this.focused = id;
        },

        // Adding app for development purposes
        addApp(app) {
            if (!process.dev) return;
            app.title = `[ ${app.title} ]`
            let newApp = new App(app)
            newApp.owned = true
            newApp.id = (this.developmentApps.length + 1) + 1000000
            this.developmentApps.push(newApp);
        },

        // Buy an app
        async buyApp(app_id) {
            const supabase = useSupabaseClient()
            let { data, error } = await supabase.functions.invoke('core-buy-app', {
                body: JSON.stringify({ app_id: app_id }),
            })
            this.fetch();
            if (error) return error;
            if (data) return data;
        },

        // Buy a service
        async buyService(service_id) {
            // const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            const user = useUser()
            let { data, error } = await supabase
                .rpc('buyService', {
                    _service_id: service_id,
                    _user_id: user.value.id
                })
            if (error) { console.log('حدث خطأ اثناء شراء الخدمة'); return false }
            if (!data) { console.log('لاتمتلك مايكفي من النقاط'); return false }
            this.fetch();
        },

        // Buy an package
        async buyPack(pack_id) {
            const supabase = useSupabaseClient()

            let { data, error } = await supabase.functions.invoke('core-buy-pack', {
                body: JSON.stringify({ pack_id: pack_id }),
            })
            this.fetch();
            if (error) return error;
            else  return data;
        },
        // get unsolved conversations
        async getUnSolvedConversations() {
            const supabase = useSupabaseClient()
            let { data: conversations, error } = await supabase.functions.invoke('core-get-conversations', {
                body: JSON.stringify({ conversations_type: false }),
            })
            if (error) return error;
            this.unSolvedConversations = conversations.map(conversation => new Conversation(conversation))
        },
        // get solved conversations
        async getSolvedConversations() {
            const supabase = useSupabaseClient()
            let { data: conversations, error } = await supabase.functions.invoke('core-get-conversations', {
                body: JSON.stringify({ conversations_type: true }),
            })
            if (error) return error;
            this.solvedConversations = conversations.map(conversation => new Conversation(conversation))
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppManager, import.meta.hot));
}
