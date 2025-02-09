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

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.on('login').renderInertia('login')
    router.post('login', [AuthController, 'login'])
    router.post('signup', [AuthController, 'signup'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/').renderInertia('home')
    router.post('logout', [AuthController, 'logout'])
  })
  .use(middleware.auth())

router.get('health', () => 'OK')
