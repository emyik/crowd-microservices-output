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


module.exports = router;
