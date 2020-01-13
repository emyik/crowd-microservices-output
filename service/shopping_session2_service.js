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
    ],
    "userId": "eaghayi",
    "adtType": "shoppingCart"
},{
    "id": 2,
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
    ],
    "userId": "favazzad",// add error for behavior 2 of fetchshopping cart
    "adtType": "shoppingCart"
},{
    "id": 3,
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
    ],
    "userId": "favazzad",//// add error for behavior 2 of fetchshopping cart
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
    if (!criteria) {
        throw new TypeError('Criteria cannot be empty or null');
    }
    var items = FetchObjectsImplementation('item');
    var matches = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].name.indexOf(criteria) != -1) {
            matches.push(items[i]);
        }
    }
    if (matches.length >= 1) {
        logItems(userId,'searched', matches);
        return matches;
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].category.indexOf(criteria) != -1) {
            matches.push(items[i]);
        }
    }
    if (matches.length >= 1) {
        logItems(userId,'searched', matches);
        return matches;
    }
}


function browseItems(userId, itemName){
    //Implementation code here
    if (!itemName) {
        throw new TypeError("itemName can't be empty or null");
    }
    var items= FetchObjectsImplementation('item');
    var listBrowsed = [];
    // refine list of items to reurn only items with same name
    for (var j=0; j < items.length; j++){
        if (items[j].name === itemName){
            listBrowsed.push(items[j]);
        }
    }

    // save a log of items that user browsed
    if(userId){

        // iterate on list for fetching id of items to store in log
        for (var i =0; i <listBrowsed.length;i++){
            var log ={
                "id": Math.random(),
                "adtType": "log",
                "action": "browsed",
                "date": new Date(),
                "userId": userId,
                "itemId": listBrowsed[i].id
            };
            SaveObjectImplementation(log);

        }
    }
    return listBrowsed;
}


function fetchShoppingCart(userId) {
    //Implementation code here
    if (userId === null || userId === "") {
        throw new TypeError("userId cannot be empty or null");
    }

    // it returns all shopping carts of ALL users, we have to refine it and return only one shopping cart that belong to userID
    var shoppingCarts = FetchObjectsImplementation("shoppingCart");

    if (shoppingCarts.length === 0) {
        throw new TypeError("No shopping carts were found");
    } else if (shoppingCarts.length > 1) {
        throw new TypeError("More than one shopping cart was found");
    }
    var shoppingCart;
    //return shopping cart of the user with userId
    for(var i=0;i <shoppingCarts.length;i++){
        if(shoppingCarts[i].userId === userId){
            shoppingCart = shoppingCarts[i];
        }
    }

    for(var j = 0; j < shoppingCart.itemList.length; j++) {
        var itemLog = {
            "id": Math.random(),
            "adtType": "log",
            "action": "viewed",
            "date": new Date(),
            "userId": userId,
            "itemId": shoppingCart.itemList[j].id
        };

        SaveObjectImplementation(itemLog);
    }

    return shoppingCart;


}


function updateShoppingCart(userId, itemId, flagOfAction){
    if (!userId) {
        throw new TypeError("Invalid userId");
    }

    if (!itemId) {
        throw new TypeError("Invalid itemId");
    }


    if(!flagOfAction || !(['adding', 'removing'].includes(flagOfAction))){
        throw new TypeError("Invalid flagOfAction");
    }
    var shoppingCartOfUser = fetchShoppingCart(userId);
    var item = searchItems(itemId);
    // add item to list of items in shopping cart
    if('adding' === flagOfAction){
        shoppingCartOfUser.itemList.push(item);
    }

    // remove item from list of items in shopping cart of user
    if('removing' === flagOfAction){
        for( var i = 0; i < shoppingCartOfUser.itemeList.length; i++){
            if ( shoppingCartOfUser.itemList[i].id === itemId) {
                shoppingCartOfUser.itemList.splice(i, 1);
            }
        }
    }

    var log = {
        "id": Math.random(),
        "adtType": "log",
        "action": "viewed",
        "date": "03/24/2019",
        "userId": userId,
        "itemId": item.id
    };
    SaveObjectImplementation(log);

    return true;
}


