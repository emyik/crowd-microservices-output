var firebaseUtil = require('../util/firebaseUtil');
var testEnvironment = true;


function deleteTodo(todo) {
   if (todo === undefined || todo === null) {
       throw new TypeError('Illegal Argument Exception');
   }
   if (todo.id === undefined || todo.id === null || todo.id === '') {
       throw new TypeError('Illegal Argument Exception');
   }

   const deletedTodo = DeleteObjectImplementation(todo);
   if (deletedTodo === null) {
       return null;
   } else {
       return deletedTodo;
   }
}

function fetchTodo(id) {
   if (id == null || id == undefined) {
       throw new TypeError('Illegal Argument Exception');
   }

   const todo = FetchObjectImplementation(id);

   if (todo == null) {
       return null;
   } else {
       return todo;
   }
}

function fetchAllTodos(userId) {
   if (userId === null || userId === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   let todoList = [];
   try {
       todoList = FetchAllObjectsImplementation(userId);
   } catch (e) {
       console.log(e);
   }
   return todoList;
}

function getAllArchived(userId) {
  if (!userId || userId === '') {
    throw new TypeError('Illegal Argument Exception');
  }

  let archivedTodos = [];
  const allTodos = FetchAllObjectsImplementation(userId);
  allTodos.forEach(todo => {
    if (todo.status === 3) {
      archivedTodos.push(todo);
    }
  });
  return archivedTodos;
}

function getAllDone(userId) {
   if (userId === null || userId === undefined || userId === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   let todoList = FetchAllObjectsImplementation(userId);
   let doneTodos = todoList.filter(todo => todo.status === 1);
   return doneTodos;
}

function getAllTodoOfaGroup(groupId, userId) {
   if (groupId === null || groupId === '' || userId === null || userId === '') {
       throw new TypeError('IllegalArgumentException');
   }
   let todos = FetchAllObjectsImplementation(userId);
   let filteredTodos = todos.filter(todo => todo.groupId === groupId);
   return filteredTodos;
}

function markTodoAsDone(id) {
   if (!id) throw TypeError('Illegal Argument Exception');
   let todo = FetchObjectImplementation(id);
   if (todo === null) return false;
   todo.status = 1;
   UpdateObjectImplementation(todo);
   return true;
}

function markTodoAsArchived(id) {
   if (!id) {
       throw TypeError('Illegal Argument Exception');
   }

   let todo = FetchObjectImplementation(id);
   if (!todo) {
       return false;
   }

   todo.status = 3;
   let result = UpdateObjectImplementation(todo);
   if (result == "updated") {
       return true;
   } else {
       return false;
   }
}

function updateTodo(todo) {
   if (todo.userId == null || todo.userId == "" || todo.dataStoreId == null || todo.dataStoreId == "" || todo.id == null || todo.id == "" || todo.createdTime == null || todo.createdTime == "" || todo.createdDate == null || todo.createdDate == "") {
       throw new TypeError('Illegal Argument Exception');
   }
   const updatedTodo = FetchObjectImplementation(todo.id);
   if (updatedTodo == null) {
       throw new TypeError('No Such Element Exception');
   }
   if (todo.dueDate != null && todo.dueDate != "") {
       let dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2]\d|3[0-1])\/(19|20)\d{2},(2[0-3]|[0-1]\d):[0-5]\d$/;
       if (!dateRegex.test(todo.dueDate)) {
           throw new TypeError('Illegal Argument Exception');
       }
   }
   updatedTodo.title = todo.title;
   updatedTodo.description = todo.description;
   updatedTodo.dueDate = todo.dueDate;
   updatedTodo.dataStoreId = todo.dataStoreId;
   updatedTodo.userId = todo.userId;
   updatedTodo.id = todo.id;
   updatedTodo.status = todo.status;
   updatedTodo.groupId = todo.groupId;
   updatedTodo.createdTime = todo.createdTime;
   updatedTodo.createdDate = todo.createdDate;
   updatedTodo.priority = todo.priority;
   updatedTodo.address = todo.address;
   updatedTodo.repeat = todo.repeat;

   SaveObjectImplementation(updatedTodo);

   return updatedTodo;
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
       const hour = date.getHours();
       const min = date.getMinutes();
       todo.createdTime = `${hour}:${min}`;
       todo.createdDate = `${month}/${day}/${year}`;
   }

   if (todo.dueDate) {
       const dueDateRegex = /^\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}$/;
       if (!dueDateRegex.test(todo.dueDate)) {
           throw new TypeError('Illegal Argument Exception');
       }
   }

   const savedTodo = SaveObjectImplementation(todo);
   return savedTodo;
}

function remindOnDueDate(userId, dueDate) {
   if (!userId || !dueDate) {
       throw new TypeError('Illegal Argument Exception');
   }

   // Check if dueDate is in correct format
   const dueDateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2},(2[0-3]|[01]\d):[0-5]\d$/;
   if (!dueDateRegex.test(dueDate)) {
       throw new TypeError('Illegal Argument Exception');
   }

   // Fetch all todos
   const allTodos = FetchAllObjectsImplementation(userId);
   let todos = [];
   // Filter out the todos whose dueDate matches with the given dueDate
   allTodos.forEach(todo => {
       const todoDueDate = new Date(todo.dueDate);
       const givenDueDate = new Date(dueDate);
       if (todoDueDate.getTime() === givenDueDate.getTime()) {
           todos.push(todo);
       }
   });

   // Filter out the todos whose repeat value is not 0
   allTodos.forEach(todo => {
       if (todo.repeat !== 0) {
           // Calculate the dueDate of the todo
           let todoDueDate;
           switch (todo.repeat) {
               case 1:
                   todoDueDate = new Date(todo.dueDate);
                   todoDueDate.setDate(todoDueDate.getDate() + 1);
                   break;
               case 2:
                   todoDueDate = new Date(todo.dueDate);
                   todoDueDate.setDate(todoDueDate.getDate() + 7);
                   break;
               case 3:
                   todoDueDate = new Date(todo.dueDate);
                   todoDueDate.setFullYear(todoDueDate.getFullYear() + 1);
                   break;
           }
           const givenDueDate = new Date(dueDate);
           if (todoDueDate.getTime() === givenDueDate.getTime()) {
               todos.push(todo);
           }
       }
   });

   return todos;
}

function updatePriorityOfaTodo(id, priority) {
   if (id == null || id == undefined || priority == null || priority == undefined || priority > 4 || priority < 1) {
       throw new TypeError('Illegal Argument Exception');
   }

   const todo = FetchObjectImplementation(id);
   if (todo == null) {
       return false;
   } else {
       todo.priority = priority;
       SaveObjectImplementation(todo);
       return true;
   }
}

function fetchTodosBasedOnStatus(userId, status){
  if(!userId || !status){
    throw new TypeError('Illegal Argument Exception');
  }
  if(status !== 1 && status !== 2 && status !== 3){
    throw new TypeError('Illegal Argument Exception');
  }
  let todos = [];
  let todoArray = FetchAllObjectsImplementation(userId);
  for(let i=0; i<todoArray.length; i++){
    let todo = todoArray[i];
    if(todo.status === status){
      todos.push(todo);
    }
  }
  return todos;
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