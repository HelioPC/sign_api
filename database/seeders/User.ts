import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Site from 'App/Models/Site'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Site.createMany([
      {
        name: 'Kinergy',
        url: 'kinergy.network',
        state: 0,
      },
      {
        name: 'Codice',
        url: 'codice.in',
        state: 0,
      },
    ])
  }
}
