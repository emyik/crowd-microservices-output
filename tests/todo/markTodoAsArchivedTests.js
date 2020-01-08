var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints/markTodoAsArchived', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsArchived?id=');
        assert.equal(result.data.id,'null');


    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsArchived?id=22');
        assert.equal(result.data, false);



    });

    it('update status of a todo', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/markTodoAsArchived', {params:{ id:234}});
        assert.equal(result.data, true);



    });




});