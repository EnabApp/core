import { defineNuxtConfig } from 'nuxt'
import MyModule from '..'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,

    modules: [
        '@enab/systemapps',
        '@enab/utilities',
        MyModule,
        '@nuxtjs/supabase',
        '@nuxt/image-edge',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@unocss/nuxt',
        "@nuxtjs/color-mode",
        "@enab/systemapps",
    ],
})
