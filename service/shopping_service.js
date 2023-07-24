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
        throw new TypeError('No criteria provided');
    }

    const itemList = FetchObjectsImplementation('item');
    let searchResults = [];

    // Search by name
    for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].name.toLowerCase().includes(criteria.toLowerCase())) {
            searchResults.push(itemList[i]);
        }
    }

    // Search by description
    if (searchResults.length === 0) {
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].description.toLowerCase().includes(criteria.toLowerCase())) {
                searchResults.push(itemList[i]);
            }
        }
    }

    // Search by category
    if (searchResults.length === 0) {
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].category.toLowerCase().includes(criteria.toLowerCase())) {
                searchResults.push(itemList[i]);
            }
        }
    }

    // Log user search
    if (userId) {
        const log = {
            userId: userId,
            itemId: searchResults.map(item => item.id),
            action: 'search',
            date: Date.now()
        };
        SaveObjectImplementation(log);
    }

    return searchResults;
}

async function browseItems(userId, itemName) {
    if (!itemName) {
        throw new TypeError('itemName cannot be empty or null');
    }

    let items = FetchObjectsImplementation('item');
    let item;

    // search for the item
    items.forEach((item) => {
        if (item.name === itemName) {
            item = item;
        }
    });

    // if item is found
    if (item) {
        // if the user is logged in, create a log object
        if (userId) {
            let log = {
                userId: userId,
                itemId: item.id,
                action: 'browse',
                date: new Date()
            };

            await SaveObjectImplementation(log);
        }

        return item;
    } else {
        return 'Item not found';
    }
}

async function fetchShoppingCart(userId) {
    if (!userId) {
        throw new TypeError("User ID must be provided");
    }

    const shoppingCarts = await FetchObjectsImplementation('shoppingCart');
    const userShoppingCart = shoppingCarts.find(cart => cart.userId === userId);

    if (!userShoppingCart) {
        return {
            success: false,
            message: "No shopping cart found for user"
        }
    }

    if (userShoppingCart.itemList.length > 1) {
        return {
            success: false,
            message: "More than one shopping cart found for user"
        }
    }

    userShoppingCart.itemList.forEach(item => {
        const logObject = {
            userId,
            itemId: item.id,
            action: 'fetchShoppingCart',
            date: new Date().toISOString()
        };

        SaveObjectImplementation(logObject);
    });

    return {
        success: true,
        message: "Shopping cart successfully fetched",
        data: userShoppingCart
    }
}

async function updateShoppingCart(userId, itemId, flagOfAction) {
    if (!userId || !itemId || !flagOfAction) {
        throw new TypeError("Input arguments cannot be empty or null");
    }
    if (flagOfAction !== 'adding' && flagOfAction !== 'deleting') {
        throw new TypeError("Invalid flagOfAction");
    }

    const item = await FetchObjectsImplementation('item');
    const shoppingCart = await FetchObjectsImplementation('shoppingCart');
    let userShoppingCart;

    // Find the user's shopping cart
    for (let i = 0; i < shoppingCart.length; i++) {
        if (shoppingCart[i].userId === userId) {
            userShoppingCart = shoppingCart[i];
            break;
        }
    }

    // Find the item the user is trying to add/remove
    let itemToAdd;
    for (let i = 0; i < item.length; i++) {
        if (item[i].id === itemId) {
            itemToAdd = item[i];
            break;
        }
    }

    // Add or remove the item from the user's shopping cart
    if (flagOfAction === 'adding') {
        userShoppingCart.itemList.push(itemToAdd);
    } else if (flagOfAction === 'deleting') {
        let indexToRemove = -1;
        for (let i = 0; i < userShoppingCart.itemList.length; i++) {
            if (userShoppingCart.itemList[i].id === itemId) {
                indexToRemove = i;
                break;
            }
        }
        userShoppingCart.itemList.splice(indexToRemove, 1);
    }

    // Save the user's shopping cart
    await SaveObjectImplementation(userShoppingCart);

    // Create a log for the action
    const log = {
        id: Math.floor(Math.random() * 100000),
        userId: userId,
        itemId: itemId,
        action: flagOfAction,
        date: new Date().toISOString()
    }

    // Save the log
    await SaveObjectImplementation(log);

    return userShoppingCart;
}

