import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from 'App/Models/Job'
import PostJobValidator from 'App/Validators/PostJobValidator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios'

export default class JobsController {
  public async index({ view }: HttpContextContract) {
    const jobs = await Job.query().where('confirmed', true).orderBy('created_at', 'desc')
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

    if (!payload.url && !payload.description) {
      session.flash('error', 'URL or description is required')
      return response.redirect().back()
    }

    const { id } = await Job.create(payload)

    try {
      await axios.post(Env.get('DISCORD_WEBHOOK_URL'), {
        content: `New job posted: <https://adonisjobs.com/jobs/${id}>`,
      })
    } catch (error) {
      console.log(error)
    }

    session.flash(
      'info',
      '🎉 Your job has been posted successfully ! Awaiting confirmation from the admin.'
    )

    if (payload.description) {
      return response.redirect().toRoute('jobs.show', [id])
    }

    return response.redirect('/')
  }

  public async show({ view, params, response }: HttpContextContract) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.notFound()
    }

    return view.render('pages/jobs/show', { job })
  }
}
