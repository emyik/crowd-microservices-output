var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;

function deleteTodo(todo) {
    if (todo.id === undefined || todo.id === null || todo.id === '') {
        throw new TypeError('Illegal Argument Exception');
    }
    const deletedTodo = DeleteObjectImplementation(todo);
    if (deletedTodo === null) {
        return null;
    }
    return deletedTodo;
}

function fetchTodo(id){
    if(id == null || id == ''){
        throw new TypeError('Illegal Argument Exception');
    }
    const todo = FetchObjectImplementation(id);
    return todo;
}

function fetchAllTodos(userId) {
    if (userId === null || userId === "") {
        throw new TypeError('Illegal Argument Exception');
    }
    const todoList = FetchAllObjectsImplementation(userId);
    if (todoList === null || todoList === undefined) {
        return [];
    }
    return todoList;
}

function getAllArchived(userId){
    if(userId == null || userId == ''){
       throw new TypeError('Illegal Argument Exception');
    }
    let archivedTodos = [];
    let allTodos = FetchAllObjectsImplementation(userId);
    allTodos.forEach(function(todo){
       if(todo.status == 3){
          archivedTodos.push(todo);
       }
    });
    return archivedTodos;
}

function getAllDone(userId) {
    if (!userId || userId === null || userId === '') {
        throw new TypeError('Illegal Argument Exception');
    }
 
    const todos = FetchAllObjectsImplementation(userId);
    const doneTodos = todos.filter(todo => todo.status === 1);
    return doneTodos;
}

function getAllTodosOfGroup(groupId, userId) {
    if (groupId === null || groupId === '' || userId === null || userId === '') {
        throw new TypeError('IllegalArgumentException');
    }
 
    let listOfTodos = [];
 
    FetchAllObjectsImplementation(userId).then(function (todoList) {
        todoList.forEach(function (todo) {
            if (todo.groupId === groupId) {
                listOfTodos.push(todo);
            }
        });
    });
 
    return listOfTodos;
}

function markTodoAsDone(id) {
    if (id == null || id == "") {
        throw new TypeError('Illegal Argument Exception');
    }
 
    // Fetch the todo from 3rd party API
    let todo = FetchObjectImplementation(id);
 
    // If todo is not found, return false
    if (todo == null) {
        return false;
    }
 
    // Update the status of the todo
    todo.status = 1;
 
    // Update the todo in 3rd party API
    UpdateObjectImplementation(todo);
 
    return true;
}

function markTodoAsArchived(id) {
    if (id == null || id == undefined || id === '') {
        throw new TypeError('Illegal Argument Exception');
    }
 
    const todo = FetchObjectImplementation(id);
    if (todo == null) {
        return false;
    }
    todo.status = 3;
    const result = UpdateObjectImplementation(todo);
    return result;
}

function updateTodo(todo) {
    if (todo.userId == null || todo.userId == "" || todo.dataStoreId == null || todo.dataStoreId == "" || todo.id == null || todo.id == "" || todo.createdTime == null || todo.createdTime == "" || todo.createdDate == null || todo.createdDate == "") {
        throw new TypeError('Illegal Argument Exception');
    }
 
    if (todo.dueDate != null && todo.dueDate != "") {
        let dateFormat = /\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}/;
        if (!dateFormat.test(todo.dueDate)) {
            throw new TypeError('Illegal Argument Exception');
        }
    }
 
    let updatedTodo = FetchObjectImplementation(todo.id);
    if (updatedTodo == null) {
        throw new TypeError('No Such Element Exception');
    }
 
    updatedTodo.title = todo.title;
    updatedTodo.description = todo.description;
    updatedTodo.dueDate = todo.dueDate;
    updatedTodo.dataStoreId = todo.dataStoreId;
    updatedTodo.userId = todo.userId;
    updatedTodo.status = todo.status;
    updatedTodo.groupId = todo.groupId;
    updatedTodo.priority = todo.priority;
    updatedTodo.address = todo.address;
    updatedTodo.repeat = todo.repeat;
 
    SaveObjectImplementation(updatedTodo);
 
    return updatedTodo;
}

