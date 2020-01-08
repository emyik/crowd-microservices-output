var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');


describe('test /endpoints/updateTodo', function () {


    it('illegal argument', async function () {
        const result = await
        axios.get('http://localhost:3001/endpoints/updateTodo', {params: {id: ''}});
        assert.equal(result.data.id, 'null');
        const result2 = await
        axios.get('http://localhost:3001/endpoints/updateTodo', {params: {id: '', title: ''}});
        assert.equal(result2.data.title, 'null');
        const result3 = await
        axios.get('http://localhost:3001/endpoints/updateTodo', {params: {id: '', title: '', userId: ''}});
        assert.equal(result3.data.userId, 'null');


    }

)
    ;

    it('update todo', async function () {
        const result = await  axios.get('http://localhost:3001/endpoints/updateTodo',
            {
                params: {
                    id: '2',
                    title: 'testAddTodo',
                    userId: 'eaghayi',
                    dueDate:'09-23-2018',
                    status: 2,
                    groupId: 'school',
                    createdTime: '12:39',
                    createdDate: '06-13-2018',
                    priority: 1,
                    address: ' ',
                    repeat: ' '
                }
            });
        assert.equal(result.data.id, 2);


    }) ;

    it('check checkDateFormat helper method ', async function () {
        const result = await  axios.get('http://localhost:3001/endpoints/updateTodo',
            {
                params: {
                    id: '2',
                    title: 'testAddTodo',
                    userId: 'eaghayi',
                    dueDate:'23-2018',
                    status: 2,
                    groupId: 'school',
                    createdTime: '12:39',
                    createdDate: '06-13-2018',
                    priority: 1,
                    address: ' ',
                    repeat: ' '
                }
            });
        assert.equal(result.data.id, 'null');


    }) ;


});