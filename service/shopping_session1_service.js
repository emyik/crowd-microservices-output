testEnvironment = true;
const itemList = [{
    "id": 1,
    "adtType": "item",
    "name": "backpack",
    "price": "50",
    "rating": "4",
    "seller": "YJ seller",
    "status": "availble",
    "category": "dress"
}, {
    "id": 2,
    "adtType": "item",
    "name": "backpack2",
    "price": "50",
    "rating": "4",
    "seller": "YJ seller",
    "status": "availble",
    "category": "school"
}];
const userList = [{
    adtType: 'user', //{logs,reviews,users,items,shoppingCarts}
    id: 1,  // random integer less than 1000000000
    firstName: 'emad',
    lastName: 'aghayi',
    address: "USA,VA,22030",
    userId: 'eaghayi',
}];
const logList = [{
    "id": 1,
    "adtType": "log",
    "action": "purchased",
    "date": "03/24/2019",
    "userId": "eaghayi",
    "itemId": 4
}, {
    "id": 2,
    "adtType": "log",
    "action": "viewed",
    "date": "03/24/2019",
    "userId": "eaghayi",
    "itemId": 3
}];
const order = {
    "id": 23,
    "userId": "eaghayi",
    "adtType": "order",
    "paymentCardNumber": "1234567891234567",
    "CVV2": "123",
    "date": "04/24/2018",
    "summation": 20,
    "address": "10680 main st, fairfax, VA, 22032",
    "itemList": [
        {
            "id": 22,
            "adtType": "item",
            "name": "Casio sport men watch",
            "price": "220",
            "rating": "3",
            "seller": "Casio",
            "status": "availble",
            "category": "men wear"
        },
        {
            "id": 1,
            "adtType": "item",
            "name": "Ytonet backpack",
            "price": "50",
            "rating": "4",
            "seller": "YJ seller",
            "status": "availble",
            "category": "dress"
        }
    ]
};
const shoppingCartist = [{
    "id": 1,
    "itemeList": [
        {
            "id": 22,
            "adtType": "item",
            "name": "Casio sport men watch",
            "price": "220",
            "rating": "3",
            "seller": "Casio",
            "status": "availble",
            "category": "men wear"
        },
        {
            "id": 1,
            "adtType": "item",
            "name": "Ytonet backpack",
            "price": "50",
            "rating": "4",
            "seller": "YJ seller",
            "status": "availble",
            "category": "dress"
        }
    ],
    "userId": "eaghayi",
    "adtType": "shoppingCart"
}];
const review = {
    "id": 3,
    "adtType": "review",
    "comment": "this item was fine",
    "rating": "3",
    "userId": "eavazzad",
    "itemId": 4
};

function searchItems(userId, criteria) {
    //Implementation code here

    //check validity of criteria
    if (criteria === null || criteria === "") {
        throw new TypeError('InvalidArgumentException');
    }
    var listOfAllitems = fetchTopMostSimilarItems('item', criteria);
    var similarItem = [];
    for (var i = 0; i < listOfAllitems.length; i++) {
        if (listOfAllitems[i].name.includes(criteria) || listOfAllitems[i].category.includes(criteria)) {
            similarItem.push(listOfAllitems[i]);
        }
    }
    if (userId != null && userId !== "") {
        if (userLoggedIn(userId)) {

            var itemSearched = similarItem[0].id; //assuming top item in the similar list is the one that was searched
            var obj1 = {"adtType": "log", "action": "searched", "userId": userId, "itemId": itemSearched};
            SaveObjectImplementation(obj1);


        }
    }

    return similarItem;
}

function fetchTopMostSimilarItems(userId, itemName) {
    //Implementation code here
    if ((itemName === null || itemName === "") || (userId === null || userId === "")) {
        throw new TypeError("IllegalArgumentException");

    }
    var listOfTimeinDB = FetchObjectsImplementation('item');
    var result = [];
    for (var i = 0; i < listOfTimeinDB.length; i++) {
        if (listOfTimeinDB[i].name.includes(itemName)) {
            result.push(listOfTimeinDB[i]);
        }
    }
    if (result.length > 20) {
        result.splice(20);
    }
    return result;
}

