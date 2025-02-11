import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AppController {
  async home({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    return inertia.render('home', {
      gulps: async () => {
        const startOfDay = DateTime.now().setZone(user.timezone).startOf('day')
        const endOfDay = DateTime.now().setZone(user.timezone).endOf('day')
        await user.load('gulps', (gulps) =>
          gulps.whereBetween('created_at', [startOfDay, endOfDay])
        )
        return user.gulps
      },
    })
  }
}
