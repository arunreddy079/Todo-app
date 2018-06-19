var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// db stuff
mongoose.connect('mongodb://test:test123@ds163410.mlab.com:63410/arun');

var todoschema = new mongoose.Schema({
    item: String 
 });
 
 var Todo = mongoose.model('Todo', todoschema);

// Parser for post request
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
    
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        Todo.find({},function(err, data){
           if(err) throw err;
            res.render('todo',{todos: data});
        });
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
        //get data from the view and add it to mangodb
        var newTodoItem = Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        }) ;       
    });
    
    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/ /g,"-")}).remove(function(err,data){
            if(err) throw err;
            res.json(data);
        });
    });
    
};