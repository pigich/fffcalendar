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
        : [
            {
                id: Number,
                name: String,
                startDate: Date,
                finishDate: Date,
                comment: String
            }
        ]
});

userSchema.statics.findByLogin = async (login, password) => {
    let user = await User.findOne({ login }, { taskList: false, _id: false })
    if (!user) {
        return null;
    }
    const isValid = userService.checkCredentials(user, password);
    if (!isValid) {
        return null;
    }
    return { id: user.id, login: user.login }
}

userSchema.statics.findTasks = async (id) => {
    let tasks = await User.findOne({ id }, { taskList: true, _id: false })
    return tasks;
}

userSchema.statics.findTaskById = async (taskId, userId) => {
    let tasks = await User.find({ id: userId, "taskList.id": taskId }, { "taskList.$": 1, _id: 0 })
    return tasks;
}

const User = mongoose.model('User', userSchema)
module.exports = User;
