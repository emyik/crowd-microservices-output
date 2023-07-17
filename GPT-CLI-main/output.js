

function deleteTodo(todo) {
   // check input argument
   if (!todo || !todo.id) {
       throw new TypeError('Illegal Argument Exception');
   }

   const deletedTodo = DeleteObjectImplementation(todo);

   if (deletedTodo) {
       return deletedTodo;
   } else {
       return null;
   }
}

function fetchTodo(id) {
   if (id === null || id === '') {
       throw new TypeError('Illegal Argument Exception');
   }
   const todo = FetchObjectImplementation(id);
   if (todo === null) {
       return null;
   }
   return todo;
}

function fetchAllTodos(userId) {
   if (userId == null || userId == "") {
       throw new TypeError('Illegal Argument Exception');
   }

   const todoList = FetchAllObjectsImplementation(userId);
   if (todoList === undefined || todoList === {}) {
       return [];
   } else {
       return todoList;
   }
}

function getAllArchived(userId) {
   if (!userId || userId === "") {
       throw new TypeError('Illegal Argument Exception');
   }
   let result = [];
   const todoList = FetchAllObjectsImplementation(userId);
   for (let todo of todoList) {
       if (todo.status === 3) {
           result.push(todo);
       }
   }
   return result;
}

function getAllDone(userId){
   if(!userId || typeof userId !== 'string'){
       throw new TypeError('Illegal Argument Exception');
   }
   const todos = FetchAllObjectsImplementation(userId);
   const doneTodos = todos.filter(todo => todo.status === 1);
   return doneTodos;
}

function getAllTodoOfaGroup(groupId, userId) {
   if (groupId === null || groupId === '' || userId === null || userId === '') {
       throw new TypeError('IllegalArgumentException');
   }

   let todos = [];
   try {
       const todosList = FetchAllObjectsImplementation(userId);
       for (let todo of todosList) {
           if (todo.groupId === groupId) {
               todos.push(todo);
           }
       }
   } catch (err) {
       console.log(err);
   }
   return todos;
}

function markTodoAsDone(id) {
   if (id == null || id == '') {
       throw new TypeError('Illegal Argument Exception');
   }

   let todo = FetchObjectImplementation(id);
   if (todo == null) {
       return false;
   }
   todo.status = 1;
   let result = UpdateObjectImplementation(todo);
   return result;
}

function markTodoAsArchived(id){
   if(id === null || id === ''){
       throw new TypeError('Illegal Argument Exception');
   }
   const todo = FetchObjectImplementation(id);
   if(todo === null){
       return false;
   }
   todo.status = 3;
   const updatedTodo = UpdateObjectImplementation(todo);
   return true;
}

function updateTodo(todo) {
   if (todo.userId === null || todo.userId === "" || todo.dataStoreId === null || todo.dataStoreId === ""
       || todo.id === null || todo.id === "" || todo.createdTime === null || todo.createdTime === ""
       || todo.createdDate === null || todo.createdDate === "") {
       throw new TypeError('Illegal Argument Exception');
   }
   if (todo.dueDate !== null && todo.dueDate !== "") {
       var dateFormat = /^(\d{2})\/(\d{2})\/(\d{4}),(\d{2}):(\d{2})$/;
       if (!todo.dueDate.match(dateFormat)) {
           throw new TypeError('Illegal Argument Exception');
       }
   }
   const updatedTodo = UpdateObjectImplementation(todo);
   if (updatedTodo === null) {
       throw new TypeError('No Such Element Exception');
   }
   return updatedTodo;
}

function addTodo(todo) {
   if (!todo.id || !todo.title || !todo.userId || !todo.dataStoreId) {
       throw new TypeError('Illegal Argument Exception');
   }
   if (!todo.createdTime || !todo.createdDate) {
       const currentDate = new Date();
       const month = currentDate.getMonth() + 1;
       const day = currentDate.getDate();
       const year = currentDate.getFullYear();
       const hours = currentDate.getHours();
       const minutes = currentDate.getMinutes();
       todo.createdTime = `${hours}:${minutes}`;
       todo.createdDate = `${month}/${day}/${year}`;
   }
   if (todo.dueDate) {
       const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/[0-9]{4},(2[0-3]|[01][0-9]):[0-5][0-9]$/;
       const isValidDate = dateRegex.test(todo.dueDate);
       if (!isValidDate) {
           throw new TypeError('Illegal Argument Exception');
       }
   }

   const newTodo = SaveObjectImplementation(todo);
   return newTodo;
}

function remindOnDueDate(userId, dueDate) {
    if (userId === null || userId === '' || dueDate === null || dueDate === '') {
        throw TypeError('Illegal Argument Exception');
    }

    const dueDateFormat = /^\d{2}\/\d{2}\/\d{4},\d{2}:\d{2}$/;
    if (!dueDateFormat.test(dueDate)) {
        throw TypeError('Illegal Argument Exception');
    }

    const todos = FetchAllObjectsImplementation(userId);
    const dueDateTodos = [];

    todos.forEach(todo => {
        const todoDueDate = new Date(todo.dueDate);
        const inputDueDate = new Date(dueDate);
        if (todo.repeat === 1) {
            if (todoDueDate.getDate() === inputDueDate.getDate() &&
                todoDueDate.getMonth() === inputDueDate.getMonth() &&
                todoDueDate.getFullYear() === inputDueDate.getFullYear()) {
                dueDateTodos.push(todo);
            }
        } else if (todo.repeat === 2) {
            if (todoDueDate.getDate() === inputDueDate.getDate() &&
                todoDueDate.getMonth() === inputDueDate.getMonth() &&
                todoDueDate.getFullYear() === inputDueDate.getFullYear() &&
                todoDueDate.getDay() === inputDueDate.getDay()) {
                dueDateTodos.push(todo);
            }
        } else if (todo.repeat === 3) {
            if (todoDueDate.getDate() === inputDueDate.getDate() &&
                todoDueDate.getMonth() === inputDueDate.getMonth() &&
                todoDueDate.getFullYear() === inputDueDate.getFullYear() &&
                todoDueDate.getDay() === inputDueDate.getDay() &&
                todoDueDate.getHours() === inputDueDate.getHours() &&
                todoDueDate.getMinutes() === inputDueDate.getMinutes()) {
                dueDateTodos.push(todo);
            }
        }
    });

    return dueDateTodos;
}

function updatePriorityOfaTodo(id, priority) {
   if (id == null || priority == null || id == '' || priority == '') {
       throw new TypeError('Illegal Argument Exception');
   }

   if (priority > 4 || priority < 1) {
       throw new TypeError('Illegal Argument Exception');
   }

   let todo = FetchObjectImplementation(id);
   if (todo == null) {
       return false;
   }

   todo.priority = priority;
   let result = UpdateObjectImplementation(todo);
   return result;
}

function fetchTodosBasedOnStatus(userId, status) {
   if (userId === '' || userId === null || status === '' || status === null) {
       throw new TypeError('Illegal Argument Exception');
   }
   if (status !== 1 && status !== 2 && status !== 3) {
       throw new TypeError('Illegal Argument Exception');
   }

   let todosArray = [];

   const listOFTodos = FetchAllObjectsImplementation(userId);
   for (let i = 0; i < listOFTodos.length; i++) {
       if (listOFTodos[i].status === status) {
           todosArray.push(listOFTodos[i]);
       }
   }
   return todosArray;
}