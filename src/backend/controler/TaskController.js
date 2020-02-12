const User = require('../model/User');
const express = require('express');
const router = express.Router();
/*eslint-env node*/

router.get('/tasks', async (req, res) => {
    try {
        const id = req.query.id
        const user = await User.findTasks(id)
        return res.send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:taskId', async (req, res) => {
    try {
        const userId = req.query.userId
        const taskId = req.params.taskId
        const user = await User.findTaskById(taskId, userId)
        return res.send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;