module.exports = (app) => {
    const posts = require('../controllers/post.controller')

    let router = require('express').Router()

    // Index
    router.get('/', posts.findAll)
    // Create
    router.post('/', posts.create)
    // Show
    router.get('/:id', posts.findOne)

    app.use('/api/posts', router)
}