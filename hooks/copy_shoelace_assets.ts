import type { AssemblerHookHandler } from '@adonisjs/core/types/app'
import { cp } from 'node:fs/promises'
import * as path from 'node:path'

/**
 * Copies the required Shoelace assets to the public directory as described here
 * https://shoelace.style/getting-started/installation#bundling
 */
const copyShoelaceAssets: AssemblerHookHandler = async ({ logger }) => {
  logger.info('Copying Shoelace assets...')

  await cp(
    path.resolve('node_modules/@shoelace-style/shoelace/dist/assets'),
    path.resolve('public/shoelace/assets'),
    {
      recursive: true,
    }
  )
}

export default copyShoelaceAssets
