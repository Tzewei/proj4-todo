var ToDo = require('mongoose').model('ToDo');

module.exports = {

  index: function(req, res, next) {
    ToDo.find({}, function(err, todos) {
      if (err) return next(err);
			   res.json(todos);
      // res.render('index',{
      //   todos: todos,
      //   title: 'Hello World',
    	// 	userFullName: req.user ? req.user.fullName : ''
      // })
    });
  },

  // new: function(req , res, next){
  //
  // },

  create: function(req, res, next) {
    var toDo = new ToDo(req.body);

    toDo.save(function(err) {
      if (err) return next(err);
      res.json(toDo);
    });

  },

  // edit: function(req, res, next){
  //
  // },

	update: function(req, res, next) {
	  ToDo.findByIdAndUpdate(req.params.id, req.body, function(err, todo) {
	    if (err) {
	      return next(err);
	    } else {
	      res.json(todo);
	    }
	  });
	},

	destroy: function(req, res, next) {
		ToDo.remove({
			_id: req.params.id
		}, function(err, todo){
			if (err) return next(err);
			res.send('Task successfully deleted')
		})
  }

}
