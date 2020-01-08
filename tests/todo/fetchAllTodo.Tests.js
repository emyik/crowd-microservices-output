var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints/fetchAllTodos', function () {


      it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchAllTodos?userId=');
        assert.equal(result.data[0].id,'null');

    });

    it('fetch all todo', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchAllTodos?userId=eaghayi');
        assert.equal(result.data[0].id,'1');
        assert.equal(result.data[1].id,'2');
        assert.equal(result.data[0].description,'be sure to commit unit tests');
        assert.equal(result.data[1].description,'be sure to push unit tests');
        assert.equal(result.data[0].title,'commit code');
        assert.equal(result.data[1].title,'push code');
        assert.equal(result.data[0].dueDate,'02/25/2018');

    });
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchAllTodos?userId=tlatoza');
        assert.equal(result.data,'');


    });



});