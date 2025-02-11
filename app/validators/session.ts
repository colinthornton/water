import vine from '@vinejs/vine'

export const storeValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(1),
    password: vine.string().minLength(7),
    remember: vine.boolean(),
  })
)
