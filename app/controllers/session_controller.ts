import User from '#models/user'
import { storeValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('login')
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const user = await User.verifyCredentials(payload.username, payload.password)
    await auth.use('web').login(user, payload.remember)
    return response.redirect('/')
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
