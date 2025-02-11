import { DateTime } from 'luxon'
import { nanoid } from 'nanoid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Gulp from '#models/gulp'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  static rememberMeTokens = DbRememberMeTokensProvider.forModel(User)

  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ prepare: (uuid) => uuid ?? nanoid() })
  declare uuid: string

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare dailyGoal: number

  @column()
  declare timezone: string

  @hasMany(() => Gulp)
  declare gulps: HasMany<typeof Gulp>
}
