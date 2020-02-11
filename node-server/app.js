// var http = require('http');
// var fs = require('fs');
// http.createServer(function(req,res) {

//     res.writeHead(200, {'Content-Type': 'text/html'});
//     var html = fs.readFileSync(__dirname + '/index.html', 'utf8');
//     var message = 'Hello World...';
//     html = html.replace('{Message}', message);
//     res.end(html);
// }).listen(1337, '127.0.0.1');


// var http = require('http');
// var fs = require('fs');
// http.createServer(function(req,res) {

//     res.writeHead(200, {'Content-Type': 'text/html'});
//     fs.createReadStream(__dirname + '/index.html').pipe(res);
// }).listen(1337, '127.0.0.1');

//CREATE SERVER WITH ROUTES
// var http = require('http');
// var fs = require('fs');
// http.createServer(function(req,res) {
//     if(req.url === '/'){
//         fs.createReadStream(__dirname + '/index.html').pipe(res);
//     }
//     if(req.url === '/api'){
//     res.writeHead(200, {'Content-Type': 'application/json'});
//     var obj = {
//         firstname: 'John',
//         lastname: 'Doe'
//     };
//     res.end(JSON.stringify(obj));
// }
// }).listen(1337, '127.0.0.1');

// var moment = require('moment');
// console.log(moment().format());
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.use('/assets', express.static(__dirname + '/public'));

app.use('/', function(req, res, next){
    console.log('Request Url: ' + req.url);
    console.log(req.query.name);
    next();
});
app.get('/', function(req,res) {
    res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet/></head><body><h1>Hello world!</h1></body></html>');
});



app.get('/api', function(req,res) {
    res.json({firstname: 'John', lastname: 'Doe'});
});

app.get('/person/:id', function(req,res) {
    res.send('<html><head></head><body><h1>Person: '+ req.params.id + '</h1></body></html>');
});

app.post('/', function(req,res) {

});
app.listen(3000);
