/*eslint-env node*/
const mongoose = require('mongoose');
const userService = require('../service/UserService');
const userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    taskList
        : {
        type: Array,
        required: true
    }
});

userSchema.statics.findByLogin = async (login, password) => {
    let user = await User.findOne({ login })
    if (!user) {
        return null;
    }
    const isValid = await userService.checkCredentials(user, password);
    if (!isValid) {
        return null;
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User;
