import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import PostJobValidator from 'App/Validators/PostJobValidator'

export default class JobsController {
  public async index({ view }: HttpContextContract) {
    const jobs = await Job.query().where('is_confirmed', true)
    return view.render('pages/jobs/index', { jobs })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/jobs/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(PostJobValidator)

    await Job.create(payload)

    session.flash(
      'info',
      'Your job post is successfully submitted. We still need to review it before showing it on the homepage.'
    )

    return response.redirect('/')
  }
}
