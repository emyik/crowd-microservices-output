var express = require('express'); // (npm install --save express)
var axios = require('axios');
var assert = require('assert');

const fs = require('fs');
const { describe, it } = require('mocha');

describe('test /addTodo', function () {


    it('illegal argument', async function () {
        const result = await
        axios.get('http://localhost:3001/addTodo', {params: {id: ''}});
        assert.equal(result.data.id, 'null');
        const result2 = await
        axios.get('http://localhost:3001/addTodo', {params: {id: '', title: ''}});
        assert.equal(result2.data.title, 'null');
        const result3 = await
        axios.get('http://localhost:3001/addTodo', {params: {id: '', title: '', userId: ''}});
        assert.equal(result3.data.userId, 'null');


    }

)
    ;

    it('save todo', async function () {
        const result = await  axios.get('http://localhost:3001/addTodo',
            {
                params: {
                    id: '2',
                    title: 'testAddTodo',
                    userId: 'eaghayi',
                    status: 2,
                    groupId: 'school',
                    createdTime: '12:39',
                    createdDate: '06/13/2018',
                    priority: 1,
                    address: ' ',
                    repeat: ' '
                }
            });
        assert.equal(result.data.id, 2);


    }) ;



});


describe('test /createGroup', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/createGroup?todoArray=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/createGroup?groupId=');
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
        const result2 = await axios.get('http://localhost:3001/createGroup', {params:{ todoArray:arryOfTodo, groupId:'home'}});
        // const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup?userId=eaghayi');
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
        const result = await axios.get('http://localhost:3001/createGroup', {params:{ todoArray:arryOfTodo2, groupId:'school'}});
        // const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup?userId=eaghayi');
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
        const result = await axios.get('http://localhost:3001/createGroup', {params:{ todoArray:arryOfTodo, groupId:'school'}});
        // const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup?userId=eaghayi');
        assert.equal(result.data,false);



    });
});




describe('test /deleteTodo', function () {


    it('illegal argument', async function () {
        const result = await
        axios.get('http://localhost:3001/deleteTodo', {params: {id: ''}});
        assert.equal(result.data.id, 'null');
        const result2 = await
        axios.get('http://localhost:3001/deleteTodo', {params: {id: '', title: ''}});
        assert.equal(result2.data.title, 'null');
        const result3 = await
        axios.get('http://localhost:3001/deleteTodo', {params: {id: '', title: '', userId: ''}});
        assert.equal(result3.data.userId, 'null');


    }

)
    ;

    it('delete todo', async function () {
        const result = await  axios.get('http://localhost:3001/deleteTodo',
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




});




describe('test /fetchAllTodos', function () {


      it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/fetchAllTodos?userId=');
        assert.equal(result.data[0].id,'null');

    });

    it('fetch all todo', async function() {
        const result = await axios.get('http://localhost:3001/fetchAllTodos?userId=eaghayi');
        assert.equal(result.data[0].id,'1');
        assert.equal(result.data[1].id,'2');
        assert.equal(result.data[0].description,'be sure to commit unit tests');
        assert.equal(result.data[1].description,'be sure to push unit tests');
        assert.equal(result.data[0].title,'commit code');
        assert.equal(result.data[1].title,'push code');
        assert.equal(result.data[0].dueDate,'02/25/2018');

    });
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/fetchAllTodos?userId=tlatoza');
        assert.equal(result.data,'');


    });



});




describe('test /fetchTodosBasedOnStatus', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/fetchTodosBasedOnStatus?userId=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/fetchTodosBasedOnStatus?status=');
        assert.equal(result2.data[0].id,'null');

    });
// it fails because it returns all todos, checking for status is implemented in wrong way
    it('fetch all todo of a specific status', async function() {
        const result = await axios.get('http://localhost:3001/fetchTodosBasedOnStatus', {params:{ userId:'eaghayi', status:'1'}});
      // console.log(result.data);
        assert.equal(result.data[0].id,'1');
        assert.equal(result.data.length,1);
        assert.equal(result.data[0].status,1);



    });
    // it fails because it returns all todos, checking for status is implemented in wrong way
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/fetchTodosBasedOnStatus', {params:{ userId:'eaghayi', status:'4'}});
        assert.equal(result.data,'');


    });

//they forgot to check  if (allTodos[i].status == status)

});

// https://alexanderpaterson.com/posts/how-to-start-unit-testing-your-express-apps


describe('test /fetchTodo', function () {


    // it('check input', function (done) {
    //
    //         var result = axios.get('http://localhost:3001/fetchTodo?id=').then(response => {
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
        const result = await axios.get('http://localhost:3001/fetchTodo?id=');
        assert.equal(result.data.id,'null');

    });

    it('fetch a todo', async function() {
        const result = await axios.get('http://localhost:3001/fetchTodo?id=234');
        assert.equal(result.data.id,'234');
        assert.equal(result.data.description,'be sure to commit unit tests');
        assert.equal(result.data.title,'commit code');
        assert.equal(result.data.dueDate,'02-25-2018');

    });



});



