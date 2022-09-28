import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../models/App";
import Widget from "../models/Widget";
import Service from "../models/Service";
import { useSupabaseClient, useNuxtApp, useUser } from "#imports";
import Pack from "../models/Pack";

export const useAppManager = defineStore("app-manager", {
  state: () => ({
    focused: "",
    apps: [],
    packs: [],
    developmentApps: [],
    appLayers: [], // Focusing and ordering of apps windows
  }),

  getters: {
    //Packs
    getPacks: (state) => state.packs,
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

    // Services
    getServices: (state) =>
      state.apps
        .filter((app: App) => app.services?.length > 0)
        .map((app: App) => app.services)
        .flat(1),
    getServiceById() {
      return (id: number) =>
        this.getServices.find((service) => service.id === id);
    },
    getOwnedServices() {
      return this.getServices.filter((service) => service.owned);
    },
    getUnownedServices() {
      return this.getServices.filter((service) => !service.owned);
    },

    // Extra
    anyRunningIsMaximized: (state) =>
      state.apps.some((app: App) => app.maximized && app.running && !app.minimized),
  },

  actions: {
    // Fetching Data
    async fetch() {
      const supabase = useSupabaseClient();
      let { data: apps, error } = await supabase.from("apps")
        .select(`
                  *,
                  users_apps(id),
                  apps_services(
                      id, app_id, title, points, icon, description, users_services(id)
                  ),
                  apps_plans(
                      id, app_id, type, points, description, users_plans(id)
                  )
              `);
      if (error) return error
      this.apps = apps.map((app) => new App(app))
      this.apps.push(...this.developmentApps)
    },

    // fetchTheSixMostDownloadedApps method
    async fetchTheSixMostDownloadedApps() {
      const supabase = useSupabaseClient();
      let { data: apps, error } = await supabase.from("apps")
        .select(`
                  *,
                  users_apps(id),
                  apps_services(
                      id, app_id, title, points, icon, description, users_services(id)
                  ),
                  apps_plans(
                      id, app_id, type, points, description, users_plans(id)
                  )
              `)
        .order("downloads", { ascending: false })
        .limit(6);
      if (error) return error
      this.apps = apps.map((app) => new App(app))
      this.apps.push(...this.developmentApps)
    },

    async fetchPacks() {
      const supabase = useSupabaseClient();
      let { data: packs, error } = await supabase
        .from("packs")
        .select("*,packs_apps(app:app_id(*,apps_services(*,users_services(*)),apps_plans(*,users_plans(*))))")
      if (error) return error
      this.packs = packs.map((pack) => new Pack(pack));
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

    // Buy a service
    async buyService(id: number) {
      // const { $toast } = useNuxtApp()
      const supabase = useSupabaseClient();
      const user = useUser();
      let { data, error } = await supabase.rpc("buyService", {
        _service_id: id,
        _user_id: user.value.id,
      });
      if (error) {
        console.log("حدث خطأ اثناء شراء الخدمة");
        return false;
      }
      if (!data) {
        console.log("لاتمتلك مايكفي من النقاط");
        return false;
      }
      this.fetch();
    },

    // Buy an package
    async buyPack(pack_id) {
      const supabase = useSupabaseClient();

      let { data, error } = await supabase.functions.invoke("core-buy-pack", {
        body: JSON.stringify({ pack_id: pack_id }),
      });
      this.fetch();
      if (error) return error;
      else return data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppManager, import.meta.hot));
}
