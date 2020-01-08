

var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints/fetchTodosBasedOnStatus', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchTodosBasedOnStatus?userId=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/endpoints/fetchTodosBasedOnStatus?status=');
        assert.equal(result2.data[0].id,'null');

    });
// it fails because it returns all todos, checking for status is implemented in wrong way
    it('fetch all todo of a specific status', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchTodosBasedOnStatus', {params:{ userId:'eaghayi', status:'1'}});
      // console.log(result.data);
        assert.equal(result.data[0].id,'1');
        assert.equal(result.data.length,1);
        assert.equal(result.data[0].status,1);



    });
    // it fails because it returns all todos, checking for status is implemented in wrong way
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchTodosBasedOnStatus', {params:{ userId:'eaghayi', status:'4'}});
        assert.equal(result.data,'');


    });

//they forgot to check  if (allTodos[i].status == status)

});