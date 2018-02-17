var bodyParser = require('body-parser');
var mongoose=require('mongoose');
//Connect to the database
mongoose.connect("mongodb://test:test@ds239968.mlab.com:39968/todo");

// Create a blueprint of data
var todoSchema = new mongoose.Schema({
  item:String
});

var Todo = mongoose.model('Todo',todoSchema);
// var item1 = Todo({item:'Buy MDH Chicken Masala'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved')
// })

var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports=function(app){

  app.get('/',function(req,res){

    res.render('home');
  });

  app.get('/todo',function(req,res){
    //Get data from Database
    Todo.find({},function(err,data){
      if (err) throw err;
      res.render('todo',{todos:data});
    })

  });

  app.post('/todo',urlencodedParser,function(req,res){
    //Get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);

    })
  });

  app.delete('/todo/:item',function(req,res){
    //Delete item from mongodb
    Todo.find({item:req.params.replace(/\-/g," ")}).remove(function(err,data){
      if (err) throw err;
      res.json(data);
    })
  });


};
