import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'JobsController.index')
Route.get('/jobs/:id', 'JobsController.show')
