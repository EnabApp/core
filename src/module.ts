import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addAutoImport } from '@nuxt/kit'
import path from "path";
import * as fs from 'fs';


export interface ModuleOptions {
  isCore: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'core',
    configKey: 'core'
  },
  defaults: {
    isCore: true,
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    // nuxt.options.alias.core = (runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugins/toast'))
    addPlugin(resolve(runtimeDir, 'plugins/addApps'))

    

    if (options.isCore) {
      // Components Hooks
      nuxt.hook('components:dirs', (dirs) => {
        dirs.push({
          path: resolve(runtimeDir, 'components'),
          global: true
        })
      })

      
      // Auto Imports Hooks
      nuxt.hook('autoImports:dirs', (dirs) => {
        dirs.push(resolve(runtimeDir, 'composables'))
        dirs.push(resolve(runtimeDir, 'classes'))
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
        pages.push({ path: '/auth', file: resolve(runtimeDir, 'pages/auth.vue')})
      })
  
  
      // Supabase 
      nuxt.options.supabase = {
        url: 'https://xjrkpvotkmsqephyfmya.supabase.co',
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqcmtwdm90a21zcWVwaHlmbXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyOTc3MjYsImV4cCI6MTk3NTg3MzcyNn0.3doSjk0JXDL8EtfmNjqz3iUx43NrvWgcLkIRhsyvAnM',
        serviceKey: ''
      }
    }
  }
})