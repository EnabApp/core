import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addAutoImport } from '@nuxt/kit'
import path from "path";
import * as fs from 'fs';
import { uno } from "./runtime/unocss/index";


export interface ModuleOptions {
  // isCore: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'core',
    configKey: 'core'
  },
  defaults: {
    // isCore: true,
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    // nuxt.options.alias.core = (runtimeDir)

    

      // addPlugin(resolve(runtimeDir, 'plugins/addApps'))

      // Components Hooks
      nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
          path: resolve(runtimeDir, 'components'),
          global: true,
        })
      })


      // Auto Imports Hooks
      nuxt.hook('imports:dirs', (dirs) => {
        dirs.push(resolve(runtimeDir, 'composables'))
        dirs.push(resolve(runtimeDir, 'models'))
        dirs.push(resolve(runtimeDir, 'middleware'))
      })
  
  
      // Layouts
      nuxt.hook('app:templates', (app) => {
        fs.readdir(resolve(runtimeDir, 'layouts'), function (err, layouts) {
          layouts.forEach((file) => {
            const name = path.parse(file).name
            app.layouts[name] = {
              file: resolve(runtimeDir, `layouts/${file}`),
              name: name
            }
          });
        });
      })
  
  
  
      // Pages (Desktop Page)
      nuxt.hook('pages:extend', (pages) => {
        pages.push({ path: '/', file: resolve(runtimeDir, 'pages/index.vue')})
        // pages.push({ path: '/auth', file: resolve(runtimeDir, 'pages/auth.vue')})
      })
  }
})