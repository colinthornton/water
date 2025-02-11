import { editUser } from '#abilities/main'
import User from '#models/user'
import { storeValidator, updateValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(storeValidator)
    const user = await User.create({
      username: payload.username,
      password: payload.password,
      dailyGoal: 2000,
      timezone: payload.timezone,
    })
    await auth.use('web').login(user)
    return response.redirect('/')
  }

  async update({ request, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateValidator)
    const user = await User.findByOrFail({ uuid: payload.uuid })
    await bouncer.authorize(editUser, user)
    await user.merge(payload).save()
    return user
  }
}
