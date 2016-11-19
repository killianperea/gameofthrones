var router = require('express').Router();
var userImpl = require('../../implementation/users.implementation');
var serverConstants = require('../../constants/application');
var authImpl = require('../../implementation/auth.implementation');

router.use("/me", function (req, res, next) {
    authImpl.verify(req).then(function (newReq) {
        req = newReq;
        next();
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.get('/me', function (req, res) {
    userImpl.getUser(req.userId).then(function(user) {
        res.json({status:200, message: user});
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.use("/users", function (req, res, next) {
    authImpl.verify(req).then(function (newReq) {
        req = newReq;
        next();
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.get('/users', function (req, res) {
    userImpl.getUsers().then(function(users) {
        res.json({status:200, message: users});
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.post('/register', function (req, res) {
    userImpl.createUser(req.body).then(function (user) {
        res.json({status: 200, message: user});
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.use("/user", function (req, res, next) {
    authImpl.verify(req).then(function (newReq) {
        req = newReq;
        next();
    }, function (error) {
        res.status(error.status).send(error);
    });
});

router.route('/user/:userId')
    .get(function (req, res) {
        userImpl.getUser(req.params.userId).then(function(user) {
            res.json({status:200, message: user});
        }, function (error) {
            res.status(error.status).send(error);
        });
    })
    .put(function (req, res) {
        userImpl.modifyUser(req.params.userId, req.body).then(function () {
            res.json(serverConstants.CODE['200']);
        }, function (error) {
            res.status(error.status).send(error);
        });
    })
    .delete(function (req, res) {
        userImpl.removeUser(req.params.userId).then(function () {
            res.json(serverConstants.CODE['200']);
        }, function (error) {
            res.status(error.status).send(error);
        });
    });


module.exports = router;