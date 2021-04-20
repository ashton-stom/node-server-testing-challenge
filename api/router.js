const router = require('express').Router();

const users = require('./model.js')

router.get('/:username', async (req, res) => {
    let user = await users.getUser(req.params.username)
    res.status(200).json(user)
});

router.post('/', async (req, res) => {
    if (!req.body.username) {
        res.status(400).end()
        return
    }
    const user = await users.addUser(req.body)
    res.status(201).json({ message: 'User created' })
});

router.delete('/:username', async (req, res) => {
    const user = await users.getUser(req.params.username)
    if (user == null) {
        res.status(400).end()
        return
    }
    await users.deleteUser(req.params.username)
    res.status(204).end()
})

module.exports = router;