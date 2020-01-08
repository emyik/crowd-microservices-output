var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints//updatePriorityOfaTodo', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo?id=');
        assert.equal(result.data.id,'null');
        const result2 = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo?priority=');
        assert.equal(result2.data.id,'null');
        const result3 = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo?priority=77');
        assert.equal(result3.data.id,'null');

    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo?id=22&priority=3');
         assert.equal(result.data, false);



    });

    it('update priority of a todo', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo', {params:{ id:234, priority:3}});
        assert.equal(result.data, true);
        const result2 = await axios.get('http://localhost:3001/endpoints/updatePriorityOfaTodo', {params:{ id:2342343423, priority:3}});
        assert.equal(result2.data, false);

    });




});