function addTodo(todo) {
    if (todo.id == null || todo.id == '' ||
        todo.title == null || todo.title == '' ||
        todo.userId == null || todo.userId == '' ||
        todo.dataStoreId == null || todo.dataStoreId == '') {
        throw new TypeError('Illegal Argument Exception');
    }
 
    if (todo.createdTime == null || todo.createdTime == '') {
        const date = new Date();
        todo.createdTime = date.getHours() + ':' + date.getMinutes();
    }
 
    if (todo.createdDate == null || todo.createdDate == '') {
        const date = new Date();
        todo.createdDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
    }
 
    if (todo.dueDate != null && todo.dueDate != '') {
        const dueDateFormat = /^\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}$/;
        if (!dueDateFormat.test(todo.dueDate)) {
            throw new TypeError('Illegal Argument Exception');
        }
    }
 
    const result = SaveObjectImplementation(todo);
    return result;
}

function remindOnDueDate(userId, dueDate) {
    if (userId === null || userId === "" || dueDate === null || dueDate === "") {
        throw TypeError('Illegal Argument Exception');
    }
 
    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/[0-9]{4},(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!dueDate.match(dateFormat)) {
        throw TypeError('Illegal Argument Exception');
    }
 
    const todoArray = FetchAllObjectsImplementation(userId);
    const today = new Date();
    const reminderArray = [];
    const dueDateArray = dueDate.split(',');
    const dueDateDay = dueDateArray[0];
    const dueDateTime = dueDateArray[1];
 
    for (let i = 0; i < todoArray.length; i++) {
        const todo = todoArray[i];
        const todoDueDateArray = todo.dueDate.split(',');
        const todoDueDateDay = todoDueDateArray[0];
        const todoDueDateTime = todoDueDateArray[1];
        const todoRepeat = todo.repeat;
        let reminderDate = new Date(dueDate);
 
        if (todoRepeat === '1') {
            reminderDate.setDate(today.getDate() + 1);
        } else if (todoRepeat === '2') {
            reminderDate.setDate(today.getDate() + 7);
        } else if (todoRepeat === '3') {
            reminderDate.setFullYear(today.getFullYear() + 1);
        }
 
        const reminderDay = reminderDate.getDate();
        const reminderTime = reminderDate.getHours() + ':' + reminderDate.getMinutes();
 
        if (todoDueDateDay === dueDateDay && todoDueDateTime === dueDateTime) {
            reminderArray.push(todo);
        } else if (todoDueDateDay === reminderDay && todoDueDateTime === reminderTime) {
            reminderArray.push(todo);
        }
    }
 
    return reminderArray;
}

function updatePriorityOfaTodo(id, priority) {
    if (id == null || id == '' || priority == null || priority == '') {
        throw new TypeError('Illegal Argument Exception');
    }
    if (priority > 4 || priority < 1) {
        throw new TypeError('Illegal Argument Exception');
    }
 
    const todo = FetchObjectImplementation(id);
    if (todo == null) {
        return false;
    }
    todo.priority = priority;
    UpdateObjectImplementation(todo);
    return true;
}

function fetchTodosBasedOnStatus(userId, status) {
    if (userId === null || userId === undefined || userId === '' || status === null || status === undefined || status === '') {
        throw new TypeError('Illegal Argument Exception');
    }
 
    if (status !== 1 && status !== 2 && status !== 3) {
        throw new TypeError('Illegal Argument Exception');
    }
 
    let todos = FetchAllObjectsImplementation(userId);
    let todosArray = [];
 
    todos.forEach(todo => {
        if (todo.status == status) {
            todosArray.push(todo);
        }
    });
 
    return todosArray;
}

