import vine from '@vinejs/vine'
import { divisibleBy } from './rules.js'
import { DateTime } from 'luxon'

export const storeValidator = vine.compile(
  vine.object({
    volume: vine.number().withoutDecimals().min(50).use(divisibleBy(50)),
  })
)

export const updateValidator = vine.compile(
  vine.object({
    uuid: vine.string().trim(),
    createdAt: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    volume: vine.number().withoutDecimals().min(50).use(divisibleBy(50)).optional(),
  })
)
