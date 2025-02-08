import User from '#models/user'

export default class UsersController {
  async index() {
    return User.query().limit(100).orderBy('id')
  }
}
