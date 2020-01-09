var express = require('express');
var router = express.Router();
var shoppingService = require('../service/shopping_session1_service');
var testEnvironment = true;

router.get('/searchItems', async (req, res, next) => {
    try {
        const item = await shoppingService.searchItems(req.query.userId, req.query.criteria);
        res.json(item);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'InvalidArgumentException') {
            const item = [{
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'
            }];
            res.send(item);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});

router.get('/fetchTopMostSimilarItems', async (req, res, next) => {
    try {
        const itemList = await shoppingService.fetchTopMostSimilarItems(req.query.userId, req.query.itemName);
        res.json(itemList);
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            const itemList = [{
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'}];
            res.send(itemList);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
    //res.send(service.updateTodo(req.query.todo));
})
;

router.post('/updateTodo', function (req, res) {
    res.send(shoppingService.updateTodo(req.body.todo));
});


router.get('/deleteTodo', async (req, res, next) => {

    try {
        const todoParam = {
            title: req.query.title,
            description: req.query.description,
            dueDate: req.query.dueDate,
            dataStoreId: req.query.dataStoreId,
            userId: req.query.userId,
            id: req.query.id,
            status: req.query.status,
            groupId: req.query.groupId,
            createdTime: req.query.createdTime,
            createdDate: req.query.createdDate,
            priority: req.query.priority,
            address: req.query.address,
            dataStoreId: 'eaghayi-school',
            repeat: req.query.repeat
        };
        const todo = await shoppingService.deleteTodo(todoParam);
        res.json(todo);
    } catch
        (e) {
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


    // res.send(service.deleteTodo(req.query.todo));
});

router.post('/deleteTodo', async function (req, res) {
        const deleted = await shoppingService.deleteTodo(req.body.todo);
        res.send(deleted);
    }
)
;


router.get('/SaveObject', function (req, res) {
    res.send(shoppingService.SaveObjectImplementation(req.query.todo));
});

router.post('/SaveObject', function (req, res) {
    res.send(shoppingService.SaveObjectImplementation(req.body.todo));
});


// router.get('/fetchTodo', function (req, res) {
//     console.log('fetchTod',service.fetchTodo(req.query.id));
//     res.send(service.fetchTodo(req.query.id));
// });
router.get('/fetchTodo', async (req, res, next) => {
    try {
        const todo = await shoppingService.fetchTodo(req.query.id);
        res.json(todo);
    } catch
        (e) {
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
})
;
router.post('/fetchTodo', function (req, res) {
    res.send(shoppingService.fetchTodo(req.body.id));
});


router.get('/FetchObject', function (req, res) {
    res.send(shoppingService.FetchObjectImplementation(req.query.objectId));
});

router.post('/FetchObject', function (req, res) {
    res.send(shoppingService.FetchObjectImplementation(req.body.objectId));
});


router.get('/DeleteObject', function (req, res) {
    res.send(shoppingService.DeleteObject(req.query.todo));
});

router.post('/DeleteObject', function (req, res) {
    res.send(shoppingService.DeleteObject(req.body.todo));
});


router.get('/UpdateObject', function (req, res) {
    res.send(shoppingService.UpdateObject(req.query.todo));
});

router.post('/UpdateObject', function (req, res) {
    res.send(shoppingService.UpdateObject(req.body.todo));
});


router.get('/fetchAllTodos', async (req, res, next) => {
        if (testEnvironment) {
            try {
                const todoList = await
                    shoppingService.fetchAllTodos(req.query.userId);
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
            shoppingService.fetchAllTodosFromDB(req.query.userId, res);
        }
    }
)
;

router.post('/fetchAllTodos', function (req, res) {
    // res.send(service.fetchAllTodos(req.body.userId));
    shoppingService.fetchAllTodosFromDB(req.query.userId, res)
});


router.get('/FetchAllObjects', function (req, res) {
    res.send(shoppingService.FetchAllObjectsImplementation(req.query.userId));
});

router.post('/FetchAllObjects', function (req, res) {
    res.send(shoppingService.FetchAllObjectsImplementation(req.body.userId));
});


router.get('/createGroup', async (req, res, next) => {


        try {
            const todoList = await shoppingService.createGroup(req.query.todoArray, req.query.groupId);
            res.json(todoList);
        } catch
            (e) {
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
                next(e)
            }
            // res.send(service.createGroup(req.query.todoArray, req.query.groupId));
        }
    }
);

router.post('/createGroup', function (req, res) {
    res.send(shoppingService.createGroup(req.body.todoArray, req.body.groupId));
});


router.post('/getAllTodoOfaGroup', function (req, res) {
    res.send(shoppingService.getAllTodoOfaGroup(req.body.groupId, req.body.userId));
});

router.get('/getAllTodoOfaGroup', async (req, res, next) => {


    try {
        const todoList = await shoppingService.getAllTodoOfaGroup(req.query.groupId, req.query.userId);
        res.json(todoList);
    } catch
        (e) {
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
})
;


router.get('/updatePriorityOfaTodo', async (req, res, next) => {
    try {
        const todoList = await shoppingService.updatePriorityOfaTodo(req.query.id, req.query.priority);
        res.json(todoList);
    } catch
        (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullTodo = {
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
            res.send(nullTodo);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }
// res.send(service.updatePriorityOfaTodo(req.query.id, req.query.priority));
})
;

router.post('/updatePriorityOfaTodo', function (req, res) {
    res.send(shoppingService.updatePriorityOfaTodo(req.body.id, req.body.priority));
});


router.get('/fetchTodosBasedOnStatus', async (req, res, next) => {


    try {
        const todoList = await shoppingService.fetchTodosBasedOnStatus(req.query.userId, req.query.status);
        res.json(todoList);
    } catch
        (e) {
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
// res.send(service.fetchTodosBasedOnStatus(req.query.userId, req.query.status));
})
;

router.post('/fetchTodosBasedOnStatus', function (req, res) {
    res.send(shoppingService.fetchTodosBasedOnStatus(req.body.userId, req.body.status));
});


router.get('/markTodoAsDone', async (req, res, next) => {
    try {
        const bool = await shoppingService.markTodoAsDone(req.query.id);
        res.json(bool);
    } catch
        (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullTodo = {
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
            res.send(nullTodo);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }

//res.send(service.markTodoAsDone(req.query.id));
})
;

router.post('/markTodoAsDone', function (req, res) {
    res.send(shoppingService.markTodoAsDone(req.body.id));
});


router.get('/remindOnDueDate', async (req, res, next) => {


    try {
        const todoList = await shoppingService.remindOnDueDate(req.query.userId, req.query.dueDate);
        res.json(todoList);
    } catch
        (e) {
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
//  res.send(service.remindOnDueDate(req.query.userId, req.query.dueDate));
})
;

router.post('/remindOnDueDate', function (req, res) {
    res.send(shoppingService.remindOnDueDate(req.body.userId, req.body.dueDate));
});


router.get('/markTodoAsArchived', async (req, res, next) => {
    try {
        const bool = await shoppingService.markTodoAsArchived(req.query.id);
        res.json(bool);
    } catch
        (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'Illegal Argument Exception') {
            const nullTodo = {
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
            res.send(nullTodo);
        } else {

            console.log('exception: ', e.message);
            next(e);
        }
    }
//res.send(service.markTodoAsArchived(req.query.id));
})
;

router.post('/markTodoAsArchived', function (req, res) {
    res.send(shoppingService.markTodoAsArchived(req.body.id));
});


module.exports = router;
