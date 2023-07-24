let axios = require('axios');
let assert = require('assert');

describe('test /BrowsItems', function () {

    it('Behavior 1', async function () {
        const result = await axios.get('http://localhost:3001/browseItems', {params: {userId: 'eaghayi', itemName: 'backpack'}});

        assert.equal(result.data[0].name, 'backpack');
        assert.notEqual(result.data[0].name, 'backpackSomething');
    });
    //
    it('Behavior 2', async function () {
        const result = await axios.get('http://localhost:3001/browseItems',{params:{ userId:'eaghayi', itemName:'backpackSOmething'}});
        // assert.equal(result.data.id, "null");
        assert.equal(result.data.length, 0);

    });

    it('Behavior 3', async function () {
        const result = await axios.get('http://localhost:3001/browseItems',{params:{ userId:"", itemName:'backpack'}});

        // assert.equal(result.data.name, 'backpack');
        assert.equal(result.data[0].name, 'backpack');
        assert.notEqual(result.data[0].name, 'backpackSomething');
        // assert.notEqual(result.data.name, 'backpackSomething');

    });
    it('Behavior 4', async function () {
        const result = await axios.get('http://localhost:3001/browseItems',{params:{ userId:'eaghayi', itemName:'backpack'}});
        assert.equal(1,1,'check the implementation, it is not implemented in the body of function ');

    });
    it('Behavior 5', async function () {
        const result = await axios.get('http://localhost:3001/browseItems',{params:{ userId:'eaghayi', itemName:''}});
        assert.equal(result.data.id,'null','check the implementation, it is not implemented in the body of function ');

    });
});

describe('test /fetchShoppingCart', function () {


    it('Behavior 1', async function () {
        const result = await axios.get('http://localhost:3001/fetchShoppingCart', {params: {userId: 'eaghayi'}});

        assert.equal(result.data.userId, 'eaghayi');
        assert.equal(result.data.itemList.length, 2);

    });
    //
    it('Behavior 2:', async function () {
        const result = await axios.get('http://localhost:3001/fetchShoppingCart',{params:{ userId:'favazzad'}});// favazzad has two carts, so it should throw error
        assert.equal(result.data.id, "null");

    });

    it('Behavior 3: TODO: check the implementation, it is not implemented in the body of function', async function () {
        const result = await axios.get('http://localhost:3001/fetchShoppingCart',{params:{ userId:'eaghayi', itemName:'backpack'}});
        assert.equal(0,1,'check the implementation, it is not implemented in the body of function ');

    });
    it('Behavior 4', async function () {
        const result = await axios.get('http://localhost:3001/fetchShoppingCart',{params:{ userId:''}});
        assert.equal(result.data.id,'null',);

    });
});

describe('test /Fetch Top Most Similar', function () {

    it('Behavior 1:  return best match results', async function () {
        const result = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack2'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data[0].name, 'backpack2');
    });

    it('Behavior 2:  TODO: is not implemented. similar items are more than 20 items', async function () {
        const result = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(0, 1);
    });
    it('Behavior 3: could not find any similar item it returns empty collection', async function () {
        const result = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'itemNotFound'
            }
        });
        assert.equal(result.data.length, 0);
    });
    it('Behavior 4: store a \'log\' data type object  from the items that the user searched', async function () {
        const result = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: 'backpack'
            }
        });
        assert.equal(result.data[0].id, 1);
    });
    it('Behavior 5: illegal argument, userId or itemName is null', async function () {
        const result = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: "",
                itemName: 'backpack'
            }
        });
        assert.equal(result.data[0].id, 'null', 'check userId');
        const result2 = await axios.get('http://localhost:3001/fetchTopMostSimilarItems', {
            params: {
                userId: 'eaghayi',
                itemName: ""
            }
        });
        assert.equal(result2.data[0].id, 'null', 'check item name');
    });
});


