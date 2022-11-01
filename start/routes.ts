import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'JobsController.index').as('jobs.index')
Route.get('/jobs/new', 'JobsController.create').as('jobs.create')
Route.post('/jobs/new', 'JobsController.store').as('jobs.store')
Route.get('/jobs/:id', 'JobsController.show').as('jobs.show')
