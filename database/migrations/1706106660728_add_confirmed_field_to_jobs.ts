import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('confirmed').defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('confirmed')
    })
  }
}
