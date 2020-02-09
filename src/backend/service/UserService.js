/*eslint-env node*/
const props = require('../config/properties');
const jwt = require('jsonwebtoken')

exports.checkCredentials = (user, password) => {
    return password === user.password;
};

exports.generateToken = (login) => {
    return jwt.sign({ login }, props.JWT_KEY);
};