import { addServerHandler } from '@nuxt/kit';
import { NitroEventHandler } from 'nitropack';
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { userRoutes } from './user/index'


export const routes: NitroEventHandler[] = [
    ...userRoutes,
]

