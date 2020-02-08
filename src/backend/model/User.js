const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // token: {
    //     type: String,
    //     required: true
    // }
});

const User = mongoose.model('User', userSchema)
module.exports = User;

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}