async function placeOrder(userId, userAddress, paymentCardNo, cvv2, zipCode) {
    if (!userId || !userAddress || !paymentCardNo || !cvv2 || !zipCode) {
        throw new TypeError("One of the input arguments is invalid");
    }
    const shoppingCart = await FetchObjectsImplementation('shoppingCart');
    let totalPrice = 0;
    for (let item of shoppingCart.itemList) {
        totalPrice += Number(item.price);
    }
    if (totalPrice == 0) {
        return "No items in the shopping cart";
    }
    const user = await FetchObjectsImplementation('user');
    const order = {
        userId: userId,
        userName: user.firstName + " " + user.lastName,
        address: userAddress,
        paymentCardNo: paymentCardNo,
        cvv2: cvv2,
        zipCode: zipCode,
        totalPrice: totalPrice
    };
    await SaveObjectImplementation(order);
    for (let item of shoppingCart.itemList) {
        const log = {
            userId: userId,
            itemId: item.id,
            action: "purchased",
            date: new Date()
        };
        await SaveObjectImplementation(log);
    }
    await DeleteObjectImplementation(shoppingCart);
    return "Order placed successfully";
}

async function fetchTopMostSimilarItems(userId, itemName) {
    if (!userId || !itemName) {
        throw new TypeError('userId and itemName must be provided');
    }

    const items = await FetchObjectsImplementation('item');
    const user = await FetchObjectsImplementation('user');

    if (!user || !items) {
        throw new TypeError('user or items not found');
    }

    const similarItems = items.filter((item) => item.name.includes(itemName));
    const sortedItems = similarItems.sort((a, b) => b.rating - a.rating);
    const topMostSimilarItems = sortedItems.slice(0, 20);

    // log the action
    const log = {
        userId: userId,
        itemId: itemName,
        action: 'comparing items',
        date: new Date().toISOString()
    };

    await SaveObjectImplementation(log);

    return topMostSimilarItems;
}

function recentlyViewedItems(userId) {
    if (userId === null || userId === undefined) {
        throw new TypeError('userId cannot be null or undefined.');
    }

    const logs = FetchObjectsImplementation('log');
    const recentlyViewedItems = logs.filter(log => log.userId === userId && log.action === 'viewed');
    return recentlyViewedItems;
}

function purchasesHistories(userId) {
    if(userId === null || userId === undefined || userId === '') {
        throw new TypeError('userId cannot be empty or null');
    }
    
    const logList = FetchObjectsImplementation('log');
    const purchasedItems = [];

    logList.forEach(log => {
        if(log.userId === userId && log.action === 'purchased') {
            purchasedItems.push(log.itemId);
        }
    });

    const itemList = FetchObjectsImplementation('item');
    const purchasedItemsObjects = [];

    itemList.forEach(item => {
        if(purchasedItems.includes(item.id)) {
            purchasedItemsObjects.push(item);
        }
    });

    return purchasedItemsObjects;
}

// Function to review an item
function reviewAnItem(userId, itemId, comment, rating) {
    // Check if input arguments are empty or null
    if (userId === null || userId === "" || itemId === null || itemId === "" || comment === null || comment === "" || rating === null || rating === "") {
        throw new TypeError("Input arguments cannot be empty or null");
    }

    // Fetch the item from the database
    let item = FetchObjectsImplementation('item');

    // Check if item exists
    if (item === null) {
        return {
            success: false,
            message: "Item not found"
        }
    }

    // Create a new review object
    let newReview = {
        id: item.id,
        comment: comment,
        rating: rating,
        userId: userId,
        itemId: itemId
    };

    // Add the new review to the list of reviews
    item.reviews.push(newReview);

    // Persist the updated item to the database
    SaveObjectImplementation(item);

    return {
        success: true,
        message: "Review added successfully"
    }
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
    // userLoggedIn: userLoggedIn
}