function createGroup(todoArray, groupId) {
    if (groupId == null || groupId == '') {
        throw new TypeError('IllegalArgumentException');
    }
 
    for (let i = 0; i < todoArray.length; i++) {
        let todo = FetchObjectImplementation(todoArray[i].id);
        if (todo == null) {
            return false;
        }
        if (todo.groupId != null && todo.groupId == groupId) {
            throw new TypeError('DuplicateGroupId');
        }
    }
 
    for (let i = 0; i < todoArray.length; i++) {
        let todo = FetchObjectImplementation(todoArray[i].id);
        todo.groupId = groupId;
        UpdateObjectImplementation(todo);
    }
    return true;
}

// Third party API for persistence
function FetchObjectImplementation(objectId) {
    if (testEnvironment) {
        if (objectId == 234) {
            const todo = {
                title: 'commit code',
                description: 'be sure to commit unit tests',
                dueDate: '02-25-2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '234',
                status: 'in-progress',
                groupId: 'work',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 1,
                address: '',
                repeat: ''
            };


            return todo;
        }
        else {
            //var resp;
            // Promise.resolve(null).then(function(value) {
            //     console.log(value); // "Success"
            //     resp= value;
            // });
            return null;

        }
    } else {

        const todo = firebaseUtil.fetchObjectDao(objectId);
        if (todo === undefined || todo === {}) {
            return null;
        } else return todo;
    }
}

function FetchAllObjectsImplementation(userId, res) {
    if (testEnvironment) {
        if (userId === 'eaghayi') {
            const todoList = [{
                title: 'commit code',
                description: 'be sure to commit unit tests',
                dueDate: '02/25/2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '1',
                status: 1,
                groupId: 'school',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 3,
                address: '',
                repeat: ''
            }, {
                title: 'push code',
                description: 'be sure to push unit tests',
                dueDate: '02/25/2018',
                dataStoreId: "schoolworkds",
                userId: 'eaghayi',
                id: '2',
                status: 2,
                groupId: 'school',
                createdTime: '1:30pm',
                createdDate: '02/25/2018',
                priority: 3,
                address: '',
                repeat: ''
            }];


            return todoList;
        } else {
            return [];
        }

    } else {
        const listOFTodos = firebaseUtil.fetchAllTodosDAO("emadaghayi").on('value', function (snapshot) {
            res.send(snapshot.val());
        });

        return listOFTodos;
    }
}

async function SaveObjectImplementation(todo) {
    if (testEnvironment) {
        return todo;
    } else {
        await  firebaseUtil.saveObjectDAO(todo.title, todo.description, todo.dueDate, todo.dataStoreId, todo.userId, todo.id,
            todo.status, todo.groupId, todo.priority, todo.address, todo.repeat);
        return "Saved";
    }
}

async function UpdateObjectImplementation(todo) {
    if (testEnvironment) {
        return todo;
    } else {
        await firebaseUtil.updateObjectDAO(todo);
        return "updated";
    }
}

async function DeleteObjectImplementation(todo) {
    if (testEnvironment) {
        return todo;
    } else {
        const firebasePromise = await firebaseUtil.deleteObjectDao(todo.id);
        var result = await  firebasePromise;
        return result;
    }
}

module.exports = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,
    SaveObjectImplementation: SaveObjectImplementation,
    UpdateObjectImplementation: UpdateObjectImplementation,
    fetchTodo: fetchTodo,
    FetchObjectImplementation: FetchObjectImplementation,
    DeleteObjectImplementation: DeleteObjectImplementation,
    fetchAllTodos: fetchAllTodos,
    // fetchAllTodosFromDB: fetchAllTodosFromDB,
    FetchAllObjectsImplementation: FetchAllObjectsImplementation,
    createGroup: createGroup,
    // getAllTodoOfaGroup: getAllTodoOfaGroup,
    updatePriorityOfaTodo: updatePriorityOfaTodo,
    fetchTodosBasedOnStatus: fetchTodosBasedOnStatus,
    markTodoAsDone: markTodoAsDone,
    remindOnDueDate: remindOnDueDate,
    markTodoAsArchived: markTodoAsArchived,
    // checkDateFormat: checkDateFormat
};