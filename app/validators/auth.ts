import vine from '@vinejs/vine'

export const signupValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .maxLength(254)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(7).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(254),
    password: vine.string().minLength(7),
    remember: vine.boolean(),
  })
)