function purchasesHistories(userId) {
    if (userId.length === 0 || !userId) {
        throw new TypeError('userId is inavlid');
    }
    var histotyFromDB = FetchObjectsImplementation('log');
    //if item is there in the log and log is not empty
    var result = [];
    for (var i = 0; i < histotyFromDB.length; i++) {
        if (histotyFromDB[i].action == 'purchased' && histotyFromDB[i].userId == userId) {
            result.push(histotyFromDB[i]);

        }
    }

    return result;
}

function browseItems(userId, itemName) {
    //Implementation code here
    if (itemName == null || itemName === "") {
        throw new TypeError('IllegalArgumentException: itemName is null or empty');
    }
    var fetchItem = FetchObjectsImplementation("item");
    var searchItem = searchItems(userId, itemName); // it will return item[]
    //if desired item is found, display
    for (var i = 0; i < searchItem.length; i++) {
        if (searchItem[i].name == itemName) {
            return searchItem[i];
        }
    }

    if (userId !== "" || userId !== null) {
        if (isUserLoggedIn()) {
            var object1 = {
                "adtType": "log",
                "action": "searched",
                "userId": userId,
                "itemId": itemName
            };
            SaveObjectImplementation(object1);

        }
    }


}

function updateShoppingCart(userId, itemId, flagOfAction) {
    //Implementation code here

    //if FlagOfAction is removing or adding do additional work and return true else throw TypeError
    if (flagOfAction === 'removing' || flagOfAction === 'adding') {
        // search for finding item
        var itemsinDB = FetchObjectsImplementation('item');
        var itemFound;
        for (var i = 0; i < itemsinDB.length; i++) {
            if (itemsinDB[i].id === itemId) {
                itemFound = itemsinDB[i];
                break;
            }
        }
        // search for finding cart
        var cartsinDB = FetchObjectsImplementation('shoppingCart');
        var cartFound;
        for (var i = 0; i < cartsinDB.length; i++) {
            if (cartsinDB[i].id === itemId) {
                cartFound = cartsinDB[i];
                break;
            }
        }
        //add item to cart
        if (flagOfAction === 'adding') {
            var cartUpdatedObj = cartFound.itemList.push(itemFound);
        }
        // remove it
        if (flagOfAction === 'removing') {
            for (var i = 0; i < cartFound.itemList.length; i++) {
                if (cartFound.itemList[i].id === cartFound.id) {
                    cartFound.itemList.splice(i, 1);
                }
            }
            var cartUpdatedObj = cartFound.itemList.push(itemFound);
        }


    } else
        throw new TypeError("Invalid flag of action");


}


function fetchShoppingCart(userId) {
    //Implementation code here
    if (!userId) {
        throw new TypeError('invalid input, user Id should not be null or empty');
    }
    var listOfCarts = FetchObjectsImplementation("shoppingCart");
    var cartOfUser;
    for (var i = 0; i < listOfCarts.length; i++) {
        if (listOfCarts[i].userId == userId) {
            cartOfUser = listOfCarts[i];
        }
    }
    if (!cartOfUser) {
        return false;
    }
    return cartOfUser;
}

function reviewAnItem(userId, itemId, comment, rate) {

    // These should be refactored
    if (userId.length === 0 || userId === null) {
        throw new TypeError('One or more arguments are null or empty.');
    }

    if (itemId === null) {
        throw new TypeError('One or more arguments are null or empty.');
    }

    if (comment.length === 0 || comment === null) {
        throw new TypeError('One or more arguments are null or empty.');
    }

    if (rate.length === 0 || rate === null) {
        throw new TypeError('One or more arguments are null or empty.');
    }
// i think function description is not completely correct, there is not list for review in items, so it doesnot need to looks in dataase for finding item
    var reviewObj = {
        "id": Math.random(),
        "adtType": "review",
        "comment": comment,
        "rating": rate,
        "userId": userId,
        "itemId": itemId
    };
    SaveObjectImplementation(reviewObj);
// all behaviors of this function is completed, because of that I could not add anything to it.
// I select checkmark on the left corner of unit test IDE that is saying " All behaviors of this function are completely implemented"
    return true;
}

