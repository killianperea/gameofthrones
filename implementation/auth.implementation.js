var User = require('../schemas/userSchema');
var Deferred = require('promised-io').Deferred;
var serverConstants = require('../constants/application');
var _ = require('underscore');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var _login = function (userData) {
    var deferred = new Deferred();
    User.findOne({username: userData.username}, function (error, user) {
        if (error) {
            deferred.reject(serverConstants.CODE['500']);
        } else if (!user) {
            deferred.reject({status: 500, message: "user does not exists"});
        } else {
            bcrypt.compare(userData.password, user.password, function (err, res) {
                if (err) {
                    deferred.reject(serverConstants.CODE['500']);
                } else if (!res) {
                    deferred.reject({status: 500, message: "wrong password"});
                } else {
                    var token = jwt.sign({userId: user._id, isRevoked: false}, serverConstants.SECRET);
                    deferred.resolve(token);
                }
            });
        }
    });
    return deferred.promise;
};

var _verify = function (req) {
    var deferred = new Deferred();
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, serverConstants.SECRET, function (err, decoded) {
            if (err) {
                deferred.reject({status: 500, message: "token not valid"});
            } else {
                req.userId = decoded.userId;
                deferred.resolve(req);
            }
        });
    } else {
        deferred.reject({status: 500, message:"not token provided"})
    }

    return deferred.promise;
};

module.exports = {
    login: _login,
    verify: _verify
};