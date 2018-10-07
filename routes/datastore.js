// var express = require('express');
// var redis = require('redis');
// var url = require('url');
// //process.env.HEROKU_REDIS_MAUVE_URL='redis://h:pc06bbc5460383a7dd882bc9c7ac5661878be474302afb3d4e841efd3633e27dc@ec2-34-239-77-182.compute-1.amazonaws.com:22799';
// if (process.env.REDIS_URL) {
//     var redisURL = url.parse(process.env.REDIS_URL);
//     var redisClient = redis.createClient(redisURL.port, redisURL.hostname);
//     redisClient.auth(redisURL.auth.split(":")[1]);
// } else {
//     //development
//     var redisClient = redis.createClient();
// }
// var router = express.Router();
// //var service = require('../service/microservice');
// var bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: true}));
//
// router.get('/', function (req, res, next) {
//
//     redisClient.on('connect', function () {
//         console.log('connected');
//     });
//     // redisClient.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
//     //     console.log(reply); // 3
//     // });
//     // redisClient.smembers('tags', function(err, reply) {
//     //     console.log(reply);
//     // });
//     res.send('data store initialise');
// });
//
// //create and save object
// router.post('/save', function (req, res, next) {
//     redisClient.on('connect', function () {
//         console.log('connected');
//     });
//     redisClient.hmset([req.body.varPoolId, req.body.varKey, req.body.varValue], function (err, reply) {
//
//         console.log(reply); //
//     });
//     // redisClient.hgetall(req.body.varPoolId, function(err, reply) {
//     //
//     //     console.log(reply);
//     // });
//     res.send('Saved data store ');
// });
//
// //Get all variables of a varPool
// router.get('/getAll', function (req, res, next) {
//     redisClient.on('connect', function () {
//         console.log('connected');
//     });
//
//     redisClient.hgetall('global1', function (err, reply) {
//         console.log(reply);
//         res.status(200).send(reply);
//     });
//
//
// });
//
// module.exports = router;
//
