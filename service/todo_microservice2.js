var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;



function deleteTodo(todo) {
   if (!todo || !todo.id) {
       throw new TypeError('Illegal Argument Exception');
   }

   const deletedTodo = DeleteObjectImplementation(todo);

   if (!deletedTodo) {
       return null;
   }

   return deletedTodo;
}

function fetchTodo(id) {
   if(id === null || id === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   const todo = FetchObjectImplementation(id);
   if(todo === null) {
       return null;
   }
   return todo;
}

function fetchAllTodos(userId){
   if(userId === null || userId === ''){
       throw new TypeError('Illegal Argument Exception');
   }

   let todoArray = FetchAllObjectsImplementation(userId);

   if(todoArray === null || todoArray === undefined){
       return [];
   }

   return todoArray;
}

function getAllArchived(userId) {
   if (!userId || userId === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   let archivedTodos = [];
   const todos = FetchAllObjectsImplementation(userId);
   if (todos) {
       for (let todo of todos) {
           if (todo.status === 3) {
               archivedTodos.push(todo);
           }
       }
   }
   return archivedTodos;
}

function getAllDone(userId){
   if(userId == null || userId == ""){
       throw new TypeError('Illegal Argument Exception');
   }
   let todos = FetchAllObjectsImplementation(userId);
   let doneTodos = [];
   for(let i = 0; i < todos.length; i++){
       if(todos[i].status == 1){
           doneTodos.push(todos[i]);
       }
   }
   return doneTodos;
} 

function getAllTodoOfaGroup(groupId, userId) {
   if (groupId === null || userId === null || groupId === '' || userId === '') {
       throw new TypeError('IllegalArgumentException');
   }

   let todos = [];
   let todoArray = FetchAllObjectsImplementation(userId);
   todoArray.forEach(todo => {
       if (todo.groupId === groupId) {
           todos.push(todo);
       }
   });
   return todos;
}

function markTodoAsDone(id) {
   if (id === null || id === undefined) {
       throw TypeError('Illegal Argument Exception');
   }
   let todo = FetchObjectImplementation(id);
   if (todo === null || todo === undefined) {
       return false;
   }
   todo.status = 1;
   return UpdateObjectImplementation(todo);
}

function markTodoAsArchived(id) {
   if (id === null || id === undefined || id === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   const todo = FetchObjectImplementation(id);
   if (todo === null || todo === undefined) {
       return false;
   }
   todo.status = 3;
   UpdateObjectImplementation(todo);
   return true;
}

function updateTodo(todo) {
   if (todo.userId === null || todo.userId === "" || todo.dataStoreId === null || todo.dataStoreId === "" || todo.id === null || todo.id === "" || todo.createdTime === null || todo.createdTime === "" || todo.createdDate === null || todo.createdDate === "") {
       throw new TypeError('Illegal Argument Exception');
   }

   if (todo.dueDate !== null && todo.dueDate !== "") {
       const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2},(0\d|1\d|2[0-3]):([0-5]\d)$/;
       if (!dateFormat.test(todo.dueDate)) {
           throw new TypeError('Illegal Argument Exception');
       }
   }

   const updatedTodo = FetchObjectImplementation(todo.id);
   if (updatedTodo === null || updatedTodo === undefined) {
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

   UpdateObjectImplementation(updatedTodo);

   return updatedTodo;
}

function addTodo(todo) {
  if (!todo.id || todo.id === '' || !todo.title || todo.title === '' || !todo.userId || todo.userId === '' || !todo.dataStoreId || todo.dataStoreId === '') {
    throw new TypeError('Illegal Argument Exception');
  }
  if (!todo.createdTime || todo.createdTime === '') {
    const now = new Date();
    todo.createdTime = now.toLocaleTimeString('en-US');
  }
  if (!todo.createdDate || todo.createdDate === '') {
    const now = new Date();
    todo.createdDate = now.toLocaleDateString('en-US');
  }
  if (todo.dueDate && todo.dueDate !== '') {
    const dateTime = todo.dueDate.split(',');
    if (dateTime.length !== 2) {
      throw new TypeError('Illegal Argument Exception');
    }
  }
  const savedTodo = SaveObjectImplementation(todo);
  return savedTodo;
}

function remindOnDueDate(userId, dueDate) {
    if (userId === null || userId === "" || dueDate === null || dueDate === "") {
        throw TypeError('Illegal Argument Exception');
    }
    let dueDateFormat = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}\,[0-9]{2}\:[0-9]{2}/;
    if (!dueDate.match(dueDateFormat)) {
        throw TypeError('Illegal Argument Exception');
    }
    let todoList = FetchAllObjectsImplementation(userId);
    let todosToRemind = [];
    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i];
        let todoDueDate = todo.dueDate;
        let todoRepeat = todo.repeat;
        let todoDueDateInMillis = new Date(todoDueDate).getTime();
        let dueDateInMillis = new Date(dueDate).getTime();
        if (todoRepeat === 1) {
            if (todoDueDateInMillis - dueDateInMillis < 86400000 && todoDueDateInMillis - dueDateInMillis > 0) {
                todosToRemind.push(todo);
            }
        } else if (todoRepeat === 2) {
            if (todoDueDateInMillis - dueDateInMillis < 604800000 && todoDueDateInMillis - dueDateInMillis > 0) {
                todosToRemind.push(todo);
            }
        } else if (todoRepeat === 3) {
            if (todoDueDateInMillis - dueDateInMillis < 31536000000 && todoDueDateInMillis - dueDateInMillis > 0) {
                todosToRemind.push(todo);
            }
        } else {
            if (todoDueDate === dueDate) {
                todosToRemind.push(todo);
            }
        }
    }
    return todosToRemind;
}

function updatePriorityOfaTodo(id, priority) {
   if (id === undefined || id === null || priority === undefined || priority === null) {
       throw new TypeError('Illegal Argument Exception');
   }
   if (priority > 4 || priority < 1) {
       throw new TypeError('IllegalArgumentException');
   }
   let todo = FetchObjectImplementation(id);
   if (todo === null) {
       return false;
   }
   todo.priority = priority;
   const result = UpdateObjectImplementation(todo);
   return result;
}

function fetchTodosBasedOnStatus(userId, status) {
   if (userId == null || userId == undefined || userId == "" || status == null || status == undefined || status == "") {
       throw new TypeError('Illegal Argument Exception');
   }
   if (status != 1 && status != 2 && status != 3) {
       throw new TypeError('Illegal Argument Exception');
   }
   const todos = FetchAllObjectsImplementation(userId);
   const filteredTodos = todos.filter((todo) => todo.status == status);
   return filteredTodos;
}// Third party API for persistence
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
    // createGroup: createGroup,
    // getAllTodoOfaGroup: getAllTodoOfaGroup,
    updatePriorityOfaTodo: updatePriorityOfaTodo,
    fetchTodosBasedOnStatus: fetchTodosBasedOnStatus,
    markTodoAsDone: markTodoAsDone,
    remindOnDueDate: remindOnDueDate,
    markTodoAsArchived: markTodoAsArchived,
    // checkDateFormat: checkDateFormat
};