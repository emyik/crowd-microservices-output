// var express = require('express');
// var router = express.Router();

var firebaseUtil = require('../util/firebaseUtil');

function FetchObjectImplementation(objectId) {
    const todo = firebaseUtil.fetchObjectDao(objectId);
    return todo;
}

function FetchAllObjectsImplementation(userId, res) {
    //Implementation code here
    const listOFTodos = firebaseUtil.fetchAllTodosDAO("emadaghayi").on('value', function (snapshot) {
        res.send(snapshot.val());
    });

    return listOFTodos;
}

// function SaveObject(todo) {
function SaveObjectImplementation(todo) {

    firebaseUtil.saveObjectDAO(todo.title, todo.description, todo.dueDate, todo.dataStoreId, todo.userId, todo.id,
        todo.status, todo.groupId, todo.priority, todo.address, todo.repeat);
    return "Saved";
}

async function DeleteObjectImplementation(todo) {
    console.log('executed2');
    const firebasePromise = await firebaseUtil.deleteObjectDao(todo.id);
    console.log('executed3');
    var result = await firebasePromise
    console.log('executed4');
    return result;
}

function addTodo(todo) {

//Implementation code here
    if (todo.id === null || todo.id === "" || todo.title === null || todo.tile === "" || todo.userId === null || todo.userId === "" ||
        todo.dataStoreId === null || todo.dataStoreId === " ")
        throw TypeError('Illegal Argument Exception');
    else
        var _todo = SaveObjectImplementation(todo);
    return _todo;

}

function updateTodo(todo) {
    //Implementation code here
    if (todo === null || todo === '') {
        throw new TypeError('IllegalArgumentException');
    } else if (todo.createdDate === null || todo.createdDate === '') {
        throw new TypeError('IllegalArgumentException');
    } else if (todo.createdTime == null || todo.createdTime === '') {
        throw new TypeError('IllegalArgumentException');
    } else if (todo.userId == null || todo.userId === '') {
        throw new TypeError('IllegalArgumentException');
    } else if (todo.dataStoreId == null || todo.dataStoreId === '') {
        throw new TypeError('IllegalArgumentException');
    } else if (todo.id == null || todo.id === '') {
        throw new TypeError('IllegalArgumentException');
    } else {
        if (checkDateFormat(todo.dueDate)) {

            var _res = UpdateObjectImplementation(todo);
            if (_res === null) {
                throw new TypeError('IllegalArgumentException');
            }
        } else {
            throw new TypeError('IllegalArgumentException');
        }
    }
    return todo;


}

function deleteTodo(todo) {
    { //Implementation code here
        if (todo.id == null || todo.id === '') {
            throw new TypeError('IllegalArgumentException');
        }
        var _todo = DeleteObjectImplementation(todo);
        if (_todo == null)
            return null;
        else
            return _todo;
    }
}


function fetchTodo(id) {
    //Implementation code here

    if (id === null || id === "") {
        throw new TypeError('Illegal Argument Exception');
    }
    var _todo = FetchObjectImplementation(id);
    if (_todo == null)
        return null;
    else
        return _todo;

}


function DeleteObject(todo) {
    //Implementation code here
    return {};
}


function UpdateObject(todo) {
    //Implementation code here
    return {};
}


function fetchAllTodos(userId, res) {
    //Implementation code here
    if (userId === null || userId === '') {
        throw new TypeError('IllegalArgumentException');
    }
    // if (fetchTodo(userId) == null) {
    //     return null;
    // }
    var allTodos = FetchAllObjectsImplementation(userId, res);
    if (allTodos == null) {
        throw new TypeError('IllegalArgumentException');
    }
    else {
        return allTodos;
    }

}


function createGroup(todoArray, groupId) {
    //Implementation code here
    //Implementation code here
    if (groupId === null || groupId === '') {
        throw new TypeError('IllegalArgumentException');
    }
    if (todoArray.contains(groupId)) {
        throw new TypeError('DuplicateGroupId');
    }


    return {};


}


