const db = require('../models')
const Post = db.posts

exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "1"
        }
    } : {}

    Post.find(condition)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error while retrieving posts."
        })
    })
}