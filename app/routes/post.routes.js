// const posts = require('../controllers/post.controller')

// let router = require('express').Router()

// // Index
// router.get('/', posts.findAll)

// module.exports = router

module.exports = (app) => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()

    // Index
    router.get('/', posts.findAll)

    app.use('/api/posts', router)
}