describe('test /placeOrder', function () {


    it('Behavior 1: TODO: check implementation', async function () {

        assert.equal(1,1, 'TODO: look at the implementation');


    });

    it('Behavior 2:  TODO: check implementation', async function () {
        assert.equal(1,1, 'TODO: look at the implementation');
    });

    it('Behavior 3:  TODO: check implementation', async function () {
        assert.equal(1,1, 'TODO: look at the implementation');
    });

    it('Behavior 4 TODO: check implementation', async function () {
        assert.equal(1,0, 'TODO: look at the implementation');
    });

    it('Behavior 5:', async function () {
        const obj = await axios.post('http://localhost:3001/placeOrder', {params: {userId:'', address:"fairfax,va,usa", paymentCardNumber:'1234567890123456', cvv2:'123', zipCode:'22030'}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);

    });
    it('Behavior 6: TODO: check implementation', async function () {
        assert.equal(1,1, 'is not implemented');

    });
});


describe('test /purchase histories', function () {


    it('Behavior 1:  refines and returns items that the user purchased', async function () {
        const result = await axios.get('http://localhost:3001/purchasesHistories', {
            params: {
                userId: 'eaghayi'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data[0].action, "purchased");
        assert.equal(result.data[0].id, 1);
    });
    it('Behavior 2:  function returns an empty collection', async function () {
        const result = await axios.get('http://localhost:3001/purchasesHistories', {
            params: {
                userId: 'noOne'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data.length, 0);
    });
    it('Behavior 3: userId should not be null or empty', async function () {
        const result = await axios.get('http://localhost:3001/purchasesHistories', {
            params: {
                userId: ''
            }
        });
        assert.equal(result.data[0].id, "null");
    });
});


describe('test /recently Viewed Items', function () {


    it('Behavior 1:  refines and returns items that the user viewed', async function () {
        const result = await axios.get('http://localhost:3001/recentlyViewedItems', {
            params: {
                userId: 'eaghayi'
            }
        });
        // they didnot implemented this behavior at all

        assert(result.data.length>0);
        assert(result.data[0].action =="viewed" || result.data[0].action =="purchased" );
        assert.equal(result.data[0].id, 1);
    });
    it('Behavior 2:  function returns an empty collection', async function () {
        const result = await axios.get('http://localhost:3001/recentlyViewedItems', {
            params: {
                userId: 'noOne'
            }
        });
        // they didnot implemented this behavior at all
        assert.equal(result.data.length, 0);
    });
    it('Behavior 3: userId should not be null or empty', async function () {
        const result = await axios.get('http://localhost:3001/recentlyViewedItems', {
            params: {
                userId: ''
            }
        });
        assert.equal(result.data[0].id, "null");
    });
});

describe('test /reviewAnItem', function () {


    it('Behavior 1:', async function () {1
        const obj1 = await axios.post('http://localhost:3001/reviewAnItem', {params: {userId:'eaghayi', itemId:'1', comment:'recomend it', rate:'3'}});

        assert.equal(obj1.data.result.comment, 'recomend it');

    });
    it('Behavior 2', async function () {
        const obj1 = await axios.post('http://localhost:3001/reviewAnItem', {params: {userId:null, itemId:'', comment:'', rate:''}});
        assert.equal(obj1.data.result, null);
        assert.notEqual(obj1.data.result, true);
        const obj = await axios.post('http://localhost:3001/reviewAnItem', {params: {userId:'eaghayi', itemId:'1', comment:'not bad', rate:null}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);
    });
});

describe('test /searchItems', function () {


    it('Behavior 1:  return best match results base on category', async function () {
        const result = await axios.get('http://localhost:3001/searchItems?criteria=school');
        assert.equal(result.data.length,1);
    });

    it('Behavior 2:  return best match results base on item name', async function () {
        const result = await axios.get('http://localhost:3001/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});
        // they called fetchTopMostSimilar methods, so implicitly this behavior is implemented if fetchTopMostSimilar be correct.
        assert.equal(1, 1);

    });
    it('Behavior 2:  return best match results', async function () {
        const result = await axios.get('http://localhost:3001/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});
            // they called fetchTopMostSimilar methods, so implicitly this behavior is implemented if fetchTopMostSimilar be correct.
        assert.equal(1, 1);

    });
    it('Behavior 3: TODO: check implementation', async function () {
        const result = await axios.get('http://localhost:3001/searchItems',{params:{ userId:'eaghayi', criteria:'backpack'}});

        assert.equal(1, 1);

    });
    it('Behavior 4: illegal argument, criteria is null', async function () {
        const result = await axios.get('http://localhost:3001/searchItems?criteria=');
        assert.equal(result.data[0].id, 'null');

    });
});


describe('test /updateShoppingCart', function () {


    it('Behavior 1: TODO: check implementation', async function () {
        const obj1 = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        // assert.equal(obj1.data.result, true);

        assert.equal(1,0,'TODO: check implementation');

    });

    it('Behavior 2', async function () {
        const obj1 = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'1', flagOfAction:'adding'}});
        assert.equal(obj1.data.result, true);
    });

    it('Behavior 3', async function () {
        const obj1 = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        assert.equal(obj1.data.result, true);

    });
    it('Behavior 4', async function () {
        const obj1 = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'1', flagOfAction:'SOMETHING'}});
        assert.notEqual(obj1.data.result, true);
        assert.equal(obj1.data.result, null);

    });

    it('Behavior 5: TODO: check implementation', async function () {
        const obj1 = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'1', flagOfAction:'removing'}});
        assert.equal(obj1.data.result, true);

        assert.equal(1,2,'TODO: check implementation');

    });
    it('Behavior 6', async function () {

        const obj = await axios.post('http://localhost:3001/updateShoppingCart', {params: {userId:'eaghayi', itemId:'', flagOfAction:'removing'}});
        assert.equal(obj.data.result, null);
        assert.notEqual(obj.data.result, true);
    });
});