import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('uuid').unique()
      table.integer('daily_goal').unsigned()
      table.string('timezone')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('uuid', 'daily_goal', 'timezone')
    })
  }
}
