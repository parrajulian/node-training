//EVENT EMITTER EXAMPLE

// var Emitter = require('events');
// var ConfigEmitter = require('./config').events;

// var emtr = new Emitter();

// emtr.on(ConfigEmitter.GREET, function() {
//     console.log('Somewhere, someone said hello');
// });

// emtr.on(ConfigEmitter.GREET, function() {
//     console.log('A greeting ocurred!');
// });

// console.log('Hello!');
// emtr.emit('greet');

//Object properties and call method - scope
// var obj = {
//     name: 'John Doe',
//     greet: function() {
//         console.log(`Hello ${this.name}`);
//     }}

//     obj.greet();
//     obj.greet.call({name : 'Jane Doe'});

// var Greetr = require('./greet');

// var greeter1 = new Greetr();

// greeter1.on('greet', function(data) {
//     console.log('Someone greeted!: ' + data);
// });

// greeter1.greet('Tony');

//ES6 Class
// 'use strict';

// class Person {

//     constructor(firstname, lastname) {
//         this.firstname = firstname;
//         this.lastname = lastname;
//     }

//     greet(){
//         console.log('Hello, ' + this.firstname);
//     }
// }
//     var john = new Person('John','Doe');
//     john.greet();

//Buffer 
// var buf = new Buffer('Hello', 'utf8');
// console.log(buf);
// console.log(buf.toString());
// console.log(buf.toJSON());


//CALLBACKS
// function greet(callback) {
//     console.log('Hello!');
//     callback();
// }

// greet(function(){
//     console.log('The callback was invoked!');
// })


//FILES- READ AND WRITE - SYNC AND ASYNC
// var fs = require('fs');

// var greet = fs.readFileSync(__dirname + '/greet.txt','utf8');


// var greet2 = fs.readFile(__dirname + '/greet.txt', function(err,data){

// });
// console.log(greet);


//FILES - READ AND WRITE VIA STREAM CHUNKS
var fs = require('fs');
var readable = fs.createReadStream(__dirname + '/greet.txt', {encoding: 'utf8', highWaterMark:16*1024});
var writable = fs.createWriteStream(__dirname + '/greetcopy.txt');

readable.on('data', function(chunk){
    console.log(chunk);
    writable.write(chunk);
});