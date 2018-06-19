var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Setting up the template engine

app.set('view engine','ejs');

// Setting up static files

app.use(express.static('./public'));


todoController(app);

// Setting up the port
app.listen(3000);
console.log("Server is running on port 3000..");