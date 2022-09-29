import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../models/App";
import Widget from "../models/Widget";
import { useSupabaseClient, useNuxtApp, useUser } from "#imports";

export const useAppManager = defineStore("app-manager", {
  state: () => ({
    focused: "",
    apps: [],
    developmentApps: [],
    appLayers: [], // Focusing and ordering of apps windows
  }),

  getters: {

    // Apps
    getApps: (state) => state.apps,
    getOwned: (state) => state.apps.filter((app: App) => app.owned && !app.core),
    getCoreApps: (state) => state.apps.filter((app: App) => app.core),
    // isRunning: (state) => (app) => state.all.find(a => a.title === app.title).running,
    getApp: (state) => (id) => state.apps.find((app: App) => app.id === id),
    getAppByName: (state) => (name: String) =>
      state.apps.find((app: App) => app.name === name),

    getRunningApps: (state) => state.apps.filter((app: App) => app.running),
    getFocused: (state) => state.apps.find((app: App) => app.id.toString() == state.focused),
    getDevelopmentApps: (state) => state.developmentApps,

    // Extra
    anyRunningIsMaximized: (state) =>
      state.apps.some((app: App) => app.maximized && app.running && !app.minimized),
  },

  actions: {
    // Fetching Data
    async fetch() {
      // const { $toast } = useNuxtApp()
      const supabase = useSupabaseClient();
      let { data: apps, error } = await supabase.from("apps")
        .select(`
                  *,
                  users_apps(id),
                  apps_plans(
                      id, app_id, type, points, description, users_plans(id)
                  )
              `);
      if (error) return error
      this.apps = apps.map((app) => new App(app))
      this.apps.push(...this.developmentApps)
    },
    // Set Focus to an App
    async setFocus(id) {
      this.appLayers = this.appLayers.filter((app_id) => app_id !== id);
      this.appLayers.push(id);
      this.focused = id;
    },

    // Adding app for development purposes
    addApp(app) {
      if (!process.dev) return;
      app.title = `[ ${app.title} ]`;
      let newApp = new App(app);
      newApp.owned = true;
      newApp.id = this.developmentApps.length + 1 + 1000000;
      this.developmentApps.push(newApp);
    },

    // Buy an app
    async buyApp(id: number) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-buy-app', {
        body: JSON.stringify({ app_id: id, buy_type: 1 }),
      })
      this.fetch();
      if (error) return error;
      return data;

    },

    //Buy a plan
    async buyPlan(id: number) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-buy-app', {
        body: JSON.stringify({ plan_id: id, buy_type: 2 }),
      })
      this.fetch();
      if (error) return error;
      return data;

    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppManager, import.meta.hot));
}
