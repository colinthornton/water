/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AppController = () => import('#controllers/app_controller')
const GulpController = () => import('#controllers/gulp_controller')
const SessionController = () => import('#controllers/session_controller')
const UserController = () => import('#controllers/user_controller')

router.get('health', () => 'OK')

router
  .group(() => {
    router.get('login', [SessionController, 'create'])
    router.post('login', [SessionController, 'store'])
    router.post('signup', [UserController, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [SessionController, 'destroy'])
    router.post('gulps', [GulpController, 'store'])
    router.get('/', [AppController, 'home'])
  })
  .use(middleware.auth())
