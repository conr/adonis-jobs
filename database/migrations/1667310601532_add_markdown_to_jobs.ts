import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdddescriptionToJobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.alterTable('jobs', (table) => {
      table.setNullable('url')
      table.text('description')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
