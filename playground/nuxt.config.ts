import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    modules: [
        '@enab/appstore',
        '@enab/utilities',
        '@enab/ui',
        MyModule,
        '@nuxt/image-edge',
        // '@nuxtjs/supabase',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@unocss/nuxt',
        "@nuxtjs/color-mode",
    ],
})
