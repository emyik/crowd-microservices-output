// https://alexanderpaterson.com/posts/how-to-start-unit-testing-your-express-apps

var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');

describe('test /endpoints/fetchTodo', function () {


    // it('check input', function (done) {
    //
    //         var result = axios.get('http://localhost:3001/endpoints/fetchTodo?id=').then(response => {
    //             console.log(response.data);
    //             assert.equal('21',response.data);
    //             done();
    //     }).catch(error => {
    //             console.log("error in response: ",error.response);
    //     });
    //     // setTimeout(function(){
    //     //     //failing test
    //     //
    //     //    // console.log(result.data);
    //     //     done();     // Tells mocha to run next test.
    //     // }, 1900);
    //
    //
    //
    // });
    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchTodo?id=');
        assert.equal(result.data.id,'null');

    });

    it('fetch a todo', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/fetchTodo?id=234');
        assert.equal(result.data.id,'234');
        assert.equal(result.data.description,'be sure to commit unit tests');
        assert.equal(result.data.title,'commit code');
        assert.equal(result.data.dueDate,'02-25-2018');

    });



});