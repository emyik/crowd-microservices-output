var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;



function deleteTodo(todo){
   if(!todo || !todo.id){
       throw new TypeError('Illegal Argument Exception');
   }
   const deletedTodo = DeleteObjectImplementation(todo);
   if(deletedTodo === null){
       return null;
   }
   return deletedTodo;
}

function fetchTodo(id){
   if(!id){
      throw new TypeError('Illegal Argument Exception');
   }
   let todo = FetchObjectImplementation(id);
   if(todo === null){
      return null;
   } else {
      return todo;
   }
}

function fetchAllTodos(userId) {
   if (!userId || userId === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   const todos = FetchAllObjectsImplementation(userId);
   if (todos === null || todos === undefined) {
       return [];
   } else {
       return todos;
   }
}

function getAllArchived(userId){
   if(!userId || userId.length == 0){
       throw new TypeError('Illegal Argument Exception');
   }

   const archivedTodos = [];
   const allTodos = FetchAllObjectsImplementation(userId);
   for(let i=0; i<allTodos.length; i++){
       if(allTodos[i].status == 3){
           archivedTodos.push(allTodos[i]);
       }
   }
   return archivedTodos;
}

function getAllDone(userId) {
   if (userId == null || userId === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   let todos = FetchAllObjectsImplementation(userId);
   let doneTodos = [];
   for (let i = 0; i < todos.length; i++) {
       if (todos[i].status === 1) {
           doneTodos.push(todos[i]);
       }
   }
   return doneTodos;
}

function getAllTodoOfaGroup(groupId, userId) {
    if (!groupId || !userId) {
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
    if (id == null || id == '') {
        throw TypeError('Illegal Argument Exception');
    }
    const todo = FetchObjectImplementation(id);
    if (todo == null) {
        return false;
    }
    todo.status = 1;
    const savedTodo = SaveObjectImplementation(todo);
    return true;
}

function markTodoAsArchived(id) {
   if (id == null || id == undefined || id == '') {
       throw new TypeError('Illegal Argument Exception');
   }
   const todo = FetchObjectImplementation(id);
   if (todo == null) {
       return false;
   }
   todo.status = 3;
   const result = UpdateObjectImplementation(todo);
   if (result == "updated") {
       return true;
   }
   return false;
}

function updateTodo(todo) {
    if (!todo.userId || !todo.dataStoreId || !todo.id || !todo.createdTime || !todo.createdDate) {
        throw new TypeError('Illegal Argument Exception');
    }

    const updatedTodo = FetchObjectImplementation(todo.id);
    if (!updatedTodo) {
        throw new TypeError('No Such Element Exception');
    }

    if (todo.dueDate && !/^\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}$/.test(todo.dueDate)) {
        throw new TypeError('Illegal Argument Exception');
    }

    const savedTodo = SaveObjectImplementation(todo);
    return savedTodo;
}

function addTodo(todo) {
   if (!todo.id || !todo.title || !todo.userId || !todo.dataStoreId) {
       throw new TypeError('Illegal Argument Exception');
   }

   if (!todo.createdTime || !todo.createdDate) {
       const date = new Date();
       const month = date.getMonth() + 1;
       const day = date.getDate();
       const year = date.getFullYear();
       const hours = date.getHours();
       const minutes = date.getMinutes();

       todo.createdTime = `${hours}:${minutes}`;
       todo.createdDate = `${month}/${day}/${year}`;
   }

   if (todo.dueDate) {
       const regex = /^(\d{2})\/(\d{2})\/(\d{4}),(\d{2}):(\d{2})$/;
       const dueDateMatches = todo.dueDate.match(regex);

       if (!dueDateMatches) {
           throw new TypeError('Illegal Argument Exception');
       }
   }

   return SaveObjectImplementation(todo);
}

function remindOnDueDate(userId, dueDate){
   if(userId === null || userId === '' || dueDate === null || dueDate === ''){
      throw TypeError('Illegal Argument Exception');
   }
   if(!(dueDate.match(/^\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}$/))){
      throw TypeError('Illegal Argument Exception');
   }

   let todos = FetchAllObjectsImplementation(userId);
   let reminders = [];
   for(let i=0; i<todos.length; i++){
      let todo = todos[i];
      if(todo.status === 1 && todo.dueDate === dueDate){
         reminders.push(todo);
      }
      else if(todo.status === 1 && todo.repeat !== ''){
         let repeat = parseInt(todo.repeat);
         let todoDueDate = new Date(todo.dueDate);
         let dueDateInput = new Date(dueDate);
         if(repeat === 1 && todoDueDate.getDate() === dueDateInput.getDate() 
         && todoDueDate.getMonth() === dueDateInput.getMonth() 
         && todoDueDate.getFullYear() === dueDateInput.getFullYear()){
            reminders.push(todo);
         }
         else if(repeat === 2 && todoDueDate.getDay() === dueDateInput.getDay() 
         && todoDueDate.getMonth() === dueDateInput.getMonth() 
         && todoDueDate.getFullYear() === dueDateInput.getFullYear()){
            reminders.push(todo);
         }
         else if(repeat === 3 && todoDueDate.getDate() === dueDateInput.getDate() 
         && todoDueDate.getMonth() === dueDateInput.getMonth()){
            reminders.push(todo);
         }
      }
   }
   return reminders;
}

function updatePriorityOfaTodo(id, priority){
   if (id == null || priority == null || id == "" || priority == ""){
       throw new TypeError('Illegal Argument Exception');
   }
   if (priority > 4 || priority < 1) {
       throw new TypeError('IllegalArgumentException');
   }
   const todo = FetchObjectImplementation(id);
   if (todo === null) {
       return false;
   }
   todo.priority = priority;
   const updateTodo = UpdateObjectImplementation(todo);
   return true;
}

function fetchTodosBasedOnStatus(userId, status) {
   if (userId == null || userId == '' || status == null || status == '') {
       throw new TypeError('Illegal Argument Exception');
   }
   if (status != 1 && status != 2 && status != 3) {
       throw new TypeError('Illegal Argument Exception');
   }

   let todoArray = [];
   const todos = FetchAllObjectsImplementation(userId);
   if (todos != null) {
       for (let i = 0; i < todos.length; i++) {
           if (todos[i].status == status) {
               todoArray.push(todos[i]);
           }
       }
   }
   return todoArray;
}

function createGroup(todoArray, groupId) {
   if (!groupId || groupId === '') {
       throw new TypeError('IllegalArgumentException');
   } else {
       let todos = todoArray.todoArray;
       let found = false;
       let isDuplicate = false;
       for (let i = 0; i < todos.length; i++) {
           let todo = FetchObjectImplementation(todos[i].id);
           if (todo) {
               found = true;
               if (todo.groupId === groupId) {
                   isDuplicate = true;
               }
           }
       }
       if (isDuplicate) {
           throw new TypeError('DuplicateGroupId');
       }
       if (found) {
           for (let i = 0; i < todos.length; i++) {
               let todo = FetchObjectImplementation(todos[i].id);
               if (todo) {
                   todo.groupId = groupId;
                   UpdateObjectImplementation(todo);
               }
           }
           return true;
       }
       return false;
   }
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
    getAllTodoOfaGroup: getAllTodoOfaGroup,
    updatePriorityOfaTodo: updatePriorityOfaTodo,
    fetchTodosBasedOnStatus: fetchTodosBasedOnStatus,
    markTodoAsDone: markTodoAsDone,
    remindOnDueDate: remindOnDueDate,
    markTodoAsArchived: markTodoAsArchived,
    // checkDateFormat: checkDateFormat
};
