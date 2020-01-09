


function searchItems(userId, criteria)
{
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


function browseItems(userId, itemName)
{
    //Implementation code here
    if (!itemName) {
        throw new TypeError("itemName can't be empty or null");
    }
    var items= FetchObjectsImplementation('item');
    var listBrowsed = [];
    // refine list of items to reurn only items with same name
    for (var j=0; j < items.length; j++){
        if (items[j].name === 'itemName'){
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


function fetchShoppingCart(userId)
{
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

    for(var j = 0; j < shoppingCart.itemeList.length; j++) {
        var itemLog = {
            "id": Math.random(),
            "adtType": "log",
            "action": "viewed",
            "date": new Date(),
            "userId": userId,
            "itemId": shoppingCart.itemeList[i].id
        };

        SaveObjectImplementation(itemLog);
    }

    return shoppingCart;


}


function updateShoppingCart(userId, itemId, flagOfAction)
{
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
        shoppingCartOfUser.itemeList.push(item);
    }

    // remove item from list of items in shopping cart of user
    if('removing' === flagOfAction){
        for( var i = 0; i < shoppingCartOfUser.itemeList.length; i++){
            if ( shoppingCartOfUser.itemeList[i].id === itemId) {
                shoppingCartOfUser.itemeList.splice(i, 1);
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


function placeOrder(userId, address, paymentCardNumber, cvv2, zipCode)
{
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


function fetchTopMostSimilarItems(userId, itemName)
{
    //Implementation code here
    if (!userId || !itemName) {
        throw new TypeError('Invalid Input');
    }
    var items = FetchObjectsImplementation("item");
    var wantedItems = [];
    for(var i =0;i<items.length;i++){
        if(items[i].includes(itemName)){
            wantedItems.push(items[i]);
        }
    }
    return wantedItems;
}


function recentlyViewedItems(userId)
{
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


function reviewAnItem(userId, itemId, comment, rate)
{
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


null
{
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
