import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp, useRoute } from "#imports";

export const useSpace = defineStore("space", {
  state: () => ({
    spaces: [],
  }),

  getters: {
    getSelectedSpaceId: () => useRoute()?.params?.id,
    getSelectedSpace(){
        return this.spaces.find((space: any) => space.id == this.getSelectedSpaceId)
    }
  },

  actions: {
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpace, import.meta.hot));
}
