const User = require('../model/User');
const express = require('express');
const router = express.Router();
const userService = require('../service/UserService');
/*eslint-env node*/

router.post('/users/login', async (req, res) => {
    try {
        const { login, password } = req.body
        const user = await User.findByLogin(login, password)
        if (!user ) {
            return res.status(401).send({ message: 'Bad credentials!' })
        }
        const token = userService.generateToken(login)
        return res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;