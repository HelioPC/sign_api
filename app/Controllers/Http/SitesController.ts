import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Site from 'App/Models/Site'
import SiteUser from 'App/Models/SiteUser'
import User from 'App/Models/User'

export default class SitesController {
  public async subscribe ({ request, response }: HttpContextContract) {
    try {
      const { name, email } = request.only(['name', 'email'])
      const site = await Site.findBy('name', name)

      if(site === null) {
        response.status(404)
        return {
          status: 'erro',
          message: 'Site not found',
        }
      }

      let user = await User.findBy('email', email)

      if(user === null) {
        user = await User.create({
          email: email,
          state: 0,
        })
      }

      await SiteUser.create({
        id_site: site.id,
        id_user: user.id,
      })

      response.status(200)
      return {
        status: 'success',
        message: 'Subscription made successfully',
      }
    } catch (error) {
      console.log(error)
      response.status(500)
      return {
        status: 'erro',
        message: 'Unsuccessful subscription',
      }
    }
  }

  public async create ({ request, response }: HttpContextContract) {
    try {
      const { name, url } = request.only(['name', 'url'])
      const site = await Site.findBy('name', name)

      if(site !== null) {
        response.status(409)
        return {
          status: 'erro',
          message: 'Already exist',
        }
      }

      await Site.create({
        name: name,
        url: url,
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
      const sites = await Site.all()

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
