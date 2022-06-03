const router = require('express').Router();

router.get('/user/test', async (req, res) => {
    res.send('hellooooo')
})

module.exports = router