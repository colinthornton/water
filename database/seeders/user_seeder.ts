import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Gulp from '#models/gulp'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await User.query().delete()

    const user = await User.create({
      username: 'superadmin',
      password: 'test123',
      dailyGoal: 2000,
      timezone: 'Asia/Tokyo',
    })
    await Gulp.createMany([
      { userId: user.id, volume: 500, createdAt: DateTime.now().minus({ day: 1 }) },
      { userId: user.id, volume: 500, createdAt: DateTime.now() },
    ])
  }
}
