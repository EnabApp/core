import { acceptHMRUpdate, defineStore } from "pinia";
import { useNuxtApp, useRoute } from "#imports";

export const useSpace = defineStore("space", {
  state: () => ({
    spaces: [
      {
        id: 15,
        name: "الكاشير حسوني",
        business: {
          name: "مطعم ستيف الحزين"
        },
        boards: [
          {
            id: 5,
            name: "قائمة الأكل",
            units: [
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 4, rowSpan: 4 },
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 2, rowSpan: 2 },
            ]
          },
          {
            id: 10,
            name: "قائمة المشروبات",
            units: [
              {},{},{},{},{},{},{},{},
              {},{},{},{},{},{},{},{},
              {},{},{},{},{},{},{},{},
              {},{},{},{},{},{},{},{},
            ]
          },
          {
            id: 20,
            name: "قائمة البلع",
            units: [
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 4, rowSpan: 4 },
              { colSpan: 2, rowSpan: 2 },
              { colSpan: 2, rowSpan: 2 },
            ]
          },
        ]
      }
    ],

    selectedBoardId: useRoute()?.params?.boardId,
    selectedSpaceId: useRoute()?.params?.spaceId
  }),

  getters: {
    // Spaces
    getSelectedSpaceId: (state) => state.selectedSpaceId,
    getSelectedSpace(){ return this.spaces.find((space: any) => space.id == this.getSelectedSpaceId) },

    // Boards
    getSelectedBoardId: (state) => state.selectedBoardId,
    getSelectedBoardIndex(){ return this.getSelectedSpace?.boards?.findIndex((board: any) => board.id == this.getSelectedBoardId) },
    getSelectedBoard(){ return this.getSelectedSpace?.boards[this.getSelectedBoardIndex] }
  },

  actions: {
    setSelectedBoardId(id: number){
      this.selectedBoardId = id
    }
    
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSpace, import.meta.hot));
}
