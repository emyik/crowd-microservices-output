var firebase = require("firebase-admin");


function initializeFirebase() {
    var serviceAccount = require("./serviceAccountKey.json");

    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://crowd-todo.firebaseio.com"
    });
};

const dateAndTimeOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
const timeOptions = {
    hour: "2-digit",
    minute: "2-digit"
};

function saveObjectDAO(title, description, dueDate, dataStoreId, userId, id, status, groupId, priority, address, repeat) {

    if (!firebase.apps.length) {
        initializeFirebase();
    }
    // initializeFirebase();
    var dataBaseRootRef = firebase.database().ref();
    var todo_schema = {
        title: title,
        description: description,
        dueDate: dueDate === undefined ? null : dueDate,
        dataStoreId: dataStoreId,
        userId: userId,
        id: id,
        status: 2,
        groupId: groupId === undefined ? null : groupId,
        createdTime: new Date().toLocaleTimeString("en-us", timeOptions),
        createdDate: new Date().toLocaleTimeString("en-us", dateAndTimeOptions),
        priority: priority,
        address: address === undefined ? null : address,
        repeat: repeat === undefined ? 0 : repeat

    };
    const userIdCleaned = userId.replace('.', '');
    var result = dataBaseRootRef.child(userIdCleaned).child('todoList').push(todo_schema);
    return todo_schema;

};

function fetchAllTodosDAO(userId) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }

    var dataBaseRef = firebase.database().ref().child(userId).child('todoList');
    return dataBaseRef;

    // var todoList= await dataBaseRef.then(result => result.data);
}


function fetchObjectDao(objectId) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    // initializeFirebase();
    var dataBaseRootRef = firebase.database().ref();
    dataBaseRootRef.child('todoList').child(objectId).on("value", function (snapshot) {
        return snapshot.val();
    }, function (error) {
        console.log("Error: " + error.code);
    });

}

async function deleteObjectDao(id) {
    if (!firebase.apps.length) {
        initializeFirebase();
    }
    console.log('idex', id);
    var dataBaseRef = await firebase.database().ref().child("emadaghayi").child('todoList');
    const result ='';
    await dataBaseRef.once("value", function (data) {
        const todoList = data.val();

        for (var key in todoList) {
            if (todoList[key].id == id) {
                console.log(todoList[key]);
                dataBaseRef.child(key).remove();

                break;
            }
        }

    });


}

module.exports = {
    saveObjectDAO: saveObjectDAO,
    fetchAllTodosDAO: fetchAllTodosDAO,
    fetchObjectDao: fetchObjectDao,
    deleteObjectDao: deleteObjectDao


};
