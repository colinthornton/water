import User from '#models/user'
import { loginValidator, signupValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signup({ request, response, auth }: HttpContext) {
    const payload = await signupValidator.validate(request.all())
    const user = await User.create({ username: payload.username, password: payload.password })
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async login({ request, response, auth }: HttpContext) {
    const payload = await loginValidator.validate(request.all())
    const user = await User.verifyCredentials(payload.username, payload.password)
    await auth.use('web').login(user, payload.remember)
    return response.redirect('/')
  }

  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
