/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Gulp from '#models/gulp'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const editUser = Bouncer.ability((user: User, targetUser: User) => {
  return user.id === targetUser.id
})

export const editGulp = Bouncer.ability((user: User, gulp: Gulp) => {
  return user.id === gulp.userId
})
