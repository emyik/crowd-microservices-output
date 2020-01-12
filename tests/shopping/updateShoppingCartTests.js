// Adding and removing items from the shopping cart are common actions for users, implementing the function to update the shopping cart based on the type of action.
// 1- It finds item based on 'itemId' from database,
// 2- then if the 'flagOfAction' is 'adding', the function fetches the user's shopping cart and adds the new item to the shopping cart,
// then save the shopping cart again in the database.
// 3- It is possible user wants to remove an item from the shopping cart, If the 'flagOfAction' is 'deleting' an item,
// the function fetches the user's shopping cart and remove the item from the shopping cart, then save the shopping cart in the database again.
// 4- if the 'flagOfAction ' is not 'adding' or 'removing' the function should return a 'TypeError' exception with a description.
// 5- Since the user already logged in the system and tried to update the shopping cart,
// the function should store a log from the items the user add or remove from the shopping cart, t
// his log might be useful for future item recommendations. The function may make use of a 3rd party persistence library .
// 6-If any of the input arguments are empty or null, a 'TypeError' exception should be thrown with a description.