function getAllTodoOfaGroup(groupId, userId) {
    //Implementation code here

    if (groupId == null || userId == null) {
        throw new TypeError('IllegalArgumentException');
    }
    if (groupId === '' || userId === '') {
        throw new TypeError('IllegalArgumentException');
    }
    var result = [];
    var allTodos = fetchAllTodos(userId);
    if (allTodos != null && allTodos.length > 0) {
        for (var i = 0; i < allTodos.length; i++) {
            if (allTodos[i].groupId == groupId) {
                result.push(allTodos[i]);
            }
        }
    }
    return result;

}


function updatePriorityOfaTodo(id, priority) {
    //Implementation code here
    if (id === null || id === '' || priority === null || priority === "") {
        throw new TypeError('IllegalArgumentException');
    }

    if (priority > 4 || priority < 1) {
        throw new TypeError('IllegalArgumentException');

    }
    if (fetchTodo(id) === null) {
        return false;
    }
    var newTodo = fetchTodo(id).priority;
    newTodo.priority = priority;
    var _res = UpdateObjectImplementation(newTodo);
    if (_res === null) {
        return false;
    }

    return true;
}


function fetchTodosBasedOnStatus(userId, status) {
    //Implementation code here
    if (userId == null || userId === "") {
        throw new TypeError('Illegal Argument Exception');
    }
    var result = [];
    var allTodos = fetchAllTodos(userId);
    if (allTodos.length > 0) {
        for (var i = 0; i < allTodos.length; i++) {
            if (!(allTodos[i].status !== 1 || allTodos[i].status !== 2 || allTodos[i].status !== 3)) {
                throw new TypeError("Illegal Argument Exception");
            }
            else {

                result.push(allTodos[i]);
            }
        }
    }
    return result;
}


function markTodoAsDone(id) {
    //Implementation code here
    if (id == null || id === '') {
        throw new TypeError('IllegalArgumentException');
    }
    var _todo = fetchTodo(id);
    if (_todo == null)
        return false;
    _todo.status = 1;
    var _result = SaveObjectImplementation(_todo);
    return _result;
}


function remindOnDueDate(userId, dueDate) {
    //Implementation code here
    if (userId === null || dueDate === null) throw new TypeError('Illegal Argument Exception');
    if (userId === '' || dueDate === '') throw new TypeError('Illegal ArgumentException');

    //fetch active todos
    var todo = fetchTodosBasedOnStatus(userId, "2");
    var listOfDue = [];
    if (todo != null) {
        for (var i = 0; i < todo.length; i++) {
            var tempTodo = todo[i];
            if (tempTodo.dueDate = dueDate) {
                listOfDue.append(tempTodo);
            }
        }
    }
    else {
        throw new TypeError('Illegal Argument Exception');
    }
    //store
    return listOfDue;
}


function markTodoAsArchived(id) {
    //Implementation code here
    if (id == null || id === '') {
        throw new TypeError('IllegalArgumentException');
    }
    var _todo = fetchTodo(id);
    if (_todo == null) {
        return false;
    }
    else {
        _todo.status = 3;
    }

    UpdateObjectImplementation(_todo);

    return true;
}


function checkDateFormat(date) {
    if (date === null || date === "") {
        throw new TypeError('IllegalArgumentException');
    }

    var m = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    return (m) ? true : false;

}

module.exports = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
    SaveObjectImplementation: SaveObjectImplementation,
    fetchTodo: fetchTodo,
    FetchObjectImplementation: FetchObjectImplementation,
    DeleteObject: DeleteObject,
    DeleteObjectImplementation: DeleteObjectImplementation,
    fetchAllTodos: fetchAllTodos,
    FetchAllObjectsImplementation: FetchAllObjectsImplementation,
    createGroup: createGroup,
    getAllTodoOfaGroup: getAllTodoOfaGroup,
    updatePriorityOfaTodo: updatePriorityOfaTodo,
    fetchTodosBasedOnStatus: fetchTodosBasedOnStatus,
    markTodoAsDone: markTodoAsDone,
    remindOnDueDate: remindOnDueDate,
    markTodoAsArchived: markTodoAsArchived,
    checkDateFormat: checkDateFormat
};

