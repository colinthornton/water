import type { HttpContext } from '@adonisjs/core/http'
import { storeValidator, updateValidator } from '#validators/gulp'
import Gulp from '#models/gulp'
import { editGulp } from '#abilities/main'

export default class GulpController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(storeValidator)
    await Gulp.create({ userId: user.id, volume: payload.volume })
    return response.redirect('/')
  }

  async update({ request, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateValidator)
    const gulp = await Gulp.findByOrFail({ uuid: payload.uuid })
    await bouncer.authorize(editGulp, gulp)
    await gulp.merge(payload).save()
    return gulp
  }
}
