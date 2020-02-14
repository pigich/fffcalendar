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
        if (!user) {
            return res.status(401).send({ message: 'Data not found' })
        }
        return res.send({ user })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/tasks/create', async (req, res) => {
    try {
        const { userId, task } = req.body
        const answer = await User.insertTask(userId, task)
        if (!answer) {
            return res.status(401).send({ message: 'Data not found' })
        }
        return res.status(200).send({ message: 'Data added' })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/tasks/update', async (req, res) => {
    try {
        const { userId, task } = req.body
        const answer = await User.updateTask(userId, task)
        if (!answer) {
            return res.status(401).send({ message: 'Data not found' })
        }
        return res.status(200).send({ message: 'Data updated' })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/delete/:taskId', async (req, res) => {
    try {
        const userId = req.query.userId
        const taskId = req.params.taskId
        const answer = await User.deleteTask(taskId, userId)
        if (!answer) {
            return res.status(401).send({ message: 'Data not found' })
        }
        return res.status(200).send({ message: 'Data deleted' })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/tasks/share', async (req, res) => {
    try {
        const { login, task } = req.body
        const answer = await User.shareTask(login, task)
        if (!answer) {
            return res.status(401).send({ message: 'Data not shared' })
        }
        return res.status(200).send({ message: 'Data shared' })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;