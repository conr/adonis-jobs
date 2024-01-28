import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public location: string

  @column()
  public type: string

  @column()
  public organizationName: string

  @attachment({ folder: 'logos', preComputeUrl: true })
  public organizationLogo?: AttachmentContract

  @column()
  public url?: string

  @column()
  public description?: string

  @column()
  public confirmed?: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
