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

      res.render('todoindex',{
        todos: todos,
        title: 'Todo Index',
    		userFullName: req.user ? req.user.fullName : ''
      });
    });
  },

  new: function(req , res){
    res.render('todoaddtask',{
      title: 'Add new Task',
      userFullName: req.user ? req.user.fullName : ''
    });
  },

  create: function(req, res) {
    console.log(req.body)
    var toDo = new ToDo(req.body);

    toDo.save(function(err) {
      if (err) return next(err);
      res.redirect('/todos')
    });

  },

  edit: function(req, res){
    ToDo.findById(req.params.id, function (err, found) {
      if (err) {
        return next(err);
      } else {
        res.render('todoEdit',{
          todo:found,
          title: 'To Do Edit',
        });
      }
    });
  },


  	update: function(req, res) {
      console.log('params id' + req.params.id)
      console.log('body' + req.body)
  	  ToDo.findByIdAndUpdate(req.params.id, req.body, function(err, todo) {
        if (err) {
  	      return next(err);
  	    } else {
  	      // res.redirect('/todo/' + req.params.id)
          res.redirect('/todos')
  	    }
  	  });
  	},

    del: function(req, res){
      ToDo.findById(req.params.id, function (err, found) {
        if (err) {
          return next(err);
        } else {
          res.render('todoDelete',{
            todo:found,
            title: 'To Do Delete',
            userFullName: req.user ? req.user.fullName : ''
          });
        }
      });
    },


	destroy: function(req, res) {
    ToDo.remove({
			_id: req.params.id
		}, function(err, todo){
			if (err) return next(err);
			// res.send('Task successfully deleted')
      res.redirect('/todos')
		})
  }

}
