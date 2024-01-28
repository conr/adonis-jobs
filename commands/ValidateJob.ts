import { BaseCommand, args } from '@adonisjs/core/build/standalone'
import Job from 'App/Models/Job'

export default class ValidateJob extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'validate:job'

  @args.string({ description: 'The id of the job' })
  public jobId: string

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    const jobPost = await Job.findByOrFail('id', this.jobId)
    jobPost.confirmed = true
    await jobPost.save()
  }
}
