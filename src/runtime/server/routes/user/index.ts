import { createResolver } from '@nuxt/kit';
import { NitroEventHandler } from 'nitropack';
import { fileURLToPath } from 'url'
const runtimeDir = fileURLToPath(new URL('../../', import.meta.url))
const { resolve } = createResolver(import.meta.url)

export const userRoutes: NitroEventHandler[] = [
    {
        route: '/api/hello',
        handler: resolve(runtimeDir, 'api/hello'),
        // middleware: resolve(...),
        method: 'get',
    }
]