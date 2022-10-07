import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp, useRoute } from "#imports";
import { UnitType } from '../models/Unit'
import { SpaceType } from '../models/Space'
import { ResposnivesType } from '../models/Board'

export const useSpace = defineStore("space", {
  state: () => ({
    spaces: [],
  }),

  getters: {
    getSpaces: (state) => state.spaces,
    getSpacesAsUnits: (state) => {
      const units: any = []
      state.spaces.map((space: SpaceType) => {
        units.push({
          id: space.id,
          colSpan: 1,
          rowSpan: 1,
          componentName: '',
          componentData: space,          
        })
      })
      return {
        desktop: units as UnitType[],
        tablet: units as UnitType[],
        mobile: units as UnitType[],
      } as ResposnivesType;
    }
    // Spaces
    // getSelectedSpaceId: (state) => state.selectedSpaceId,
    // getSelectedSpace() { return this.spaces.find((space: any) => space.id == this.getSelectedSpaceId) },
    // getSpaceById: (state) => (id: string) => state.spaces.find((space: any) => space.id == id),
  },

  actions: {
    async fetch(businessId: string) {

    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpace, import.meta.hot));
}
