import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async create ({ request, response }: HttpContextContract) {
    try {
      const { name, email } = request.only(['name', 'email'])
      const user = await User.findBy('name', name)

      if(user !== null) {
        response.status(409)
        return {
          status: 'erro',
          message: 'Already exist',
        }
      }

      await User.create({
        name: name,
        email: email,
        state: 0,
      })

      response.status(200)
      return {
        status: 'success',
        message: 'Created ✅',
      }
    } catch (error) {
      console.log(error)
      response.status(500)
      return {
        status: 'erro',
        message: 'Failed',
      }
    }
  }

  public async show ({ response }: HttpContextContract) {
    try {
      const sites = await User.all()

      response.status(200)
      return {
        status: 'success',
        data: sites,
        message: 'Revealed ✅',
      }
    } catch (error) {
      console.log(error)
      response.status(500)
      return {
        status: 'erro',
        message: 'Failed',
      }
    }
  }
}
