var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints//markTodoAsDone', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsDone?id=');
        assert.equal(result.data.id,'null');


    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsDone?id=22');
        assert.equal(result.data, false);



    });

    it('update priority of a todo', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsDone', {params:{ id:234}});
        assert.equal(result.data.id,'234');
        assert.equal(result.data.description,'be sure to commit unit tests');
        assert.equal(result.data.title,'commit code');
        assert.equal(result.data.dueDate,'02-25-2018');



    });




});