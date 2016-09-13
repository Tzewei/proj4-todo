var ToDo = require('mongoose').model('ToDo');

module.exports = {

  index: function(req, res) {
    // if (!req.user) {
    //     res.redirect('/');
    //     return;
    // }
    ToDo.find({}, function(err, todos) {
      if (err) return next(err);
			  //  res.json(todos);

      res.render('todo/todoindex',{
        todos: todos,
        // title: 'Todo Index',
    		// userFullName: req.user ? req.user.fullName : ''
      });
    });
  },

  new: function(req , res){
    res.render('todo/todoaddtask');
  },

  create: function(req, res) {
    console.log(req.body)
    var toDo = new ToDo(req.body);

    toDo.save(function(err) {
      if (err) return next(err);
      res.redirect('/todos')
    });

  },

  // edit: function(req, res, next){
  //
  // },

	update: function(req, res) {
	  ToDo.findByIdAndUpdate(req.params.id, req.body, function(err, todo) {
	    if (err) {
	      return next(err);
	    } else {
	      res.json(todo);
	    }
	  });
	},

	destroy: function(req, res) {
		ToDo.remove({
			_id: req.params.id
		}, function(err, todo){
			if (err) return next(err);
			res.send('Task successfully deleted')
		})
  }

}
