const express = require('express');
const router = express.Router();
const { UserService } = require('../../services/');
const { users } = require('../../helpers/validation');

router.post('/', async (req, res, next) => {
    try {
        req.validate(users.api_create, req.body);
        const user = await UserService.create(req.body);
        res.send(user);
    } catch (e) {
        next(e);
    }
});

router.get('/', (req, res, next)=> {
    try {
        res.send([]);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
