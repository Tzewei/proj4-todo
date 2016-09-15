var ToDo = require('mongoose').model('ToDo');
// var colorSet = ['#1B998B','#2D3047','#FC1D42','#FFFD82','#FF9B71'];
var counter = 1;

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
        title: 'Index',
        counter: counter,
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
          title: 'Edit',
          userFullName: req.user ? req.user.fullName : ''
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
            title: 'Delete',
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
