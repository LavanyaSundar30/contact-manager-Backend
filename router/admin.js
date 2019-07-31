const router = require('express').Router();
const adminController = require('./../controller/admin');

router.post('/register', async (req, res) => {
    res.send(await adminController.register(req.body.username, req.body.password));
});

router.post('/login', async (req, res) => {
    res.send(await adminController.login(req.body.username, req.body.password));
});

router.get('/', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(await adminController.fetch());
});

module.exports = router;