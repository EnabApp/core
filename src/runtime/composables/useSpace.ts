import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp, useRoute } from "#imports";
import { SpaceTypes } from '../models/Space'

export const useSpace = defineStore("space", {
  state: () => ({
    spaces: [
      {
        id: "store",
        name: "المتجر",
        type: "CORE" as SpaceTypes,
        business: {
          id: "1",
          name: "عنب"
        },
        boards: [
          {
            id: "apps",
            name: "التطبيقات",
            units: {
              mobile: [
                { id: '1', colSpan: 2, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 2 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 2 },
                { id: '1', colSpan: 1, rowSpan: 1 },
              ],
              tablet: [
                { id: '1', colSpan: 2, rowSpan: 2 },
                { id: '1', colSpan: 2, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is data' },
                { id: '1', colSpan: 1, rowSpan: 2 },
                { id: '1', colSpan: 1, rowSpan: 2 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 2, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is another data' },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 3, rowSpan: 1, componentName: 'TestUnitData', componentData: 'This is also another data' },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
                { id: '1', colSpan: 1, rowSpan: 1 },
              ],
              desktop: [
                { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
                { id: '2', colSpan: 3, rowSpan: 3 },
                { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
                { id: '4', colSpan: 3, rowSpan: 1 },
              ]
            }
          },
          {
            id: "packages",
            name: "الحزم",
            units: {
              desktop: [
                { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
                { id: '2', colSpan: 3, rowSpan: 3 },
                { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
                { id: '4', colSpan: 3, rowSpan: 1 },
              ]
            }
          },
          {
            id: "20",
            name: "التخفيضات",
            units: {
              desktop: [
                { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
                { id: '2', colSpan: 3, rowSpan: 3 },
                { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
                { id: '4', colSpan: 3, rowSpan: 1 },
              ]
            }
          },
        ]
      },
      {
        id: "1",
        name: "الموارد البشرية",
        type: "BUSINESS" as SpaceTypes,
        business: {
          id: "1",
          name: "مجموعة العبدالله"
        },
        boards: [
          {
            id: "1",
            name: "الموظفين",
            units: {
              desktop: [
                { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
                { id: '2', colSpan: 3, rowSpan: 3 },
                { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
                { id: '4', colSpan: 3, rowSpan: 1 },
              ]
            }
          },
          {
            id: "2",
            name: "الرواتب",
            units: {
              desktop: [
                { id: '1', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: 'tEwtwerwer' },
                { id: '2', colSpan: 3, rowSpan: 3 },
                { id: '3', colSpan: 2, rowSpan: 4, componentName: 'TestUnitData', componentData: '2' },
                { id: '4', colSpan: 3, rowSpan: 1 },
              ]
            }
          },
        ]
      }
    ].map(s => new Space(s)),

    selectedBoardId: useRoute()?.params?.boardId,
    selectedSpaceId: useRoute()?.params?.spaceId
  }),

  getters: {
    getSpaces: (state) => state.spaces.filter(s => s.type !== 'CORE'),

    // Spaces
    getSelectedSpaceId: (state) => state.selectedSpaceId,
    getSelectedSpace() { return this.spaces.find((space: any) => space.id == this.getSelectedSpaceId) },
    getSpaceById: (state) => (id: string) => state.spaces.find((space: any) => space.id == id),

    // Boards
    getSelectedBoardId: (state) => state.selectedBoardId,
    getSelectedBoardIndex() { return this.getSelectedSpace?.boards?.findIndex((board: any) => board.id == this.getSelectedBoardId) },
    getSelectedBoard() { return this.getSelectedSpace?.boards[this.getSelectedBoardIndex] }
  },

  actions: {
    setSelectedBoardId(id: string, spaceId: string = null) {
      this.selectedBoardId = id
      if (spaceId) this.selectedSpaceId = spaceId
    },
    setSelectedSpaceId(id: string) {
      this.selectedSpaceId = id
    }

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpace, import.meta.hot));
}
