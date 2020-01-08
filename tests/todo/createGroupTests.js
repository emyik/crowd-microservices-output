

var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');



describe('test /endpoints/createGroup', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/endpoints/createGroup?todoArray=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/endpoints/createGroup?groupId=');
        assert.equal(result2.data[0].id,'null');

    });

    it('sets a label (groupId) for an array of todos', async function() {

        // const arryOfTodo= [{
        //     id: '209',
        //     title: 'testAddTodo',
        //     userId: 'eaghayi',
        //     dueDate:'09-23-2018',
        //     status: 2,
        //     groupId: 'school3',
        //     createdTime: '12:39',
        //     createdDate: '06-13-2018',
        //     priority: 1,
        //     address: ' ',
        //     repeat: ' '
        // },{
        //     id: '300',
        //     title: 'testAddTodo',
        //     userId: 'eaghayi',
        //     dueDate:'09-23-2018',
        //     status: 2,
        //     groupId: 'school2',
        //     createdTime: '12:39',
        //     createdDate: '06-13-2018',
        //     priority: 1,
        //     address: ' ',
        //     repeat: ' '
        // }];

        const arryOfTodo =   { "todoArray": [
                {
                    "title": "coding",
                    "description": "work on the crowd cod",
                    "dueDate": "03-14-2020",
                    "dataStoreId": "todo3",
                    "userId": "emad.aghayi",
                    "id": 234,
                    "status": 1,
                    "groupId": "schoolworks",
                    "createdTime": "13:51",
                    "createdDate": "05/21/2018",
                    "priority": 3,
                    "address": "Fairfax,VA,US 22032",
                    "repeat": "1"
                }

            ]
        };
        const result2 = await axios.get('http://localhost:3001/endpoints/createGroup', {params:{ todoArray:arryOfTodo, groupId:'home'}});
        // const result = await axios.get('http://localhost:3001/endpoints/getAllTodoOfaGroup?userId=eaghayi');
        assert.equal(result2.data,true); // since all todos are  in DB, it should return true




    });
    it('it returns false if it can not find the all todos items for creating the group', async function() {
        const arryOfTodo2 =   { "todoArray": [
                {
                    "title": "coding",
                    "description": "work on the crowd cod",
                    "dueDate": "03-14-2020",
                    "dataStoreId": "todo3",
                    "userId": "emad.aghayi",
                    "id": 234,
                    "status": 1,
                    "groupId": "schoolworks",
                    "createdTime": "13:51",
                    "createdDate": "05/21/2018",
                    "priority": 3,
                    "address": "Fairfax,VA,US 22032",
                    "repeat": "1"
                },
                {
                    "title": "coding",
                    "description": "work on the crowd cod",
                    "dueDate": "03-14-2018",
                    "dataStoreId": "todo3",
                    "userId": "emad.aghayi",
                    "id": 2,
                    "status": 3,
                    "groupId": "schoolworks",
                    "createdTime": "13:51",
                    "createdDate": "05/21/2018",
                    "priority": 2,
                    "address": "Fairfax,VA,US 22032",
                    "repeat": "2"
                },
                {
                    "title": "coding",
                    "description": "work on the crowd cod",
                    "dueDate": "03-14-2019",
                    "dataStoreId": "todo3",
                    "userId": "emad.aghayi",
                    "id": 3,
                    "status": 2,
                    "groupId": "Homework",
                    "createdTime": "13:51",
                    "createdDate": "05/21/2018",
                    "priority": 1,
                    "address": "Fairfax,VA,US 22032",
                    "repeat": "3"
                }
            ]
        };
        const result = await axios.get('http://localhost:3001/endpoints/createGroup', {params:{ todoArray:arryOfTodo2, groupId:'school'}});
        // const result = await axios.get('http://localhost:3001/endpoints/getAllTodoOfaGroup?userId=eaghayi');
        assert.equal(result.data,false); // since all todos are not in DB, it should return flase


    });

   // the groupId already existed in the other todos

    it('the groupId already existed in the other todos', async function() {

        const arryOfTodo =   { "todoArray": [
                {
                    "title": "coding",
                    "description": "work on the crowd cod",
                    "dueDate": "03-14-2020",
                    "dataStoreId": "todo3",
                    "userId": "emad.aghayi",
                    "id": 234,
                    "status": 1,
                    "groupId": "school",
                    "createdTime": "13:51",
                    "createdDate": "05/21/2018",
                    "priority": 3,
                    "address": "Fairfax,VA,US 22032",
                    "repeat": "1"
                }

            ]
        };
        const result = await axios.get('http://localhost:3001/endpoints/createGroup', {params:{ todoArray:arryOfTodo, groupId:'school'}});
        // const result = await axios.get('http://localhost:3001/endpoints/getAllTodoOfaGroup?userId=eaghayi');
        assert.equal(result.data,false);



    });
});