import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SiteUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_site: number

  @column()
  public id_user: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
