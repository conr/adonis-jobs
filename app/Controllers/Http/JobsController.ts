import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import PostJobValidator from 'App/Validators/PostJobValidator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'

export default class JobsController {
  public async index({ view }: HttpContextContract) {
    const jobs = await Job.all()
    return view.render('pages/jobs/index', { jobs })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/jobs/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const { organizationLogo, ...body } = await request.validate(PostJobValidator)

    const payload: Record<string, any> = body

    if (organizationLogo) {
      payload.organizationLogo = Attachment.fromFile(organizationLogo)
    }

    await Job.create(payload)

    session.flash('info', 'Your job post is successfully submitted.')

    return response.redirect('/')
  }
}
