import vine from '@vinejs/vine'
import { divisibleBy } from './rules.js'

export const storeValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .minLength(1)
      .unique(async (db, value) => {
        const user = await db.from('users').where('username', value).first()
        return !user
      }),
    password: vine.string().minLength(7).confirmed(),
    timezone: vine.string().trim().in(Intl.supportedValuesOf('timeZone')),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    uuid: vine.string().trim(),
    dailyGoal: vine.number().min(50).use(divisibleBy(50)).optional(),
    timezone: vine.string().trim().in(Intl.supportedValuesOf('timeZone')).optional(),
  })
)
