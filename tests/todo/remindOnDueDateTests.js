// It reminds todos based on the dueDate. It looks between all active (not completed nor archived) todos find the todos which their dueDate is same as method input arguments.
//     It also should consider the value of the property of repeat (value 1 means daily repeat, 2 means weekly repeat, 3 means yearly repeat),
// based on that calculate the value of dueDate of todos in the database and compare it with input arguments; for example a todo in the database which its todo.dueDate
// property is "03/14/2020" and todo.repeat value is 1 if the input arguments are "03/15/2020 15:29", it should add this todo to the array of return values. It should call
// the 3rd party persistent libraries for interacting with the database. It should check the input argument value to be valid, dueDate and userId should not be null or empty.
//     It throws TypeError('Illegal Argument Exception') if dueDate or userId be null or empty.
//     It should check the value of dueDate properties to be in the format of "MM/DD/ YYYY, HH:MM", example: "05/02/2018,23:25". If the value of dueDate is not in the desired format,
//     it should throw TypeError ('Illegal Argument Exception').

var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints/remindOnDueDate', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/remindOnDueDate?userId=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/endpoints/remindOnDueDate?dueDate=');
        assert.equal(result2.data[0].id,'null');

    });
// it fails because it returns all todos, checking for status is implemented in wrong way
    it('fetch all todo of a specific duedate', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/remindOnDueDate', {params:{ userId:'eaghayi', dueDate:'02/25/2018'}});
        assert.equal(result.data[0].id,'2');
        assert.equal(result.data[0].dueDate,'02/25/2018');



    });
    // it fails because it returns all todos, checking for status is implemented in wrong way
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/remindOnDueDate', {params:{ userId:'eaghayi', dueDate:'06/25/2018'}});
        assert.equal(result.data,'');


    });

//They used fetchBasedOnStatus in the body of their implementation, since the  fetchBasedOnStatus is implemented in a wrong way, the remindOnDueDate also doesnot work

});