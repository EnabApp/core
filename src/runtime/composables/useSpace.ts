import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp, useRoute } from "#imports";

export const useSpace = defineStore("space", {
  state: () => ({
    
  }),

  getters: {
    getSpaceId: () => useRoute()?.params?.id
  },

  actions: {
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpace, import.meta.hot));
}
