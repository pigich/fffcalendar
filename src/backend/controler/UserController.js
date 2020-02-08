const User = require('../model/User');
const userService = require('../service/UserService');

exports.index = async function (req, res) {
    await User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            data: users
        });
    });
};

exports.findByLogin = async function (req, res) {
    await User.findOne({ login: req.params.login }, function (err, user) {
        if (err) {
            res.send(err);
        }
        res.json({
            status: "success",
            data: user
        });
    });
};
exports.login = async function (req, res) {
    await User.findOne({ login: req.params.login }, function (err, user) {
        const password = req.params.password;
        if (err) {
            res.send(err);
        }
        if (userService.auth(user, password)) {
            res.json({
                status: "success",
                data: user
            });
        }
    });
};