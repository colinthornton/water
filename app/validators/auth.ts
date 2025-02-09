import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
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
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(1),
    password: vine.string().minLength(7),
    remember: vine.boolean(),
  })
)
