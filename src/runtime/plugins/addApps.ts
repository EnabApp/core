import { defineNuxtPlugin } from '#app'
import { useAppManager } from '../composables/useAppManager'

export default defineNuxtPlugin((nuxtApp) => {
    const appStore = useAppManager()
    // Settings App
    appStore.addApp({
        "name": "SystemManagerApp",
        "title": "مدير النظام",
        "icon": "i-ci-settings-filled",
        "size": "min-w-xl min-h-xl max-w-xl max-h-xl",
    })
})
