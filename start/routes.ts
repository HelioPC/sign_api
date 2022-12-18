/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return {
      msg: 'Bad request ⛔️',
    }
  })

  Route.group(() => {
    Route.get('/', 'UsersController.show')
    Route.post('/', 'UsersController.create')
  }).prefix('subscribers')

  Route.group(() => {
    Route.get('/', 'SitesController.show')
    Route.post('/', 'SitesController.create')
    Route.post('/sign', 'SitesController.subscribe')
  }).prefix('landings')
}).prefix('foundation')

Route.get('*', () => {
  return {
    msg: 'Invalid route, try with "foundation" prefix ❌',
  }
})