function recentlyViewedItems(userId) {
    //Implementation code here
    if (userId == null) {
        throw new TypeError('UserID is null, Try again please!');
    }
    if (userId === "") {
        throw new TypeError('UserID is empty, Try again please!');
    }

    //fetch all log of user
    var allObjectsForUser = FetchObjectsImplementation(userId, "log");
    var resultArray = [];
    for (var i = 0; i < allObjectsForUser.length; i++) {

        if (allObjectsForUser.action === "viewed") {   //check if the items fetched have action as viewed
            resultArray.add(allObjectsForUser[i]);
        }

        // If action property is empty, return empty collection
        if (allObjectsForUser.action === null || allObjectsForUser.action.length === 0) {
            return [];
        }

    }  //add if the item action is viewed
    return resultArray;

}

function placeOrder(userId, address, paymentCardNumber, cvv2, zipCode) {
    //Implementation code here
    if (!userId || !address || !paymentCardNumber || !cvv2 || !zipCode) {
        throw new TypeError('invalid Argunment Exception');
    }

    var listOfCarts = FetchObjectsImplementation("shoppingCart");
    // Please provide some description for following code
    var cartOfUser;
    for (var i = 0; i < listOfCarts.length; i++) {
        if (listOfCarts[i].userId == userId) {
            cartOfUser = listOfCarts[i];
        }
    }
    if (!cartOfUser) {
        //return false;
        throw new TypeError("Cart of User not found!");
    }
    //Calculating summation of prices
    var summation;
    for (var i = 0; i < cartOfUser.itemeList.length; i++) {

        summation = summation + Number(cartOfUser.itemeList[i].price);
    }
    // if summation of prices is 0 , then return false.
    if (summation === 0) {
        // should return a meaningful response
        //return false;
        throw new TypeError("PriceSummationException: Price is 0!");
    }

    //delete items from shoppingCart
    var deleted;
    for (i = 0; i < cartOfUser.itemeList.length; i++) {
        deleted = updateShoppingCart(userId, cartOfUser.itemeList[i].id, "delete");
    }
    if (!deleted) {
        throw new TypeError('internal error');
    }


    return true;
}

function userLoggedIn(userId) {
//#Implement the function
    if (userId) {
        var allUsersList = FetchObjectsImplementation('user');
        for (var i = 0; i < allUsersList.length; i++) {
            if (allUsersList[i].userId == userId) {
                return true;
            }
        }
    }

    return false;
}


function isUserLoggedIn() {
//#Implement the function
    //check if userId is not empty
    if (userId === "" || userId === null)
        throw new TypeError('No valid user!');
    //get the session object
    var session = [];
    if (session.userId === userId)
        return true;
    else
        return false;

    return {};
}


function FetchObjectsImplementation(adtType) {
    if (testEnvironment) {
        if (adtType === 'item') {
            return itemList;
        }
        if (adtType == 'user') {
            return userList;
        } else if (adtType == 'log') {
            return logList;
        } else if (adtType == 'shoppingCart') {
            return shoppingCartist;
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

// function SaveObject(todo) {


async function SaveObjectImplementation(object) {
    if (testEnvironment) {

        return object;
    } else {
        await firebaseUtil.saveObjectDAO(object.title, object.description, object.dueDate, object.dataStoreId, object.userId, object.id,
            object.status, object.groupId, object.priority, object.address, object.repeat);
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

        var result = await firebasePromise;

        return result;
    }
}

module.exports = {
    searchItems: searchItems,
    browseItems: browseItems,
    fetchShoppingCart: fetchShoppingCart,
    updateShoppingCart: updateShoppingCart,
    placeOrder: placeOrder,
    fetchTopMostSimilarItems: fetchTopMostSimilarItems,
    recentlyViewedItems: recentlyViewedItems,
    purchasesHistories: purchasesHistories,
    reviewAnItem: reviewAnItem,
    userLoggedIn: userLoggedIn
}
