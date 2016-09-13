module.exports = function(app) {

	var toDoController = require('../../app/controllers/todo.server.controller');

	/*	We can find solid documentation on routing here
			https://expressjs.com/en/guide/routing.html
																											*/
	app.route('/todos')
		.get(toDoController.index)

	app.route('/todo')
		.post(toDoController.create)

	app.route('/todo/new')
		.get(toDoController.new)
		.post(toDoController.create);

	// 	.get(toDoController.new)

	 app.route('/todo/:id')
	 	.patch(toDoController.update)
	 	.delete(toDoController.destroy)
 };