describe('test /getAllTodoOfaGroup', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup?userId=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/getAllTodoOfaGroup?groupId=');
        assert.equal(result2.data[0].id,'null');

    });

    it('fetch all todo of a group', async function() {
        const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup', {params:{ userId:'eaghayi', groupId:'school'}});
        // const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup?userId=eaghayi');
        assert.equal(result.data[0].id,'1');
        assert.equal(result.data[1].id,'2');
        assert.equal(result.data[0].description,'be sure to commit unit tests');
        assert.equal(result.data[1].description,'be sure to push unit tests');
        assert.equal(result.data[0].title,'commit code');
        assert.equal(result.data[1].title,'push code');
        assert.equal(result.data[0].dueDate,'02/25/2018');

    });
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/getAllTodoOfaGroup', {params:{ userId:'eaghayi', groupId:'work'}});
        assert.equal(result.data,'');


    });



});




describe('test /markTodoAsArchived', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsArchived?id=');
        assert.equal(result.data.id,'null');


    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsArchived?id=22');
        assert.equal(result.data, false);



    });

    it('update status of a todo', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsArchived', {params:{ id:234}});
        assert.equal(result.data, true);



    });




});




describe('test //markTodoAsDone', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsDone?id=');
        assert.equal(result.data.id,'null');


    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsDone?id=22');
        assert.equal(result.data, false);



    });

    it('update priority of a todo', async function() {
        const result = await axios.get('http://localhost:3001/markTodoAsDone', {params:{ id:234}});
        assert.equal(result.data.id,'234');
        assert.equal(result.data.description,'be sure to commit unit tests');
        assert.equal(result.data.title,'commit code');
        assert.equal(result.data.dueDate,'02-25-2018');



    });




});

// It reminds todos based on the dueDate. It looks between all active (not completed nor archived) todos find the todos which their dueDate is same as method input arguments.
//     It also should consider the value of the property of repeat (value 1 means daily repeat, 2 means weekly repeat, 3 means yearly repeat),
// based on that calculate the value of dueDate of todos in the database and compare it with input arguments; for example a todo in the database which its todo.dueDate
// property is "03/14/2020" and todo.repeat value is 1 if the input arguments are "03/15/2020 15:29", it should add this todo to the array of return values. It should call
// the 3rd party persistent libraries for interacting with the database. It should check the input argument value to be valid, dueDate and userId should not be null or empty.
//     It throws TypeError('Illegal Argument Exception') if dueDate or userId be null or empty.
//     It should check the value of dueDate properties to be in the format of "MM/DD/ YYYY, HH:MM", example: "05/02/2018,23:25". If the value of dueDate is not in the desired format,
//     it should throw TypeError ('Illegal Argument Exception').




describe('test /remindOnDueDate', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/remindOnDueDate?userId=');
        assert.equal(result.data[0].id,'null');
        const result2 = await axios.get('http://localhost:3001/remindOnDueDate?dueDate=');
        assert.equal(result2.data[0].id,'null');

    });
// it fails because it returns all todos, checking for status is implemented in wrong way
    it('fetch all todo of a specific duedate', async function() {
        const result = await axios.get('http://localhost:3001/remindOnDueDate', {params:{ userId:'eaghayi', dueDate:'02/25/2018'}});
        assert.equal(result.data[0].id,'2');
        assert.equal(result.data[0].dueDate,'02/25/2018');



    });
    // it fails because it returns all todos, checking for status is implemented in wrong way
    it('it returns empty array if it can not find any thing', async function() {
        const result = await axios.get('http://localhost:3001/remindOnDueDate', {params:{ userId:'eaghayi', dueDate:'06/25/2018'}});
        assert.equal(result.data,'');


    });

//They used fetchBasedOnStatus in the body of their implementation, since the  fetchBasedOnStatus is implemented in a wrong way, the remindOnDueDate also doesnot work

});




describe('test //updatePriorityOfaTodo', function () {


    it('illegal argument', async function() {
        const result = await axios.get('http://localhost:3001/updatePriorityOfaTodo?id=');
        assert.equal(result.data.id,'null');
        const result2 = await axios.get('http://localhost:3001/updatePriorityOfaTodo?priority=');
        assert.equal(result2.data.id,'null');
        const result3 = await axios.get('http://localhost:3001/updatePriorityOfaTodo?priority=77');
        assert.equal(result3.data.id,'null');

    });

    it('could not find object with the id', async function() {
        const result = await axios.get('http://localhost:3001/updatePriorityOfaTodo?id=22&priority=3');
         assert.equal(result.data, false);



    });

    it('update priority of a todo', async function() {
        const result = await axios.get('http://localhost:3001/updatePriorityOfaTodo', {params:{ id:234, priority:3}});
        assert.equal(result.data, true);
        const result2 = await axios.get('http://localhost:3001/updatePriorityOfaTodo', {params:{ id:2342343423, priority:3}});
        assert.equal(result2.data, false);

    });




});

describe('test /updateTodo', function () {


    it('illegal argument', async function () {
        const result = await
        axios.get('http://localhost:3001/updateTodo', {params: {id: ''}});
        assert.equal(result.data.id, 'null');
        const result2 = await
        axios.get('http://localhost:3001/updateTodo', {params: {id: '', title: ''}});
        assert.equal(result2.data.title, 'null');
        const result3 = await
        axios.get('http://localhost:3001/updateTodo', {params: {id: '', title: '', userId: ''}});
        assert.equal(result3.data.userId, 'null');


    }

)
    ;

    it('update todo', async function () {
        const result = await  axios.get('http://localhost:3001/updateTodo',
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
        const result = await  axios.get('http://localhost:3001/updateTodo',
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