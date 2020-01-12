var express = require('express');
var router = express.Router();
var shoppingService = require('../service/shopping_session1_service');
var testEnvironment = true;

router.get('/searchItems', async (req, res, next) => {
    try {
        const item = await shoppingService.searchItems(req.query.userId, req.query.criteria);
        res.json(item);
    } catch (e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'InvalidArgumentException') {
            const item = [{
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'
            }];
            res.send(item);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});

router.get('/fetchTopMostSimilarItems', async (req, res, next) => {
    try {
        const itemList = await shoppingService.fetchTopMostSimilarItems(req.query.userId, req.query.itemName);
        res.json(itemList);
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            const itemList = [{
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'}];
            res.send(itemList);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
    //res.send(service.updateTodo(req.query.todo));
});

router.get('/purchasesHistories', async (req, res, next) => {
    try {
        const itemList = await shoppingService.purchasesHistories(req.query.userId);
        res.json(itemList);
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            const itemList = [{
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'}];
            res.send(itemList);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});

router.get('/browseItems', async (req, res, next) => {
    try {
        const item = await shoppingService.browseItems(req.query.userId,req.query.itemName);
        res.json(item);
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            const item = {
                id: 'null',
                name: 'null',
                price: 'null',
                rating: 'null',
                seller: 'null',
                status: 'null',
                category: 'null',
                adtType: 'null'};
            res.send(item);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});

router.get('/fetchShoppingCart', async (req, res, next) => {
    try {
        const cart = await shoppingService.fetchShoppingCart(req.query.userId);

        res.json(cart);
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            const cart = {
                "id": 'null',
                "itemeList": null,
                "userId": 'null',
                "adtType": "shoppingCart"
            };
            res.send(cart);
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});


router.post('/reviewAnItem', async (req, res, next) => {
    try {
        const boolResp = await shoppingService.reviewAnItem(req.body.params.userId,req.body.params.itemId,req.body.params.comment,req.body.params.rate);

        res.json({result:boolResp});
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            res.send({result:null});
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});

router.post('/updateShoppingCart', async (req, res, next) => {
    try {
        const boolResp = await shoppingService.updateShoppingCart(req.body.params.userId,req.body.params.itemId,req.body.params.flagOfAction);

        res.json({result:boolResp});
    } catch(e) {
        //this will eventually be handled by your error handling middleware
        if (e instanceof TypeError || e.message == 'IllegalArgumentException') {
            res.send({result:null});
        } else {
            console.log('exception: ', e.message);
            next(e);
        }
    }
});


module.exports = router;
