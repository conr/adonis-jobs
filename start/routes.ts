import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'JobsController.index')
Route.get('/jobs/new', 'JobsController.create')
Route.post('/jobs/new', 'JobsController.store')
