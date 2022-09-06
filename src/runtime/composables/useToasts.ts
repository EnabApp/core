import { acceptHMRUpdate, defineStore } from "pinia";

export type Toast = {
    message: String,
    title: String,
    icon: String,
}

export const useToasts = defineStore("toasts-store", {
    state: () => ({
        toasts: []
    }),

    getters: {
        getToasts: state => state.toasts,
    },

    actions: {
        sendToast(toast: Toast){
            this.toasts.unshift(toast)
        },

        removeToast(toast: Toast){
            this.toasts = this.toasts.filter((t: Toast) => t !== toast)
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useToasts, import.meta.hot));
}
