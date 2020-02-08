const router = require('express').Router();
const userController = require('../controler/UserController');

router.route('/users')
    .get(userController.index)
    
router.route('/users/login')
    .post(userController.login)

router.route('/users/:login')
    .get(userController.findByLogin)

module.exports = router;