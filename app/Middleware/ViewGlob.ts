import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'

export default class ViewGlob {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    View.global('timeSince', (date: never) => {
      const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

      // Years
      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }

      // Months
      interval = seconds / 2592000

      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }

      // Days
      interval = seconds / 86400

      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }

      // Hours
      interval = seconds / 3600

      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }

      // Minutes
      interval = seconds / 60

      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }

      // Seconds
      return Math.floor(seconds) + ' seconds'
    })

    await next()
  }
}
