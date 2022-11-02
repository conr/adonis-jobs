import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostJobValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title: schema.string(),
    location: schema.string(),
    type: schema.enum(['Full-time', 'Part-Time', 'Contract', 'Apprenticeship / Internship']),
    organizationName: schema.string(),
    organizationLogo: schema.file.optional({
      size: '1mb',
      extnames: ['jpg', 'jpeg', 'png', 'gif'],
    }),
    url: schema.string.optional({}, [rules.url()]),
    description: schema.string.optional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'title.required': 'Title is required',
    'location.required': 'Location is required',
    'type.required': 'Type is required',
    'organizationName.required': 'Organization name is required',
    'url.url': 'URL is not valid',
  }
}
