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
    let tasks = await User.findOne(
        { id: userId, "taskList._id": taskId },
        { "taskList.$": 1, _id: 0 }
    )
    return tasks;
}

userSchema.statics.insertTask = async (userId, task) => {
    let tasks = await User.updateOne(
        { id: userId },
        { $push: { taskList: task } }
    )
    return tasks;
}

userSchema.statics.updateTask = async (userId, task) => {
    let tasks = await User.updateOne(
        { id: userId, "taskList._id": task._id },
        { $set: { 'taskList.$': task } }
    )
    return tasks;
}

userSchema.statics.deleteTask = async (taskId, userId) => {
    let tasks = await User.updateOne(
        { id: userId },
        { $pull: { taskList: { _id: taskId } } }
    )
    return tasks;
}

userSchema.statics.shareTask = async (userLogin, task) => {
    let taskExist = await User.findOne(
        { login: userLogin, "taskList._id": task._id },
        { _id: 1 }
    )
    let tasks;
    if (taskExist !== null) {
        tasks = await User.updateOne(
            { login: userLogin, "taskList._id": task._id },
            { $set: { 'taskList.$': task } },
        )
    }
    tasks = await User.updateOne(
        { login: userLogin },
        { $addToSet: { taskList: task } },
    )
    return tasks;
}

userSchema.statics.filterTask = async (userId, key, value) => {
    let tasks = await User.aggregate([
        { $match: { id: Number(userId) } },
        { $unwind: "$taskList" },
        { $match: { [`taskList.${key}`]: { '$regex': value, '$options': 'i' } } },
        {
            $group: {
                _id: '$user',
                taskList: {
                    $push: {
                        _id: '$taskList._id',
                        name: "$taskList.name",
                        startDate: "$taskList.startDate",
                        finishDate: "$taskList.finishDate",
                        comment: "$taskList.comment",
                    }
                }
            }
        },
        { $project: { _id: 0, taskList: 1 } }
    ])
    return tasks[0];
}

const User = mongoose.model('User', userSchema)
module.exports = User;
