import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Job from 'App/Models/Job'

export default class JobSeeder extends BaseSeeder {
  public async run() {
    await Job.createMany([
      {
        title: 'Software Engineer',
        location: 'New York',
        type: 'Full Time',
        organizationName: 'Google',
        url: 'https://www.google.com',
      },
      {
        title: 'Junior Developer',
        location: 'San Francisco',
        type: 'Apprenticeship / Internship',
        organizationName: 'Facebook',
        url: 'https://www.facebook.com',
      },
      {
        title: 'Senior Developer',
        location: 'Dallas, TX',
        type: 'Contract',
        organizationName: 'Texas Instruments',
        url: 'https://www.ti.com',
      },
    ])
  }
}
