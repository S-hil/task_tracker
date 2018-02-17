var express =require('express');

var todoController=require('./controllers/todoController');
var app =express();

//Setting Template engine
app.set('view engine','ejs');

//static files
app.use('/assets',express.static('assets'));

//fire controllers
todoController(app);

//listen to port
app.listen(2000);
console.log("We are listening at port 2000");