function placeOrder(userId, address, paymentCardNumber, cvv2, zipCode) {
    //Implementation code here
    if(!userId || !address|| !paymentCardNumber|| !cvv2 ||!zipCode){
        throw new TypeError('IAE');
    }
    var shoppingCart = fetchShoppingCart(userId);
    var summation = 0;
    for (var i=0;i<shoppingCart.itemeList.length;i++){
        summation= summation+ shoppingCart.itemeList[i].price;
    }

    // if the summation is still 0, i.e., there were no item prices added to it when iterating
    // throwing the itemList, throw an error
    if (summation === 0) {
        throw new Error("No items in the shopping cart");
    }

    var order = {"id": String(Math.random()), "userId": userId, "address": address, "paymentCardNumber": paymentCardNumber, "summation": summation, "date": new Date(), "itemList": shoppingCart.itemeList, "CVV2": cvv2, "adtType": 'order'};
    var bool = SaveObjectImplementation(order);

    // WIP: Save ordered items to log with action "purchased"
    if (bool) {
        for (var i = 0; i < order.itemList; i++) {
            var log = {id: Math.random(), userId: userId, itemId: order.itemList[i].id, action: "purchased", date: order.date, adtType: "log"};
            SaveObjectImplementation(log);
        }
    }

    return bool;
}


function fetchTopMostSimilarItems(userId, itemName) {
    //Implementation code here
    if (!userId || !itemName) {
        throw new TypeError('Invalid Input');
    }
    var items = FetchObjectsImplementation("item");
    var wantedItems = [];
    for(var i =0;i<items.length;i++){
        if(items[i].name.includes(itemName)){
            wantedItems.push(items[i]);
        }
    }
    return wantedItems;
}


function recentlyViewedItems(userId) {
    if (!userId || userId === "") {
        throw new TypeError("Invalid userId");
    }
    var logs = FetchObjectsImplementation("log");
    var logsOfUser = [];
    for (var i = 0; i < logs.length; i++) {
        if (logs[i].userId === userId && (logs[i].action =='viewed' ||logs[i].action =='purchased' ||logs[i].action =='searched')) {
            logsOfUser.push(logs[i]);
        }
    }
    return logsOfUser;
}


function purchasesHistories(userId)
{
    //Implementation code here
    if(!userId){
        throw new TypeError('userId cannot be empty or null');
    }
    var logsArray = FetchObjectsImplementation('log');
    var purchasedList=[];
    for(var i=0;i <logsArray.length;i++){
        if(logsArray[i].action === 'purchased' && logsArray[i].userId === userId ){
            purchasedList.push(logsArray[i]);
        }
    }
    return purchasedList;
}


function reviewAnItem(userId, itemId, comment, rate) {
    //Implementation code here
    if(rate===null){
        throw new TypeError("rate field is null");
    }

    if (!userId) {
        throw new TypeError("Invalid User ID");
    }
    if(!itemId){
        throw new TypeError("Invalid item ID");
    }
    var review ={
        "id": Math.random(),
        "adtType": "review",
        "comment": comment,
        "rating": rate,
        "userId": userId,
        "itemId": itemId
    };


    return SaveObjectImplementation(review);
}


function SaveObject(object)
{
    //Implementation code here
    return {};
}


function FetchObjects(adtType)
{
    //Implementation code here
    return {};
}


function DeleteObject(id, adtType)
{
    //Implementation code here
    return {};
}


function UpdateObject(object)
{
    //Implementation code here
    return {};
}


function logItems(userId,reason) {

//#Implement the function
    if(!userId || (!reason || (!reason.includes("purchased") && !reason.includes("viewed") && !reason.includes("reviewed")))){
        throw new TypeError("UserId or Reason is invalid");
    }
    var logObj=   {
        "id": String(Math.random()),
        "userId": userId,
        "itemId": 'Number',
        "action": reason,
        "date": new Date(),
        "adtType": 'log'
    };

    return SaveObjectImplementation(logObj);

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

module.exports = {
    searchItems:searchItems,
    browseItems:browseItems,
    fetchShoppingCart:fetchShoppingCart,
    updateShoppingCart:updateShoppingCart,
    placeOrder:placeOrder,
    fetchTopMostSimilarItems:fetchTopMostSimilarItems,
    recentlyViewedItems:recentlyViewedItems,
    purchasesHistories:purchasesHistories,
    reviewAnItem:reviewAnItem,
    SaveObject:SaveObject,
    FetchObjects:FetchObjects,
    DeleteObject:DeleteObject,
    UpdateObject:UpdateObject,
    logItems:logItems }
