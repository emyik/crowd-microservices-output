var express = require('express');
var router = express.Router();
var service = require('../service/microservice');
var testEnvironment = true;
router.get('/addTodo', function (req, res) {
    res.send(service.addTodo(req.query.todo));
});

router.post('/addTodo', function (req, res) {
    res.send(service.addTodo(req.body.todo));
});


router.get('/updateTodo', function (req, res) {
    res.send(service.updateTodo(req.query.todo));
});

router.post('/updateTodo', function (req, res) {
    res.send(service.updateTodo(req.body.todo));
});


router.get('/deleteTodo', function (req, res) {
    res.send(service.deleteTodo(req.query.todo));
});

router.post('/deleteTodo', async function (req, res) {
    const deleted = await service.deleteTodo(req.body.todo);
    res.send(deleted);
});


router.get('/SaveObject', function (req, res) {
    res.send(service.SaveObjectImplementation(req.query.todo));
});

router.post('/SaveObject', function (req, res) {
    res.send(service.SaveObjectImplementation(req.body.todo));
});


// router.get('/fetchTodo', function (req, res) {
//     console.log('fetchTod',service.fetchTodo(req.query.id));
//     res.send(service.fetchTodo(req.query.id));
// });
router.get('/fetchTodo', async (req, res, next) => {
    try {
        const todo = await service.fetchTodo(req.query.id);
        res.json(todo);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const todo = {
                title: 'null',
                description: 'null',
                dueDate: 'null',
                dataStoreId: "null",
                userId: 'null',
                id: 'null',
                status: 'null',
                groupId: 'null',
                createdTime: 'null',
                createdDate: 'null',
                priority: 'null',
                address: 'null',
                repeat: 'null'
            };
            res.send(todo);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }
});
router.post('/fetchTodo', function (req, res) {
    res.send(service.fetchTodo(req.body.id));
});


router.get('/FetchObject', function (req, res) {
    res.send(service.FetchObjectImplementation(req.query.objectId));
});

router.post('/FetchObject', function (req, res) {
    res.send(service.FetchObjectImplementation(req.body.objectId));
});


router.get('/DeleteObject', function (req, res) {
    res.send(service.DeleteObject(req.query.todo));
});

router.post('/DeleteObject', function (req, res) {
    res.send(service.DeleteObject(req.body.todo));
});


router.get('/UpdateObject', function (req, res) {
    res.send(service.UpdateObject(req.query.todo));
});

router.post('/UpdateObject', function (req, res) {
    res.send(service.UpdateObject(req.body.todo));
});


router.get('/fetchAllTodos', async (req, res, next) => {
        if (testEnvironment) {
            try {
                const todoList = await service.fetchAllTodos(req.query.userId);
                res.json(todoList);
            } catch (e) {
                //this will eventually be handled by your error handling middleware
                if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
                    const nullTodo = [{
                        title: 'null',
                        description: 'null',
                        dueDate: 'null',
                        dataStoreId: "null",
                        userId: 'null',
                        id: 'null',
                        status: 'null',
                        groupId: 'null',
                        createdTime: 'null',
                        createdDate: 'null',
                        priority: 'null',
                        address: 'null',
                        repeat: 'null'
                    }];
                    res.send(nullTodo);
                } else {

                    console.log('exception: ', e.message);
                    next(e);
                }
            }
        } else {
            service.fetchAllTodosFromDB(req.query.userId, res);
        }
    }
);

router.post('/fetchAllTodos', function (req, res) {
    // res.send(service.fetchAllTodos(req.body.userId));
    service.fetchAllTodosFromDB(req.query.userId, res)
});


router.get('/FetchAllObjects', function (req, res) {
    res.send(service.FetchAllObjectsImplementation(req.query.userId));
});

router.post('/FetchAllObjects', function (req, res) {
    res.send(service.FetchAllObjectsImplementation(req.body.userId));
});


router.get('/createGroup', function (req, res) {
    res.send(service.createGroup(req.query.todoArray, req.query.groupId));
});

router.post('/createGroup', function (req, res) {
    res.send(service.createGroup(req.body.todoArray, req.body.groupId));
});


router.post('/getAllTodoOfaGroup', function (req, res) {
    res.send(service.getAllTodoOfaGroup(req.body.groupId, req.body.userId));
});

router.get('/getAllTodoOfaGroup', async (req, res,next) => {


    try {
        const todoList = await service.getAllTodoOfaGroup(req.query.groupId, req.query.userId);
        res.json(todoList);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullTodoList = [{
                title: 'null',
                description: 'null',
                dueDate: 'null',
                dataStoreId: "null",
                userId: 'null',
                id: 'null',
                status: 'null',
                groupId: 'null',
                createdTime: 'null',
                createdDate: 'null',
                priority: 'null',
                address: 'null',
                repeat: 'null'
            }];
            res.send(nullTodoList);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }
    //res.send(service.getAllTodoOfaGroup(req.body.groupId, req.body.userId));
});


router.get('/updatePriorityOfaTodo', function (req, res) {
    res.send(service.updatePriorityOfaTodo(req.query.id, req.query.priority));
});

router.post('/updatePriorityOfaTodo', function (req, res) {
    res.send(service.updatePriorityOfaTodo(req.body.id, req.body.priority));
});


router.get('/fetchTodosBasedOnStatus', function (req, res) {
    res.send(service.fetchTodosBasedOnStatus(req.query.userId, req.query.status));
});

router.post('/fetchTodosBasedOnStatus', function (req, res) {
    res.send(service.fetchTodosBasedOnStatus(req.body.userId, req.body.status));
});


router.get('/markTodoAsDone', function (req, res) {
    res.send(service.markTodoAsDone(req.query.id));
});

router.post('/markTodoAsDone', function (req, res) {
    res.send(service.markTodoAsDone(req.body.id));
});


router.get('/remindOnDueDate', function (req, res) {
    res.send(service.remindOnDueDate(req.query.userId, req.query.dueDate));
});

router.post('/remindOnDueDate', function (req, res) {
    res.send(service.remindOnDueDate(req.body.userId, req.body.dueDate));
});


router.get('/markTodoAsArchived', function (req, res) {
    res.send(service.markTodoAsArchived(req.query.id));
});

router.post('/markTodoAsArchived', function (req, res) {
    res.send(service.markTodoAsArchived(req.body.id));
});


module.exports = router;
